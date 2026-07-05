function normalize(str) {
  return String(str).trim().toLowerCase();
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  const sectionId = params.get("section") || "s1";

  const [practiceRes, sectionsRes] = await Promise.all([
    fetch("data/practice.json"),
    fetch("data/sections.json"),
  ]);
  const practiceData = await practiceRes.json();
  const sections = await sectionsRes.json();

  const entry = practiceData.find((p) => p.section === sectionId);
  const section = sections.find((s) => s.id === sectionId);
  if (!entry || !section) {
    document.getElementById("question-list").innerHTML = "<p>Practice not found.</p>";
    return;
  }

  document.getElementById("practice-title").textContent = `Practice: ${section.title}`;

  const listEl = document.getElementById("question-list");
  const attempted = new Set();

  function updateProgress() {
    const pct = (attempted.size / entry.questions.length) * 100;
    document.getElementById("practice-fill").style.width = `${pct}%`;
    const finishBtn = document.getElementById("finish-btn");
    if (attempted.size === entry.questions.length) {
      finishBtn.disabled = false;
      finishBtn.classList.remove("disabled");
    }
  }

  entry.questions.forEach((q) => {
    const card = document.createElement("div");
    card.className = "question-card";

    if (q.type === "mc") {
      card.innerHTML = `
        <div class="q-text">${q.question}</div>
        <div class="options">
          ${q.options
            .map((opt) => `<button class="option-btn" data-value="${opt}">${opt}</button>`)
            .join("")}
        </div>
        <div class="feedback"></div>
      `;
      const feedback = card.querySelector(".feedback");
      card.querySelectorAll(".option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const chosen = btn.dataset.value;
          card.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));
          if (normalize(chosen) === normalize(q.answer)) {
            btn.classList.add("correct");
            feedback.textContent = "✅ Correct!";
            feedback.className = "feedback correct";
          } else {
            btn.classList.add("incorrect");
            feedback.textContent = `❌ Not quite. The correct answer is ${q.answer}.`;
            feedback.className = "feedback incorrect";
            card.querySelectorAll(".option-btn").forEach((b) => {
              if (normalize(b.dataset.value) === normalize(q.answer)) b.classList.add("correct");
            });
          }
          attempted.add(q.id);
          updateProgress();
        });
      });
    } else {
      card.innerHTML = `
        <div class="q-text">${q.question}</div>
        <div class="text-input-row">
          <input type="text" placeholder="Your answer" />
          <button class="btn btn-primary check-btn">Check</button>
        </div>
        <div class="feedback"></div>
      `;
      const input = card.querySelector("input");
      const feedback = card.querySelector(".feedback");
      card.querySelector(".check-btn").addEventListener("click", () => {
        const val = input.value;
        if (normalize(val) === normalize(q.answer)) {
          feedback.textContent = "✅ Correct!";
          feedback.className = "feedback correct";
        } else {
          feedback.textContent = `❌ Not quite. The correct answer is ${q.answer}.`;
          feedback.className = "feedback incorrect";
        }
        attempted.add(q.id);
        updateProgress();
      });
    }

    listEl.appendChild(card);
  });

  document.getElementById("finish-btn").addEventListener("click", () => {
    markPracticeDone(sectionId);
    window.location.href = "index.html";
  });
}

init();
