async function init() {
  const res = await fetch("data/sections.json");
  const sections = await res.json();
  const list = document.getElementById("section-list");

  sections.sort((a, b) => a.order - b.order);

  sections.forEach((section) => {
    const progress = getProgress()[section.id] || {};
    const done = progress.read && progress.practiced;
    const statusText = done
      ? "Completed"
      : progress.read
      ? "Lesson read — practice next"
      : "Not started";

    const card = document.createElement("div");
    card.className = "section-card";
    card.innerHTML = `
      <div class="info">
        <span class="badge">${section.curriculum_code}</span>
        <div><strong>${section.order}. ${section.title}</strong></div>
        <div class="status ${done ? "done" : ""}">${done ? "✅ " : ""}${statusText}</div>
      </div>
      <a class="btn btn-primary" href="lesson.html?section=${section.id}">${
        progress.read ? "Review" : "Start"
      }</a>
    `;
    list.appendChild(card);
  });

  const done = completedCount();
  document.getElementById("overall-fill").style.width = `${(done / sections.length) * 100}%`;
  document.getElementById("overall-label").textContent = `${done} of ${sections.length} sections complete`;

  const quizLink = document.getElementById("quiz-link");
  if (allSectionsDone()) {
    quizLink.classList.remove("disabled");
  }
}

init();
