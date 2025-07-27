const input = document.getElementById("search-input");
const btnSearch = document.getElementById("btn-search");
const divisorLine = document.getElementById("divisor-line");
const loader = document.getElementById("loader");
const resultsDiv = document.getElementById("result");

const audioPlayer = new Audio();
let currentPlayingBtn = null;

async function searchMusic() {
  const query = input.value.trim();
  if (!query) return;

  loader.classList.toggle("hidden");
  resultsDiv.innerHTML = "";

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    query
  )}&media=music&limit=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    let html = "";

    if (data.results.length > 0) {
      data.results.forEach((item) => {
        html += `
      <div class="artist-dates">
        <img src="${item.artworkUrl100}" alt="${item.trackName}" class="photo">
        <div class="artist-names">
          <p class="music">${item.trackName}</p>
          <p class="album">${item.collectionName}</p>
        </div>
        <button class="btn-play" data-preview="${item.previewUrl}">
          <i class="fa-solid fa-play play-icon"></i>
        </button>
      </div>
      `;
      });
    } else {
      html += `
      <p class="no-result">Nenhum resultado encontrado</p>
      `
    }

    resultsDiv.innerHTML = html;
    resultsDiv.style.display = "flex";
    divisorLine.style.display = "flex";
  } catch (err) {
    console.log("Erro ao buscar músicas:", err);
    resultsDiv.innerHTML = "<p>Erro ao buscar resultados. Tente novamente.</p>";
  } finally {
    loader.classList.toggle("hidden");
  }
}

btnSearch.addEventListener("click", searchMusic);

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchMusic();
  }
});

resultsDiv.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-play");
  if (!btn) return;

  const previewUrl = btn.getAttribute("data-preview");

  if (btn === currentPlayingBtn) {
    audioPlayer.pause();
    currentPlayingBtn = null;
    btn.querySelector("i").classList.replace("fa-pause", "fa-play");
    return;
  }

  if (currentPlayingBtn) {
    currentPlayingBtn
      .querySelector("i")
      .classList.replace("fa-pause", "fa-play");
  }

  audioPlayer.src = previewUrl;
  audioPlayer.play();

  btn.querySelector("i").classList.replace("fa-play", "fa-pause");
  currentPlayingBtn = btn;
});

audioPlayer.addEventListener("ended", () => {
  if (currentPlayingBtn) {
    currentPlayingBtn
      .querySelector("i")
      .classList.replace("fa-pause", "fa-play");
    currentPlayingBtn = null;
  }
});
