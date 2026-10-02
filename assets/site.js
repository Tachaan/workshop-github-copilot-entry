const config = window.WORKSHOP_SITE_CONFIG;

if (!config || !config.title || !Array.isArray(config.pages) || config.pages.length === 0) {
  throw new Error("assets/site.config.js must define a title and at least one page.");
}

const agenda = config.pages;
const nav = document.querySelector("#agenda-nav");
const progressBar = document.querySelector("#progress-bar");
const previousButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const content = document.querySelector("#doc-content");
const sourceLink = document.querySelector("#source-link");
const pageLabel = document.querySelector("#page-label");
const pageTitle = document.querySelector("#page-title");
const pageSummary = document.querySelector("#page-summary");
const pageCompletion = document.querySelector("#page-completion");
const pageCompletionText = document.querySelector("#page-completion-text");

let currentIndex = 0;
let tocScrollHandler = null;
let lightboxReturnFocus = null;

function buildTopbarActions() {
  const currentPath = decodeURIComponent(window.location.hash.replace(/^#/, "")).split("#")[0];
  const actions = document.querySelector("#topbar-actions");

  actions.innerHTML = (config.links || [])
    .map((link) => {
      const preserveCurrentPage = (link.preservePaths || []).includes(currentPath);
      const href = preserveCurrentPage ? `${link.href}#${currentPath}` : link.href;
      const newTab = link.newTab ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeAttribute(href)}"${newTab}>${escapeHtml(link.label)}</a>`;
    })
    .join("");
}

function applySiteConfig() {
  document.title = config.title;
  document.querySelector('meta[name="description"]').content = config.description || "";

  const brand = config.brand || {};
  const homePage = agenda.find((item) => item.id === (config.homePageId || "overview")) || agenda[0];
  document.querySelector("#brand").href = `#${homePage.path}`;
  document.querySelector("#brand").setAttribute("aria-label", `${brand.name || config.title} ホーム`);
  document.querySelector("#brand-name").textContent = brand.name || config.title;

  const identity = config.identity || {};
  const hasIdentity = Boolean(identity.code || identity.sequence);
  const brandCode = document.querySelector("#brand-code");
  const hero = document.querySelector(".hero");
  const heroSignature = document.querySelector("#hero-signature");
  const compactCode = [identity.code, identity.sequence].filter(Boolean).join(" / ");

  brandCode.hidden = !hasIdentity;
  brandCode.textContent = compactCode;
  hero.classList.toggle("without-identity", !hasIdentity);
  heroSignature.hidden = !hasIdentity;
  document.querySelector("#hero-signature-label").textContent = identity.label || "Workshop";
  document.querySelector("#hero-signature-code").textContent = identity.code || "";
  document.querySelector("#hero-signature-sequence").textContent = identity.sequence || "";
  document.querySelector("#hero-signature-edition").textContent = identity.edition || "";
  heroSignature.setAttribute(
    "aria-label",
    [identity.label, compactCode, identity.edition].filter(Boolean).join(", ")
  );

  const navigation = config.navigation || {};
  document.querySelector("#nav-eyebrow").textContent = navigation.eyebrow || "Workshop";
  document.querySelector("#nav-title").textContent = navigation.title || config.title;
  document.querySelector("#nav-description").textContent = navigation.description || config.description || "";
  document.querySelector("#side-card-label").textContent = navigation.sideCardLabel || "Workshop";
  document.querySelector("#side-card-value").textContent = navigation.sideCardValue || config.title;

  buildTopbarActions();

  document.querySelector("#timeline").innerHTML = [
    config.totalTime
      ? `<span class="tl-total"><small>Total</small><b>${escapeHtml(config.totalTime)}</b></span>`
      : "",
    ...agenda.map(
      (item) =>
        `<span class="tl-item"><small>${escapeHtml(item.label)}</small><b>${escapeHtml(item.time)}</b></span>`
    ),
  ].join("");
}

function buildNavigation() {
  nav.innerHTML = agenda
    .map(
      (item, index) => `
        <li>
          <a href="#${escapeAttribute(item.path)}" data-index="${index}" data-label="${escapeAttribute(item.label)}">
            <span class="nav-title">${escapeHtml(item.title)}</span>
            <span class="nav-meta">${escapeHtml(item.time)} / ${escapeHtml(item.path)}</span>
          </a>
        </li>`
    )
    .join("");
}

function getIndexFromHash() {
  const [path] = decodeURIComponent(window.location.hash.replace(/^#/, "")).split("#");
  const index = agenda.findIndex((item) => item.path === path || item.id === path);
  return index >= 0 ? index : 0;
}

function setHashForIndex(index) {
  const boundedIndex = Math.max(0, Math.min(index, agenda.length - 1));
  const nextHash = `#${agenda[boundedIndex].path}`;
  if (window.location.hash !== nextHash) {
    window.location.hash = nextHash;
    return;
  }
  showPage(boundedIndex);
}

async function showPage(index) {
  currentIndex = Math.max(0, Math.min(index, agenda.length - 1));
  const item = agenda[currentIndex];

  buildTopbarActions();
  document.title = `${item.label} ${item.title} | ${config.title}`;
  pageLabel.textContent = `${item.label} / ${item.time}`;
  pageTitle.textContent = item.title;
  pageSummary.textContent = item.summary;
  pageCompletion.hidden = !item.completion;
  pageCompletionText.textContent = item.completion || "";
  sourceLink.href = item.path;
  sourceLink.textContent = `${item.label} の Markdown を開く`;

  document.querySelectorAll(".steps a").forEach((link, linkIndex) => {
    const active = linkIndex === currentIndex;
    link.classList.toggle("active", active);
    link.classList.toggle("done", linkIndex < currentIndex);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  progressBar.style.width = `${((currentIndex + 1) / agenda.length) * 100}%`;
  previousButton.disabled = currentIndex === 0;
  nextButton.disabled = currentIndex === agenda.length - 1;
  nextButton.textContent = currentIndex === agenda.length - 1 ? "完了" : "次へ →";

  await loadMarkdown(item);
}

async function loadMarkdown(item) {
  if (tocScrollHandler) {
    window.removeEventListener("scroll", tocScrollHandler);
    tocScrollHandler = null;
  }

  content.setAttribute("aria-busy", "true");
  content.innerHTML = `
    <div class="loading-card">
      <b>${escapeHtml(item.label)} を読み込んでいます...</b>
      <span>${escapeHtml(item.path)}</span>
    </div>`;

  try {
    const response = await fetch(item.path, { cache: "no-cache" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const markdown = await response.text();
    content.innerHTML = `
      <div class="doc-meta">
        <b>${escapeHtml(item.label)} / ${escapeHtml(item.time)}</b>
        <span>${escapeHtml(item.path)}</span>
      </div>
      <div class="markdown-body">${renderMarkdown(markdown, item.path)}</div>`;
  } catch (error) {
    console.error(`Failed to load ${item.path}`, error);
    content.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">${escapeHtml(item.label)} / ${escapeHtml(item.time)}</p>
        <h2>${escapeHtml(item.title)}</h2>
        <p><code>${escapeHtml(item.path)}</code> を読み込めませんでした。</p>
        <p><code>${escapeHtml(error.message)}</code></p>
        <p><a href="${escapeAttribute(item.path)}">Markdown を直接開いて確認する</a></p>
      </div>`;
  } finally {
    content.setAttribute("aria-busy", "false");
    addTableOfContents();
    addFigureEnhancements();
    addCopyButtons();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function renderMarkdown(markdown, currentPath) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^(\s*)```([\w+-]+)?(?:\s+(.+?))?\s*$/);
    if (fence) {
      const indent = fence[1].length;
      const language = fence[2] || "text";
      const filename = fence[3] || "";
      const code = [];
      index += 1;
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) {
        code.push(lines[index].slice(indent));
        index += 1;
      }
      index += index < lines.length ? 1 : 0;
      html.push(`
        <div class="code-block">
          <div class="code-block-header">
            <span class="code-language">${escapeHtml(getLanguageLabel(language))}</span>
            ${filename ? `<span class="code-filename">${escapeHtml(filename)}</span>` : ""}
            <span class="code-block-tools"></span>
          </div>
          <pre><code class="language-${escapeAttribute(language)}">${escapeHtml(code.join("\n"))}</code></pre>
        </div>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].replace(/\s+#+$/, "");
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${inlineMarkdown(text, currentPath)}</h${level}>`);
      index += 1;
      continue;
    }

    const image = parseImageLine(line);
    if (image) {
      const source = rewriteHref(image.source, currentPath);
      const caption = image.title || image.alt;
      html.push(`
        <figure>
          <img src="${escapeAttribute(source)}" alt="${escapeAttribute(image.alt)}" loading="lazy" decoding="async">
          ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
        </figure>`);
      index += 1;
      continue;
    }

    if (isTableStart(lines, index)) {
      const tableLines = [];
      while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }
      html.push(renderTable(tableLines, currentPath));
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const collected = collectListItems(lines, index, /^\s*[-*+]\s+/);
      index = collected.index;
      html.push(renderUnorderedList(collected.items, currentPath));
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const collected = collectListItems(lines, index, /^\s*\d+\.\s+/);
      index = collected.index;
      html.push(
        `<ol>${collected.items
          .map((item) => `<li>${withListItemBody(inlineMarkdown(item.text, currentPath), item, currentPath)}</li>`)
          .join("")}</ol>`,
      );
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ""));
        index += 1;
      }
      html.push(renderBlockquote(quote, currentPath));
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^\s*```/.test(lines[index]) &&
      !/^(#{1,6})\s+/.test(lines[index]) &&
      !/^\s*[-*+]\s+/.test(lines[index]) &&
      !/^\s*\d+\.\s+/.test(lines[index]) &&
      !/^\s*>\s?/.test(lines[index]) &&
      !parseImageLine(lines[index]) &&
      !isTableStart(lines, index)
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    html.push(`<p>${inlineMarkdown(paragraph.join(" "), currentPath)}</p>`);
  }

  return html.join("\n");
}

function parseImageLine(line) {
  const match = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]*)")?\)\s*$/);
  if (!match) {
    return null;
  }

  return {
    alt: match[1],
    source: match[2],
    title: match[3] || "",
  };
}

function getLanguageLabel(language) {
  const labels = {
    bash: "Bash",
    css: "CSS",
    html: "HTML",
    javascript: "JavaScript",
    js: "JavaScript",
    json: "JSON",
    markdown: "Markdown",
    md: "Markdown",
    plaintext: "Text",
    powershell: "PowerShell",
    shell: "Shell",
    text: "Text",
    typescript: "TypeScript",
    ts: "TypeScript",
  };

  return labels[language.toLowerCase()] || language;
}

function renderTable(lines, currentPath) {
  const rows = lines
    .filter((_line, index) => index !== 1)
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  if (!rows.length) {
    return "";
  }

  const [head, ...body] = rows;
  return `
    <table>
      <thead><tr>${head.map((cell) => `<th>${inlineMarkdown(cell, currentPath)}</th>`).join("")}</tr></thead>
      <tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell, currentPath)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>`;
}

function renderUnorderedList(items, currentPath) {
  const hasTaskItems = items.some((item) => /^\[[ xX]\]\s+/.test(item.text));
  if (!hasTaskItems) {
    return `<ul>${items
      .map((item) => `<li>${withListItemBody(inlineMarkdown(item.text, currentPath), item, currentPath)}</li>`)
      .join("")}</ul>`;
  }

  return `<ul class="task-list">${items.map((item) => renderTaskListItem(item, currentPath)).join("")}</ul>`;
}

function collectListItems(lines, startIndex, itemPattern) {
  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (itemPattern.test(line)) {
      items.push({ text: line.replace(itemPattern, ""), rest: [] });
      index += 1;
      continue;
    }

    if (!items.length) {
      break;
    }

    if (!line.trim()) {
      let lookahead = index;
      while (lookahead < lines.length && !lines[lookahead].trim()) {
        lookahead += 1;
      }
      if (lookahead >= lines.length) {
        break;
      }
      if (itemPattern.test(lines[lookahead])) {
        index = lookahead;
        continue;
      }
      if (!/^\s{2,}\S/.test(lines[lookahead])) {
        break;
      }
      for (let blank = index; blank < lookahead; blank += 1) {
        items[items.length - 1].rest.push("");
      }
      index = lookahead;
      continue;
    }

    if (/^\s{2,}\S/.test(line)) {
      items[items.length - 1].rest.push(line);
      index += 1;
      continue;
    }

    break;
  }

  return { items, index };
}

function withListItemBody(headHtml, item, currentPath) {
  const rest = dedentLines(item.rest);
  if (!rest.join("\n").trim()) {
    return headHtml;
  }

  return `${headHtml}${renderMarkdown(rest.join("\n"), currentPath)}`;
}

function dedentLines(lines) {
  const indents = lines
    .filter((line) => line.trim())
    .map((line) => line.match(/^\s*/)[0].length);
  const shift = indents.length ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(shift));
}

function renderTaskListItem(item, currentPath) {
  const task = item.text.match(/^\[([ xX])\]\s+(.+)$/);
  if (!task) {
    return `<li>${withListItemBody(inlineMarkdown(item.text, currentPath), item, currentPath)}</li>`;
  }

  const checked = task[1].toLowerCase() === "x";
  return `
    <li class="task-list-item">
      <label>
        <input type="checkbox"${checked ? " checked" : ""}>
        <span>${inlineMarkdown(task[2], currentPath)}</span>
      </label>
      ${withListItemBody("", item, currentPath)}
    </li>`;
}

function renderBlockquote(lines, currentPath) {
  const alert = lines[0]?.trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/i);
  if (!alert) {
    return `<blockquote>${lines.map((item) => `<p>${inlineMarkdown(item, currentPath)}</p>`).join("")}</blockquote>`;
  }

  const type = alert[1].toLowerCase();
  const titles = {
    note: "Note",
    tip: "Tip",
    important: "Important",
    warning: "Warning",
    caution: "Caution",
  };
  const body = lines.slice(1).filter((item) => item.trim());

  return `
    <div class="markdown-alert markdown-alert-${escapeAttribute(type)}" role="note">
      <p class="markdown-alert-title">${escapeHtml(titles[type])}</p>
      ${body.map((item) => `<p>${inlineMarkdown(item, currentPath)}</p>`).join("")}
    </div>`;
}

function isTableStart(lines, index) {
  return (
    index + 1 < lines.length &&
    /^\s*\|.*\|\s*$/.test(lines[index]) &&
    /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1])
  );
}

function inlineMarkdown(text, currentPath) {
  const tokens = [];
  let value = text.replace(/`([^`]+)`/g, (_match, code) => token(tokens, `<code>${escapeHtml(code)}</code>`));
  value = value.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
    const resolved = rewriteHref(href.trim(), currentPath);
    return token(tokens, `<a href="${escapeAttribute(resolved)}">${escapeHtml(label)}</a>`);
  });
  value = value.replace(/<((?:https?:\/\/|mailto:)[^\s<>]+)>/g, (_match, href) =>
    token(tokens, `<a href="${escapeAttribute(href)}">${escapeHtml(href)}</a>`),
  );

  value = escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  tokens
    .map((html, index) => ({ html, index }))
    .reverse()
    .forEach(({ html, index }) => {
      value = value.replace(`%%TOKEN${index}%%`, html);
    });
  return value;
}

function token(tokens, html) {
  const id = tokens.length;
  tokens.push(html);
  return `%%TOKEN${id}%%`;
}

function rewriteHref(href, currentPath) {
  if (/^(https?:|mailto:|#|\/)/i.test(href)) {
    return href;
  }

  const [path, hash = ""] = href.split("#");
  const base = currentPath.split("/").slice(0, -1).join("/");
  const resolved = normalizePath(`${base}/${path}`);
  const suffix = hash ? `#${hash}` : "";

  if (resolved.endsWith(".md")) {
    return `#${resolved}${suffix}`;
  }

  return `${resolved}${suffix}`;
}

function normalizePath(path) {
  const parts = [];
  path.split("/").forEach((part) => {
    if (!part || part === ".") {
      return;
    }
    if (part === "..") {
      parts.pop();
      return;
    }
    parts.push(part);
  });
  return parts.join("/");
}

function addTableOfContents() {
  const markdownBody = content.querySelector(".markdown-body");
  const headings = markdownBody ? [...markdownBody.querySelectorAll("h2")] : [];
  if (headings.length < 2) {
    return;
  }

  const tableOfContents = document.createElement("nav");
  tableOfContents.className = "page-toc";
  tableOfContents.setAttribute("aria-label", "このページの目次");
  tableOfContents.innerHTML = `
    <p class="page-toc-title">On this page</p>
    <ol>
      ${headings
        .map(
          (heading) =>
            `<li><a href="#${escapeAttribute(heading.id)}" data-heading-id="${escapeAttribute(heading.id)}">${escapeHtml(heading.textContent)}</a></li>`
        )
        .join("")}
    </ol>`;

  tableOfContents.querySelectorAll("[data-heading-id]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const heading = document.getElementById(link.dataset.headingId);
      if (!heading) {
        return;
      }

      setActiveTocLink(tableOfContents, heading.id);
      heading.setAttribute("tabindex", "-1");
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
      heading.focus({ preventScroll: true });
    });
  });

  markdownBody.before(tableOfContents);
  setActiveTocLink(tableOfContents, headings[0].id);

  const updateActiveHeading = () => {
    const atPageEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    let activeHeading = atPageEnd ? headings.at(-1) : headings[0];

    if (!atPageEnd) {
      headings.forEach((heading) => {
        if (heading.getBoundingClientRect().top <= 120) {
          activeHeading = heading;
        }
      });
    }

    setActiveTocLink(tableOfContents, activeHeading.id);
  };

  let scrollFrame = null;
  tocScrollHandler = () => {
    if (scrollFrame) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = null;
      updateActiveHeading();
    });
  };
  window.addEventListener("scroll", tocScrollHandler, { passive: true });
  updateActiveHeading();
}

