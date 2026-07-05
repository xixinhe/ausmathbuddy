const STORAGE_KEY = "ausMathBuddy.progress";
const QUIZ_KEY = "ausMathBuddy.lastQuizResult";
const SECTION_IDS = ["s1", "s2", "s3", "s4"];

function getProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function markLessonRead(sectionId) {
  const progress = getProgress();
  progress[sectionId] = progress[sectionId] || {};
  progress[sectionId].read = true;
  saveProgress(progress);
}

function markPracticeDone(sectionId) {
  const progress = getProgress();
  progress[sectionId] = progress[sectionId] || {};
  progress[sectionId].practiced = true;
  saveProgress(progress);
}

function isSectionDone(sectionId) {
  const progress = getProgress();
  return !!(progress[sectionId] && progress[sectionId].read && progress[sectionId].practiced);
}

function allSectionsDone() {
  return SECTION_IDS.every(isSectionDone);
}

function completedCount() {
  return SECTION_IDS.filter(isSectionDone).length;
}

function saveQuizResult(result) {
  localStorage.setItem(QUIZ_KEY, JSON.stringify(result));
}

function getQuizResult() {
  const raw = localStorage.getItem(QUIZ_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
