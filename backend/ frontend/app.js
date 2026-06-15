const API = "/api/mods";

/* 🚀 NAV */
function goDashboard() {
  window.location.href = "dashboard.html";
}

function logout() {
  window.location.href = "/";
}

/* 📦 LOAD MODS */
async function loadMods() {
  const res = await fetch(API);
  const mods = await res.json();

  const div = document.getElementById("mods");
  if (!div) return;

  div.innerHTML = "";

  mods.forEach(m => {
    div.innerHTML += `
      <div class="mod">
        <h3>${m.name}</h3>
        <p>${m.description}</p>
        <a href="${m.download}" target="_blank">Download</a>
      </div>
    `;
  });
}

/* ➕ ADD MOD */
async function addMod() {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      description: desc.value,
      download: link.value
    })
  });

  loadMods();
}

loadMods();