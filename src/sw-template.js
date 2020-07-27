if (typeof importScripts === "function") {
  /*  ? https://github.com/mikegeyser/building-pwas-with-react*/
  // eslint-disable-next-line no-undef
  /*importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );*/
  importScripts("workbox-v5.1.3/workbox-sw.js");
  workbox.setConfig({ modulePathPrefix: "workbox-v5.1.3/" });
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    // This will trigger the importScripts() for workbox.strategies and its dependencies:
    workbox.loadModule("workbox-strategies");
    //workbox.core.skipWaiting();
    //workbox.core.clientsClaim();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    const channel = new BroadcastChannel("service-worker-channel");
    channel.postMessage({ promptToReload: true });

    channel.onmessage = (message) => {
      if (message.data.skipWaiting) {
        console.log("Skipping waiting and installing service worker.");
        self.skipWaiting();
      }
    };

    workbox.routing.registerRoute(
      /\.(?:js|css)$/, // ? JS and CSS
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "assets",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 10 * 60, // 10 minutes
            maxEntries: 1000,
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      /\.(?:png|jpg|svg|ico|gif)$/, // ? Images
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 10 * 60, // 10 minutes
            maxEntries: 1000,
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      /https?:\/\/localhost/, // ? Routes
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "routes",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 10 * 60, // 10 minutes
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      /https?:\/\/pernBoilerplate\.com/, //? the backend APIs and data
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "data",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 10 * 60, // 10 minutes
          }),
        ],
      })
    );

    const queue = new workbox.backgroundSync.Queue("backgroundSyncQueue");
    self.addEventListener("fetch", (event) => {
      // Clone the request to ensure it's safe to read when
      // adding to the Queue.
      let promiseChain = fetch(event.request.clone()).catch((err) => {
        return queue.pushRequest({ request: event.request });
      });

      //TODO TRY
      /*
      1. Submit request
      2. Invalidate cache (if successful)
      3. Queue the change (if failed)
      */

      /*let promiseChain = fetch(event.request.clone())
      .then(actualResponse => invalidateCache(event.request.clone(), actualResponse))
      .catch(_ => queueChange(event.request.clone()));
      event.respondWith(promiseChain);*/
      event.waitUntil(promiseChain);
    });
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}

function invalidateCache(request, actualResponse) {
  /*
      1. Read the request data.
      2. Open the cache.
      3. Delete anything that matches the url.
      4. Return the actual response.
   */

  return request.json()
      .then(requestData => {
          const url = `${request.url}/${requestData.category}`;
          
          return caches.open('routes')
              .then(cache => cache.delete(url));
      })
      .then(_ => actualResponse);
}



function queueChange(request) {
  /*
      1. Queue the change.
      2. Read the request data.
      3. Open the cache.
      4. Find the matching response.
      5. Read the cached response.
      6. Create a new response.
      7. Update the cached response.
      8. Return a fake response.
   */

  return queue.addRequest(request.clone())
      .then(_ => request.json())
      .then(requestData => {
          requestData['offline'] = true;
          const url = `${request.url}/${requestData.category}`;

          return caches.open('routes')
              .then(cache => {
                  return cache.match(url)
                      .then(cachedResponse => cachedResponse.json())
                      .then(data => {
                          const updatedRequest = [requestData, ...data];

                          const fakeResponse = new Response(
                              JSON.stringify(updatedRequest),
                              { status: 200 });

                          return cache.put(url, fakeResponse.clone())
                              .then(_ => fakeResponse.clone());
                      });
              });
      });
}
