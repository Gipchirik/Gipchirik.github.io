let count = 0;
const counter = document.getElementById("counter");
const button = document.getElementById("click-button");

button.addEventListener("click", () => {
  count += 1;
  counter.textContent = String(count);
});

const statusText = document.getElementById("firebase-status");
const projectText = document.getElementById("firebase-project");

async function checkFirebase() {
  const config = window.firebaseConfig;
  const isEmpty = !config || String(config.apiKey).startsWith("ЗАМЕНИ");

  if (isEmpty) {
    statusText.textContent = "Firebase ещё не подключён: в firebase-config.js стоят заглушки.";
    return;
  }

  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
    const app = initializeApp(config);
    statusText.textContent = "Firebase подключён и работает.";
    projectText.textContent = "ID проекта: " + app.options.projectId;
  } catch (error) {
    statusText.textContent = "Ошибка подключения Firebase: " + error.message;
  }
}

checkFirebase();
