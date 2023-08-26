export const openPopup = () => {
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
};
