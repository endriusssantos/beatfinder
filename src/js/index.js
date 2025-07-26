const input = document.getElementById("search-input");
const btnSearch = document.getElementById("btn-search");
const divisorLine = document.getElementById("divisor-line");
const resultsDiv = document.getElementById("result");

async function searchMusic() {
  const query = input.value.trim();
  if (!query) return;

  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    query
  )}&media=music&limit=10`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    let html = "";

    data.results.forEach((item) => {
      html += `
      <div class="artist-dates">
        <img src="${item.artworkUrl100}" alt="${item.trackName}" class="photo">
        <div class="artist-names">
          <p class="music">${item.trackName}</p>
          <p class="album">${item.collectionName}</p>
        </div>
        <button class="btn-play">
          <i class="fa-solid fa-play play-icon"></i>
        </button>
      </div>
      `;
    });

    resultsDiv.innerHTML = html;
    resultsDiv.style.display = "flex";
    divisorLine.style.display = "flex";
  } catch (err) {
    console.log("Erro ao buscar músicas:", err);
    resultsDiv.innerHTML = "<p>Erro ao buscar resultados. Tente novamente.</p>";
  }
}

btnSearch.addEventListener("click", searchMusic);
