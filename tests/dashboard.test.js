const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const tickets = require("../app/support-ticket-dashboard/data.js");
const appSource = fs.readFileSync(
  path.join(__dirname, "../app/support-ticket-dashboard/app.js"),
  "utf8"
);

function createElement(initial = {}) {
  return {
    children: [],
    className: "",
    hidden: false,
    textContent: "",
    value: "",
    ...initial,
    addEventListener() {},
    append(...children) {
      this.children.push(...children);
    },
    replaceChildren() {
      this.children = [];
    }
  };
}

function loadDashboard() {
  const elements = {
    "#search-input": createElement(),
    "#status-filter": createElement({ value: "all" }),
    "#sort-order": createElement({ value: "dueDate" }),
    "#ticket-list": createElement(),
    "#empty-message": createElement({ hidden: true }),
    "#visible-count": createElement(),
    "#open-count": createElement(),
    "#progress-count": createElement(),
    "#overdue-count": createElement(),
    "#last-updated": createElement()
  };
  const document = {
    querySelector(selector) {
      return elements[selector];
    },
    createElement() {
      return createElement();
    }
  };
  const context = vm.createContext({ document, tickets });

  vm.runInContext(appSource, context);
  return { context, elements };
}

function collectText(element) {
  return [element.textContent, ...element.children.map(collectText)].join(" ");
}

test("workshop dataset contains 12 fictional tickets and protected memos", () => {
  assert.equal(tickets.length, 12);
  assert.ok(tickets.every((ticket) => ticket.assignee));
  assert.ok(tickets.every((ticket) => ticket.internalMemo.startsWith("DEMO ONLY:")));
});

test("initial dashboard counts are deterministic", () => {
  const { elements } = loadDashboard();

  assert.equal(elements["#visible-count"].textContent, 12);
  assert.equal(elements["#open-count"].textContent, 5);
  assert.equal(elements["#progress-count"].textContent, 4);
  assert.equal(elements["#overdue-count"].textContent, 7);
  assert.equal(elements["#last-updated"].textContent, "2026/7/22");
});

test("search finds visible ticket text and excludes protected memos", () => {
  const { context, elements } = loadDashboard();
  const search = elements["#search-input"];

  search.value = "文字化け";
  context.filterTickets();
  assert.equal(elements["#visible-count"].textContent, 1);

  search.value = "CRM";
  context.filterTickets();
  assert.equal(elements["#visible-count"].textContent, 0);
});

test("status filter can select the three closed tickets", () => {
  const { context, elements } = loadDashboard();

  elements["#status-filter"].value = "closed";
  context.filterTickets();

  assert.equal(elements["#visible-count"].textContent, 3);
});

test("rendered cards do not expose protected memos", () => {
  const { elements } = loadDashboard();
  const renderedText = collectText(elements["#ticket-list"]);

  assert.doesNotMatch(renderedText, /DEMO ONLY:|CRM/);
});

test("priority score uses the fixed workshop date", () => {
  const { context } = loadDashboard();

  assert.equal(context.calc(tickets[0]), 41);
});
