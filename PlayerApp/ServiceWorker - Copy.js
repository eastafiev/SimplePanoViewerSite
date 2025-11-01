const cacheName = "RTVR-SimplePanoViewerWeb-0.1.0.6";
const contentToCache = [
    "Build/WebGL Builds.loader.js",
    "Build/WebGL Builds.framework.js.unityweb",
    "Build/WebGL Builds.data.unityweb",
    "Build/WebGL Builds.wasm.unityweb",
    "TemplateData/style.css"

];

// 🧩 INSTALL: Cache new version
self.addEventListener("install", event => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
      // ✅ Force activate immediately
      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", event => {
  console.log("[Service Worker] Activate");
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      for (const key of keys) {
        if (key !== cacheName) {
          await caches.delete(key);
          console.log(`[Service Worker] Deleted old cache: ${key}`);
        }
      }
      // ✅ Take control of all open pages
      await self.clients.claim();
    })()
  );
});


// ⚡ FETCH: Network-first (fallback to cache)
self.addEventListener("fetch", event => {
  event.respondWith((async () => {
    try {
      const networkResponse = await fetch(event.request);
      const cache = await caches.open(cacheName);
      cache.put(event.request, networkResponse.clone());
      return networkResponse;
    } catch (error) {
      console.log(`[Service Worker] Fetch failed, using cache for: ${event.request.url}`);
      const cachedResponse = await caches.match(event.request);
      return cachedResponse || new Response("Offline", { status: 503 });
    }
  })());
});
