const state = { query: "", topic: "All topics" };
const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const formatDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {month:"short", day:"numeric", year:"numeric"});
const topics = [...new Set(WRITEUPS.map((item) => item.topic))];

function renderStats() {
  $("#writeupCount").textContent = WRITEUPS.length;
  $("#topicCount").textContent = topics.length;
  $("#readingTime").textContent = `${WRITEUPS.reduce((sum, item) => sum + item.readTime, 0)}m`;
  $("#latestDate").textContent = formatDate([...WRITEUPS].sort((a,b) => b.date.localeCompare(a.date))[0].date);
  $("#year").textContent = new Date().getFullYear();
}

function renderTopicChrome() {
  $("#sidebarTopics").innerHTML = topics.map((topic) => `<a class="topic-link" href="#writeups" data-topic-link="${esc(topic)}"><span class="topic-dot"></span>${esc(topic)}</a>`).join("");
  $("#topicMap").innerHTML = topics.map((topic) => `<button class="topic-pill" data-topic-link="${esc(topic)}">${esc(topic)}</button>`).join("");
  $("#filterRow").innerHTML = ["All topics", ...topics].map((topic) => `<button class="filter-button ${topic === state.topic ? "active" : ""}" data-filter="${esc(topic)}">${esc(topic)}</button>`).join("");
  document.querySelectorAll("[data-topic-link]").forEach((el) => el.addEventListener("click", () => { state.topic = el.dataset.topicLink; renderTopicChrome(); renderCards(); }));
  document.querySelectorAll("[data-filter]").forEach((el) => el.addEventListener("click", () => { state.topic = el.dataset.filter; renderTopicChrome(); renderCards(); }));
}

function filteredWriteups() {
  return WRITEUPS.filter((item) => {
    const searchable = `${item.title} ${item.topic} ${item.excerpt} ${item.body}`.toLowerCase();
    return (state.topic === "All topics" || item.topic === state.topic) && (!state.query || searchable.includes(state.query));
  });
}

function renderCards() {
  const items = filteredWriteups();
  $("#writeupGrid").innerHTML = items.map((item, index) => `<article class="writeup-card" data-writeup="${esc(item.title)}" tabindex="0" aria-label="Read ${esc(item.title)}">
    <div class="card-top"><span class="tag ${esc(item.color || "purple")}">${esc(item.topic)}</span><span class="card-index">0${index + 1}</span></div>
    <h3>${esc(item.title)}</h3><p>${esc(item.excerpt)}</p>
    <div class="card-footer"><span>${formatDate(item.date)} · ${item.readTime} min read</span><span class="read-link">Read note ↗</span></div>
  </article>`).join("");
  $("#emptyState").classList.toggle("hidden", items.length > 0);
  document.querySelectorAll("[data-writeup]").forEach((card) => { card.addEventListener("click", () => openModal(card.dataset.writeup)); card.addEventListener("keydown", (event) => { if (event.key === "Enter") openModal(card.dataset.writeup); }); });
}

function openModal(title) {
  const item = WRITEUPS.find((entry) => entry.title === title); if (!item) return;
  $("#modalContent").innerHTML = `<div class="modal-body"><span class="tag ${esc(item.color || "purple")}">${esc(item.topic)}</span><h2>${esc(item.title)}</h2><div class="modal-meta">${formatDate(item.date)} · ${item.readTime} min read</div><div class="modal-copy">${item.body}</div></div>`;
  $("#writeupModal").showModal();
}

$("#searchInput").addEventListener("input", (event) => { state.query = event.target.value.trim().toLowerCase(); renderCards(); });
document.addEventListener("keydown", (event) => { if (event.key === "/" && document.activeElement.tagName !== "INPUT") { event.preventDefault(); $("#searchInput").focus(); } if (event.key === "Escape" && $("#writeupModal").open) $("#writeupModal").close(); });
$("#modalClose").addEventListener("click", () => $("#writeupModal").close());
$("#writeupModal").addEventListener("click", (event) => { if (event.target === $("#writeupModal")) $("#writeupModal").close(); });
$("#themeToggle").addEventListener("click", () => { document.body.classList.toggle("dark"); $("#themeToggle").textContent = document.body.classList.contains("dark") ? "☾" : "☼"; });

renderStats(); renderTopicChrome(); renderCards();
