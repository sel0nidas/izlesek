self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("video-search-cache").then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/video.html",
        "/style.css",
        "/app.js",
        "/sw.js",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
