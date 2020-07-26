const workboxBuild = require("workbox-build");

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  workboxBuild
    .injectManifest({
      swSrc: "src/sw-template.js", // this is your sw template file
      swDest: "build/service-worker.js", // this will be created in the build step
      globDirectory: "build",
      globPatterns: ['**/*.{html,js,css,svg,ico,png}'],
      globIgnores:["service-worker.js"]
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    })
    .catch((e)=>{console.error(e)});
};

buildSW();