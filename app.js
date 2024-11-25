document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const results = document.getElementById("results");
  results.innerHTML = "";

  // Simulating a simple search result
  const searchResults = [
    {
      title: "Sample Video 1",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      title: "Sample Video 2",
      videoUrl: "https://www.youtube.com/embed/tgbNymZ7vqY",
    },
  ];

  searchResults.forEach((result) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = `video.html?video=${encodeURIComponent(result.videoUrl)}`;
    link.innerText = result.title;
    li.appendChild(link);
    results.appendChild(li);
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log(
        "ServiceWorker registration successful with scope: ",
        registration.scope
      );
    })
    .catch(function (error) {
      console.log("ServiceWorker registration failed: ", error);
    });
}
