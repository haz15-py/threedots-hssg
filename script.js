let startTime;

function lostChild() {
  activateScenario("ضياع طفل – المطاف", 55, 48, 92);
}

function emergencyMasaa() {
  activateScenario("حالة طوارئ – المسعى", 75, 35, 96);
}

function activateScenario(name, xPercent, yPercent, confidence) {

  const marker = document.getElementById("marker");
  const map = document.getElementById("mapImage");

  startTime = Date.now();

  marker.style.left = xPercent + "%";
  marker.style.top = yPercent + "%";
  marker.classList.remove("hidden");

  document.getElementById("analysis").innerText = "جاري التحليل...";
  document.getElementById("confidence").innerText = confidence;

  document.getElementById("alertSound").play();

  setTimeout(() => {
    const responseSeconds = Math.floor((Date.now() - startTime) / 1000);

    document.getElementById("analysis").innerText = "تم التأكيد والإبلاغ";
    document.getElementById("responseTime").innerText = responseSeconds;

    document.getElementById("calculation").innerText =
      "الفرق بين زمن الكشف وزمن إصدار التنبيه";

    saveToDatabase(name, responseSeconds, confidence);

  }, 4000);
}

function resetSystem() {
  document.getElementById("marker").classList.add("hidden");
  document.getElementById("analysis").innerText = "--";
  document.getElementById("confidence").innerText = "--";
  document.getElementById("responseTime").innerText = "--";
  document.getElementById("calculation").innerText = "--";
}

function saveToDatabase(name, time, confidence) {

  const record = {
    scenario: name,
    responseTime: time,
    confidence: confidence,
    date: new Date().toLocaleString()
  };

  let db = JSON.parse(localStorage.getItem("hssgLogs")) || [];
  db.push(record);
  localStorage.setItem("hssgLogs", JSON.stringify(db));

  renderLogs();
}

function renderLogs() {
  const logContainer = document.getElementById("log");
  logContainer.innerHTML = "";

  let db = JSON.parse(localStorage.getItem("hssgLogs")) || [];

  db.forEach(item => {
    const div = document.createElement("div");
    div.innerText =
      item.date + " | " +
      item.scenario + " | " +
      item.responseTime + "s | AI " +
      item.confidence + "%";
    logContainer.appendChild(div);
  });
}

window.onload = renderLogs;
