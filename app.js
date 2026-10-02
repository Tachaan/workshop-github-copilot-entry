const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const sortOrder = document.querySelector("#sort-order");
const ticketList = document.querySelector("#ticket-list");
const emptyMessage = document.querySelector("#empty-message");

const WORKSHOP_TODAY = "2026-07-22";

const statusLabels = {
  open: "未対応",
  "in-progress": "対応中",
  closed: "完了"
};

const priorityLabels = {
  high: "高",
  medium: "中",
  low: "低"
};

function getWorkshopToday() {
  return parseDashboardDate(WORKSHOP_TODAY);
}

function parseDashboardDate(value) {
  return new Date(`${value}T00:00:00+09:00`);
}

function buildSearchText(ticket) {
  return `${ticket.title} ${ticket.customer} ${ticket.description}`.toLowerCase();
}

function calc(item) {
  const x = { high: 30, medium: 20, low: 10 }[item.priority];
  const y = Math.ceil((parseDashboardDate(item.dueDate) - getWorkshopToday()) / 86400000);
  return x + (item.status !== "closed" && y < 0 ? 8 : 0) + (y <= 3 ? 3 : 0);
}

function filterTickets() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const today = getWorkshopToday();

  let items2 = tickets.filter((ticket) => {
    return buildSearchText(ticket).includes(keyword);
  });

  if (selectedStatus !== "all") {
    items2 = items2.filter((ticket) => ticket.status === selectedStatus);
  }

  if (sortOrder.value === "priority") {
    items2.sort((a, b) => calc(b) - calc(a));
  }

  document.querySelector("#visible-count").textContent = items2.length;
  document.querySelector("#open-count").textContent =
    items2.filter((ticket) => ticket.status === "open").length;
  document.querySelector("#progress-count").textContent =
    items2.filter((ticket) => ticket.status === "in-progress").length;
  document.querySelector("#overdue-count").textContent =
    items2.filter((ticket) => ticket.status !== "closed" && parseDashboardDate(ticket.dueDate) < today).length;

  ticketList.replaceChildren();
  emptyMessage.hidden = items2.length !== 0;

  items2.forEach((ticket) => {
    const isOverdue = ticket.status !== "closed" && parseDashboardDate(ticket.dueDate) < today;
    const card = document.createElement("article");
    card.className = `ticket${isOverdue ? " overdue" : ""}`;

    const content = document.createElement("div");
    const id = document.createElement("span");
    id.className = "ticket-id";
    id.textContent = ticket.id;
    const title = document.createElement("h2");
    title.textContent = ticket.title;
    const description = document.createElement("p");
    description.textContent = ticket.description;
    content.append(id, title, description);

    const badges = document.createElement("div");
    badges.className = "badges";
    const status = document.createElement("span");
    status.className = "badge";
    status.textContent = statusLabels[ticket.status];
    const priority = document.createElement("span");
    priority.className = `badge priority-${ticket.priority}`;
    priority.textContent = `優先度: ${priorityLabels[ticket.priority]}`;
    badges.append(status, priority);

    const meta = document.createElement("div");
    meta.className = "ticket-meta";
    const customer = document.createElement("span");
    customer.textContent = `顧客: ${ticket.customer}`;
    const created = document.createElement("span");
    created.textContent = `登録日: ${ticket.createdAt}`;
    const due = document.createElement("span");
    due.textContent = `期限: ${ticket.dueDate}${isOverdue ? "（期限切れ）" : ""}`;
    const score = document.createElement("span");
    score.textContent = `スコア: ${calc(ticket)}`;
    meta.append(customer, created, due, score);

    card.append(content, badges, meta);
    ticketList.append(card);
  });
}

searchInput.addEventListener("input", filterTickets);
statusFilter.addEventListener("change", filterTickets);
sortOrder.addEventListener("change", filterTickets);
document.querySelector("#last-updated").textContent = getWorkshopToday().toLocaleDateString(
  "ja-JP",
  { timeZone: "Asia/Tokyo" }
);

filterTickets();