function setActiveTocLink(tableOfContents, headingId) {
  tableOfContents.querySelectorAll("[data-heading-id]").forEach((link) => {
    const active = link.dataset.headingId === headingId;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function addFigureEnhancements() {
  document.querySelectorAll(".markdown-body figure").forEach((figure, index) => {
    const image = figure.querySelector("img");
    if (!image) {
      return;
    }

    let caption = figure.querySelector("figcaption");
    if (!caption) {
      caption = document.createElement("figcaption");
      caption.textContent = image.alt;
      figure.appendChild(caption);
    }

    const captionText = caption.textContent.trim();
    const label = document.createElement("span");
    const description = document.createElement("span");
    label.className = "figure-label";
    label.textContent = `Figure ${String(index + 1).padStart(2, "0")}`;
    description.className = "figure-caption-text";
    description.textContent = captionText;
    caption.replaceChildren(label, description);

    image.classList.add("zoomable-figure");
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${captionText || image.alt}を拡大表示`);

    const open = () => openFigureLightbox(image, captionText);
    image.addEventListener("click", open);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function openFigureLightbox(sourceImage, caption) {
  const lightbox = getFigureLightbox();
  const image = lightbox.querySelector("img");
  const description = lightbox.querySelector(".figure-lightbox-caption");

  lightboxReturnFocus = sourceImage;
  image.src = sourceImage.currentSrc || sourceImage.src;
  image.alt = sourceImage.alt;
  description.textContent = caption;
  lightbox.hidden = false;
  document.body.classList.add("lightbox-open");
  document.querySelector(".topbar").inert = true;
  document.querySelector(".layout").inert = true;
  lightbox.querySelector(".figure-lightbox-close").focus();
}

function closeFigureLightbox() {
  const lightbox = document.querySelector("#figure-lightbox");
  if (!lightbox || lightbox.hidden) {
    return;
  }

  lightbox.hidden = true;
  document.body.classList.remove("lightbox-open");
  document.querySelector(".topbar").inert = false;
  document.querySelector(".layout").inert = false;
  lightboxReturnFocus?.focus();
  lightboxReturnFocus = null;
}

function getFigureLightbox() {
  let lightbox = document.querySelector("#figure-lightbox");
  if (lightbox) {
    return lightbox;
  }

  lightbox = document.createElement("div");
  lightbox.id = "figure-lightbox";
  lightbox.className = "figure-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "図版の拡大表示");
  lightbox.innerHTML = `
    <button class="figure-lightbox-close" type="button">閉じる</button>
    <figure>
      <img alt="">
      <figcaption class="figure-lightbox-caption"></figcaption>
    </figure>`;

  lightbox.querySelector(".figure-lightbox-close").addEventListener("click", closeFigureLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeFigureLightbox();
    }
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFigureLightbox();
    }
  });
  document.body.appendChild(lightbox);
  return lightbox;
}

function addCopyButtons() {
  const copyIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path fill="currentColor" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>';
  const checkIcon =
    '<svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>';

  document.querySelectorAll("#doc-content pre").forEach((pre) => {
    const code = pre.querySelector("code");
    const codeBlock = pre.closest(".code-block");
    const buttonHost = codeBlock?.querySelector(".code-block-tools") || pre;
    if (!code || buttonHost.querySelector(".copy-btn")) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-btn";
    button.innerHTML = copyIcon;
    button.title = "コピー";
    button.setAttribute("aria-label", "コードをコピー");

    let resetId;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
      } catch (error) {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }

      button.innerHTML = checkIcon;
      button.title = "コピーしました";
      button.classList.add("copied");
      window.clearTimeout(resetId);
      resetId = window.setTimeout(() => {
        button.innerHTML = copyIcon;
        button.title = "コピー";
        button.classList.remove("copied");
      }, 1500);
    });

    buttonHost.appendChild(button);
  });
}

function slugify(value) {
  return escapeAttribute(
    value
      .toLowerCase()
      .trim()
      .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
  );
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}

applySiteConfig();
buildNavigation();
previousButton.addEventListener("click", () => setHashForIndex(currentIndex - 1));
nextButton.addEventListener("click", () => setHashForIndex(currentIndex + 1));
window.addEventListener("hashchange", () => showPage(getIndexFromHash()));

if (!window.location.hash) {
  setHashForIndex(0);
} else {
  showPage(getIndexFromHash());
}
