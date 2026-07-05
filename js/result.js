async function init() {
  const result = getQuizResult();
  const container = document.getElementById("result-content");

  if (!result) {
    container.innerHTML = `
      <div class="card" style="text-align:center;">
        <p>You haven't taken the quiz yet.</p>
        <a class="btn btn-primary" href="quiz.html">Go to Quiz</a>
      </div>
    `;
    return;
  }

  const res = await fetch("data/sections.json");
  const sections = await res.json();
  const sectionMap = {};
  sections.forEach((s) => (sectionMap[s.id] = s.title));

  const pct = Math.round((result.score / result.total) * 100);
  let message;
  if (pct >= 80) message = "🌟 Excellent work!";
  else if (pct >= 50) message = "👍 Good effort — a bit more practice will help.";
  else message = "💪 Keep practicing, you'll get there!";

  let wrongHtml = "";
  if (result.wrong.length > 0) {
    const bySection = {};
    result.wrong.forEach((w) => {
      bySection[w.source_section] = bySection[w.source_section] || [];
      bySection[w.source_section].push(w);
    });

    wrongHtml = `
      <div class="card">
        <h2>Questions to Review</h2>
        ${Object.entries(bySection)
          .map(
            ([sectionId, items]) => `
          <div class="key-point">
            <h3>${sectionMap[sectionId] || sectionId}</h3>
            ${items
              .map(
                (w) =>
                  `<p>${w.question}<br/>Your answer: <em>${w.given || "(blank)"}</em> — Correct answer: <strong>${w.answer}</strong></p>`
              )
              .join("")}
            <a class="btn btn-outline" href="lesson.html?section=${sectionId}">Review this section →</a>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="card summary-box">
      <div class="score">${result.score} / ${result.total}</div>
      <p>${message}</p>
    </div>
    ${wrongHtml}
  `;
}

init();
