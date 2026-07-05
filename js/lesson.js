function renderDotGrid(rows, cols) {
  let html = `<div class="dot-grid" style="grid-template-columns: repeat(${cols}, 18px);">`;
  for (let i = 0; i < rows * cols; i++) {
    html += `<div class="dot"></div>`;
  }
  html += `</div>`;
  return html;
}

function renderFactsTable(factors, upTo) {
  let html = `<table class="facts-table"><thead><tr><th>×</th>`;
  for (let n = 1; n <= upTo; n++) html += `<th>${n}</th>`;
  html += `</tr></thead><tbody>`;
  factors.forEach((f) => {
    html += `<tr><th>${f}</th>`;
    for (let n = 1; n <= upTo; n++) html += `<td>${f * n}</td>`;
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const sectionId = params.get("section") || "s1";

  const res = await fetch("data/sections.json");
  const sections = await res.json();
  sections.sort((a, b) => a.order - b.order);

  const idx = sections.findIndex((s) => s.id === sectionId);
  const section = sections[idx];
  if (!section) {
    document.getElementById("lesson-content").innerHTML = "<p>Section not found.</p>";
    return;
  }

  let keyPointsHtml = section.keyPoints
    .map((kp) => `<div class="key-point"><h3>${kp.heading}</h3><p>${kp.text}</p></div>`)
    .join("");

  let tableHtml = section.table ? renderFactsTable(section.table.factors, section.table.upTo) : "";

  let visualHtml = "";
  if (section.worked_example.visual) {
    visualHtml = renderDotGrid(section.worked_example.visual.rows, section.worked_example.visual.cols);
  }

  let stepsHtml = section.worked_example.steps.map((s) => `<li>${s}</li>`).join("");

  document.getElementById("lesson-content").innerHTML = `
    <div class="card">
      <span class="badge">${section.curriculum_code}</span>
      <h1>${section.order}. ${section.title}</h1>
      <p>${section.intro}</p>
      ${keyPointsHtml}
      ${tableHtml}
    </div>
    <div class="worked-example">
      <h2>Worked Example</h2>
      <p>${section.worked_example.problem}</p>
      ${visualHtml}
      <ol>${stepsHtml}</ol>
      <p><strong>Answer: ${section.worked_example.answer}</strong></p>
    </div>
  `;

  markLessonRead(section.id);

  const prevLink = document.getElementById("prev-link");
  const nextLink = document.getElementById("next-link");
  const practiceLink = document.getElementById("practice-link");

  if (idx > 0) {
    prevLink.href = `lesson.html?section=${sections[idx - 1].id}`;
    prevLink.classList.remove("disabled");
  }
  if (idx < sections.length - 1) {
    nextLink.href = `lesson.html?section=${sections[idx + 1].id}`;
    nextLink.classList.remove("disabled");
  }
  practiceLink.href = `practice.html?section=${section.id}`;
}

init();
