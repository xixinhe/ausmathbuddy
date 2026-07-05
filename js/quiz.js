function normalizeQ(str) {
  return String(str).trim().toLowerCase();
}

async function init() {
  if (!allSectionsDone()) {
    document.getElementById("locked-message").style.display = "block";
    document.getElementById("quiz-form").style.display = "none";
    return;
  }

  const res = await fetch("data/quiz.json");
  const questions = await res.json();
  const listEl = document.getElementById("question-list");

  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question-card";

    if (q.type === "mc") {
      card.innerHTML = `
        <div class="q-text">${i + 1}. ${q.question}</div>
        <div class="options">
          ${q.options
            .map(
              (opt) => `
            <label class="option-btn" style="display:flex;align-items:center;gap:8px;">
              <input type="radio" name="${q.id}" value="${opt}" required style="width:auto;" />
              ${opt}
            </label>`
            )
            .join("")}
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="q-text">${i + 1}. ${q.question}</div>
        <div class="text-input-row">
          <input type="text" name="${q.id}" placeholder="Your answer" required />
        </div>
      `;
    }
    listEl.appendChild(card);
  });

  document.getElementById("quiz-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let score = 0;
    const wrong = [];

    questions.forEach((q) => {
      const given = formData.get(q.id) || "";
      if (normalizeQ(given) === normalizeQ(q.answer)) {
        score++;
      } else {
        wrong.push({
          question: q.question,
          given,
          answer: q.answer,
          source_section: q.source_section,
        });
      }
    });

    saveQuizResult({
      score,
      total: questions.length,
      wrong,
      takenAt: new Date().toISOString(),
    });

    window.location.href = "result.html";
  });
}

init();
