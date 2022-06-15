import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.scss";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { Dapp } from "Dapp";

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};

ReactDOM.render(
  <ThemeSwitcherProvider themeMap={themes} defaultTheme="dark">
    <Dapp />
  </ThemeSwitcherProvider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
