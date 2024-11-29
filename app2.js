document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const query = document.getElementById("searchInput").value.trim();
    if (!query) return;

    const results = document.getElementById("results");
    results.innerHTML = "";

    // Replace with your TMDb API key
    const apiKey = "69a6237ce6938d2fb74092f8ff3a8f16";

    // Fetch search results from TMDb API
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          query
        )}&api_key=${apiKey}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        data.results.forEach((movie) => {
          const colDiv = document.createElement("div");
          colDiv.classList.add("col-md-3", "movie-card");

          const cardDiv = document.createElement("div");
          cardDiv.classList.add("card", "h-100");

          // Movie Poster
          const img = document.createElement("img");
          img.src = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "https://via.placeholder.com/150?text=No+Image";
          img.classList.add("card-img-top", "movie-poster");

          // Card Body for title
          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body");

          const title = document.createElement("h5");
          title.classList.add("card-title");
          title.innerText = `${movie.title} (${new Date(
            movie.release_date
          ).getFullYear()})`;

          // Link to movie page
          const link = document.createElement("a");
          link.href = `video.html?tmdbID=${movie.id}`;
          link.appendChild(title);

          cardBody.appendChild(link);
          cardDiv.appendChild(img);
          cardDiv.appendChild(cardBody);
          colDiv.appendChild(cardDiv);
          results.appendChild(colDiv);
        });
      } else {
        results.innerHTML = `<div class="col-12"><p class="text-center">No results found.</p></div>`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      results.innerHTML = `<div class="col-12"><p class="text-center">Error fetching data. Please try again.</p></div>`;
    }
  });
