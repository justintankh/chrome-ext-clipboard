import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { openPopup } from "./openPopup";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);

  if (command === "open-popup") {
    openPopup();
  }
});
