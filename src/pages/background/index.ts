import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

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
    chrome.system.display.getInfo({ singleUnified: true }, (info) => {
      const wDimension = info[0].workArea;
      const { top, left, height, width } = wDimension;
      console.log(top);
      const w = 400;
      const h = 650;
      const l = 0;
      const t = 0;
      const newWindow = () => {
        console.log("in new window function");
      };
      chrome.windows.create(
        {
          url: "src/pages/popup/index.html",
          type: "popup",
          width: w,
          height: h,
          left: Math.round(l),
          top: Math.round(t),
        },
        newWindow
      );
    });
  }
});
