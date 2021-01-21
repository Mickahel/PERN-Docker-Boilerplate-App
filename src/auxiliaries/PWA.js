export function PWAInstalledChecker() {
  return window.matchMedia("(display-mode: standalone)").matches;
}

export async function installApp(installer) {
  // Show the prompt
  try {
    if (!installer) installer = window.deferredPrompt; // Legacy

    if (!installer) {
      alert("I can't Install the App");
      return true;
    }
    installer.prompt();
    // Wait for the user to respond to the prompt
    let choiceResult = await installer.userChoice;
    if (choiceResult.outcome === "accepted") {
      // hide our user interface that shows our A2HS button
      return false;
    } else {
      //console.log('PWA setup rejected');
      //deferredPrompt = null;
      return true;
    }
  } catch (e) {
    console.error(e);
    return true;
  }
}
