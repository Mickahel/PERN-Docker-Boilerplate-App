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
    workbox.core.clientsClaim();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    workbox.routing.registerRoute(
      /https:\/\/blockchain\.info\/ticker/, //https://blockchain.info/ticker
      new workbox.strategies.NetworkFirst({
        cacheName: "currencies",
        plugins: [
          new workbox.expiration.ExpirationPlugin({
            //maxEntries: 60,
            maxAgeSeconds: 10 * 60, // 10 minutes
          }),
        ],
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
