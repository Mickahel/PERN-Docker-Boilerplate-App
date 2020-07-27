if (typeof importScripts === "function") {
  // eslint-disable-next-line no-undef
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js"
  );

  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");
    // This will trigger the importScripts() for workbox.strategies and its dependencies:
    workbox.loadModule("workbox-strategies");
    workbox.core.skipWaiting();
    //workbox.core.clientsClaim();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
   


    workbox.routing.registerRoute(
      /\.(?:js|css)$/, // ? JS and CSS
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: "assets",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 10 * 60, // 10 minutes
            maxEntries: 1000
          }),
        ],
      })
    );

    workbox.routing.registerRoute(
      /\.(?:png|jpg|svg|ico|gif)$/,// ? Images
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            maxAgeSeconds: 10 * 60, // 10 minutes
            maxEntries: 1000
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
      const promiseChain = fetch(event.request.clone()).catch((err) => {
        return queue.pushRequest({ request: event.request });
      });

      event.waitUntil(promiseChain);
    });

  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
