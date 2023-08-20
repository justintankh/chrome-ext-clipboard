import React from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import DemoPage from "@root/src/components/TableData/page";

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);

  return (
    <div className="App">
      <DemoPage />
    </div>
  );
};

export default withSuspense(Popup);
