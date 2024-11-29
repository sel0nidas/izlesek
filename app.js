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
          const li = document.createElement("li");
          const link = document.createElement("a");

          // The title and release date of the movie or TV series
          link.innerText = `${movie.title} (${new Date(
            movie.release_date
          ).getFullYear()})`;
          link.href = `video.html?tmdbID=${movie.id}`; // Use TMDb ID for redirection
          li.appendChild(link);
          results.appendChild(li);
        });
      } else {
        results.innerHTML = `<li>No results found.</li>`;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      results.innerHTML = `<li>Error fetching data. Please try again.</li>`;
    }
  });
