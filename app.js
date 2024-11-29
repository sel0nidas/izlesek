const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

// Replace with your TMDb API key
const apiKey = "69a6237ce6938d2fb74092f8ff3a8f16";

// Fetch suggestions from TMDb API (multi search: movies, TV shows, etc.)
async function fetchSuggestions(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
        query
      )}&api_key=${apiKey}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Handle input change and show suggestions
searchInput.addEventListener("input", async function () {
  const query = searchInput.value.trim();
  suggestions.innerHTML = ""; // Clear previous results

  if (query.length > 0) {
    const results = await fetchSuggestions(query);

    if (results.length > 0) {
      results.slice(0, 10).forEach((result) => {
        // Limit to 10 suggestions
        const li = document.createElement("li");
        li.classList.add("list-group-item", "result-item");

        const img = document.createElement("img");
        const title = document.createElement("span");

        // Check if it's a movie or a TV show
        if (result.media_type === "movie") {
          img.src = result.poster_path
            ? `https://image.tmdb.org/t/p/h50${result.poster_path}`
            : "https://via.placeholder.com/50x75?text=No+Image";
          img.classList.add("poster");
          title.innerText = `${result.title} (Movie, ${new Date(
            result.release_date
          ).getFullYear()})`;
        } else if (result.media_type === "tv") {
          img.src = result.poster_path
            ? `https://image.tmdb.org/t/p/h50${result.poster_path}`
            : "https://via.placeholder.com/50x75?text=No+Image";
          img.classList.add("poster");
          title.innerText = `${result.name} (TV Series, ${new Date(
            result.first_air_date
          ).getFullYear()})`;
        } else {
          // Skip if it's not movie or TV (for example, people search results)
          return;
        }

        li.appendChild(img);
        li.appendChild(title);
        suggestions.appendChild(li);

        // Handle click on suggestion
        li.addEventListener("click", function () {
          window.location.href = `video.html?tmdbID=${result.id}&mediaType=${result.media_type}`; // Redirect with media type (movie or tv)
        });
      });
    } else {
      const noResultsLi = document.createElement("li");
      noResultsLi.classList.add("list-group-item");
      noResultsLi.innerText = "No results found.";
      suggestions.appendChild(noResultsLi);
    }
  }
});

// Hide suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!searchInput.contains(e.target) && !suggestions.contains(e.target)) {
    suggestions.innerHTML = ""; // Clear suggestions
  }
});
