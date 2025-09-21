const input = document.querySelector("#movie_text");
const searchBtn = document.querySelector("#searchBtn");
const result = document.querySelector("#movie");

const key = "c8f08da7";
/* https://www.omdbapi.com/?apikey=c8f08da7&t=Interstellar*/
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const movieName = input.value.trim();
  if (!movieName) return;

  const URL = `https://www.omdbapi.com/?apikey=${key}&t=${encodeURIComponent(
    movieName
  )}`;

  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = ""; // clear previous result
      if (data.Response === "True") {
        const r = document.createElement("div");
        const img = data.Poster; // Use data.Poster, not data.Image
        const title = data.Title;
        const description = data.Plot;
        r.classList.add("resultS") ;
        r.innerHTML = `
          <span><img src="${img}" alt="${title}" width=200px/></span>
          <h3>${title}</h3>
          <p>${description}</p>
        `;
        result.appendChild(r);
      } else {
        result.textContent = "Movie not found";
      }
    })
    .catch((error) => {
      console.error("Network error", error);
      result.textContent = "Network error";
    });
});
