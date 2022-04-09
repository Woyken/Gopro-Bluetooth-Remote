var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { r as react, v as React, x as tssReact, y as toast, z as createSelector, A as createCachedSelector, B as createSlice, C as createAsyncThunk, D as configureStore, E as useSelector, F as useDispatch, P as Provider, H as ToastContainer, I as createRoot } from "./vendor.e61fe395.js";
import { u as useTheme, c as createTheme, a as useMediaQuery, B as Box, T as Typography, b as Button, C as Container, A as AppBar, d as Toolbar, I as IconButton, e as default_1, f as default_1$1, g as default_1$2, h as default_1$3, i as default_1$4, j as default_1$5, k as default_1$6, l as default_1$7, m as ButtonGroup, n as default_1$8, P as Popper, G as Grow, o as Paper, p as ClickAwayListener, M as MenuList, q as MenuItem, r as default_1$9, s as default_1$a, t as default_1$b, v as default_1$c, w as default_1$d, F as FormControlLabel, x as Checkbox, y as default_1$e, D as Dialog, z as DialogTitle, E as DialogContent, H as FormControl, J as InputLabel, S as Select, K as default_1$f, L as default_1$g, N as default_1$h, O as default_1$i, Q as default_1$j, R as ThemeProvider, U as CssBaseline } from "./vendor_mui.da9df8f0.js";
import { i as instance, a as initReactI18next, u as useTranslation } from "./vendor_i18next.e8c7b5a3.js";
import { i as inflate_1 } from "./vendor_pako.8f836244.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
const useGetBaseManifest = () => {
  const [manifest, setManifest] = react.exports.useState();
  react.exports.useEffect(() => {
    fetch("manifest.webmanifest").then((r) => r.json()).then(setManifest);
  }, []);
  return manifest;
};
const manifestBaseUrl = window.location.href;
const useDynamicManifest = () => {
  const manifestTemplate = useGetBaseManifest();
  const theme = useTheme();
  const [manifestEl, setmanifestEl] = react.exports.useState();
  react.exports.useEffect(() => {
    const manifestElement = Array.from(document.getElementsByTagName("link")).filter((l) => l.rel === "manifest")[0];
    setmanifestEl(manifestElement);
    if (manifestElement)
      manifestElement.href = "";
  }, []);
  react.exports.useEffect(() => {
    if (!manifestTemplate)
      return;
    if (!manifestEl)
      return;
    manifestTemplate.theme_color = theme.palette.primary.main;
    manifestTemplate.background_color = theme.palette.background.default;
    manifestTemplate.start_url = manifestBaseUrl;
    manifestTemplate.scope = manifestBaseUrl;
    manifestTemplate.icons.forEach((icon) => {
      icon.src = `${manifestBaseUrl}${icon.src}`;
    });
    const stringManifest = JSON.stringify(manifestTemplate);
    const blob = new Blob([stringManifest], {
      type: "application/json"
    });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      if (manifestEl)
        manifestEl.href = reader.result;
    };
  }, [manifestEl, manifestTemplate, theme]);
};
const DynamicManifestProvider = (props) => {
  const {
    children
  } = props;
  useDynamicManifest();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
const lightThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#885200",
      contrastText: "#ffffff",
      light: "#ffddb8",
      dark: "#2c1700"
    },
    secondary: {
      main: "#715a41",
      contrastText: "#ffffff",
      light: "#fdddbd",
      dark: "#281805"
    },
    error: {
      main: "#ba1b1b",
      contrastText: "#ffffff",
      light: "#ffdad4",
      dark: "#410001"
    },
    divider: "#837568"
  }
};
const darkThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#ffb85f",
      contrastText: "#482900",
      light: "#673d00",
      dark: "#ffddb8"
    },
    secondary: {
      main: "#dfc1a2",
      contrastText: "#3f2d17",
      light: "#58432b",
      dark: "#fdddbd"
    },
    error: {
      main: "#ffb4a9",
      contrastText: "#680003",
      light: "#930006",
      dark: "#ffdad4"
    },
    divider: "#9d8e81"
  }
};
const lightTheme = createTheme(lightThemeOptions);
const darkTheme = createTheme(darkThemeOptions);
const useAppTheme = () => {
  const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = isDarkTheme ? darkTheme : lightTheme;
  return theme;
};
const {
  makeStyles,
  withStyles
} = tssReact.createMakeAndWithStyles({
  useTheme: useAppTheme
});
const useStyles$3 = makeStyles()({
  flexContent: {
    display: "flex",
    flexDirection: "row"
  }
});
const ReloadToastContent = (props) => {
  const {
    classes
  } = useStyles$3();
  const handleReloadButton = () => {
    props.updateServiceWorker(true);
  };
  return /* @__PURE__ */ React.createElement(Box, {
    className: classes.flexContent
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1"
  }, "App was updated, reload to see the changes"), /* @__PURE__ */ React.createElement(Button, {
    style: {
      display: "inline"
    },
    onClick: handleReloadButton
  }, "Reload"));
};
const scriptRel = "modulepreload";
const seen = {};
const base = "/Gopro-Bluetooth-Remote/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
function useImportPwaRegisterModule() {
  const [module, setModule] = react.exports.useState();
  react.exports.useEffect(() => {
    __vitePreload(() => import("./react.2da1357a.js"), true ? ["assets/react.2da1357a.js","assets/vendor.e61fe395.js","assets/vendor.d5a6499d.css"] : void 0).then(setModule);
  }, [setModule]);
  return module;
}
const updateCheckIntervalMS = 60 * 60 * 1e3;
const ServiceWorkerContainer = () => {
  const pwaRegisterModule = useImportPwaRegisterModule();
  if (!pwaRegisterModule)
    return null;
  return /* @__PURE__ */ React.createElement(ServiceWorkerContainerSafe, {
    pwaRegisterModule
  });
};
const ServiceWorkerContainerSafe = ({
  pwaRegisterModule
}) => {
  const {
    offlineReady: [offlineReady],
    needRefresh: [needRefresh],
    updateServiceWorker
  } = pwaRegisterModule.useRegisterSW({
    immediate: true,
    onRegistered(registration) {
      console.log("SW registered", registration);
      if (!registration)
        return;
      setInterval(() => {
        registration.update();
      }, updateCheckIntervalMS);
    },
    onRegisterError(error) {
      console.log("SW registration error", error);
    }
  });
  react.exports.useEffect(() => {
    if (offlineReady)
      toast("App was installed and now will work offline");
  }, [offlineReady]);
  react.exports.useEffect(() => {
    if (needRefresh)
      toast(/* @__PURE__ */ React.createElement(ReloadToastContent, {
        updateServiceWorker
      }), {
        autoClose: false
      });
  }, [needRefresh, updateServiceWorker]);
  return /* @__PURE__ */ React.createElement("div", null);
};
const settings = {
  "2": {
    name: "Resolution",
    options: {
      "1": {
        name: "4K"
      },
      "4": {
        name: "2.7K"
      },
      "6": {
        name: "2.7K"
      },
      "7": {
        name: "1440"
      },
      "9": {
        name: "1080"
      },
      "10": {
        name: "960"
      },
      "12": {
        name: "720"
      },
      "18": {
        name: "4K"
      }
    }
  },
  "3": {
    name: "FPS",
    options: {
      "0": {
        name: "240"
      },
      "1": {
        name: "120"
      },
      "5": {
        name: "60"
      },
      "8": {
        name: "30"
      },
      "10": {
        name: "24"
      }
    }
  },
  "4": {
    name: "FOV",
    options: {
      "0": {
        name: "Wide"
      },
      "3": {
        name: "Super view"
      },
      "4": {
        name: "Linear"
      }
    }
  },
  "5": {
    name: "Interval",
    options: {
      "0": {
        name: "0.5s"
      },
      "1": {
        name: "1s"
      },
      "2": {
        name: "2s"
      },
      "3": {
        name: "5s"
      },
      "4": {
        name: "10s"
      },
      "5": {
        name: "30s"
      },
      "6": {
        name: "60s"
      }
    }
  },
  "6": {
    name: "Interval",
    options: {
      "0": {
        name: "MAX"
      },
      "1": {
        name: "5m"
      },
      "2": {
        name: "20m"
      },
      "3": {
        name: "60m"
      },
      "4": {
        name: "120m"
      }
    }
  },
  "8": {
    name: "Low light",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "Auto"
      }
    }
  },
  "10": {
    name: "Protune",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "11": {
    name: "White Balance",
    options: {
      "0": {
        name: "Auto"
      },
      "2": {
        name: "5500K"
      },
      "3": {
        name: "6500K"
      },
      "4": {
        name: "Native"
      },
      "5": {
        name: "4000K"
      },
      "7": {
        name: "6000K"
      },
      "8": {
        name: "2300K"
      },
      "9": {
        name: "2800K"
      },
      "10": {
        name: "3200K"
      },
      "11": {
        name: "4500K"
      },
      "12": {
        name: "5000K"
      }
    }
  },
  "12": {
    name: "Color",
    options: {
      "0": {
        name: "GoPro"
      },
      "1": {
        name: "Flat"
      }
    }
  },
  "13": {
    name: "ISO max",
    options: {
      "0": {
        name: "6400"
      },
      "1": {
        name: "1600"
      },
      "2": {
        name: "400"
      },
      "3": {
        name: "3200"
      },
      "4": {
        name: "800"
      },
      "7": {
        name: "200"
      },
      "8": {
        name: "100"
      }
    }
  },
  "14": {
    name: "Sharpness",
    options: {
      "0": {
        name: "High"
      },
      "1": {
        name: "Medium"
      },
      "2": {
        name: "Low"
      }
    }
  },
  "15": {
    name: "EV comp",
    options: {
      "0": {
        name: "+2"
      },
      "1": {
        name: "+1.5"
      },
      "2": {
        name: "+1"
      },
      "3": {
        name: "+0.5"
      },
      "4": {
        name: "0"
      },
      "5": {
        name: "-0.5"
      },
      "6": {
        name: "-1"
      },
      "7": {
        name: "-1.5"
      },
      "8": {
        name: "-2"
      }
    }
  },
  "17": {
    name: "FOV",
    options: {
      "0": {
        name: "Wide"
      },
      "10": {
        name: "Linear"
      }
    }
  },
  "19": {
    name: "Shutter",
    options: {
      "0": {
        name: "Auto"
      },
      "1": {
        name: "2s"
      },
      "2": {
        name: "5s"
      },
      "3": {
        name: "10s"
      },
      "4": {
        name: "15s"
      },
      "5": {
        name: "20s"
      },
      "6": {
        name: "30s"
      }
    }
  },
  "21": {
    name: "Protune",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "22": {
    name: "White Balance",
    options: {
      "0": {
        name: "Auto"
      },
      "2": {
        name: "5500K"
      },
      "3": {
        name: "6500K"
      },
      "4": {
        name: "Native"
      },
      "5": {
        name: "4000K"
      },
      "7": {
        name: "6000K"
      },
      "8": {
        name: "2300K"
      },
      "9": {
        name: "2800K"
      },
      "10": {
        name: "3200K"
      },
      "11": {
        name: "4500K"
      },
      "12": {
        name: "5000K"
      }
    }
  },
  "23": {
    name: "Color",
    options: {
      "0": {
        name: "GoPro"
      },
      "1": {
        name: "Flat"
      }
    }
  },
  "24": {
    name: "ISO max",
    options: {
      "0": {
        name: "800"
      },
      "1": {
        name: "400"
      },
      "2": {
        name: "200"
      },
      "3": {
        name: "100"
      },
      "4": {
        name: "1600"
      },
      "5": {
        name: "3200"
      }
    }
  },
  "25": {
    name: "Sharpness",
    options: {
      "0": {
        name: "High"
      },
      "1": {
        name: "Medium"
      },
      "2": {
        name: "Low"
      }
    }
  },
  "26": {
    name: "EV comp",
    options: {
      "0": {
        name: "+2"
      },
      "1": {
        name: "+1.5"
      },
      "2": {
        name: "+1"
      },
      "3": {
        name: "+0.5"
      },
      "4": {
        name: "0"
      },
      "5": {
        name: "-0.5"
      },
      "6": {
        name: "-1"
      },
      "7": {
        name: "-1.5"
      },
      "8": {
        name: "-2"
      }
    }
  },
  "28": {
    name: "FOV",
    options: {
      "0": {
        name: "Wide"
      },
      "10": {
        name: "Linear"
      }
    }
  },
  "29": {
    name: "Burst Rate",
    options: {
      "0": {
        name: "3/1s"
      },
      "1": {
        name: "5/1s"
      },
      "2": {
        name: "10/1s"
      },
      "3": {
        name: "10/2s"
      },
      "4": {
        name: "10/3s"
      },
      "5": {
        name: "30/1s"
      },
      "6": {
        name: "30/2s"
      },
      "7": {
        name: "30/3s"
      },
      "8": {
        name: "30/6s"
      },
      "9": {
        name: "Auto"
      }
    }
  },
  "30": {
    name: "Interval",
    options: {
      "0": {
        name: "0.5s"
      },
      "1": {
        name: "1s"
      },
      "2": {
        name: "2s"
      },
      "5": {
        name: "5s"
      },
      "10": {
        name: "10s"
      },
      "30": {
        name: "30s"
      },
      "60": {
        name: "60s"
      }
    }
  },
  "31": {
    name: "Shutter",
    options: {
      "0": {
        name: "Auto"
      },
      "1": {
        name: "2s"
      },
      "2": {
        name: "5s"
      },
      "3": {
        name: "10s"
      },
      "4": {
        name: "15s"
      },
      "5": {
        name: "20s"
      },
      "6": {
        name: "30s"
      }
    }
  },
  "32": {
    name: "Interval",
    options: {
      "4": {
        name: "4s"
      },
      "5": {
        name: "5s"
      },
      "10": {
        name: "10s"
      },
      "20": {
        name: "20s"
      },
      "60": {
        name: "1m"
      },
      "120": {
        name: "2m"
      },
      "300": {
        name: "5m"
      },
      "1800": {
        name: "30m"
      },
      "3600": {
        name: "60m"
      },
      "3601": {
        name: "Auto"
      }
    }
  },
  "34": {
    name: "Protune",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "35": {
    name: "White Balance",
    options: {
      "0": {
        name: "Auto"
      },
      "2": {
        name: "5500K"
      },
      "3": {
        name: "6500K"
      },
      "4": {
        name: "Native"
      },
      "5": {
        name: "4000K"
      },
      "7": {
        name: "6000K"
      },
      "8": {
        name: "2300K"
      },
      "9": {
        name: "2800K"
      },
      "10": {
        name: "3200K"
      },
      "11": {
        name: "4500K"
      },
      "12": {
        name: "5000K"
      }
    }
  },
  "36": {
    name: "Color",
    options: {
      "0": {
        name: "GoPro"
      },
      "1": {
        name: "Flat"
      }
    }
  },
  "37": {
    name: "ISO max",
    options: {
      "0": {
        name: "800"
      },
      "1": {
        name: "400"
      },
      "2": {
        name: "200"
      },
      "3": {
        name: "100"
      },
      "4": {
        name: "1600"
      },
      "5": {
        name: "3200"
      }
    }
  },
  "38": {
    name: "Sharpness",
    options: {
      "0": {
        name: "High"
      },
      "1": {
        name: "Medium"
      },
      "2": {
        name: "Low"
      }
    }
  },
  "39": {
    name: "EV comp",
    options: {
      "0": {
        name: "+2"
      },
      "1": {
        name: "+1.5"
      },
      "2": {
        name: "+1"
      },
      "3": {
        name: "+0.5"
      },
      "4": {
        name: "0"
      },
      "5": {
        name: "-0.5"
      },
      "6": {
        name: "-1"
      },
      "7": {
        name: "-1.5"
      },
      "8": {
        name: "-2"
      }
    }
  },
  "51": {
    name: "Touch Display Screen Saver",
    options: {
      "0": {
        name: "Never"
      },
      "1": {
        name: "1min"
      },
      "2": {
        name: "2min"
      },
      "3": {
        name: "3min"
      }
    }
  },
  "54": {
    name: "Quick Capture",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "73": {
    name: "Shutter",
    options: {
      "0": {
        name: "Auto"
      },
      "8": {
        name: "1/60"
      },
      "13": {
        name: "1/120"
      },
      "18": {
        name: "1/240"
      },
      "22": {
        name: "1/480"
      },
      "23": {
        name: "1/960"
      }
    }
  },
  "75": {
    name: "ISO min",
    options: {
      "0": {
        name: "800"
      },
      "1": {
        name: "400"
      },
      "2": {
        name: "200"
      },
      "3": {
        name: "100"
      },
      "4": {
        name: "1600"
      },
      "5": {
        name: "3200"
      }
    }
  },
  "76": {
    name: "ISO min",
    options: {
      "0": {
        name: "800"
      },
      "1": {
        name: "400"
      },
      "2": {
        name: "200"
      },
      "3": {
        name: "100"
      },
      "4": {
        name: "1600"
      },
      "5": {
        name: "3200"
      }
    }
  },
  "78": {
    name: "Stabilization",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "Auto"
      }
    }
  },
  "80": {
    name: "Microphone",
    options: {
      "0": {
        name: "Stereo"
      },
      "1": {
        name: "Wind"
      },
      "2": {
        name: "Auto"
      }
    }
  },
  "81": {
    name: "Raw audio",
    options: {
      "0": {
        name: "Low"
      },
      "1": {
        name: "Medium"
      },
      "2": {
        name: "High"
      },
      "3": {
        name: "Off"
      }
    }
  },
  "83": {
    name: "Regional GPS",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "84": {
    name: "Regional Language",
    options: {
      "0": {
        name: "English"
      },
      "6": {
        name: "French"
      }
    }
  },
  "85": {
    name: "Voice Control Language",
    options: {
      "0": {
        name: "English (US)"
      },
      "1": {
        name: "English (UK)"
      },
      "13": {
        name: "English (India)"
      }
    }
  },
  "86": {
    name: "Voice Control",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "87": {
    name: "Beeps",
    options: {
      "0": {
        name: "Mute"
      },
      "40": {
        name: "Low"
      },
      "70": {
        name: "Medium"
      },
      "100": {
        name: "High"
      }
    }
  },
  "88": {
    name: "Touch Display Brightness",
    options: {
      "10": {
        name: "10%"
      },
      "80": {
        name: "80%"
      },
      "100": {
        name: "100%"
      }
    }
  },
  "89": {
    name: "Default Mode",
    options: {
      "12": {
        name: "Video"
      },
      "13": {
        name: "Timelapse Video"
      },
      "15": {
        name: "Looping"
      },
      "17": {
        name: "Photo"
      },
      "18": {
        name: "Night"
      },
      "19": {
        name: "Burst"
      },
      "20": {
        name: "Timelapse Photo"
      },
      "21": {
        name: "Nightlapse Photo"
      },
      "24": {
        name: "Timewarp Video"
      }
    }
  },
  "91": {
    name: "LEDs",
    options: {
      "0": {
        name: "All Off"
      },
      "1": {
        name: "Front Off Only"
      },
      "2": {
        name: "All On"
      }
    }
  },
  "92": {
    name: "Current Mode",
    options: {
      "4": {
        name: "Gallery view"
      },
      "12": {
        name: "Video"
      },
      "13": {
        name: "Timelapse Video"
      },
      "15": {
        name: "Looping"
      },
      "17": {
        name: "Photo"
      },
      "18": {
        name: "Night"
      },
      "19": {
        name: "Burst"
      },
      "20": {
        name: "Timelapse Photo"
      },
      "21": {
        name: "Nightlapse Photo"
      },
      "24": {
        name: "Timewarp Video"
      }
    }
  },
  "97": {
    name: "Shutter",
    options: {
      "0": {
        name: "Auto"
      },
      "1": {
        name: "1/125"
      },
      "2": {
        name: "1/250"
      },
      "3": {
        name: "1/500"
      },
      "4": {
        name: "1/1000"
      },
      "5": {
        name: "1/2000"
      }
    }
  },
  "98": {
    name: "RAW",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "99": {
    name: "RAW",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "102": {
    name: "ISO min",
    options: {
      "0": {
        name: "6400"
      },
      "1": {
        name: "1600"
      },
      "2": {
        name: "400"
      },
      "3": {
        name: "3200"
      },
      "4": {
        name: "800"
      },
      "7": {
        name: "200"
      },
      "8": {
        name: "100"
      }
    }
  },
  "104": {
    name: "Wake On Voice",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "On"
      }
    }
  },
  "106": {
    name: "Video Compression",
    options: {
      "0": {
        name: "H264"
      },
      "1": {
        name: "HEVC"
      }
    }
  },
  "107": {
    name: "Video Timer",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "15s"
      },
      "2": {
        name: "30s"
      }
    }
  },
  "108": {
    name: "Resolution format",
    options: {
      "0": {
        name: "4:3"
      },
      "1": {
        name: "16:9"
      }
    }
  },
  "109": {
    name: "Super Photo",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "Auto"
      },
      "2": {
        name: "HDR On"
      }
    }
  },
  "111": {
    name: "Speed",
    options: {
      "0": {
        name: "15x"
      },
      "1": {
        name: "30x"
      },
      "7": {
        name: "2x"
      },
      "8": {
        name: "5x"
      },
      "9": {
        name: "10x"
      }
    }
  },
  "112": {
    name: "Touch Display Landscape Lock",
    options: {
      "0": {
        name: "Off"
      },
      "1": {
        name: "Up"
      },
      "2": {
        name: "Down"
      }
    }
  }
};
const modes = {
  video: "Video",
  looping: "Looping",
  singlePhoto: "Photo",
  photo: "Photo",
  nightPhoto: "Night photo",
  burstPhoto: "Burst photo",
  timeLapseVideo: "Time Lapse Video",
  timeLapsePhoto: "Time Lapse Photo",
  nightLapsePhoto: "Night Lapse Photo",
  timeWarpVideo: "TimeWarp Video",
  liveBurst: "Live Burst",
  playback: "Playback",
  setup: "Setup",
  broadcastRecord: "Broadcast Record",
  broadcast: "Broadcast",
  unknown: "Unknown"
};
var translation = {
  settings,
  modes
};
const resources = {
  en: {
    translation
  }
};
instance.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  },
  resources
});
const bluetoothDeviceState = {};
function throwExpression(message) {
  throw new Error(message);
}
function createPacketAccumulator(startPacket) {
  let packetDataAccumulated = startPacket.data;
  const expectedMessageLength = startPacket.header.messageLength;
  let nextExpectedContinuationIndex = 0;
  const events = {};
  function sendEventIfReady() {
    var _a;
    if (packetDataAccumulated.length > expectedMessageLength) {
      (_a = events.onError) == null ? void 0 : _a.call(events, new Error(`Did response messages get out of sync? Current length: ${packetDataAccumulated.length}, expected: ${expectedMessageLength}`));
      throw new Error("Did response messages get out of sync?");
    }
    if (packetDataAccumulated.length === expectedMessageLength) {
      if (!events.onPacketsAccumulated)
        throw new Error("Packet accumulator event not registered?");
      events.onPacketsAccumulated(packetDataAccumulated);
    }
  }
  Promise.resolve().then(() => {
    sendEventIfReady();
  });
  function checkIfPacketIsExpected(packet) {
    return packet.header.continuationIndex === nextExpectedContinuationIndex;
  }
  function accumulatePacket(packet) {
    if (!checkIfPacketIsExpected(packet))
      return false;
    packetDataAccumulated = packetDataAccumulated.concat(packet.data);
    sendEventIfReady();
    nextExpectedContinuationIndex++;
    if (nextExpectedContinuationIndex > 15)
      nextExpectedContinuationIndex = 0;
    return true;
  }
  return {
    accumulatePacket,
    events
  };
}
function getStartPacketId(packet) {
  return packet.data[0] || throwExpression("Start packet doesn't have id as first byte");
}
function createPacketAccumulatorQueue(expectedId) {
  const accumulatorsQueue = [];
  const events = {};
  function cleanupAccumulatorEvents(acc) {
    acc.events.onPacketsAccumulated = void 0;
    acc.events.onError = void 0;
  }
  function removeAccumulator(acc) {
    cleanupAccumulatorEvents(acc);
    const i = accumulatorsQueue.findIndex((a) => a === acc);
    if (i === -1)
      throw new Error("Accumulator got lost?");
    accumulatorsQueue.splice(i, 1);
  }
  function dispatchSuccessEvent(packetData) {
    var _a;
    (_a = events.onExpectedPacketReceived) == null ? void 0 : _a.call(events, packetData);
    cancelPacketFlowTimeout();
  }
  function dispatchErrorEvent(error) {
    var _a;
    (_a = events.onExpectedPacketError) == null ? void 0 : _a.call(events, error);
  }
  const startPacketTimeoutHandle = window.setTimeout(() => {
    dispose();
  }, 1e4);
  let packetFlowTimeoutHandle;
  function reschedulePacketFlowTimeout() {
    cancelPacketFlowTimeout();
    packetFlowTimeoutHandle = window.setTimeout(() => {
      var _a;
      (_a = events.onExpectedPacketError) == null ? void 0 : _a.call(events, new Error("Timeout, did not receive any more packets for a while"));
    }, 5e3);
  }
  function cancelPacketFlowTimeout() {
    window.clearTimeout(packetFlowTimeoutHandle);
    packetFlowTimeoutHandle = void 0;
  }
  function consumePacket(packet) {
    var _a;
    reschedulePacketFlowTimeout();
    if (packet.header.isStart) {
      const packetId = getStartPacketId(packet);
      if (accumulatorsQueue.length === 0) {
        if (packetId === expectedId) {
          window.clearTimeout(startPacketTimeoutHandle);
          const accumulator2 = createPacketAccumulator(packet);
          accumulatorsQueue.unshift(accumulator2);
          accumulator2.events.onPacketsAccumulated = (packetData) => {
            removeAccumulator(accumulator2);
            dispatchSuccessEvent(packetData);
          };
          accumulator2.events.onError = (error) => {
            removeAccumulator(accumulator2);
            dispatchErrorEvent(error);
          };
          return true;
        }
        return false;
      }
      const accumulator = createPacketAccumulator(packet);
      accumulatorsQueue.unshift(accumulator);
      accumulator.events.onPacketsAccumulated = () => {
        removeAccumulator(accumulator);
      };
      accumulator.events.onError = () => {
        removeAccumulator(accumulator);
      };
      return true;
    }
    if (accumulatorsQueue.length === 0)
      return false;
    return ((_a = accumulatorsQueue[0]) == null ? void 0 : _a.accumulatePacket(packet)) || false;
  }
  function dispose() {
    var _a;
    accumulatorsQueue.forEach(cleanupAccumulatorEvents);
    accumulatorsQueue.length = 0;
    (_a = events.onExpectedPacketError) == null ? void 0 : _a.call(events, new Error("Disposed"));
  }
  return {
    consumePacket,
    events,
    dispose
  };
}
async function waitForPacketById(characteristicToListen, id) {
  const packetAccumulatorQueue = createPacketAccumulatorQueue(id);
  const onEvent = (ev) => {
    const characteristic = ev.target;
    const {
      value
    } = characteristic;
    if (!value) {
      toast.error("This should not be possible, empty response value");
      return;
    }
    try {
      const packet = readSinglePacket(value);
      packetAccumulatorQueue.consumePacket(packet);
    } catch (error) {
      toast.error(`Error while parsing response message ${error}`);
    }
  };
  characteristicToListen.addEventListener("characteristicvaluechanged", onEvent);
  console.log("registering listener for characteristic, waiting for packet with id", id);
  return new Promise((resolve, reject) => {
    packetAccumulatorQueue.events.onExpectedPacketReceived = (packetData) => {
      console.log("got expected packet, resolving id ", id, " with data ", packetData);
      resolve(packetData);
      packetAccumulatorQueue.events.onExpectedPacketReceived = void 0;
      packetAccumulatorQueue.events.onExpectedPacketError = void 0;
    };
    packetAccumulatorQueue.events.onExpectedPacketError = (error) => {
      console.error("got expected packet error, rejecting id ", id, " error ", error);
      reject(error);
      packetAccumulatorQueue.events.onExpectedPacketReceived = void 0;
      packetAccumulatorQueue.events.onExpectedPacketError = void 0;
    };
  }).finally(() => {
    characteristicToListen.removeEventListener("characteristicvaluechanged", onEvent);
  });
}
function createPacketAccumulatorStore() {
  const events = {};
  const activePacketAccumulators = [];
  function consumePacket(packet) {
    if (packet.header.isStart) {
      const accumulator = createPacketAccumulator(packet);
      accumulator.events.onPacketsAccumulated = (packetData) => {
        var _a;
        (_a = events.onExpectedPacketReceived) == null ? void 0 : _a.call(events, packetData);
        const i = activePacketAccumulators.findIndex((acc) => acc === accumulator);
        if (i === -1)
          throw new Error("Accumulator got lost?");
        activePacketAccumulators.splice(i, 1);
        accumulator.events.onPacketsAccumulated = void 0;
        accumulator.events.onError = void 0;
      };
      accumulator.events.onError = (_) => {
        accumulator.events.onPacketsAccumulated = void 0;
        accumulator.events.onError = void 0;
      };
      activePacketAccumulators.push(accumulator);
      return true;
    }
    return activePacketAccumulators.map((accumulator) => accumulator.accumulatePacket(packet)).some((acc) => acc);
  }
  return {
    events,
    consumePacket
  };
}
function packetReaderProvider(onPacket) {
  const accumulators = createPacketAccumulatorStore();
  accumulators.events.onExpectedPacketReceived = (mergedPacketData) => {
    onPacket(mergedPacketData);
    console.log("packet dump", mergedPacketData);
  };
  return (ev) => {
    const characteristic = ev.target;
    const {
      value
    } = characteristic;
    if (!value) {
      toast.error("This should not be possible, empty response value");
      return;
    }
    try {
      const packet = readSinglePacket(value);
      if (!accumulators.consumePacket(packet)) {
        toast.error("Failed to consume packet :(");
      }
    } catch (error) {
      toast.error(`Error while parsing response message ${error}`);
    }
  };
}
function readSinglePacket(value) {
  const packetHeader = parsePacketHeader(value);
  const data = Array.from(new Uint8Array(value.buffer)).slice(packetHeader.headerSizeBytes);
  return {
    header: packetHeader,
    data
  };
}
function parsePacketHeader(data) {
  const byte1 = data.getUint8(0);
  let headerSizeBytes = 1;
  const isStart = (byte1 & 128) >> 7 === 0;
  if (!isStart) {
    const continuationIndex = byte1 & 127;
    return {
      isStart: false,
      headerSizeBytes: 1,
      continuationIndex
    };
  }
  const startType = (byte1 & 96) >> 5;
  let messageLength;
  if (startType === 0) {
    messageLength = byte1 & 31;
  } else if (startType === 1) {
    headerSizeBytes = 2;
    const byte2 = data.getUint8(1);
    messageLength = (byte1 & 31) << 8 | byte2;
  } else if (startType === 2) {
    headerSizeBytes = 3;
    const byte2 = data.getUint8(1);
    const byte3 = data.getUint8(2);
    messageLength = byte2 << 8 | byte3;
  } else if (startType === 3) {
    messageLength = 0;
  } else {
    throw new Error("IMPOSSIBLE");
  }
  return {
    isStart: true,
    headerSizeBytes,
    messageLength
  };
}
function parseAsSettings(serialized) {
  const settings2 = JSON.parse(serialized);
  if (!settings2.version)
    throw new Error("Invalid settings file");
  return settings2;
}
function parseCommandResponseCode(responseCode) {
  switch (responseCode) {
    case 0:
      return CommandResponseCode$1.success;
    case 1:
      return CommandResponseCode$1.error;
    case 2:
      return CommandResponseCode$1.invalidParameter;
    default:
      return CommandResponseCode$1.unknown;
  }
}
var CommandResponseCode$1 = /* @__PURE__ */ ((CommandResponseCode2) => {
  CommandResponseCode2[CommandResponseCode2["unknown"] = 1] = "unknown";
  CommandResponseCode2[CommandResponseCode2["success"] = 2] = "success";
  CommandResponseCode2[CommandResponseCode2["error"] = 3] = "error";
  CommandResponseCode2[CommandResponseCode2["invalidParameter"] = 4] = "invalidParameter";
  return CommandResponseCode2;
})(CommandResponseCode$1 || {});
function assertCommandResponseSuccess(response) {
  switch (response.errorCode) {
    case 2:
      return;
    case 4:
      throw new Error("Failed to fetch settings metadata. Unsupported camera model");
    case 3:
      throw new Error("Failed to fetch settings metadata. Error, camera still booting? Or stuck?");
    case 1:
      throw new Error("Failed to fetch settings metadata. Unknown error");
    default:
      throw new Error("Forgot to add new type?");
  }
}
function parseCommandResponse(response) {
  if (response.length < 2)
    throw new Error("command response too short");
  const commandId = response[0];
  const errorCode = parseCommandResponseCode(response[1]);
  const data = response.slice(2);
  return {
    commandId,
    errorCode,
    data
  };
}
function parseSettingsJsonResponse(commandResponse) {
  const settingsJsonRaw = inflate_1(Uint8Array.from(commandResponse.data));
  const settingsJson = String.fromCharCode(...settingsJsonRaw);
  return parseAsSettings(settingsJson);
}
async function dispatchCommandResponse(_, commandResponse) {
  assertCommandResponseSuccess(commandResponse);
}
function parseGetHardwareInfoResponse(commandResponse) {
  var _a, _b, _c, _d, _e, _f, _g;
  const {
    data
  } = commandResponse;
  let dataIndex = 0;
  const lengthOfModelNumber = (_a = data[dataIndex++]) != null ? _a : 0;
  const modelNumber = new Array(lengthOfModelNumber).fill(0).map(() => {
    var _a2;
    return (_a2 = data[dataIndex++]) != null ? _a2 : 0;
  });
  const lengthOfModelName = (_b = data[dataIndex++]) != null ? _b : 0;
  const modelName = new Array(lengthOfModelName).fill(0).map(() => {
    var _a2;
    return String.fromCharCode((_a2 = data[dataIndex++]) != null ? _a2 : 0);
  }).join("");
  const lengthOfBoardType = (_c = data[dataIndex++]) != null ? _c : 0;
  const boardType = new Array(lengthOfBoardType).fill(0).map(() => {
    var _a2;
    return String.fromCharCode((_a2 = data[dataIndex++]) != null ? _a2 : 0);
  }).join("");
  const lengthOfFirmwareVersion = (_d = data[dataIndex++]) != null ? _d : 0;
  const firmwareVersion = new Array(lengthOfFirmwareVersion).fill(0).map(() => {
    var _a2;
    return String.fromCharCode((_a2 = data[dataIndex++]) != null ? _a2 : 0);
  }).join("");
  const lengthOfSerialNumber = (_e = data[dataIndex++]) != null ? _e : 0;
  const serialNumber = new Array(lengthOfSerialNumber).fill(0).map(() => {
    var _a2;
    return String.fromCharCode((_a2 = data[dataIndex++]) != null ? _a2 : 0);
  }).join("");
  const lengthOfApSsid = (_f = data[dataIndex++]) != null ? _f : 0;
  const apSsid = new Array(lengthOfApSsid).fill(0).map(() => {
    var _a2;
    return String.fromCharCode((_a2 = data[dataIndex++]) != null ? _a2 : 0);
  }).join("");
  const lengthOfApMacAddress = (_g = data[dataIndex++]) != null ? _g : 0;
  const apMacAddress = new Array(lengthOfApMacAddress).fill(0).map(() => {
    var _a2;
    return String.fromCharCode((_a2 = data[dataIndex++]) != null ? _a2 : 0);
  }).join("");
  return {
    modelNumber,
    modelName,
    boardType,
    firmwareVersion,
    serialNumber,
    apSsid,
    apMacAddress
  };
}
function parseOpenGoProGetVersionResponse(commandResponse) {
  const {
    data
  } = commandResponse;
  let dataIndex = 0;
  const lengthOfMajorVersion = data[dataIndex++];
  const majorVersion = new Array(lengthOfMajorVersion).fill(0).map(() => {
    var _a;
    return (_a = data[dataIndex++]) != null ? _a : 0;
  }).reduce((acc, cur) => (acc << 8) + cur);
  const lengthOfMinorVersion = data[dataIndex++];
  const minorVersion = new Array(lengthOfMinorVersion).fill(0).map(() => {
    var _a;
    return (_a = data[dataIndex++]) != null ? _a : 0;
  }).reduce((acc, cur) => (acc << 8) + cur);
  return {
    majorVersion,
    minorVersion
  };
}
const SCHEMA_V4_CURRENT_MODE_SETTING_ID = 92;
const SCHEMA_V5_CURRENT_MODE_STATUS_ID = 89;
const selectSettingsMetadataSettingsJson = createSelector((state) => state.goproSettingsMetadataReducer.settingsJson, (settingsJson) => settingsJson);
const selectSettingsMetadataIsSettingsReady = createSelector((state) => state.goproSettingsMetadataReducer.isFetching, selectSettingsMetadataSettingsJson, (isFetching, settingsJson) => !isFetching && !!settingsJson);
const selectSettingsMetadataSchemaVersion = createSelector(selectSettingsMetadataSettingsJson, selectSettingsMetadataIsSettingsReady, (settingsJson, isSettingsReady) => {
  var _a;
  return (_a = settingsJson == null ? void 0 : settingsJson.schema_version) != null ? _a : isSettingsReady ? 1 : 0;
});
const selectSettingsMetadataAllStatuses = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  if (!settingsJson)
    return [];
  return settingsJson.status.groups.map((group) => group.fields).flat();
});
const selectSettingsMetadataAllStatusesIdsList = createSelector(selectSettingsMetadataAllStatuses, (statuses) => statuses.map((status) => status.id));
const selectSettingsMetadataAllSettings = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  if (!settingsJson)
    return [];
  switch (settingsJson.schema_version) {
    case 4: {
      return settingsJson.modes.map((mode) => mode.settings).flat().map((setting) => ({
        id: setting.id,
        displayName: setting.display_name,
        options: setting.options.map((option) => ({
          id: option.value,
          value: option.value,
          displayName: option.display_name
        }))
      }));
    }
    case 5: {
      return settingsJson.settings.map((setting) => ({
        id: setting.id,
        displayName: setting.display_name,
        options: setting.options.map((option) => ({
          id: option.id,
          value: option.value,
          displayName: option.display_name
        }))
      }));
    }
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectSettingsMetadataAllSettingsIdsList = createSelector(selectSettingsMetadataAllSettings, (settings2) => settings2.map((setting) => setting.id));
const selectSettingsMetadataAllSettingsById = createSelector(selectSettingsMetadataAllSettings, (allSettings) => {
  return allSettings.reduce((acc, setting) => {
    acc[setting.id] = setting;
    return acc;
  }, {});
});
const selectSettingsMetadataFilters = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  if (!settingsJson)
    return [];
  switch (settingsJson.schema_version) {
    case 4: {
      return settingsJson.filters.map((filter) => {
        const filterActivatedBy = filter.activated_by.map((activatedBy) => {
          if ("setting_value" in activatedBy) {
            return {
              settingId: activatedBy.setting_id,
              values: /* @__PURE__ */ new Set([activatedBy.setting_value])
            };
          }
          if ("status_id" in activatedBy) {
            return {
              statusId: activatedBy.status_id,
              values: new Set(activatedBy.values)
            };
          }
          return {
            settingId: activatedBy.setting_id,
            values: new Set(activatedBy.values)
          };
        });
        const filterBlacklist = [{
          settingId: filter.blacklist.setting_id,
          values: new Set(filter.blacklist.values)
        }];
        return {
          activatedBy: filterActivatedBy,
          blacklist: filterBlacklist
        };
      });
    }
    case 5: {
      return settingsJson.filters.map((filter) => {
        const filterActivatedBy = filter.activated_by.map((activatedBy) => {
          if ("setting_id" in activatedBy) {
            return {
              settingId: activatedBy.setting_id,
              values: new Set(activatedBy.values)
            };
          }
          return {
            statusId: activatedBy.status_id,
            values: new Set(activatedBy.values)
          };
        });
        const filterBlacklist = filter.blacklist.map((blacklist) => ({
          settingId: blacklist.setting_id,
          values: new Set(blacklist.values)
        }));
        return {
          activatedBy: filterActivatedBy,
          blacklist: filterBlacklist
        };
      });
    }
    default:
      throw new Error("Unknown settings schema version");
  }
});
function mergeToBlacklist(existingList, addList) {
  return existingList.concat(addList).reduce((acc, curr) => {
    if (!acc.some((item) => item.settingId === curr.settingId)) {
      acc.push(curr);
    }
    return acc;
  }, []);
}
function reduceFiltersToRecord(filters) {
  return filters.map((filter) => ({
    modeIds: new Set(...filter.activatedBy.map((activatedBy) => activatedBy.values)),
    blacklist: filter.blacklist
  })).reduce((acc, filter) => {
    filter.modeIds.forEach((modeId) => {
      const existingBlacklistsForMode = acc[modeId];
      if (existingBlacklistsForMode)
        acc[modeId] = mergeToBlacklist(existingBlacklistsForMode, filter.blacklist);
      else
        acc[modeId] = filter.blacklist;
    });
    return acc;
  }, {});
}
const selectFiltersThatFilterByModeIdOnly = createSelector(selectSettingsMetadataSchemaVersion, selectSettingsMetadataFilters, (schemaVersion, filters) => {
  switch (schemaVersion) {
    case 4:
      return reduceFiltersToRecord(filters.filter((filter) => filter.activatedBy.every((activatedBy) => "settingId" in activatedBy ? activatedBy.settingId === SCHEMA_V4_CURRENT_MODE_SETTING_ID : false)));
    case 5:
      return reduceFiltersToRecord(filters.filter((filter) => filter.activatedBy.every((activatedBy) => "statusId" in activatedBy ? activatedBy.statusId === SCHEMA_V5_CURRENT_MODE_STATUS_ID : false)));
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectCurrentSettings = createSelector((state) => state.goproSettingsReducer.settings, (currentSettings) => currentSettings);
const selectActiveFilterBlacklists = createSelector(selectCurrentSettings, (state) => state.goproSettingsReducer.statuses, selectSettingsMetadataFilters, (currentSettings, currentStatuses, filters) => filters.map((filter) => {
  const isFilterActive = filter.activatedBy.every((activatedBy) => {
    var _a;
    if ("settingId" in activatedBy) {
      const settingValue = (_a = currentSettings[activatedBy.settingId]) == null ? void 0 : _a.value;
      return typeof settingValue === "number" ? activatedBy.values.has(settingValue) : false;
    }
    const statusValue = currentStatuses[activatedBy.statusId];
    return typeof statusValue === "number" ? activatedBy.values.has(statusValue) : false;
  });
  if (!isFilterActive)
    return [];
  return filter.blacklist;
}).flat());
const selectActiveFilterBlacklistsMerged = createSelector(selectActiveFilterBlacklists, (activeFilters) => {
  return activeFilters.reduce((acc, filter) => {
    const existing = acc[filter.settingId];
    if (existing) {
      acc[filter.settingId] = /* @__PURE__ */ new Set([...existing, ...filter.values]);
    } else {
      acc[filter.settingId] = filter.values;
    }
    return acc;
  }, {});
});
const selectCurrentActiveModeId = createSelector(selectSettingsMetadataSchemaVersion, (state) => {
  var _a;
  return (_a = state.goproSettingsReducer.settings[SCHEMA_V4_CURRENT_MODE_SETTING_ID]) == null ? void 0 : _a.value;
}, (state) => state.goproSettingsReducer.statuses[SCHEMA_V5_CURRENT_MODE_STATUS_ID], (schemaVersion, settingCurrentModeId, statusCurrentModeId) => {
  switch (schemaVersion) {
    case 4:
      if (settingCurrentModeId === void 0)
        throw new Error("Current mode id not initialized yet");
      return settingCurrentModeId;
    case 5:
      if (typeof statusCurrentModeId !== "number")
        throw new Error("Current mode id not initialized yet");
      return statusCurrentModeId;
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectModeOnlyBlacklistsBySettingIdForCurrentMode = createSelector(selectCurrentActiveModeId, selectFiltersThatFilterByModeIdOnly, (currentModeId, filtersThatFilterByModeIdOnly) => {
  var _a;
  return ((_a = filtersThatFilterByModeIdOnly[currentModeId]) == null ? void 0 : _a.reduce((acc, blacklist) => {
    const existing = acc[blacklist.settingId];
    if (existing) {
      acc[blacklist.settingId] = /* @__PURE__ */ new Set([...existing, ...blacklist.values]);
    } else {
      acc[blacklist.settingId] = blacklist.values;
    }
    return acc;
  }, {})) || {};
});
const selectProtuneSettingId = createSelector(selectSettingsMetadataSettingsJson, selectModeOnlyBlacklistsBySettingIdForCurrentMode, (settingsJson, blacklists) => {
  switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
    case 4: {
      const protuneSettings = settingsJson.modes.map((x) => x.settings).flat().filter((x) => x.path_segment === "protune" && !blacklists[x.id]).map((x) => x.id);
      if (protuneSettings.length > 1)
        throw new Error("Found multiple protune settings, should only be 1 per mode");
      return protuneSettings[0];
    }
    case 5: {
      return 114;
    }
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectModeSettingsIdsHiddenBehindProtune = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
    case 4: {
      return new Set(settingsJson.modes.map((x) => x.settings).flat().filter((x) => x.path_segment.startsWith("protune_")).map((x) => x.id));
    }
    case 5: {
      const foundHint = settingsJson.display_hints.find((hint) => hint.key === "GPCAMERA_GROUP_PROTUNE");
      if (!foundHint)
        throw new Error("Could not find GPCAMERA_GROUP_PROTUNE hint");
      return new Set(foundHint.settings.map((x) => x.setting_id));
    }
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectModeSettingsIdsAlwaysShown = createSelector(selectSettingsMetadataSettingsJson, selectProtuneSettingId, selectModeSettingsIdsHiddenBehindProtune, (settingsJson, protuneSettingId, modeSettingsIdsHiddenBehindProtune) => {
  switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
    case 4: {
      const foundHint = settingsJson.display_hints.find((hint) => hint.key === "GPCAMERA_GROUP_MODE");
      if (!foundHint)
        throw new Error("GPCAMERA_GROUP_MODE hint not found");
      return new Set(foundHint.settings.map((setting) => setting.setting_id).filter((x) => !modeSettingsIdsHiddenBehindProtune.has(x) && x !== protuneSettingId));
    }
    case 5: {
      const foundHint = settingsJson.display_hints.find((hint) => hint.key === "GPCAMERA_GROUP_MODE");
      if (!foundHint)
        throw new Error("GPCAMERA_GROUP_MODE hint not found");
      return new Set(foundHint.settings.map((setting) => setting.setting_id));
    }
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectCurrentModeSettings = createSelector(selectModeSettingsIdsAlwaysShown, selectProtuneSettingId, selectModeSettingsIdsHiddenBehindProtune, selectModeOnlyBlacklistsBySettingIdForCurrentMode, selectCurrentSettings, selectSettingsMetadataAllSettingsById, (modeSettingsIdsAlwaysShown, protuneSettingId, modeSettingsIdsHiddenBehindProtune, blacklists, currentSettings, allSettingsByIds) => {
  var _a;
  const isProtuneEnabled = protuneSettingId ? (_a = currentSettings[protuneSettingId]) == null ? void 0 : _a.value : void 0;
  let settingsIds = /* @__PURE__ */ new Set([...modeSettingsIdsAlwaysShown]);
  if (protuneSettingId)
    settingsIds.add(protuneSettingId);
  if (isProtuneEnabled)
    settingsIds = /* @__PURE__ */ new Set([...settingsIds, ...modeSettingsIdsHiddenBehindProtune]);
  const settings2 = [...settingsIds].map((id) => allSettingsByIds[id] || throwExpression(`Setting ${id} not found in settings list`));
  return settings2.map((setting) => {
    const blacklistForThisSetting = blacklists[setting.id];
    if (!blacklistForThisSetting)
      return setting;
    return __spreadProps(__spreadValues({}, setting), {
      options: setting.options.filter((option) => !blacklistForThisSetting.has(option.id))
    });
  }).filter((setting) => setting.options.length > 0);
});
const selectFilteredCurrentModeSettings = createSelector(selectActiveFilterBlacklistsMerged, selectCurrentModeSettings, selectSettingsMetadataAllSettingsById, selectCurrentSettings, (activeFilterBlacklists, currentModeSettings, allSettingsByIds, currentSettings) => {
  return currentModeSettings.map((setting) => {
    const filterForThisSetting = activeFilterBlacklists[setting.id];
    if (!filterForThisSetting)
      return setting;
    return __spreadProps(__spreadValues({}, setting), {
      options: setting.options.filter((option) => !filterForThisSetting.has(option.id))
    });
  }).map((setting) => {
    var _a, _b;
    if (setting.options.length > 0)
      return setting;
    const currentSettingValue = (_a = currentSettings[setting.id]) == null ? void 0 : _a.value;
    const currentOption = ((_b = allSettingsByIds[setting.id]) == null ? void 0 : _b.options.find((option) => option.id === currentSettingValue)) || throwExpression(`Could not find option ${currentSettingValue} for setting ${setting.id} ${setting.displayName}`);
    return __spreadProps(__spreadValues({}, setting), {
      options: [currentOption]
    });
  });
});
const selectAllGeneralSettingsIds = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
    case 4: {
      const foundHint = settingsJson.display_hints.find((hint) => hint.key === "GPCAMERA_GROUP_SETUP");
      if (!foundHint)
        throw new Error("GPCAMERA_GROUP_SETUP hint not found");
      return foundHint.settings.map((setting) => setting.setting_id);
    }
    case 5: {
      const foundHint = settingsJson.display_hints.find((hint) => hint.key === "GPCAMERA_GROUP_SETUP");
      if (!foundHint)
        throw new Error("GPCAMERA_GROUP_SETUP hint not found");
      return foundHint.settings.map((setting) => setting.setting_id);
    }
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectAllGeneralSettings = createSelector(selectActiveFilterBlacklistsMerged, selectAllGeneralSettingsIds, selectSettingsMetadataAllSettingsById, selectCurrentSettings, (activeFilterBlacklists, allSettingsIds, allSettingsByIds, currentSettings) => {
  return allSettingsIds.map((id) => allSettingsByIds[id] || throwExpression(`Setting ${id} not found in settings list`)).map((setting) => {
    const blacklistForThisSetting = activeFilterBlacklists[setting.id];
    if (!blacklistForThisSetting)
      return setting;
    return __spreadProps(__spreadValues({}, setting), {
      options: setting.options.filter((option) => !blacklistForThisSetting.has(option.id))
    });
  }).map((setting) => {
    var _a, _b;
    if (setting.options.length > 0)
      return setting;
    const currentSettingValue = (_a = currentSettings[setting.id]) == null ? void 0 : _a.value;
    const currentOption = ((_b = allSettingsByIds[setting.id]) == null ? void 0 : _b.options.find((option) => option.id === currentSettingValue)) || throwExpression(`Could not find option ${currentSettingValue} for setting ${setting.id} ${setting.displayName}`);
    return __spreadProps(__spreadValues({}, setting), {
      options: [currentOption]
    });
  });
});
const selectCurrentModePreviewSettings = createSelector(selectFilteredCurrentModeSettings, selectProtuneSettingId, selectModeSettingsIdsHiddenBehindProtune, selectSettingsMetadataAllSettingsById, selectCurrentSettings, (filteredCurrentModeSettings, protuneSettingId, modeSettingsIdsHiddenBehindProtune, allSettingsByIds, currentSettings) => {
  const settings2 = filteredCurrentModeSettings.filter((setting) => !modeSettingsIdsHiddenBehindProtune.has(setting.id)).filter((s) => s.options.length > 1).filter((s) => s.id !== protuneSettingId);
  return settings2.map((setting) => {
    var _a, _b;
    const currentSettingValue = (_a = currentSettings[setting.id]) == null ? void 0 : _a.value;
    const currentOption = ((_b = allSettingsByIds[setting.id]) == null ? void 0 : _b.options.find((option) => option.id === currentSettingValue)) || throwExpression(`Could not find option ${currentSettingValue} for setting ${setting.id} ${setting.displayName}`);
    return __spreadProps(__spreadValues({}, setting), {
      currentOptionId: currentOption.id
    });
  }).filter((setting) => setting.options.length > 0);
});
const booleanValue = [{
  id: 0,
  label: "False"
}, {
  id: 1,
  label: "True"
}];
const statusInternalCameraPresent1 = {
  id: 1,
  label: "Internal camera present",
  description: "Is the internal camera present?",
  type: "boolean",
  values: booleanValue
};
const statusInternalBatteryLevel2 = {
  id: 2,
  label: "Internal battery level",
  description: "Rough approximation of internal battery level in bars",
  type: "integer",
  values: [{
    id: 0,
    label: "Zero"
  }, {
    id: 1,
    label: "One"
  }, {
    id: 2,
    label: "Two"
  }, {
    id: 3,
    label: "Three"
  }, {
    id: 4,
    label: "Charging"
  }]
};
const statusExternalBatteryPresent3 = {
  id: 3,
  label: "External battery present",
  description: "Is an external battery connected?",
  type: "boolean",
  values: booleanValue
};
const statusExternalBatteryLevel4 = {
  id: 4,
  label: "External battery level",
  description: "External battery power level in percent",
  type: "percent",
  values: [{
    id: 0,
    label: "0%"
  }, {
    id: 100,
    label: "100%"
  }]
};
const statusSystemHot6 = {
  id: 6,
  label: "System hot",
  description: "Is the system currently overheating?",
  type: "boolean",
  values: booleanValue
};
const statusSystemBusy8 = {
  id: 8,
  label: "System busy",
  description: "Is the camera busy?",
  type: "boolean",
  values: booleanValue
};
const statusQuickCaptureActive9 = {
  id: 9,
  label: "Quick capture active",
  description: "Is Quick Capture feature enabled?",
  type: "boolean",
  values: booleanValue
};
const statusEncodingActive10 = {
  id: 10,
  label: "Encoding active",
  description: "Is the system encoding right now?",
  type: "boolean",
  values: booleanValue
};
const statusLcdLockActive11 = {
  id: 11,
  label: "Lcd lock active",
  description: "Is LCD lock active?",
  type: "boolean",
  values: booleanValue
};
const statusVideoProgressCounter13 = {
  id: 13,
  label: "Video progress counter",
  description: "When encoding video, this is the duration (seconds) of the video so far; 0 otherwise",
  type: "integer",
  values: [{
    id: 0,
    label: "0s"
  }, {
    id: 59,
    label: "59s"
  }]
};
const statusEnable17 = {
  id: 17,
  label: "Enable",
  description: "Are Wireless Connections enabled?",
  type: "boolean",
  values: booleanValue
};
const statusState19 = {
  id: 19,
  label: "State",
  description: "The pairing state of the camera",
  type: "integer",
  values: [{
    id: 0,
    label: "Success"
  }, {
    id: 1,
    label: "In Progress"
  }, {
    id: 2,
    label: "Failed"
  }, {
    id: 3,
    label: "Stopped"
  }]
};
const statusType20 = {
  id: 20,
  label: "Type",
  description: "The last type of pairing that the camera was engaged in",
  type: "integer",
  values: [{
    id: 0,
    label: "Not Pairing"
  }, {
    id: 1,
    label: "Pairing App"
  }, {
    id: 2,
    label: "Pairing Remote Control"
  }, {
    id: 3,
    label: "Pairing Bluetooth Device"
  }]
};
const statusPairTime21 = {
  id: 21,
  label: "Pair time",
  description: "Time (milliseconds) since boot of last successful pairing complete action",
  type: "integer",
  values: []
};
const statusState22 = {
  id: 22,
  label: "State",
  description: "State of current scan for WiFi Access Points. Appears to only change for CAH-related scans",
  type: "integer",
  values: [{
    id: 0,
    label: "Never started"
  }, {
    id: 1,
    label: "Started"
  }, {
    id: 2,
    label: "Aborted"
  }, {
    id: 3,
    label: "Canceled"
  }, {
    id: 4,
    label: "Completed"
  }]
};
const statusScanTimeMsec23 = {
  id: 23,
  label: "Scan time msec",
  description: "The time, in milliseconds since boot that the WiFi Access Point scan completed",
  type: "integer",
  values: []
};
const statusProvisionStatus24 = {
  id: 24,
  label: "Provision status",
  description: "WiFi AP provisioning state",
  type: "integer",
  values: [{
    id: 0,
    label: "Never started"
  }, {
    id: 1,
    label: "Started"
  }, {
    id: 2,
    label: "Aborted"
  }, {
    id: 3,
    label: "Canceled"
  }, {
    id: 4,
    label: "Completed"
  }]
};
const statusRemoteControlVersion26 = {
  id: 26,
  label: "Remote control version",
  description: "Wireless remote control version",
  type: "integer",
  values: []
};
const statusRemoteControlConnected27 = {
  id: 27,
  label: "Remote control connected",
  description: "Is a wireless remote control connected?",
  type: "boolean",
  values: booleanValue
};
const statusPairing28 = {
  id: 28,
  label: "Pairing",
  description: "Wireless Pairing State",
  type: "integer",
  values: []
};
const statusWlanSsid29 = {
  id: 29,
  label: "Wlan ssid",
  description: "Provisioned WIFI AP SSID. On BLE connection, value is big-endian byte-encoded int",
  type: "string",
  values: []
};
const statusApSsid30 = {
  id: 30,
  label: "Ap ssid",
  description: `Camera's WIFI SSID. On BLE connection, value is big-endian byte-encoded int`,
  type: "string",
  values: []
};
const statusAppCount31 = {
  id: 31,
  label: "App count",
  description: "The number of wireless devices connected to the camera",
  type: "integer",
  values: []
};
const statusEnable32 = {
  id: 32,
  label: "Enable",
  description: "Is Preview Stream enabled?",
  type: "boolean",
  values: booleanValue
};
const statusSdStatus33 = {
  id: 33,
  label: "Sd status",
  description: "Primary Storage Status",
  type: "integer",
  values: [{
    id: -1,
    label: "Unknown"
  }, {
    id: 0,
    label: "OK"
  }, {
    id: 1,
    label: "SD Card Full"
  }, {
    id: 2,
    label: "SD Card Removed"
  }, {
    id: 3,
    label: "SD Card Format Error"
  }, {
    id: 4,
    label: "SD Card Busy"
  }, {
    id: 8,
    label: "SD Card Swapped"
  }]
};
const statusRemainingPhotos34 = {
  id: 34,
  label: "Remaining photos",
  description: "How many photos can be taken before sdcard is full",
  type: "integer",
  values: []
};
const statusRemainingVideoTime35 = {
  id: 35,
  label: "Remaining video time",
  description: "How many minutes of video can be captured with current settings before sdcard is full",
  type: "integer",
  values: []
};
const statusNumGroupPhotos36 = {
  id: 36,
  label: "Num group photos",
  description: "How many group photos can be taken with current settings before sdcard is full",
  type: "integer",
  values: []
};
const statusNumGroupVideos37 = {
  id: 37,
  label: "Num group videos",
  description: "Total number of group videos on sdcard",
  type: "integer",
  values: []
};
const statusNumTotalPhotos38 = {
  id: 38,
  label: "Num total photos",
  description: "Total number of photos on sdcard",
  type: "integer",
  values: []
};
const statusNumTotalVideos39 = {
  id: 39,
  label: "Num total videos",
  description: "Total number of videos on sdcard",
  type: "integer",
  values: []
};
const statusDateTime40 = {
  id: 40,
  label: "Date time",
  description: "Current date/time (format: %YY%MM%DD%HH%MM%SS, all values in hex)",
  type: "string",
  values: []
};
const statusOtaStatus41 = {
  id: 41,
  label: "Ota status",
  description: "The current status of Over The Air (OTA) update",
  type: "integer",
  values: [{
    id: 0,
    label: "Idle"
  }, {
    id: 1,
    label: "Downloading"
  }, {
    id: 2,
    label: "Verifying"
  }, {
    id: 3,
    label: "Download Failed"
  }, {
    id: 4,
    label: "Verify Failed"
  }, {
    id: 5,
    label: "Ready"
  }, {
    id: 6,
    label: "GoPro App: Downloading"
  }, {
    id: 7,
    label: "GoPro App: Verifying"
  }, {
    id: 8,
    label: "GoPro App: Download Failed"
  }, {
    id: 9,
    label: "GoPro App: Verify Failed"
  }, {
    id: 10,
    label: "GoPro App: Ready"
  }]
};
const statusDownloadCancelRequestPending42 = {
  id: 42,
  label: "Download cancel request pending",
  description: "Is there a pending request to cancel a firmware update download?",
  type: "boolean",
  values: booleanValue
};
const statusLegacyCurrentPresetGroup43 = {
  id: 43,
  label: "Current open preset group",
  description: "Looks like legacy status, that represented UI group, doesnt match current UI, probably manually mapped to new UI...",
  type: "integer",
  values: [{
    id: 0,
    label: "Legacy Video Group"
  }, {
    id: 1,
    label: "Legacy Photo Group"
  }, {
    id: 2,
    label: "Legacy Multishot Group"
  }]
};
const statusLegacyCurrentPresetGroupChild44 = {
  id: 44,
  label: "Current open preset group child",
  description: "Looks like legacy status, that represented UI group child mode, doesnt match current UI, probably manually mapped to new UI...",
  type: "integer",
  values: [{
    id: 0,
    label: "1st child by group (group 0 - video, group 1 - ???, group 2 - burst photo)"
  }, {
    id: 1,
    label: "2nd child by group (group 0 - timelapse video, group 1 - photo, group 2 - timelapse photo)"
  }, {
    id: 2,
    label: "3rd child by group (group 0 - ???, group 1 - night photo, group 2 - nightlapse photo)"
  }, {
    id: 3,
    label: "4th child by group (group 0 - looping video)"
  }, {
    id: 4,
    label: "5th child by group (group 0 - timewarp)"
  }]
};
const statusCameraLocateActive45 = {
  id: 45,
  label: "Camera locate active",
  description: "Is locate camera feature active?",
  type: "boolean",
  values: booleanValue
};
const statusMultiShotCountDown49 = {
  id: 49,
  label: "Multi shot count down",
  description: "The current timelapse interval countdown value (e.g. 5...4...3...2...1...)",
  type: "integer",
  values: []
};
const statusRemainingSpace54 = {
  id: 54,
  label: "Remaining space",
  description: "Remaining space on the sdcard in Kilobytes",
  type: "integer",
  values: []
};
const statusSupported55 = {
  id: 55,
  label: "Supported",
  description: "Is preview stream supported in current recording/flatmode/secondary-stream?",
  type: "boolean",
  values: booleanValue
};
const statusWifiBars56 = {
  id: 56,
  label: "Wifi bars",
  description: "WiFi signal strength in bars",
  type: "integer",
  values: []
};
const statusCurrentTimeMsec57 = {
  id: 57,
  label: "Current time msec",
  description: "System time in milliseconds since system was booted",
  type: "integer",
  values: []
};
const statusNumHilights58 = {
  id: 58,
  label: "Num hilights",
  description: "The number of hilights in encoding video (set to 0 when encoding stops)",
  type: "integer",
  values: []
};
const statusLastHilightTimeMsec59 = {
  id: 59,
  label: "Last hilight time msec",
  description: "Time since boot (msec) of most recent hilight in encoding video (set to 0 when encoding stops)",
  type: "integer",
  values: []
};
const statusNextPollMsec60 = {
  id: 60,
  label: "Next poll msec",
  description: "The min time between camera status updates (msec). Do not poll for status more often than this",
  type: "integer",
  values: []
};
const statusInContextualMenu63 = {
  id: 63,
  label: "In contextual menu",
  description: "Is the camera currently in a contextual menu (e.g. Preferences)?",
  type: "boolean",
  values: booleanValue
};
const statusRemainingTimelapseTime64 = {
  id: 64,
  label: "Remaining timelapse time",
  description: "How many min of Timelapse video can be captured with current settings before sdcard is full",
  type: "integer",
  values: []
};
const statusExposureSelectType65 = {
  id: 65,
  label: "Exposure select type",
  description: "Liveview Exposure Select Mode",
  type: "integer",
  values: [{
    id: 0,
    label: "Disabled"
  }, {
    id: 1,
    label: "Auto"
  }, {
    id: 2,
    label: "ISO Lock"
  }, {
    id: 3,
    label: "Hemisphere"
  }]
};
const statusExposureSelectX66 = {
  id: 66,
  label: "Exposure select x",
  description: "Liveview Exposure Select: x-coordinate (percent)",
  type: "percent",
  values: [{
    id: 0,
    label: "0%"
  }, {
    id: 100,
    label: "100%"
  }]
};
const statusExposureSelectY67 = {
  id: 67,
  label: "Exposure select y",
  description: "Liveview Exposure Select: y-coordinate (percent)",
  type: "percent",
  values: [{
    id: 0,
    label: "0%"
  }, {
    id: 100,
    label: "100%"
  }]
};
const statusGpsStatus68 = {
  id: 68,
  label: "Gps status",
  description: "Does the camera currently have a GPS lock?",
  type: "boolean",
  values: booleanValue
};
const statusApState69 = {
  id: 69,
  label: "Ap state",
  description: "Is the WiFi radio enabled?",
  type: "boolean",
  values: booleanValue
};
const statusInternalBatteryPercentage70 = {
  id: 70,
  label: "Internal battery percentage",
  description: "Internal battery level (percent)",
  type: "percent",
  values: [{
    id: 0,
    label: "0%"
  }, {
    id: 100,
    label: "100%"
  }]
};
const statusLegacyLastPhotoMode72 = {
  id: 72,
  label: "Last photo mode",
  description: "Last photo mode in UI",
  type: "integer",
  values: [{
    id: 17,
    label: "Photo"
  }, {
    id: 19,
    label: "Burst"
  }, {
    id: 18,
    label: "Night"
  }]
};
const statusLegacyLastVideoMode71 = {
  id: 71,
  label: "Last video mode",
  description: "Last video mode in UI",
  type: "integer",
  values: [{
    id: 12,
    label: "Video"
  }, {
    id: 15,
    label: "Looping"
  }]
};
const statusLegacyLastTimelapseMode73 = {
  id: 73,
  label: "Last timelapse mode",
  description: "Last timelapse mode in UI",
  type: "integer",
  values: [{
    id: 24,
    label: "Timewarp"
  }, {
    id: 13,
    label: "Timelapse Video"
  }, {
    id: 20,
    label: "Timelapse Photo"
  }, {
    id: 21,
    label: "Nightlapse Photo"
  }]
};
const statusAccMicStatus74 = {
  id: 74,
  label: "Acc mic status",
  description: "Microphone Accesstory status",
  type: "integer",
  values: [{
    id: 0,
    label: "Microphone mod not connected"
  }, {
    id: 1,
    label: "Microphone mod connected"
  }, {
    id: 2,
    label: "Microphone mod connected and microphone plugged into Microphone mod"
  }]
};
const statusDigitalZoom75 = {
  id: 75,
  label: "Digital zoom",
  description: "Digital Zoom level (percent)",
  type: "percent",
  values: [{
    id: 0,
    label: "0%"
  }, {
    id: 100,
    label: "100%"
  }]
};
const statusWirelessBand76 = {
  id: 76,
  label: "Wireless band",
  description: "Wireless Band",
  type: "integer",
  values: [{
    id: 0,
    label: "2.4 GHz"
  }, {
    id: 1,
    label: "5 GHz"
  }, {
    id: 2,
    label: "Max"
  }]
};
const statusDigitalZoomActive77 = {
  id: 77,
  label: "Digital zoom active",
  description: "Is Digital Zoom feature available?",
  type: "boolean",
  values: booleanValue
};
const statusMobileFriendlyVideo78 = {
  id: 78,
  label: "Mobile friendly video",
  description: "Are current video settings mobile friendly? (related to video compression and frame rate)",
  type: "boolean",
  values: booleanValue
};
const statusFirstTimeUse79 = {
  id: 79,
  label: "First time use",
  description: "Is the camera currently in First Time Use (FTU) UI flow?",
  type: "boolean",
  values: booleanValue
};
const statusBand5ghzAvail81 = {
  id: 81,
  label: "Band 5ghz avail",
  description: "Is 5GHz wireless band available?",
  type: "boolean",
  values: booleanValue
};
const statusSystemReady82 = {
  id: 82,
  label: "System ready",
  description: "Is the system ready to accept commands?",
  type: "boolean",
  values: booleanValue
};
const statusBattOkayForOta83 = {
  id: 83,
  label: "Batt okay for ota",
  description: "Is the internal battery charged sufficiently to start Over The Air (OTA) update?",
  type: "boolean",
  values: booleanValue
};
const statusVideoLowTempAlert85 = {
  id: 85,
  label: "Video low temp alert",
  description: "Is the camera getting too cold to continue recording?",
  type: "boolean",
  values: booleanValue
};
const statusActualOrientation86 = {
  id: 86,
  label: "Actual orientation",
  description: "The rotational orientation of the camera",
  type: "integer",
  values: [{
    id: 0,
    label: "0 degrees (upright)"
  }, {
    id: 1,
    label: "180 degrees (upside down)"
  }, {
    id: 2,
    label: "90 degrees (laying on right side)"
  }, {
    id: 3,
    label: "270 degrees (laying on left side)"
  }]
};
const statusThermalMitigationMode87 = {
  id: 87,
  label: "Thermal mitigation mode",
  description: "Can camera use high resolution/fps (based on temperature)? (HERO7 Silver/White only)",
  type: "boolean",
  values: booleanValue
};
const statusZoomWhileEncoding88 = {
  id: 88,
  label: "Zoom while encoding",
  description: "Is this camera capable of zooming while encoding (static value based on model, not settings)",
  type: "boolean",
  values: booleanValue
};
const statusCurrentMode89 = {
  id: 89,
  label: "Current mode",
  description: "Current flatmode ID",
  type: "integer",
  values: []
};
const statusLogsReady91 = {
  id: 91,
  label: "Logs ready",
  description: "Are system logs ready to be downloaded?",
  type: "boolean",
  values: booleanValue
};
const statusTimewarp1xActive92 = {
  id: 92,
  label: "Timewarp 1x active",
  description: "Is Timewarp 1x active?",
  type: "boolean",
  values: booleanValue
};
const statusActiveVideoPresets93 = {
  id: 93,
  label: "Active video presets",
  description: "Current Video Preset (ID)",
  type: "integer",
  values: []
};
const statusActivePhotoPresets94 = {
  id: 94,
  label: "Active photo presets",
  description: "Current Photo Preset (ID)",
  type: "integer",
  values: []
};
const statusActiveTimelapsePresets95 = {
  id: 95,
  label: "Active timelapse presets",
  description: "Current Timelapse Preset (ID)",
  type: "integer",
  values: []
};
const statusActivePresetsGroup96 = {
  id: 96,
  label: "Active presets group",
  description: "Current Preset Group (ID)",
  type: "integer",
  values: []
};
const statusActivePreset97 = {
  id: 97,
  label: "Active preset",
  description: "Current Preset (ID)",
  type: "integer",
  values: []
};
const statusPresetModified98 = {
  id: 98,
  label: "Preset modified",
  description: "Preset Modified Status, which contains an event ID and a preset (group) ID",
  type: "integer",
  values: []
};
const statusRemainingLiveBursts99 = {
  id: 99,
  label: "Remaining live bursts",
  description: "How many Live Bursts can be captured before sdcard is full",
  type: "integer",
  values: []
};
const statusNumTotalLiveBursts100 = {
  id: 100,
  label: "Num total live bursts",
  description: "Total number of Live Bursts on sdcard",
  type: "integer",
  values: []
};
const statusCaptureDelayActive101 = {
  id: 101,
  label: "Capture delay active",
  description: "Is Capture Delay currently active (i.e. counting down)?",
  type: "boolean",
  values: booleanValue
};
const statusMediaModMicStatus102 = {
  id: 102,
  label: "Media mod mic status",
  description: "Media mod State",
  type: "integer",
  values: [{
    id: 0,
    label: "Media mod microphone removed"
  }, {
    id: 2,
    label: "Media mod microphone only"
  }, {
    id: 3,
    label: "Media mod microphone with external microphone"
  }]
};
const statusTimewarpSpeedRampActive103 = {
  id: 103,
  label: "Timewarp speed ramp active",
  description: "Time Warp Speed",
  type: "integer",
  values: [{
    id: 0,
    label: "15x"
  }, {
    id: 1,
    label: "30x"
  }, {
    id: 2,
    label: "60x"
  }, {
    id: 3,
    label: "150x"
  }, {
    id: 4,
    label: "300x"
  }, {
    id: 5,
    label: "900x"
  }, {
    id: 6,
    label: "1800x"
  }, {
    id: 7,
    label: "2x"
  }, {
    id: 8,
    label: "5x"
  }, {
    id: 9,
    label: "10x"
  }, {
    id: 10,
    label: "Auto"
  }, {
    id: 11,
    label: "1x (realtime)"
  }, {
    id: 12,
    label: "1/2x (slow-motion)"
  }]
};
const statusLinuxCoreActive104 = {
  id: 104,
  label: "Linux core active",
  description: `Is the system's Linux core active?`,
  type: "boolean",
  values: booleanValue
};
const statusCameraLensType105 = {
  id: 105,
  label: "Camera lens type",
  description: "Camera lens type (reflects changes to setting 162)",
  type: "integer",
  values: [{
    id: 0,
    label: "Default"
  }, {
    id: 1,
    label: "Max Lens"
  }]
};
const statusVideoHindsightCaptureActive106 = {
  id: 106,
  label: "Video hindsight capture active",
  description: "Is Video Hindsight Capture Active?",
  type: "boolean",
  values: booleanValue
};
const statusScheduledPreset107 = {
  id: 107,
  label: "Scheduled preset",
  description: "Scheduled Capture Preset ID",
  type: "integer",
  values: []
};
const statusScheduledEnabled108 = {
  id: 108,
  label: "Scheduled enabled",
  description: "Is Scheduled Capture set?",
  type: "boolean",
  values: booleanValue
};
const statusCreatingPreset109 = {
  id: 109,
  label: "Creating preset",
  description: "Is the camera in the process of creating a custom preset?",
  type: "boolean",
  values: booleanValue
};
const statusMediaModStatus110 = {
  id: 110,
  label: "Media mod status",
  description: "Media Mode Status (bitmasked)",
  type: "integer",
  values: [{
    id: 0,
    label: "Display (selfie) mod: 0, HDMI: 0, Media Mod Connected: False"
  }, {
    id: 1,
    label: "Display (selfie) mod: 0, HDMI: 0, Media Mod Connected: True"
  }, {
    id: 2,
    label: "Display (selfie) mod: 0, HDMI: 1, Media Mod Connected: False"
  }, {
    id: 3,
    label: "Display (selfie) mod: 0, HDMI: 1, Media Mod Connected: True"
  }, {
    id: 4,
    label: "Display (selfie) mod: 1, HDMI: 0, Media Mod Connected: False"
  }, {
    id: 5,
    label: "Display (selfie) mod: 1, HDMI: 0, Media Mod Connected: True"
  }, {
    id: 6,
    label: "Display (selfie) mod: 1, HDMI: 1, Media Mod Connected: False"
  }, {
    id: 7,
    label: "Display (selfie) mod: 1, HDMI: 1, Media Mod Connected: True"
  }]
};
const statusTurboTransfer113 = {
  id: 113,
  label: "Turbo transfer",
  description: "Is Turbo Transfer active?",
  type: "boolean",
  values: booleanValue
};
const allKnownStatuses = [statusInternalCameraPresent1, statusInternalBatteryLevel2, statusExternalBatteryPresent3, statusExternalBatteryLevel4, statusSystemHot6, statusSystemBusy8, statusQuickCaptureActive9, statusEncodingActive10, statusLcdLockActive11, statusVideoProgressCounter13, statusEnable17, statusState19, statusType20, statusPairTime21, statusState22, statusScanTimeMsec23, statusProvisionStatus24, statusRemoteControlVersion26, statusRemoteControlConnected27, statusPairing28, statusWlanSsid29, statusApSsid30, statusAppCount31, statusEnable32, statusSdStatus33, statusRemainingPhotos34, statusRemainingVideoTime35, statusNumGroupPhotos36, statusNumGroupVideos37, statusNumTotalPhotos38, statusNumTotalVideos39, statusDateTime40, statusOtaStatus41, statusDownloadCancelRequestPending42, statusCameraLocateActive45, statusMultiShotCountDown49, statusRemainingSpace54, statusSupported55, statusWifiBars56, statusCurrentTimeMsec57, statusNumHilights58, statusLastHilightTimeMsec59, statusNextPollMsec60, statusInContextualMenu63, statusRemainingTimelapseTime64, statusExposureSelectType65, statusExposureSelectX66, statusExposureSelectY67, statusGpsStatus68, statusApState69, statusInternalBatteryPercentage70, statusAccMicStatus74, statusDigitalZoom75, statusWirelessBand76, statusDigitalZoomActive77, statusMobileFriendlyVideo78, statusFirstTimeUse79, statusBand5ghzAvail81, statusSystemReady82, statusBattOkayForOta83, statusVideoLowTempAlert85, statusActualOrientation86, statusThermalMitigationMode87, statusZoomWhileEncoding88, statusCurrentMode89, statusLogsReady91, statusTimewarp1xActive92, statusActiveVideoPresets93, statusActivePhotoPresets94, statusActiveTimelapsePresets95, statusActivePresetsGroup96, statusActivePreset97, statusPresetModified98, statusRemainingLiveBursts99, statusNumTotalLiveBursts100, statusCaptureDelayActive101, statusMediaModMicStatus102, statusTimewarpSpeedRampActive103, statusLinuxCoreActive104, statusCameraLensType105, statusVideoHindsightCaptureActive106, statusScheduledPreset107, statusScheduledEnabled108, statusCreatingPreset109, statusMediaModStatus110, statusTurboTransfer113];
var SettingsModesGroups = /* @__PURE__ */ ((SettingsModesGroups2) => {
  SettingsModesGroups2[SettingsModesGroups2["video"] = 0] = "video";
  SettingsModesGroups2[SettingsModesGroups2["photo"] = 1] = "photo";
  SettingsModesGroups2[SettingsModesGroups2["timelapse"] = 2] = "timelapse";
  return SettingsModesGroups2;
})(SettingsModesGroups || {});
var SettingsModesVideo = /* @__PURE__ */ ((SettingsModesVideo2) => {
  SettingsModesVideo2[SettingsModesVideo2["video"] = 12] = "video";
  SettingsModesVideo2[SettingsModesVideo2["videoLooping"] = 15] = "videoLooping";
  return SettingsModesVideo2;
})(SettingsModesVideo || {});
var SettingsModesPhoto = /* @__PURE__ */ ((SettingsModesPhoto2) => {
  SettingsModesPhoto2[SettingsModesPhoto2["photoSingle"] = 17] = "photoSingle";
  SettingsModesPhoto2[SettingsModesPhoto2["photoNight"] = 18] = "photoNight";
  SettingsModesPhoto2[SettingsModesPhoto2["photoBurst"] = 19] = "photoBurst";
  return SettingsModesPhoto2;
})(SettingsModesPhoto || {});
var SettingsModesTimelapse = /* @__PURE__ */ ((SettingsModesTimelapse2) => {
  SettingsModesTimelapse2[SettingsModesTimelapse2["timelapseTimewarp"] = 24] = "timelapseTimewarp";
  SettingsModesTimelapse2[SettingsModesTimelapse2["timelapseVideo"] = 13] = "timelapseVideo";
  SettingsModesTimelapse2[SettingsModesTimelapse2["timelapsePhoto"] = 20] = "timelapsePhoto";
  SettingsModesTimelapse2[SettingsModesTimelapse2["nightlapse"] = 21] = "nightlapse";
  return SettingsModesTimelapse2;
})(SettingsModesTimelapse || {});
var SettingsModesMenus = /* @__PURE__ */ ((SettingsModesMenus2) => {
  SettingsModesMenus2[SettingsModesMenus2["galleryView"] = 4] = "galleryView";
  return SettingsModesMenus2;
})(SettingsModesMenus || {});
const SettingsModes = __spreadValues(__spreadValues(__spreadValues(__spreadValues({}, SettingsModesVideo), SettingsModesPhoto), SettingsModesTimelapse), SettingsModesMenus);
const settingVideoResolution2 = {
  id: 2,
  label: "Resolution",
  length: 1,
  values: [{
    id: 18,
    label: "4K (4:3)"
  }, {
    id: 6,
    label: "2.7K (4:3)"
  }, {
    id: 7,
    label: "1440 (4:3)"
  }, {
    id: 10,
    label: "960 (4:3)"
  }, {
    id: 1,
    label: "4K"
  }, {
    id: 4,
    label: "2.7K"
  }, {
    id: 9,
    label: "1080"
  }, {
    id: 12,
    label: "720"
  }]
};
const settingVideoFps3 = {
  id: 3,
  label: "FPS",
  length: 1,
  values: [{
    id: 0,
    label: "240"
  }, {
    id: 1,
    label: "120"
  }, {
    id: 5,
    label: "60"
  }, {
    id: 8,
    label: "30"
  }, {
    id: 10,
    label: "24"
  }]
};
const settingVideoFov4 = {
  id: 4,
  label: "FOV",
  length: 1,
  values: [{
    id: 4,
    label: "Linear"
  }, {
    id: 0,
    label: "Wide"
  }, {
    id: 3,
    label: "Super view"
  }]
};
const settingVideoInterval5 = {
  id: 5,
  label: "Interval",
  length: 1,
  values: [{
    id: 0,
    label: "0.5s"
  }, {
    id: 1,
    label: "1s"
  }, {
    id: 2,
    label: "2s"
  }, {
    id: 3,
    label: "5s"
  }, {
    id: 4,
    label: "10s"
  }, {
    id: 5,
    label: "30s"
  }, {
    id: 6,
    label: "60s"
  }]
};
const settingVideoInterval6 = {
  id: 6,
  label: "Interval",
  length: 1,
  values: [{
    id: 0,
    label: "MAX"
  }, {
    id: 1,
    label: "5m"
  }, {
    id: 2,
    label: "20m"
  }, {
    id: 3,
    label: "60m"
  }, {
    id: 4,
    label: "120m"
  }]
};
const settingVideoLowLight8 = {
  id: 8,
  label: "Low light",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "Auto"
  }]
};
const settingVideoProtune10 = {
  id: 10,
  label: "Protune",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "On"
  }]
};
const settingVideoWhiteBalance11 = {
  id: 11,
  label: "White Balance",
  length: 1,
  values: [{
    id: 0,
    label: "Auto"
  }, {
    id: 8,
    label: "2300K"
  }, {
    id: 9,
    label: "2800K"
  }, {
    id: 10,
    label: "3200K"
  }, {
    id: 5,
    label: "4000K"
  }, {
    id: 11,
    label: "4500K"
  }, {
    id: 12,
    label: "5000K"
  }, {
    id: 2,
    label: "5500K"
  }, {
    id: 7,
    label: "6000K"
  }, {
    id: 3,
    label: "6500K"
  }, {
    id: 4,
    label: "Native"
  }]
};
const settingVideoColor12 = {
  id: 12,
  label: "Color",
  length: 1,
  values: [{
    id: 0,
    label: "GoPro"
  }, {
    id: 1,
    label: "Flat"
  }]
};
const settingVideoIsoMax13 = {
  id: 13,
  label: "ISO max",
  length: 1,
  values: [{
    id: 0,
    label: "6400"
  }, {
    id: 3,
    label: "3200"
  }, {
    id: 1,
    label: "1600"
  }, {
    id: 4,
    label: "800"
  }, {
    id: 2,
    label: "400"
  }, {
    id: 7,
    label: "200"
  }, {
    id: 8,
    label: "100"
  }]
};
const settingVideoSharpness14 = {
  id: 14,
  label: "Sharpness",
  length: 1,
  values: [{
    id: 0,
    label: "High"
  }, {
    id: 1,
    label: "Medium"
  }, {
    id: 2,
    label: "Low"
  }]
};
const settingVideoEvComp15 = {
  id: 15,
  label: "EV comp",
  length: 1,
  values: [{
    id: 0,
    label: "+2"
  }, {
    id: 1,
    label: "+1.5"
  }, {
    id: 2,
    label: "+1"
  }, {
    id: 3,
    label: "+0.5"
  }, {
    id: 4,
    label: "0"
  }, {
    id: 5,
    label: "-0.5"
  }, {
    id: 6,
    label: "-1"
  }, {
    id: 7,
    label: "-1.5"
  }, {
    id: 8,
    label: "-2"
  }]
};
const settingPhotoFov17 = {
  id: 17,
  label: "FOV",
  length: 1,
  values: [{
    id: 0,
    label: "Wide"
  }, {
    id: 10,
    label: "Linear"
  }]
};
const settingPhotoShutter19 = {
  id: 19,
  label: "Shutter",
  length: 1,
  values: [{
    id: 0,
    label: "Auto"
  }, {
    id: 6,
    label: "30s"
  }, {
    id: 5,
    label: "20s"
  }, {
    id: 4,
    label: "15s"
  }, {
    id: 3,
    label: "10s"
  }, {
    id: 2,
    label: "5s"
  }, {
    id: 1,
    label: "2s"
  }]
};
const settingPhotoProtune21 = {
  id: 21,
  label: settingVideoProtune10.label,
  length: settingVideoProtune10.length,
  values: settingVideoProtune10.values
};
const settingPhotoWhiteBalance22 = {
  id: 22,
  label: settingVideoWhiteBalance11.label,
  length: settingVideoWhiteBalance11.length,
  values: settingVideoWhiteBalance11.values
};
const settingPhotoColor23 = {
  id: 23,
  label: settingVideoColor12.label,
  length: settingVideoColor12.length,
  values: settingVideoColor12.values
};
const settingPhotoIsoMax24 = {
  id: 24,
  label: settingVideoIsoMax13.label,
  length: 1,
  values: [{
    id: 0,
    label: "800"
  }, {
    id: 1,
    label: "400"
  }, {
    id: 2,
    label: "200"
  }, {
    id: 3,
    label: "100"
  }, {
    id: 4,
    label: "1600"
  }, {
    id: 5,
    label: "3200"
  }]
};
const settingPhotoSharpness25 = {
  id: 25,
  label: settingVideoSharpness14.label,
  length: settingVideoSharpness14.length,
  values: settingVideoSharpness14.values
};
const settingPhotoEvComp26 = {
  id: 26,
  label: settingVideoEvComp15.label,
  length: settingVideoEvComp15.length,
  values: settingVideoEvComp15.values
};
const settingMultishotFov28 = {
  id: 28,
  label: settingPhotoFov17.label,
  length: settingPhotoFov17.length,
  values: settingPhotoFov17.values
};
const settingMultishotBurstRate29 = {
  id: 29,
  label: "Burst Rate",
  length: 1,
  values: [{
    id: 9,
    label: "Auto"
  }, {
    id: 8,
    label: "30/6s"
  }, {
    id: 7,
    label: "30/3s"
  }, {
    id: 6,
    label: "30/2s"
  }, {
    id: 5,
    label: "30/1s"
  }, {
    id: 4,
    label: "10/3s"
  }, {
    id: 3,
    label: "10/2s"
  }, {
    id: 2,
    label: "10/1s"
  }, {
    id: 1,
    label: "5/1s"
  }, {
    id: 0,
    label: "3/1s"
  }]
};
const settingMultishotInterval30 = {
  id: 30,
  label: "Interval",
  length: 1,
  values: [{
    id: 0,
    label: "0.5s"
  }, {
    id: 1,
    label: "1s"
  }, {
    id: 2,
    label: "2s"
  }, {
    id: 5,
    label: "5s"
  }, {
    id: 10,
    label: "10s"
  }, {
    id: 30,
    label: "30s"
  }, {
    id: 60,
    label: "60s"
  }]
};
const settingMultishotShutter31 = {
  id: 31,
  label: settingPhotoShutter19.label,
  length: settingPhotoShutter19.length,
  values: settingPhotoShutter19.values
};
const settingMultishotInterval32 = {
  id: 32,
  label: "Interval",
  length: 4,
  values: [{
    id: (14 << 8) + 17,
    label: "Auto"
  }, {
    id: (0 << 8) + 4,
    label: "4s"
  }, {
    id: (0 << 8) + 5,
    label: "5s"
  }, {
    id: (0 << 8) + 10,
    label: "10s"
  }, {
    id: (0 << 8) + 20,
    label: "20s"
  }, {
    id: (0 << 8) + 60,
    label: "1m"
  }, {
    id: (0 << 8) + 120,
    label: "2m"
  }, {
    id: (1 << 8) + 44,
    label: "5m"
  }, {
    id: (7 << 8) + 8,
    label: "30m"
  }, {
    id: (14 << 8) + 16,
    label: "60m"
  }]
};
const settingMultishotProtune34 = {
  id: 34,
  label: settingVideoProtune10.label,
  length: settingVideoProtune10.length,
  values: settingVideoProtune10.values
};
const settingMultishotWhiteBalance35 = {
  id: 35,
  label: settingVideoWhiteBalance11.label,
  length: settingVideoWhiteBalance11.length,
  values: settingVideoWhiteBalance11.values
};
const settingMultishotColor36 = {
  id: 36,
  label: settingVideoColor12.label,
  length: settingVideoColor12.length,
  values: settingVideoColor12.values
};
const settingMultishotIsoMax37 = {
  id: 37,
  label: settingVideoIsoMax13.label,
  length: settingPhotoIsoMax24.length,
  values: settingPhotoIsoMax24.values
};
const settingMultishotSharpness38 = {
  id: 38,
  label: settingVideoSharpness14.label,
  length: settingVideoSharpness14.length,
  values: settingVideoSharpness14.values
};
const settingMultishotEvComp39 = {
  id: 39,
  label: settingVideoEvComp15.label,
  length: settingVideoEvComp15.length,
  values: settingVideoEvComp15.values
};
const settingGeneralTouchDisplayScreenSaver51 = {
  id: 51,
  label: "Touch Display Screen Saver",
  length: 1,
  values: [{
    id: 1,
    label: "1min"
  }, {
    id: 2,
    label: "2min"
  }, {
    id: 3,
    label: "3min"
  }, {
    id: 0,
    label: "Never"
  }]
};
const settingGeneralQuickCapture54 = {
  id: 54,
  label: "Quick Capture",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "On"
  }]
};
const settingVideoShutter73 = {
  id: 73,
  label: "Shutter",
  length: 1,
  values: [{
    id: 0,
    label: "Auto"
  }, {
    id: 8,
    label: "1/60"
  }, {
    id: 13,
    label: "1/120"
  }, {
    id: 18,
    label: "1/240"
  }, {
    id: 22,
    label: "1/480"
  }, {
    id: 23,
    label: "1/960"
  }]
};
const settingPhotoIsoMin75 = {
  id: 75,
  label: "ISO min",
  length: settingPhotoIsoMax24.length,
  values: settingPhotoIsoMax24.values
};
const settingMultishotIsoMin76 = {
  id: 76,
  label: settingPhotoIsoMin75.label,
  length: settingPhotoIsoMax24.length,
  values: settingPhotoIsoMax24.values
};
const settingVideoStabilization78 = {
  id: 78,
  label: "Stabilization",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "Auto"
  }]
};
const settingVideoMicrophone80 = {
  id: 80,
  label: "Microphone",
  length: 1,
  values: [{
    id: 2,
    label: "Auto"
  }, {
    id: 1,
    label: "Wind"
  }, {
    id: 0,
    label: "Stereo"
  }]
};
const settingVideoRawAudio81 = {
  id: 81,
  label: "Raw audio",
  length: 1,
  values: [{
    id: 3,
    label: "Off"
  }, {
    id: 0,
    label: "Low"
  }, {
    id: 1,
    label: "Medium"
  }, {
    id: 2,
    label: "High"
  }]
};
const settingGeneralRegionalGps83 = {
  id: 83,
  label: "Regional GPS",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "On"
  }]
};
const settingGeneralRegionalLanguage84 = {
  id: 84,
  label: "Regional Language",
  length: 1,
  values: [
    {
      id: 0,
      label: "English"
    },
    {
      id: 6,
      label: "French"
    }
  ]
};
const settingGeneralVoiceControlLanguage85 = {
  id: 85,
  label: "Voice Control Language",
  length: 1,
  values: [
    {
      id: 0,
      label: "English (US)"
    },
    {
      id: 1,
      label: "English (UK)"
    },
    {
      id: 13,
      label: "English (India)"
    }
  ]
};
const settingGeneralVoiceControl86 = {
  id: 86,
  label: "Voice Control",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "On"
  }]
};
const settingGeneralBeeps87 = {
  id: 87,
  label: "Beeps",
  length: 1,
  values: [{
    id: 0,
    label: "Mute"
  }, {
    id: 100,
    label: "High"
  }, {
    id: 70,
    label: "Medium"
  }, {
    id: 40,
    label: "Low"
  }]
};
const settingGeneralTouchDisplayBrightness88 = {
  id: 88,
  label: "Touch Display Brightness",
  length: 1,
  values: [
    {
      id: 100,
      label: "100%"
    },
    {
      id: 80,
      label: "80%"
    },
    {
      id: 10,
      label: "10%"
    }
  ]
};
const settingGeneralDefaultMode89 = {
  id: 89,
  label: "Default Mode",
  length: 1,
  values: [{
    id: 12,
    label: "Video"
  }, {
    id: 15,
    label: "Looping"
  }, {
    id: 17,
    label: "Photo"
  }, {
    id: 18,
    label: "Night"
  }, {
    id: 19,
    label: "Burst"
  }, {
    id: 24,
    label: "Timewarp Video"
  }, {
    id: 13,
    label: "Timelapse Video"
  }, {
    id: 20,
    label: "Timelapse Photo"
  }, {
    id: 21,
    label: "Nightlapse Photo"
  }]
};
const settingGeneralLeds91 = {
  id: 91,
  label: "LEDs",
  length: 1,
  values: [{
    id: 0,
    label: "All Off"
  }, {
    id: 1,
    label: "Front Off Only"
  }, {
    id: 2,
    label: "All On"
  }]
};
const settingsCurrentMode92 = {
  id: 92,
  label: "Current Mode",
  length: settingGeneralDefaultMode89.length,
  values: [...settingGeneralDefaultMode89.values, {
    id: 4,
    label: "Gallery view"
  }]
};
const settingPhotoShutter97 = {
  id: 97,
  label: "Shutter",
  length: 1,
  values: [{
    id: 0,
    label: "Auto"
  }, {
    id: 1,
    label: "1/125"
  }, {
    id: 2,
    label: "1/250"
  }, {
    id: 3,
    label: "1/500"
  }, {
    id: 4,
    label: "1/1000"
  }, {
    id: 5,
    label: "1/2000"
  }]
};
const settingPhotoRaw98 = {
  id: 98,
  label: "RAW",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "On"
  }]
};
const settingMultishotRaw99 = {
  id: 99,
  label: settingPhotoRaw98.label,
  length: settingPhotoRaw98.length,
  values: settingPhotoRaw98.values
};
const settingVideoIsoMin102 = {
  id: 102,
  label: settingPhotoIsoMin75.label,
  length: settingVideoIsoMax13.length,
  values: settingVideoIsoMax13.values
};
const settingGeneralWakeOnVoice104 = {
  id: 104,
  label: "Wake On Voice",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "On"
  }]
};
const settingGeneralVideoCompression106 = {
  id: 106,
  label: "Video Compression",
  length: 1,
  values: [{
    id: 0,
    label: "H264"
  }, {
    id: 1,
    label: "HEVC"
  }]
};
const settingVideoVideoTimer107 = {
  id: 107,
  label: "Video Timer",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "15s"
  }, {
    id: 2,
    label: "30s"
  }]
};
const settingVideoResolutionFormat108 = {
  id: 108,
  label: "Resolution format",
  length: 1,
  values: [{
    id: 0,
    label: "4:3"
  }, {
    id: 1,
    label: "16:9"
  }]
};
const settingPhotoSuperPhoto109 = {
  id: 109,
  label: "Super Photo",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "Auto"
  }, {
    id: 2,
    label: "HDR On"
  }]
};
const settingVideoSpeed111 = {
  id: 111,
  label: "Speed",
  length: 1,
  values: [{
    id: 0,
    label: "15x"
  }, {
    id: 1,
    label: "30x"
  }, {
    id: 7,
    label: "2x"
  }, {
    id: 8,
    label: "5x"
  }, {
    id: 9,
    label: "10x"
  }]
};
const settingGeneralTouchDisplayLandscapeLock112 = {
  id: 112,
  label: "Touch Display Landscape Lock",
  length: 1,
  values: [{
    id: 0,
    label: "Off"
  }, {
    id: 1,
    label: "Up"
  }, {
    id: 2,
    label: "Down"
  }]
};
const videoModeKnownSettings = [settingVideoResolution2, settingVideoFps3, settingVideoFov4, settingVideoLowLight8, settingVideoStabilization78, settingVideoProtune10, settingVideoShutter73, settingVideoEvComp15, settingVideoWhiteBalance11, settingVideoIsoMin102, settingVideoIsoMax13, settingVideoSharpness14, settingVideoColor12, settingVideoRawAudio81, settingVideoMicrophone80, settingVideoVideoTimer107, settingVideoResolutionFormat108];
const loopingModeKnownSettings = [settingVideoResolution2, settingVideoFps3, settingVideoFov4, settingVideoInterval6, settingVideoLowLight8, settingVideoStabilization78];
const timewarpModeKnownSettings = [
  settingVideoResolution2,
  settingVideoSpeed111,
  settingVideoFov4
];
const timelapseVideoModeKnownSettings = [settingVideoResolution2, settingVideoFov4, settingVideoInterval5];
const timelapsePhotoModeKnownSettings = [settingMultishotInterval30, settingMultishotFov28, settingMultishotEvComp39, settingMultishotWhiteBalance35, settingMultishotIsoMin76, settingMultishotIsoMax37, settingMultishotSharpness38, settingMultishotColor36, settingMultishotProtune34];
const nightlapseModeKnownSettings = [settingMultishotIsoMin76, settingMultishotIsoMax37, settingMultishotShutter31, settingMultishotInterval32, settingMultishotFov28, settingMultishotProtune34, settingMultishotWhiteBalance35, settingMultishotRaw99];
const photoNightModeKnownSettings = [settingPhotoShutter19, settingPhotoFov17, settingPhotoEvComp26, settingPhotoWhiteBalance22, settingPhotoIsoMin75, settingPhotoIsoMax24, settingPhotoSharpness25, settingPhotoColor23, settingPhotoProtune21, settingPhotoRaw98];
const photoBurstModeKnownSettings = [settingMultishotBurstRate29, settingMultishotFov28, settingMultishotProtune34, settingMultishotEvComp39, settingMultishotWhiteBalance35, settingMultishotIsoMin76, settingMultishotIsoMax37, settingMultishotSharpness38, settingMultishotColor36];
const photoSingleModeKnownSettings = [settingPhotoFov17, settingPhotoSuperPhoto109, settingPhotoProtune21, settingPhotoShutter97, settingPhotoEvComp26, settingPhotoWhiteBalance22, settingPhotoIsoMin75, settingPhotoIsoMax24, settingPhotoSharpness25, settingPhotoColor23];
const generalSettings = [settingGeneralQuickCapture54, settingGeneralBeeps87, settingGeneralDefaultMode89, settingGeneralLeds91, settingGeneralVideoCompression106, settingGeneralVoiceControl86, settingGeneralWakeOnVoice104, settingGeneralVoiceControlLanguage85, settingGeneralTouchDisplayLandscapeLock112, settingGeneralTouchDisplayScreenSaver51, settingGeneralTouchDisplayBrightness88, settingGeneralRegionalGps83, settingGeneralRegionalLanguage84];
const allKnownSettings = [...videoModeKnownSettings, ...loopingModeKnownSettings, ...timewarpModeKnownSettings, ...timelapseVideoModeKnownSettings, ...timelapsePhotoModeKnownSettings, ...nightlapseModeKnownSettings, ...photoNightModeKnownSettings, ...photoBurstModeKnownSettings, ...photoSingleModeKnownSettings, ...generalSettings];
const makeSettingSelector = (settingMetadata) => createSelector((state) => state.goproSettingsReducer.settings[settingMetadata.id], (settingValue) => {
  const value = settingValue == null ? void 0 : settingValue.value;
  if (value === void 0)
    return void 0;
  const valueMetadata = settingMetadata.values.find((valueMeta) => valueMeta.id === value);
  return {
    settingId: settingMetadata.id,
    settingLabel: settingMetadata.label,
    value,
    valueLabel: valueMetadata == null ? void 0 : valueMetadata.label,
    possibleValues: settingMetadata.values
  };
});
const selectSettingVideoResolution2 = makeSettingSelector(settingVideoResolution2);
const selectSettingVideoFps3 = makeSettingSelector(settingVideoFps3);
const selectSettingVideoFov4 = makeSettingSelector(settingVideoFov4);
const selectSettingInterval5 = makeSettingSelector(settingVideoInterval5);
const selectSettingVideoInterval6 = makeSettingSelector(settingVideoInterval6);
const selectSettingVideoLowLight8 = makeSettingSelector(settingVideoLowLight8);
const selectSettingVideoProtune10 = makeSettingSelector(settingVideoProtune10);
const selectSettingVideoWhiteBalance11 = makeSettingSelector(settingVideoWhiteBalance11);
const selectSettingVideoColor12 = makeSettingSelector(settingVideoColor12);
const selectSettingVideoIsoMax13 = makeSettingSelector(settingVideoIsoMax13);
const selectSettingVideoSharpness14 = makeSettingSelector(settingVideoSharpness14);
const selectSettingVideoEvComp15 = makeSettingSelector(settingVideoEvComp15);
const selectSettingPhotoFov17 = makeSettingSelector(settingPhotoFov17);
const selectSettingPhotoShutter19 = makeSettingSelector(settingPhotoShutter19);
const selectSettingPhotoProtune21 = makeSettingSelector(settingPhotoProtune21);
const selectSettingPhotoWhiteBalance22 = makeSettingSelector(settingPhotoWhiteBalance22);
const selectSettingPhotoColor23 = makeSettingSelector(settingPhotoColor23);
const selectSettingPhotoIsoMax24 = makeSettingSelector(settingPhotoIsoMax24);
const selectSettingPhotoSharpness25 = makeSettingSelector(settingPhotoSharpness25);
const selectSettingPhotoEvComp26 = makeSettingSelector(settingPhotoEvComp26);
const selectSettingMultishotFov28 = makeSettingSelector(settingMultishotFov28);
const selectSettingMultishotBurstRate29 = makeSettingSelector(settingMultishotBurstRate29);
const selectSettingMultishotInterval30 = makeSettingSelector(settingMultishotInterval30);
const selectSettingMultishotShutter31 = makeSettingSelector(settingMultishotShutter31);
const selectSettingMultishotInterval32 = makeSettingSelector(settingMultishotInterval32);
const selectSettingMultishotProtune34 = makeSettingSelector(settingMultishotProtune34);
const selectSettingMultishotWhiteBalance35 = makeSettingSelector(settingMultishotWhiteBalance35);
const selectSettingMultishotColor36 = makeSettingSelector(settingMultishotColor36);
const selectSettingMultishotIsoMax37 = makeSettingSelector(settingMultishotIsoMax37);
const selectSettingMultishotSharpness38 = makeSettingSelector(settingMultishotSharpness38);
const selectSettingMultishotEvComp39 = makeSettingSelector(settingMultishotEvComp39);
const selectSettingGeneralTouchDisplayScreenSaver51 = makeSettingSelector(settingGeneralTouchDisplayScreenSaver51);
const selectSettingGeneralQuickCapture54 = makeSettingSelector(settingGeneralQuickCapture54);
const selectSettingVideoShutter73 = makeSettingSelector(settingVideoShutter73);
const selectSettingPhotoIsoMin75 = makeSettingSelector(settingPhotoIsoMin75);
const selectSettingMultishotIsoMin76 = makeSettingSelector(settingMultishotIsoMin76);
const selectSettingVideoStabilization78 = makeSettingSelector(settingVideoStabilization78);
const selectSettingVideoMicrophone80 = makeSettingSelector(settingVideoMicrophone80);
const selectSettingVideoRawAudio81 = makeSettingSelector(settingVideoRawAudio81);
const selectSettingGeneralRegionalGps83 = makeSettingSelector(settingGeneralRegionalGps83);
const selectSettingGeneralRegionalLanguage84 = makeSettingSelector(settingGeneralRegionalLanguage84);
const selectSettingGeneralVoiceControlLanguage85 = makeSettingSelector(settingGeneralVoiceControlLanguage85);
const selectSettingGeneralVoiceControl86 = makeSettingSelector(settingGeneralVoiceControl86);
const selectSettingGeneralBeeps87 = makeSettingSelector(settingGeneralBeeps87);
const selectSettingGeneralTouchDisplayBrightness88 = makeSettingSelector(settingGeneralTouchDisplayBrightness88);
const selectSettingGeneralDefaultMode89 = makeSettingSelector(settingGeneralDefaultMode89);
const selectSettingGeneralLeds91 = makeSettingSelector(settingGeneralLeds91);
const selectSettingsCurrentMode92 = makeSettingSelector(settingsCurrentMode92);
const selectSettingPhotoShutter97 = makeSettingSelector(settingPhotoShutter97);
const selectSettingPhotoRaw98 = makeSettingSelector(settingPhotoRaw98);
const selectSettingMultishotRaw99 = makeSettingSelector(settingMultishotRaw99);
const selectSettingVideoIsoMin102 = makeSettingSelector(settingVideoIsoMin102);
const selectSettingGeneralWakeOnVoice104 = makeSettingSelector(settingGeneralWakeOnVoice104);
const selectSettingGeneralVideoCompression106 = makeSettingSelector(settingGeneralVideoCompression106);
const selectSettingVideoVideoTimer107 = makeSettingSelector(settingVideoVideoTimer107);
const selectSettingVideoResolutionFormat108 = makeSettingSelector(settingVideoResolutionFormat108);
const selectSettingPhotoSuperPhoto109 = makeSettingSelector(settingPhotoSuperPhoto109);
const selectSettingVideoSpeed111 = makeSettingSelector(settingVideoSpeed111);
const selectSettingGeneralTouchDisplayLandscapeLock112 = makeSettingSelector(settingGeneralTouchDisplayLandscapeLock112);
const selectVideoModeSettings = createSelector(selectSettingVideoResolution2, selectSettingVideoFps3, selectSettingVideoFov4, selectSettingVideoLowLight8, selectSettingVideoStabilization78, selectSettingVideoProtune10, selectSettingVideoShutter73, selectSettingVideoEvComp15, selectSettingVideoWhiteBalance11, selectSettingVideoIsoMin102, selectSettingVideoIsoMax13, selectSettingVideoSharpness14, selectSettingVideoColor12, selectSettingVideoRawAudio81, selectSettingVideoMicrophone80, selectSettingVideoVideoTimer107, selectSettingVideoResolutionFormat108, (settingResolution2Value, settingFps3Value, settingFov4Value, settingLowLight8Value, settingStabilization78Value, settingProtune10Value, settingShutter73Value, settingEvComp15Value, settingWhiteBalance11Value, settingIsoMin102Value, settingIsoMax13Value, settingSharpness14Value, settingColor12Value, settingRawAudio81Value, settingMicrophone80Value, settingVideoTimer107Value, settingResolutionFormat108Value) => {
  const settings2 = [settingVideoTimer107Value, settingResolutionFormat108Value, settingResolution2Value, settingFps3Value, settingFov4Value, settingLowLight8Value, settingStabilization78Value, settingProtune10Value];
  if (settingProtune10Value == null ? void 0 : settingProtune10Value.value) {
    settings2.push(...[settingShutter73Value, settingEvComp15Value, settingWhiteBalance11Value, settingIsoMin102Value, settingIsoMax13Value, settingSharpness14Value, settingColor12Value, settingRawAudio81Value, settingMicrophone80Value]);
  }
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectLoopingModeSettings = createSelector(selectSettingVideoResolution2, selectSettingVideoFps3, selectSettingVideoFov4, selectSettingVideoInterval6, selectSettingVideoLowLight8, selectSettingVideoStabilization78, (settingVideoResolution2Value, settingVideoFps3Value, settingVideoFov4Value, settingVideoInterval6Value, settingVideoLowLight8Value, settingVideoStabilization78Value) => {
  const settings2 = [settingVideoResolution2Value, settingVideoFps3Value, settingVideoFov4Value, settingVideoInterval6Value, settingVideoLowLight8Value, settingVideoStabilization78Value];
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectTimewarpModeSettings = createSelector(selectSettingVideoResolution2, selectSettingVideoFov4, selectSettingVideoSpeed111, (settingVideoResolution2Value, settingVideoFov4Value, settingVideoSpeed111Value) => {
  const settings2 = [settingVideoResolution2Value, settingVideoFov4Value, settingVideoSpeed111Value];
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectTimelapseVideoModeSettings = createSelector(selectSettingVideoResolution2, selectSettingVideoFov4, selectSettingInterval5, (settingVideoResolution2Value, settingVideoFov4Value, settingInterval5Value) => {
  const settings2 = [settingVideoResolution2Value, settingVideoFov4Value, settingInterval5Value];
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectTimelapsePhotoModeSettings = createSelector(selectSettingMultishotInterval30, selectSettingMultishotFov28, selectSettingMultishotEvComp39, selectSettingMultishotWhiteBalance35, selectSettingMultishotIsoMin76, selectSettingMultishotIsoMax37, selectSettingMultishotSharpness38, selectSettingMultishotColor36, selectSettingMultishotProtune34, (settingMultishotInterval30Value, settingMultishotFov28Value, settingMultishotEvComp39Value, settingMultishotWhiteBalance35Value, settingMultishotIsoMin76Value, settingMultishotIsoMax37Value, settingMultishotSharpness38Value, settingMultishotColor36Value, settingMultishotProtune34Value) => {
  const settings2 = [
    settingMultishotInterval30Value,
    settingMultishotFov28Value,
    settingMultishotProtune34Value
  ];
  if (settingMultishotEvComp39Value == null ? void 0 : settingMultishotEvComp39Value.value) {
    settings2.push(...[settingMultishotEvComp39Value, settingMultishotWhiteBalance35Value, settingMultishotIsoMin76Value, settingMultishotIsoMax37Value, settingMultishotSharpness38Value, settingMultishotColor36Value]);
  }
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectNightlapseModeSettings = createSelector(selectSettingMultishotFov28, selectSettingMultishotShutter31, selectSettingMultishotInterval32, selectSettingMultishotProtune34, selectSettingMultishotWhiteBalance35, selectSettingMultishotIsoMax37, selectSettingMultishotIsoMin76, selectSettingMultishotRaw99, (settingMultishotFov28Value, settingMultishotShutter31Value, settingMultishotInterval32Value, settingMultishotProtune34Value, settingMultishotWhiteBalance35Value, settingMultishotIsoMax37Value, settingMultishotIsoMin76Value, settingMultishotRaw99Value) => {
  const settings2 = [settingMultishotShutter31Value, settingMultishotInterval32Value, settingMultishotFov28Value, settingMultishotRaw99Value, settingMultishotProtune34Value];
  if (settingMultishotProtune34Value == null ? void 0 : settingMultishotProtune34Value.value) {
    settings2.push(...[
      settingMultishotWhiteBalance35Value,
      settingMultishotIsoMin76Value,
      settingMultishotIsoMax37Value
    ]);
  }
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectPhotoNightModeSettings = createSelector(selectSettingPhotoFov17, selectSettingPhotoShutter19, selectSettingPhotoProtune21, selectSettingPhotoWhiteBalance22, selectSettingPhotoColor23, selectSettingPhotoIsoMax24, selectSettingPhotoSharpness25, selectSettingPhotoEvComp26, selectSettingPhotoIsoMin75, selectSettingPhotoRaw98, (settingPhotoFov17Value, settingPhotoShutter19Value, settingPhotoProtune21Value, settingPhotoWhiteBalance22Value, settingPhotoColor23Value, settingPhotoIsoMax24Value, settingPhotoSharpness25Value, settingPhotoEvComp26Value, settingPhotoIsoMin75Value, settingPhotoRaw98Value) => {
  const settings2 = [settingPhotoShutter19Value, settingPhotoFov17Value, settingPhotoRaw98Value, settingPhotoProtune21Value];
  if (settingPhotoProtune21Value == null ? void 0 : settingPhotoProtune21Value.value) {
    settings2.push(...[settingPhotoEvComp26Value, settingPhotoWhiteBalance22Value, settingPhotoIsoMin75Value, settingPhotoIsoMax24Value, settingPhotoSharpness25Value, settingPhotoColor23Value]);
  }
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectPhotoBurstModeSettings = createSelector(selectSettingMultishotFov28, selectSettingMultishotBurstRate29, selectSettingMultishotProtune34, selectSettingMultishotWhiteBalance35, selectSettingMultishotColor36, selectSettingMultishotIsoMax37, selectSettingMultishotSharpness38, selectSettingMultishotEvComp39, selectSettingMultishotIsoMin76, (settingMultishotFov28Value, settingMultishotBurstRate29Value, settingMultishotProtune34Value, settingMultishotWhiteBalance35Value, settingMultishotColor36Value, settingMultishotIsoMax37Value, settingMultishotSharpness38Value, settingMultishotEvComp39Value, settingMultishotIsoMin76Value) => {
  const settings2 = [settingMultishotBurstRate29Value, settingMultishotFov28Value, settingMultishotProtune34Value];
  if (settingMultishotProtune34Value == null ? void 0 : settingMultishotProtune34Value.value) {
    settings2.push(...[settingMultishotEvComp39Value, settingMultishotWhiteBalance35Value, settingMultishotIsoMin76Value, settingMultishotIsoMax37Value, settingMultishotSharpness38Value, settingMultishotColor36Value]);
  }
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
const selectPhotoSingleModeSettings = createSelector(selectSettingPhotoFov17, selectSettingPhotoProtune21, selectSettingPhotoWhiteBalance22, selectSettingPhotoColor23, selectSettingPhotoIsoMax24, selectSettingPhotoSharpness25, selectSettingPhotoEvComp26, selectSettingPhotoIsoMin75, selectSettingPhotoShutter97, selectSettingPhotoSuperPhoto109, (settingPhotoFov17Value, settingPhotoProtune21Value, settingPhotoWhiteBalance22Value, settingPhotoColor23Value, settingPhotoIsoMax24Value, settingPhotoSharpness25Value, settingPhotoEvComp26Value, settingPhotoIsoMin75Value, settingPhotoShutter97Value, settingPhotoSuperPhoto109Value) => {
  const settings2 = [
    settingPhotoFov17Value,
    settingPhotoSuperPhoto109Value,
    settingPhotoProtune21Value
  ];
  if (settingPhotoProtune21Value == null ? void 0 : settingPhotoProtune21Value.value) {
    settings2.push(...[settingPhotoShutter97Value, settingPhotoEvComp26Value, settingPhotoWhiteBalance22Value, settingPhotoIsoMin75Value, settingPhotoIsoMax24Value, settingPhotoSharpness25Value, settingPhotoColor23Value]);
  }
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
createSelector(selectSettingsCurrentMode92, selectVideoModeSettings, selectLoopingModeSettings, selectPhotoSingleModeSettings, selectPhotoBurstModeSettings, selectPhotoNightModeSettings, selectTimewarpModeSettings, selectTimelapseVideoModeSettings, selectTimelapsePhotoModeSettings, selectNightlapseModeSettings, (currentMode, videoModeSettings, loopingModeSettings, photoSingleModeSettings, photoBurstModeSettings, photoNightModeSettings, timewarpModeSettings, timelapseVideoModeSettings, timelapsePhotoModeSettings, nightlapseModeSettings) => {
  switch (currentMode == null ? void 0 : currentMode.value) {
    case SettingsModes.video:
      return videoModeSettings;
    case SettingsModes.videoLooping:
      return loopingModeSettings;
    case SettingsModes.photoSingle:
      return photoSingleModeSettings;
    case SettingsModes.photoNight:
      return photoNightModeSettings;
    case SettingsModes.photoBurst:
      return photoBurstModeSettings;
    case SettingsModes.timelapseTimewarp:
      return timewarpModeSettings;
    case SettingsModes.timelapseVideo:
      return timelapseVideoModeSettings;
    case SettingsModes.timelapsePhoto:
      return timelapsePhotoModeSettings;
    case SettingsModes.nightlapse:
      return nightlapseModeSettings;
    default:
      return [];
  }
});
createSelector(selectSettingGeneralTouchDisplayScreenSaver51, selectSettingGeneralQuickCapture54, selectSettingGeneralRegionalGps83, selectSettingGeneralRegionalLanguage84, selectSettingGeneralVoiceControlLanguage85, selectSettingGeneralVoiceControl86, selectSettingGeneralBeeps87, selectSettingGeneralTouchDisplayBrightness88, selectSettingGeneralDefaultMode89, selectSettingGeneralLeds91, selectSettingGeneralWakeOnVoice104, selectSettingGeneralVideoCompression106, selectSettingGeneralTouchDisplayLandscapeLock112, (settingGeneralTouchDisplayScreenSaver51Value, settingGeneralQuickCapture54Value, settingGeneralRegionalGps83Value, settingGeneralRegionalLanguage84Value, settingGeneralVoiceControlLanguage85Value, settingGeneralVoiceControl86Value, settingGeneralBeeps87Value, settingGeneralTouchDisplayBrightness88Value, settingGeneralDefaultMode89Value, settingGeneralLeds91Value, settingGeneralWakeOnVoice104Value, settingGeneralVideoCompression106Value, settingGeneralTouchDisplayLandscapeLock112Value) => {
  const settings2 = [settingGeneralTouchDisplayScreenSaver51Value, settingGeneralQuickCapture54Value, settingGeneralRegionalGps83Value, settingGeneralRegionalLanguage84Value, settingGeneralVoiceControlLanguage85Value, settingGeneralVoiceControl86Value, settingGeneralBeeps87Value, settingGeneralTouchDisplayBrightness88Value, settingGeneralDefaultMode89Value, settingGeneralLeds91Value, settingGeneralWakeOnVoice104Value, settingGeneralVideoCompression106Value, settingGeneralTouchDisplayLandscapeLock112Value];
  return settings2.filter((setting) => setting !== void 0).map((x) => x);
});
createSelector(selectSettingsCurrentMode92, (currentMode) => {
  if (currentMode === void 0)
    return void 0;
  return {
    id: currentMode.value,
    label: currentMode.valueLabel
  };
});
const selectCurrentModeGroup = createSelector(selectSettingsCurrentMode92, (currentMode) => {
  switch (currentMode == null ? void 0 : currentMode.value) {
    case SettingsModes.video:
      return SettingsModesGroups.video;
    case SettingsModes.videoLooping:
      return SettingsModesGroups.video;
    case SettingsModes.photoSingle:
      return SettingsModesGroups.photo;
    case SettingsModes.photoNight:
      return SettingsModesGroups.photo;
    case SettingsModes.photoBurst:
      return SettingsModesGroups.photo;
    case SettingsModes.timelapseTimewarp:
      return SettingsModesGroups.timelapse;
    case SettingsModes.timelapseVideo:
      return SettingsModesGroups.timelapse;
    case SettingsModes.timelapsePhoto:
      return SettingsModesGroups.timelapse;
    case SettingsModes.nightlapse:
      return SettingsModesGroups.timelapse;
    default:
      return SettingsModesGroups.video;
  }
});
const makeSettingsPreviewMainTexts = (mainSettings) => createSelector(...mainSettings, (...selectors) => {
  return selectors.map((selector) => selector == null ? void 0 : selector.valueLabel).filter((x) => x !== void 0).map((x) => x);
});
const selectSettingsPreviewMainTextsVideo = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFps3, selectSettingVideoFov4]);
const selectSettingsPreviewMainTextsLooping = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFps3, selectSettingVideoFov4]);
const selectSettingsPreviewMainTextsPhotoSingle = makeSettingsPreviewMainTexts([selectSettingPhotoFov17]);
const selectSettingsPreviewMainTextsPhotoNight = makeSettingsPreviewMainTexts([selectSettingPhotoFov17]);
const selectSettingsPreviewMainTextsPhotoBurst = makeSettingsPreviewMainTexts([selectSettingPhotoFov17]);
const selectSettingsPreviewMainTextsTimelapseTimewarp = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFov4, selectSettingVideoSpeed111]);
const selectSettingsPreviewMainTextsTimelapseVideo = makeSettingsPreviewMainTexts([selectSettingVideoResolution2, selectSettingVideoFov4, selectSettingInterval5]);
const selectSettingsPreviewMainTextsTimelapsePhoto = makeSettingsPreviewMainTexts([selectSettingMultishotInterval30, selectSettingMultishotFov28]);
const selectSettingsPreviewMainTextsNightlapse = makeSettingsPreviewMainTexts([selectSettingMultishotFov28, selectSettingMultishotShutter31, selectSettingMultishotInterval32]);
createSelector(selectSettingsCurrentMode92, selectSettingsPreviewMainTextsVideo, selectSettingsPreviewMainTextsLooping, selectSettingsPreviewMainTextsPhotoSingle, selectSettingsPreviewMainTextsPhotoNight, selectSettingsPreviewMainTextsPhotoBurst, selectSettingsPreviewMainTextsTimelapseTimewarp, selectSettingsPreviewMainTextsTimelapseVideo, selectSettingsPreviewMainTextsTimelapsePhoto, selectSettingsPreviewMainTextsNightlapse, (currentMode, settingsPreviewMainTextsVideo, settingsPreviewMainTextsLooping, settingsPreviewMainTextsPhotoSingle, settingsPreviewMainTextsPhotoNight, settingsPreviewMainTextsPhotoBurst, settingsPreviewMainTextsTimelapseTimewarp, settingsPreviewMainTextsTimelapseVideo, settingsPreviewMainTextsTimelapsePhoto, settingsPreviewMainTextsNightlapse) => {
  switch (currentMode == null ? void 0 : currentMode.value) {
    case SettingsModes.video:
      return settingsPreviewMainTextsVideo;
    case SettingsModes.videoLooping:
      return settingsPreviewMainTextsLooping;
    case SettingsModes.photoSingle:
      return settingsPreviewMainTextsPhotoSingle;
    case SettingsModes.photoNight:
      return settingsPreviewMainTextsPhotoNight;
    case SettingsModes.photoBurst:
      return settingsPreviewMainTextsPhotoBurst;
    case SettingsModes.timelapseTimewarp:
      return settingsPreviewMainTextsTimelapseTimewarp;
    case SettingsModes.timelapseVideo:
      return settingsPreviewMainTextsTimelapseVideo;
    case SettingsModes.timelapsePhoto:
      return settingsPreviewMainTextsTimelapsePhoto;
    case SettingsModes.nightlapse:
      return settingsPreviewMainTextsNightlapse;
    default:
      return [];
  }
});
const selectIsSettingsInitialized = createSelector(selectSettingVideoResolution2, (videoResolution) => videoResolution !== void 0);
const makeStatusSelector = (statusMetadata) => createSelector((state) => state.goproSettingsReducer.statuses[statusMetadata.id], (statusValue) => {
  if (statusValue === void 0)
    return void 0;
  const valueMetadata = statusMetadata.values.find((valueMeta) => valueMeta.id === statusValue);
  return {
    settingId: statusMetadata.id,
    settingLabel: statusMetadata.label,
    statusValue,
    valueLabel: valueMetadata == null ? void 0 : valueMetadata.label,
    possibleValues: statusMetadata.values
  };
});
makeStatusSelector(statusInternalCameraPresent1);
const selectStatusInternalBatteryLevel2 = makeStatusSelector(statusInternalBatteryLevel2);
makeStatusSelector(statusExternalBatteryPresent3);
makeStatusSelector(statusExternalBatteryLevel4);
makeStatusSelector(statusSystemHot6);
makeStatusSelector(statusSystemBusy8);
makeStatusSelector(statusQuickCaptureActive9);
const selectStatusEncodingActive10 = makeStatusSelector(statusEncodingActive10);
makeStatusSelector(statusLcdLockActive11);
const selectStatusVideoProgressCounter13 = makeStatusSelector(statusVideoProgressCounter13);
makeStatusSelector(statusEnable17);
makeStatusSelector(statusState19);
makeStatusSelector(statusType20);
makeStatusSelector(statusPairTime21);
makeStatusSelector(statusState22);
makeStatusSelector(statusScanTimeMsec23);
makeStatusSelector(statusProvisionStatus24);
makeStatusSelector(statusRemoteControlVersion26);
makeStatusSelector(statusRemoteControlConnected27);
makeStatusSelector(statusPairing28);
makeStatusSelector(statusWlanSsid29);
makeStatusSelector(statusApSsid30);
makeStatusSelector(statusAppCount31);
makeStatusSelector(statusEnable32);
const selectStatusSdStatus33 = makeStatusSelector(statusSdStatus33);
const selectStatusRemainingPhotos34 = makeStatusSelector(statusRemainingPhotos34);
const selectStatusRemainingVideoTime35 = makeStatusSelector(statusRemainingVideoTime35);
makeStatusSelector(statusNumGroupPhotos36);
makeStatusSelector(statusNumGroupVideos37);
makeStatusSelector(statusNumTotalPhotos38);
makeStatusSelector(statusNumTotalVideos39);
makeStatusSelector(statusDateTime40);
makeStatusSelector(statusOtaStatus41);
makeStatusSelector(statusDownloadCancelRequestPending42);
makeStatusSelector(statusLegacyCurrentPresetGroup43);
makeStatusSelector(statusLegacyCurrentPresetGroupChild44);
makeStatusSelector(statusCameraLocateActive45);
makeStatusSelector(statusMultiShotCountDown49);
makeStatusSelector(statusRemainingSpace54);
makeStatusSelector(statusSupported55);
makeStatusSelector(statusWifiBars56);
makeStatusSelector(statusCurrentTimeMsec57);
makeStatusSelector(statusNumHilights58);
makeStatusSelector(statusLastHilightTimeMsec59);
makeStatusSelector(statusNextPollMsec60);
makeStatusSelector(statusInContextualMenu63);
makeStatusSelector(statusRemainingTimelapseTime64);
makeStatusSelector(statusExposureSelectType65);
makeStatusSelector(statusExposureSelectX66);
makeStatusSelector(statusExposureSelectY67);
makeStatusSelector(statusGpsStatus68);
const selectStatusApState69 = makeStatusSelector(statusApState69);
const selectStatusInternalBatteryPercentage70 = makeStatusSelector(statusInternalBatteryPercentage70);
const selectStatusLegacyLastPhotoMode72 = makeStatusSelector(statusLegacyLastPhotoMode72);
const selectStatusLegacyLastVideoMode71 = makeStatusSelector(statusLegacyLastVideoMode71);
const selectStatusLegacyLastTimelapseMode73 = makeStatusSelector(statusLegacyLastTimelapseMode73);
makeStatusSelector(statusAccMicStatus74);
makeStatusSelector(statusDigitalZoom75);
makeStatusSelector(statusWirelessBand76);
makeStatusSelector(statusDigitalZoomActive77);
makeStatusSelector(statusMobileFriendlyVideo78);
makeStatusSelector(statusFirstTimeUse79);
makeStatusSelector(statusBand5ghzAvail81);
makeStatusSelector(statusSystemReady82);
makeStatusSelector(statusBattOkayForOta83);
makeStatusSelector(statusVideoLowTempAlert85);
makeStatusSelector(statusActualOrientation86);
makeStatusSelector(statusThermalMitigationMode87);
makeStatusSelector(statusZoomWhileEncoding88);
makeStatusSelector(statusCurrentMode89);
makeStatusSelector(statusLogsReady91);
makeStatusSelector(statusTimewarp1xActive92);
makeStatusSelector(statusActiveVideoPresets93);
makeStatusSelector(statusActivePhotoPresets94);
makeStatusSelector(statusActiveTimelapsePresets95);
makeStatusSelector(statusActivePresetsGroup96);
makeStatusSelector(statusActivePreset97);
makeStatusSelector(statusPresetModified98);
makeStatusSelector(statusRemainingLiveBursts99);
makeStatusSelector(statusNumTotalLiveBursts100);
makeStatusSelector(statusCaptureDelayActive101);
makeStatusSelector(statusMediaModMicStatus102);
makeStatusSelector(statusTimewarpSpeedRampActive103);
makeStatusSelector(statusLinuxCoreActive104);
makeStatusSelector(statusCameraLensType105);
makeStatusSelector(statusVideoHindsightCaptureActive106);
makeStatusSelector(statusScheduledPreset107);
makeStatusSelector(statusScheduledEnabled108);
makeStatusSelector(statusCreatingPreset109);
makeStatusSelector(statusMediaModStatus110);
makeStatusSelector(statusTurboTransfer113);
const selectIsBatteryCharging = createSelector(selectStatusInternalBatteryLevel2, (batteryLevelStatus) => (batteryLevelStatus == null ? void 0 : batteryLevelStatus.statusValue) === 4);
function statusAsNumber(value) {
  if (typeof value === "number")
    return value;
  throw new Error(`Status is not number, did API change? ${value} ${typeof value}`);
}
const selectBatteryPercentage = createSelector(selectStatusInternalBatteryPercentage70, (batteryPercentage) => statusAsNumber(batteryPercentage == null ? void 0 : batteryPercentage.statusValue));
const selectStorageRemainingTimeText = createSelector(selectStatusRemainingVideoTime35, selectStatusRemainingPhotos34, selectCurrentModeGroup, (videoRemainingTime, photosRemaining, currentModeGroup) => {
  const isVideoMode = currentModeGroup !== SettingsModesGroups.photo;
  if (isVideoMode) {
    const videoRemainingSeconds = statusAsNumber(videoRemainingTime == null ? void 0 : videoRemainingTime.statusValue);
    const videoRemainingMinutes = Math.floor(videoRemainingSeconds / 60) % 60;
    const videoRemainingHours = Math.floor(videoRemainingSeconds / 60 / 60);
    return `${videoRemainingHours.toLocaleString(void 0, {
      minimumIntegerDigits: 2
    })}:${videoRemainingMinutes.toLocaleString(void 0, {
      minimumIntegerDigits: 2
    })}`;
  }
  const photos = statusAsNumber(photosRemaining == null ? void 0 : photosRemaining.statusValue);
  const storageRemainingTimeText = `${photos <= 999 ? photos.toLocaleString(void 0, {
    minimumIntegerDigits: 3
  }) : "999+"}`;
  return storageRemainingTimeText;
});
const selectCurrentRecordingTimeText = createSelector(selectStatusVideoProgressCounter13, (currentRecordingTime) => {
  const currentRecordingTotalSeconds = statusAsNumber(currentRecordingTime == null ? void 0 : currentRecordingTime.statusValue);
  const currentRecordingMinutes = Math.floor(currentRecordingTotalSeconds / 60);
  const currentRecordingSeconds = currentRecordingTotalSeconds % 60;
  return `${currentRecordingMinutes.toLocaleString(void 0, {
    minimumIntegerDigits: 2
  })}:${currentRecordingSeconds.toLocaleString(void 0, {
    minimumIntegerDigits: 2
  })}`;
});
const selectIsShutterActive = createSelector(selectStatusEncodingActive10, (encodingActive) => statusAsNumber(encodingActive == null ? void 0 : encodingActive.statusValue) === 1);
const selectIsWifiApEnabled = createSelector(selectStatusApState69, (apState) => (apState == null ? void 0 : apState.statusValue) === 1);
const selectLastVideoMode = createSelector(selectStatusLegacyLastVideoMode71, (lastVideoMode) => statusAsNumber(lastVideoMode == null ? void 0 : lastVideoMode.statusValue));
const selectLastPhotoMode = createSelector(selectStatusLegacyLastPhotoMode72, (lastPhotoMode) => statusAsNumber(lastPhotoMode == null ? void 0 : lastPhotoMode.statusValue));
const selectLastTimelapseMode = createSelector(selectStatusLegacyLastTimelapseMode73, (lastTimelapseMode) => statusAsNumber(lastTimelapseMode == null ? void 0 : lastTimelapseMode.statusValue));
const selectIsStatusInitialized = createSelector(selectStatusInternalBatteryPercentage70, (batteryPercentage) => batteryPercentage !== void 0);
var SdCardStatus = /* @__PURE__ */ ((SdCardStatus2) => {
  SdCardStatus2[SdCardStatus2["Unknown"] = -1] = "Unknown";
  SdCardStatus2[SdCardStatus2["Ok"] = 0] = "Ok";
  SdCardStatus2[SdCardStatus2["SdCardFull"] = 1] = "SdCardFull";
  SdCardStatus2[SdCardStatus2["SdCardRemoved"] = 2] = "SdCardRemoved";
  SdCardStatus2[SdCardStatus2["SdCardFormatError"] = 3] = "SdCardFormatError";
  SdCardStatus2[SdCardStatus2["SdCardBusy"] = 4] = "SdCardBusy";
  SdCardStatus2[SdCardStatus2["SdCardSwapped"] = 8] = "SdCardSwapped";
  return SdCardStatus2;
})(SdCardStatus || {});
const selectSdCardStatus = createSelector(selectStatusSdStatus33, (sdCardStatus) => {
  return statusAsNumber(sdCardStatus == null ? void 0 : sdCardStatus.statusValue);
});
const selectActiveUiModesByUiGroup = createSelector(selectLastVideoMode, selectLastPhotoMode, selectLastTimelapseMode, (videoModeId, photoModeId, timeLapseModeId) => {
  return [{
    uiModeGroup: UiModeGroup.video,
    uiMode: modeIdToUiMode(videoModeId)
  }, {
    uiModeGroup: UiModeGroup.photo,
    uiMode: modeIdToUiMode(photoModeId)
  }, {
    uiModeGroup: UiModeGroup.timeLapse,
    uiMode: modeIdToUiMode(timeLapseModeId)
  }];
});
const selectActiveUiModeByUiModeGroup = createCachedSelector(selectActiveUiModesByUiGroup, (_, uiModeGroup) => uiModeGroup, (activeUiModesByUiGroup, uiModeGroup) => {
  var _a, _b;
  return (_b = (_a = activeUiModesByUiGroup.find((activeUiMode) => activeUiMode.uiModeGroup === uiModeGroup)) == null ? void 0 : _a.uiMode) != null ? _b : UiMode.unknown;
})((_, uiModeGroup) => uiModeGroup);
var UiModeGroup = /* @__PURE__ */ ((UiModeGroup2) => {
  UiModeGroup2[UiModeGroup2["timeLapse"] = 0] = "timeLapse";
  UiModeGroup2[UiModeGroup2["video"] = 1] = "video";
  UiModeGroup2[UiModeGroup2["photo"] = 2] = "photo";
  UiModeGroup2[UiModeGroup2["unknown"] = 3] = "unknown";
  return UiModeGroup2;
})(UiModeGroup || {});
var UiMode = /* @__PURE__ */ ((UiMode2) => {
  UiMode2["video"] = "video";
  UiMode2["looping"] = "looping";
  UiMode2["singlePhoto"] = "singlePhoto";
  UiMode2["photo"] = "photo";
  UiMode2["nightPhoto"] = "nightPhoto";
  UiMode2["burstPhoto"] = "burstPhoto";
  UiMode2["timeLapseVideo"] = "timeLapseVideo";
  UiMode2["timeLapsePhoto"] = "timeLapsePhoto";
  UiMode2["nightLapsePhoto"] = "nightLapsePhoto";
  UiMode2["timeWarpVideo"] = "timeWarpVideo";
  UiMode2["liveBurst"] = "liveBurst";
  UiMode2["playback"] = "playback";
  UiMode2["setup"] = "setup";
  UiMode2["broadcastRecord"] = "broadcastRecord";
  UiMode2["broadcast"] = "broadcast";
  UiMode2["unknown"] = "unknown";
  return UiMode2;
})(UiMode || {});
function modeIdToUiMode(modeId) {
  switch (modeId) {
    case 12:
      return "video";
    case 15:
      return "looping";
    case 16:
      return "singlePhoto";
    case 17:
      return "photo";
    case 18:
      return "nightPhoto";
    case 19:
      return "burstPhoto";
    case 13:
      return "timeLapseVideo";
    case 20:
      return "timeLapsePhoto";
    case 21:
      return "nightLapsePhoto";
    case 24:
      return "timeWarpVideo";
    case 25:
      return "liveBurst";
    case 4:
      return "playback";
    case 5:
      return "setup";
    case 22:
      return "broadcastRecord";
    case 23:
      return "broadcast";
    default:
      return "unknown";
  }
}
function uiModeToModeId(uiMode) {
  switch (uiMode) {
    case "video":
      return 12;
    case "looping":
      return 15;
    case "singlePhoto":
      return 16;
    case "photo":
      return 17;
    case "nightPhoto":
      return 18;
    case "burstPhoto":
      return 19;
    case "timeLapseVideo":
      return 13;
    case "timeLapsePhoto":
      return 20;
    case "nightLapsePhoto":
      return 21;
    case "timeWarpVideo":
      return 24;
    case "liveBurst":
      return 25;
    case "playback":
      return 4;
    case "setup":
      return 5;
    case "broadcastRecord":
      return 22;
    case "broadcast":
      return 23;
    default:
      return 0;
  }
}
const selectUiModeGroups = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
    case 4:
      return settingsJson.camera_mode_map.filter((cameraModeMap) => cameraModeMap.mapping_type === "read_write").map((cameraModeMap) => {
        let uiModeGroup;
        switch (cameraModeMap.wsdk_mode_group_key) {
          case "video":
            uiModeGroup = 1;
            break;
          case "photo":
            uiModeGroup = 2;
            break;
          case "multishot":
            uiModeGroup = 0;
            break;
          default:
            uiModeGroup = 3;
            break;
        }
        let uiMode;
        switch (cameraModeMap.wsdk_mode_key) {
          case "video":
            uiMode = "video";
            break;
          case "looping":
            uiMode = "looping";
            break;
          case "photo":
            uiMode = "photo";
            break;
          case "burst":
            uiMode = "burstPhoto";
            break;
          case "night":
            uiMode = "nightPhoto";
            break;
          case "video_time_warp":
            uiMode = "timeWarpVideo";
            break;
          case "video_time_lapse":
            uiMode = "timeLapseVideo";
            break;
          case "photo_time_lapse":
            uiMode = "timeLapsePhoto";
            break;
          case "photo_night_lapse":
            uiMode = "nightLapsePhoto";
            break;
          default:
            uiMode = "unknown";
            break;
        }
        return {
          group: uiModeGroup,
          mode: uiMode
        };
      }).reduce((acc, curr) => {
        const foundGroup = acc.find((item) => item.group === curr.group);
        if (foundGroup) {
          foundGroup.modes.push(curr.mode);
        } else {
          acc.push({
            group: curr.group,
            modes: [curr.mode]
          });
        }
        return acc;
      }, []).sort((a, b) => a.group - b.group);
    case 5:
      return settingsJson.ui_mode_groups.map((group) => {
        let uiModeGroup;
        switch (group.id) {
          case 1e3:
            uiModeGroup = 1;
            break;
          case 1001:
            uiModeGroup = 2;
            break;
          case 1002:
            uiModeGroup = 0;
            break;
          default:
            uiModeGroup = 3;
            break;
        }
        return {
          group: uiModeGroup,
          modes: group.modes.map((modeId) => {
            switch (modeId) {
              case 12:
                return "video";
              case 15:
                return "looping";
              case 16:
                return "singlePhoto";
              case 17:
                return "photo";
              case 18:
                return "nightPhoto";
              case 19:
                return "burstPhoto";
              case 13:
                return "timeLapseVideo";
              case 20:
                return "timeLapsePhoto";
              case 21:
                return "nightLapsePhoto";
              case 24:
                return "timeWarpVideo";
              case 25:
                return "liveBurst";
              case 4:
                return "playback";
              case 5:
                return "setup";
              case 22:
                return "broadcastRecord";
              case 23:
                return "broadcast";
              default:
                return "unknown";
            }
          })
        };
      }).sort((a, b) => a.group - b.group);
    default:
      throw new Error("Unknown settings schema version");
  }
});
const selectCurrentUiMode = createSelector(selectCurrentActiveModeId, (currentActiveModeId) => {
  return modeIdToUiMode(currentActiveModeId);
});
const selectUiModesNames = createCachedSelector(selectSettingsMetadataAllSettings, selectSettingsMetadataSettingsJson, (_, uiModes) => uiModes, (allSettings, settingsJson, uiModes) => {
  return uiModes.map((uiMode) => {
    var _a, _b, _c, _d, _e;
    let name;
    switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
      case 4:
        name = (_c = (_b = (_a = allSettings.find((setting) => setting.id === SCHEMA_V4_CURRENT_MODE_SETTING_ID)) == null ? void 0 : _a.options.find((o) => o.id === uiModeToModeId(uiMode))) == null ? void 0 : _b.displayName) != null ? _c : "unknown";
        break;
      case 5:
        name = (_e = (_d = settingsJson.modes.find((mode) => mode.id === uiModeToModeId(uiMode))) == null ? void 0 : _d.display_name) != null ? _e : "unknown";
        break;
      default:
        name = "unknown";
        break;
    }
    return {
      uiMode,
      name
    };
  });
})((_, uiModes) => uiModes.join(":"));
function uiModeToWsdkGroupAndMode(uiMode) {
  let wsdkGroupId;
  let wsdkModeId;
  switch (uiMode) {
    case UiMode.singlePhoto:
      wsdkGroupId = 1;
      wsdkModeId = 0;
      break;
    case UiMode.photo:
      wsdkGroupId = 1;
      wsdkModeId = 1;
      break;
    case UiMode.burstPhoto:
      wsdkGroupId = 2;
      wsdkModeId = 0;
      break;
    case UiMode.nightPhoto:
      wsdkGroupId = 1;
      wsdkModeId = 2;
      break;
    case UiMode.video:
      wsdkGroupId = 0;
      wsdkModeId = 0;
      break;
    case UiMode.looping:
      wsdkGroupId = 0;
      wsdkModeId = 3;
      break;
    case UiMode.timeWarpVideo:
      wsdkGroupId = 0;
      wsdkModeId = 4;
      break;
    case UiMode.timeLapseVideo:
      wsdkGroupId = 0;
      wsdkModeId = 1;
      break;
    case UiMode.timeLapsePhoto:
      wsdkGroupId = 2;
      wsdkModeId = 1;
      break;
    case UiMode.nightLapsePhoto:
      wsdkGroupId = 2;
      wsdkModeId = 2;
      break;
    default:
      wsdkGroupId = 0;
      wsdkModeId = 0;
      break;
  }
  return {
    wsdkGroupId,
    wsdkModeId
  };
}
const commandGpCameraSubmode = {
  key: "GPCAMERA_SUBMODE",
  commandId: 3,
  dataProducer: (uiMode) => {
    const {
      wsdkGroupId,
      wsdkModeId
    } = uiModeToWsdkGroupAndMode(uiMode);
    return [1, wsdkGroupId, 1, wsdkModeId];
  }
};
const commandGpCameraSetMode = {
  key: "GPCAMERA_SET_MODE",
  commandId: 62,
  dataProducer: (uiMode) => {
    const modeId = uiModeToModeId(uiMode);
    return [2, modeId >> 8, modeId & 255];
  }
};
const selectBleSupportedCommands = createSelector(selectSettingsMetadataSettingsJson, (settingsJson) => {
  switch (settingsJson == null ? void 0 : settingsJson.schema_version) {
    case 4:
      return settingsJson.commands.filter((command) => command.network_types.find((t) => t === "ble")).map((command) => ({
        key: command.key,
        deprecated: command.deprecated
      }));
    case 5:
      return settingsJson.commands.filter((command) => command.network_types.find((t) => t === "ble")).map((command) => ({
        key: command.key,
        deprecated: command.deprecated
      }));
    default:
      throw new Error("unsupported schema version");
  }
});
const selectIsCommandSupportedByKey = createCachedSelector(selectBleSupportedCommands, (_, commandKey) => commandKey, (commands, commandKey) => commands.find((c) => c.key === commandKey) !== void 0)((_, commandKey) => commandKey);
function functionQueueProvider() {
  const lastQueuedPromiseArr = [];
  return async (func, context) => {
    let lastQueuedPromise = lastQueuedPromiseArr.find((p2) => p2.context === context);
    if (!lastQueuedPromise) {
      lastQueuedPromise = {
        context,
        promise: Promise.resolve().then(() => func())
      };
      lastQueuedPromiseArr.push(lastQueuedPromise);
      return lastQueuedPromise.promise;
    }
    lastQueuedPromise.promise = lastQueuedPromise.promise.then(() => func());
    return lastQueuedPromise.promise;
  };
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const initialState$2 = {
  settings: {},
  statuses: {}
};
const goproSettingsSlice = createSlice({
  name: "goproSettings",
  initialState: initialState$2,
  reducers: {
    settingsReceived: (state, action) => {
      state.settings = __spreadValues(__spreadValues({}, state.settings), action.payload);
    },
    settingsRequested: (state) => {
      state.settings = {};
      state.statuses = {};
    },
    statusesReceived: (state, action) => {
      state.statuses = __spreadValues(__spreadValues({}, state.statuses), action.payload);
    }
  }
});
const goproSettingsReducer = goproSettingsSlice.reducer;
createAsyncThunk("goproSettings/fetchSettings", async () => {
  const {
    characteristics
  } = bluetoothDeviceState;
  if (!characteristics)
    throw new Error("no characteristics");
  const {
    queryCharacteristic
  } = characteristics;
  await queryCharacteristic.writeValue(new Uint8Array([1, 18]));
});
function queryResponseReceiverProvider(dispatch) {
  return (packetData) => {
    const queryResponse = parseQueryResponse(packetData);
    dispatchQueryResponse(dispatch, queryResponse);
  };
}
function parseQueryResponse(packetData) {
  if (packetData.length < 2)
    throw new Error("command response too short");
  const queryId = packetData[0];
  const errorCode = parseQueryResponseCode(packetData[1]);
  const statusesOrSettings = parseStatusesOrSettingsFromData(packetData.slice(2));
  return {
    queryId,
    errorCode,
    statusesOrSettings
  };
}
function parseStatusesOrSettingsFromData(data) {
  const settings2 = [];
  let dataIndex = 0;
  while (dataIndex < data.length) {
    const setting = readOneStatusOrSetting(data.slice(dataIndex));
    settings2.push(setting);
    dataIndex += setting.value.length + 2;
  }
  return settings2;
}
function readOneStatusOrSetting(data) {
  var _a, _b;
  const settingId = (_a = data[0]) != null ? _a : 0;
  const dataLength = (_b = data[1]) != null ? _b : 0;
  const settingValue = data.slice(2, dataLength + 2);
  return {
    id: settingId,
    length: dataLength,
    value: settingValue
  };
}
function parseQueryResponseCode(responseCode) {
  switch (responseCode) {
    case 0:
      return CommandResponseCode.success;
    case 1:
      return CommandResponseCode.error;
    case 2:
      return CommandResponseCode.invalidParameter;
    default:
      return CommandResponseCode.unknown;
  }
}
var CommandResponseCode = /* @__PURE__ */ ((CommandResponseCode2) => {
  CommandResponseCode2[CommandResponseCode2["unknown"] = 0] = "unknown";
  CommandResponseCode2[CommandResponseCode2["success"] = 1] = "success";
  CommandResponseCode2[CommandResponseCode2["error"] = 2] = "error";
  CommandResponseCode2[CommandResponseCode2["invalidParameter"] = 3] = "invalidParameter";
  return CommandResponseCode2;
})(CommandResponseCode || {});
const receivedSettingsReduceToKeyValue = (statusesOrSettings) => statusesOrSettings.reduce((acc, setting) => {
  if (setting.value.length === 0)
    return acc;
  const value = setting.value.reduce((sAcc, sCur) => (sAcc << 8) + sCur);
  const {
    length
  } = setting;
  acc[setting.id] = {
    value,
    length
  };
  return acc;
}, {});
const receivedStatusesReduceToKeyValue = (statusesOrSettings) => statusesOrSettings.reduce((acc, status) => {
  const valueLength = status.value.length;
  const knownStatus = allKnownStatuses.find((s) => s.id === status.id);
  if ((knownStatus == null ? void 0 : knownStatus.type) === "string" || valueLength > 4) {
    const valueStr = status.value.map((v) => String.fromCharCode(v)).join("");
    acc[status.id] = valueStr;
    return acc;
  }
  if (status.value.length === 0)
    return acc;
  const value = status.value.reduce((sAcc, sCur) => (sAcc << 8) + sCur);
  acc[status.id] = value;
  return acc;
}, {});
function dispatchQueryResponse(dispatch, queryResponse) {
  switch (queryResponse.queryId) {
    case 18:
      dispatch(goproSettingsSlice.actions.settingsReceived(receivedSettingsReduceToKeyValue(queryResponse.statusesOrSettings)));
      break;
    case 82:
      dispatch(goproSettingsSlice.actions.settingsReceived(receivedSettingsReduceToKeyValue(queryResponse.statusesOrSettings)));
      break;
    case 146:
      dispatch(goproSettingsSlice.actions.settingsReceived(receivedSettingsReduceToKeyValue(queryResponse.statusesOrSettings)));
      break;
    case 19:
      dispatch(goproSettingsSlice.actions.statusesReceived(receivedStatusesReduceToKeyValue(queryResponse.statusesOrSettings)));
      break;
    case 83:
      dispatch(goproSettingsSlice.actions.statusesReceived(receivedStatusesReduceToKeyValue(queryResponse.statusesOrSettings)));
      break;
    case 147:
      dispatch(goproSettingsSlice.actions.statusesReceived(receivedStatusesReduceToKeyValue(queryResponse.statusesOrSettings)));
      break;
  }
}
function settingsResponseReceiverProvider(_dispatch) {
  return (_packetData) => {
  };
}
const subscribeToSettingsChangesCommand = createAsyncThunk("queryCommands/subscribeToSettingsChangesCommand", async (settingsIds) => {
  const {
    characteristics
  } = bluetoothDeviceState;
  if (!characteristics)
    throw new Error("no characteristics");
  const {
    queryCharacteristic
  } = characteristics;
  await writeGoProPacketData(queryCharacteristic, [82, ...settingsIds]);
});
const subscribeToStatusChangesCommand = createAsyncThunk("queryCommands/subscribeToStatusChangesCommand", async (statusIds) => {
  const {
    characteristics
  } = bluetoothDeviceState;
  if (!characteristics)
    throw new Error("no characteristics");
  const {
    queryCharacteristic
  } = characteristics;
  await writeGoProPacketData(queryCharacteristic, [83, ...statusIds]);
});
createAsyncThunk("queryCommands/getSettingsCommand", async () => {
  const {
    characteristics
  } = bluetoothDeviceState;
  if (!characteristics)
    throw new Error("no characteristics");
  const {
    queryCharacteristic
  } = characteristics;
  await writeGoProPacketData(queryCharacteristic, [18]);
});
createAsyncThunk("queryCommands/getStatusesCommand", async () => {
  const {
    characteristics
  } = bluetoothDeviceState;
  if (!characteristics)
    throw new Error("no characteristics");
  const {
    queryCharacteristic
  } = characteristics;
  await writeGoProPacketData(queryCharacteristic, [19]);
});
function registerForGattDisconnectEvent(device, dispatch) {
  device.ongattserverdisconnected = () => {
    bluetoothDeviceState.characteristics = void 0;
    bluetoothDeviceState.gattServer = void 0;
    dispatch(goproBluetoothSlice.actions.gattDisconnected("Connection lost"));
    toast.error("Gopro disconnected, connection lost");
  };
}
const getKnownDevice = createAsyncThunk("bluetoothDevice/getKnownDevice", async (_, {
  dispatch
}) => {
  var _a;
  if (!("bluetooth" in navigator) || !("getDevices" in navigator.bluetooth))
    throw new Error("Browser does not support getDevices");
  const knownDevices = await navigator.bluetooth.getDevices();
  const knownDevice = knownDevices[0];
  if (!knownDevice)
    throw new Error("Couldn't find any known devices");
  const onAdvertisementEvRecevied = (e) => {
    var _a2;
    const bluetoothEvent = e;
    dispatch(goproBluetoothSlice.actions.savedDeviceAvailable((_a2 = knownDevice.name) != null ? _a2 : knownDevice.id));
    registerForGattDisconnectEvent(bluetoothEvent.device, dispatch);
    bluetoothDeviceState.device = bluetoothEvent.device;
    knownDevice.removeEventListener("advertisementreceived", onAdvertisementEvRecevied);
  };
  knownDevice.addEventListener("advertisementreceived", onAdvertisementEvRecevied);
  knownDevice.watchAdvertisements();
  return {
    deviceName: (_a = knownDevice.name) != null ? _a : knownDevice.id
  };
});
const requestDevice = createAsyncThunk("bluetoothDevice/requestDevice", async (_, {
  dispatch
}) => {
  var _a;
  const device = await navigator.bluetooth.requestDevice({
    filters: [{
      services: ["0000fea6-0000-1000-8000-00805f9b34fb"]
    }],
    optionalServices: ["0000fea6-0000-1000-8000-00805f9b34fb", "b5f90001-aa8d-11e3-9046-0002a5d5c51b"]
  });
  registerForGattDisconnectEvent(device, dispatch);
  bluetoothDeviceState.device = device;
  dispatch(gattConnect());
  return {
    deviceName: (_a = device.name) != null ? _a : device.id
  };
});
const gattConnect = createAsyncThunk("bluetoothDevice/gattConnect", async (_, {
  dispatch
}) => {
  var _a;
  const {
    device
  } = bluetoothDeviceState;
  if (!device)
    throw new Error("device not found to connect to");
  if (!(device == null ? void 0 : device.gatt))
    throw new Error(`gatt missing for this device ${(_a = device.name) != null ? _a : device.id}`);
  const gattServer = await device.gatt.connect();
  const wifiApServicePromise = gattServer.getPrimaryService("b5f90001-aa8d-11e3-9046-0002a5d5c51b");
  const wifiApSsidCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic("b5f90002-aa8d-11e3-9046-0002a5d5c51b"));
  const wifiApPasswordCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic("b5f90003-aa8d-11e3-9046-0002a5d5c51b"));
  const wifiApPowerCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic("b5f90004-aa8d-11e3-9046-0002a5d5c51b"));
  const wifiApStateCharacteristicPromise = wifiApServicePromise.then((x) => x.getCharacteristic("b5f90005-aa8d-11e3-9046-0002a5d5c51b"));
  const cqServicePromise = gattServer.getPrimaryService("0000fea6-0000-1000-8000-00805f9b34fb");
  const commandCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic("b5f90072-aa8d-11e3-9046-0002a5d5c51b"));
  const commandResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic("b5f90073-aa8d-11e3-9046-0002a5d5c51b"));
  const settingsCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic("b5f90074-aa8d-11e3-9046-0002a5d5c51b"));
  const settingsResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic("b5f90075-aa8d-11e3-9046-0002a5d5c51b"));
  const queryCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic("b5f90076-aa8d-11e3-9046-0002a5d5c51b"));
  const queryResponseCharacteristicPromise = cqServicePromise.then((x) => x.getCharacteristic("b5f90077-aa8d-11e3-9046-0002a5d5c51b"));
  bluetoothDeviceState.gattServer = gattServer;
  bluetoothDeviceState.characteristics = {
    wifiApSsidCharacteristic: await wifiApSsidCharacteristicPromise,
    wifiApPasswordCharacteristic: await wifiApPasswordCharacteristicPromise,
    wifiApPowerCharacteristic: await wifiApPowerCharacteristicPromise,
    wifiApStateCharacteristic: await wifiApStateCharacteristicPromise,
    commandCharacteristic: await commandCharacteristicPromise,
    commandResponseCharacteristic: await commandResponseCharacteristicPromise,
    settingsCharacteristic: await settingsCharacteristicPromise,
    settingsResponseCharacteristic: await settingsResponseCharacteristicPromise,
    queryCharacteristic: await queryCharacteristicPromise,
    queryResponseCharacteristic: await queryResponseCharacteristicPromise
  };
  await bluetoothDeviceState.characteristics.commandResponseCharacteristic.startNotifications();
  bluetoothDeviceState.characteristics.queryResponseCharacteristic.oncharacteristicvaluechanged = packetReaderProvider(queryResponseReceiverProvider(dispatch));
  await bluetoothDeviceState.characteristics.queryResponseCharacteristic.startNotifications();
  bluetoothDeviceState.characteristics.settingsResponseCharacteristic.oncharacteristicvaluechanged = packetReaderProvider(settingsResponseReceiverProvider());
  await bluetoothDeviceState.characteristics.settingsResponseCharacteristic.startNotifications();
  dispatch(goproSettingsSlice.actions.settingsRequested());
  await dispatch(getSettingsJsonCachedCommand());
  await dispatch(subscribeToAllStatusesChangesCommand());
  await dispatch(subscribeToAllSettingsChangesCommand());
  await dispatch(openGoProGetVersionCommand());
  await dispatch(getHardwareInfoCommand());
});
const subscribeToAllSettingsChangesCommand = createAsyncThunk("bluetoothDevice/subscribeToSettingsChangesCommand", async (_, {
  dispatch,
  getState
}) => {
  const allSettingsIds = selectSettingsMetadataAllSettingsIdsList(getState());
  if (allSettingsIds.length === 0)
    return;
  await dispatch(subscribeToSettingsChangesCommand(allSettingsIds));
});
const subscribeToAllStatusesChangesCommand = createAsyncThunk("bluetoothDevice/subscribeToStatusesChangesCommand", async (_, {
  dispatch,
  getState
}) => {
  const allStatusIds = selectSettingsMetadataAllStatusesIdsList(getState());
  if (allStatusIds.length === 0)
    return;
  await dispatch(subscribeToStatusChangesCommand(allStatusIds));
});
function getSettingsJsonCached() {
  const settingsJsonString = window.localStorage.getItem("settingsJson");
  if (!settingsJsonString)
    return void 0;
  const settingsJson = JSON.parse(settingsJsonString);
  return settingsJson;
}
async function fetchSettingsJsonBle() {
  const settingsJson = await fetchSettingsJson();
  window.localStorage.setItem("settingsJson", JSON.stringify(settingsJson));
  return settingsJson;
}
const fetchSettingsJsonBleCommand = createAsyncThunk("bluetoothDevice/fetchSettingsJsonBleCommand", async () => {
  const settingsJson = await fetchSettingsJsonBle();
  return settingsJson;
});
const getSettingsJsonCachedCommand = createAsyncThunk("bluetoothDevice/getSettingsJsonCachedCommand", async (_, {
  dispatch
}) => {
  const settingsJson = getSettingsJsonCached();
  if (!settingsJson)
    await dispatch(fetchSettingsJsonBleCommand());
  return settingsJson;
});
async function writeGoProPacketDataRaw(characteristic, data) {
  return characteristic.writeValue(new Uint8Array(data));
}
function getPacketHeaderForData(dataLength, chunkIndex) {
  if (chunkIndex > 0)
    return [128 + (chunkIndex & 63)];
  if (dataLength <= 31)
    return [dataLength & 31];
  if (dataLength <= 8191)
    return [32 + (dataLength >> 8 & 31), dataLength & 255];
  if (dataLength <= 65535)
    return [64, dataLength >> 8 & 255, dataLength & 255];
  toast.error("packet too large");
  throw new Error("data length too large");
}
async function writeGoProPacketData(characteristic, data) {
  console.log("writing data, before appending headers", data);
  const dataCopy = [...data];
  let chunkIndex = 0;
  while (dataCopy.length > 0) {
    dataCopy.unshift(...getPacketHeaderForData(data.length, chunkIndex));
    const chunk = dataCopy.splice(0, 20);
    await writeGoProPacketDataRaw(characteristic, chunk);
    chunkIndex++;
  }
  return void 0;
}
async function sendCommand(commandData, commandCharacteristic, commandResponseCharacteristic, retryCounter = 0) {
  const data = [commandData.commandId];
  if (commandData.data)
    data.push(...commandData.data);
  const responsePromise = waitForPacketById(commandResponseCharacteristic, commandData.commandId);
  await writeGoProPacketData(commandCharacteristic, data);
  const packetData = await responsePromise;
  const commandResponseData = parseCommandResponse(packetData);
  if (commandResponseData.errorCode === CommandResponseCode$1.error) {
    if (!commandData.retries || retryCounter >= commandData.retries)
      return commandResponseData;
    await delay(2 ** retryCounter * 500);
    return sendCommand(commandData, commandCharacteristic, commandResponseCharacteristic, retryCounter + 1);
  }
  return commandResponseData;
}
const functionQueue$1 = functionQueueProvider();
async function queueAndSendCommand(commandData) {
  const {
    characteristics
  } = bluetoothDeviceState;
  if (!characteristics)
    throw new Error("no characteristics");
  const {
    commandCharacteristic,
    commandResponseCharacteristic
  } = characteristics;
  return functionQueue$1(async () => {
    const commandResponseData = await sendCommand(commandData, commandCharacteristic, commandResponseCharacteristic);
    return commandResponseData;
  }, commandCharacteristic);
}
async function sendCommandAction(commandData) {
  const commandResponseData = await queueAndSendCommand(commandData);
  return commandResponseData;
}
createAsyncThunk("commands/forceShutdownCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 4
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/hiLightTagCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 24
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/locateOnCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 22,
    data: [1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/locateOffCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 22,
    data: [1, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadGroupVideoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 2,
    data: [1, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadGroupPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 2,
    data: [1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadGroupMultishotCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 2,
    data: [1, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
const setUiModeCommand = createAsyncThunk("commands/legacyPresetsLoadPresetByModeCommand", async (mode, {
  getState
}) => {
  if (selectIsCommandSupportedByKey(getState(), commandGpCameraSubmode.key))
    return sendCommandAction({
      commandId: commandGpCameraSubmode.commandId,
      data: commandGpCameraSubmode.dataProducer(mode)
    });
  if (selectIsCommandSupportedByKey(getState(), commandGpCameraSetMode.key))
    return sendCommandAction({
      commandId: commandGpCameraSetMode.commandId,
      data: commandGpCameraSetMode.dataProducer(mode)
    });
  throw new Error("Don't know how to set mode");
});
createAsyncThunk("commands/legacyPresetsLoadPresetVideoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 0, 1, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetTimeLapseVideoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 0, 1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetLoopingVideoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 0, 1, 3]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetTimewarpCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 0, 1, 4]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 1, 1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetNightPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 1, 1, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetBurstPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 2, 1, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetTimeLapsePhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 2, 1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/legacyPresetsLoadPresetNightLapsePhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 3,
    data: [1, 2, 1, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
const sleepCommand = createAsyncThunk("commands/sleepCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 5
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
async function fetchSettingsJson() {
  const commandResponseData = await sendCommandAction({
    commandId: 59,
    retries: 5
  });
  assertCommandResponseSuccess(commandResponseData);
  const settingsJsonResponse = parseSettingsJsonResponse(commandResponseData);
  return settingsJsonResponse;
}
createAsyncThunk("commands/getSettingsJsonCommand", async () => {
  const commandResponseData = await sendCommandAction({
    commandId: 59,
    retries: 5
  });
  assertCommandResponseSuccess(commandResponseData);
  const settingsJsonResponse = parseSettingsJsonResponse(commandResponseData);
  return settingsJsonResponse;
});
const getHardwareInfoCommand = createAsyncThunk("commands/getHardwareInfoCommand", async () => {
  const commandResponseData = await sendCommandAction({
    commandId: 60,
    retries: 3
  });
  assertCommandResponseSuccess(commandResponseData);
  const hardwareInfo = parseGetHardwareInfoResponse(commandResponseData);
  return hardwareInfo;
});
const setShutterOffCommand = createAsyncThunk("commands/setShutterOffCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 1,
    data: [1, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
const setShutterOnCommand = createAsyncThunk("commands/setShutterOnCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 1,
    data: [1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
const apControlWiFiApOffCommand = createAsyncThunk("commands/apControlWiFiApOffCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 23,
    data: [1, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
const apControlWiFiApOnCommand = createAsyncThunk("commands/apControlWiFiApOnCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 23,
    data: [1, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadGroupVideoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 62,
    data: [2, 3, 232]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadGroupPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 62,
    data: [2, 3, 233]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadGroupTimelapseCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 62,
    data: [2, 3, 234]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadStandardCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 0, 0, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadActivityCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 0, 0, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadCinematicCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 0, 0, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadUltraSloMoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 0, 0, 4]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadBasicCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 0, 0, 5]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 1, 0, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadLiveBurstCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 1, 0, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadBurstPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 1, 0, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadNightPhotoCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 1, 0, 3]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadTimeWarpCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 2, 0, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadTimeLapseCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 2, 0, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadNightLapseCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 2, 0, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadStandardEBCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 8, 0, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadActivityEBCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 8, 0, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadCinematicEBCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 8, 0, 2]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoadSloMoEBCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 8, 0, 3]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoad4KTripodCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 9, 0, 0]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/presetsLoad53KTripodCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 64,
    data: [4, 0, 9, 0, 1]
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
createAsyncThunk("commands/analyticsSetThirdPartyClientCommand", async (_, {
  dispatch
}) => {
  const commandResponseData = await sendCommandAction({
    commandId: 80
  });
  dispatchCommandResponse(dispatch, commandResponseData);
});
const openGoProGetVersionCommand = createAsyncThunk("commands/openGoProGetVersionCommand", async () => {
  const commandResponseData = await sendCommandAction({
    commandId: 81,
    retries: 3
  });
  if (commandResponseData.errorCode === CommandResponseCode$1.invalidParameter) {
    return {
      majorVersion: 0,
      minorVersion: 0
    };
  }
  assertCommandResponseSuccess(commandResponseData);
  const openGoproVersion = parseOpenGoProGetVersionResponse(commandResponseData);
  return openGoproVersion;
});
var BluetoothDeviceAvailability = /* @__PURE__ */ ((BluetoothDeviceAvailability2) => {
  BluetoothDeviceAvailability2[BluetoothDeviceAvailability2["None"] = 0] = "None";
  BluetoothDeviceAvailability2[BluetoothDeviceAvailability2["BeingRequested"] = 1] = "BeingRequested";
  BluetoothDeviceAvailability2[BluetoothDeviceAvailability2["SavedAndWaitingForAdvertisement"] = 2] = "SavedAndWaitingForAdvertisement";
  BluetoothDeviceAvailability2[BluetoothDeviceAvailability2["Ready"] = 3] = "Ready";
  return BluetoothDeviceAvailability2;
})(BluetoothDeviceAvailability || {});
const initialState$1 = {
  deviceAvailability: 0,
  isGattConnected: false,
  isGattConnecting: false,
  deviceName: "unknown",
  goproBluetoothDeviceCommandsState: {
    isCommandInAction: false
  }
};
const goproBluetoothSlice = createSlice({
  name: "bluetoothDevice",
  initialState: initialState$1,
  reducers: {
    gattDisconnected: (state, action) => {
      state.isGattConnected = false;
      state.error = action.payload;
    },
    savedDeviceAvailable: (state, action) => {
      state.deviceAvailability = 3;
      state.error = void 0;
      state.deviceName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(openGoProGetVersionCommand.fulfilled, (state, action) => {
      state.goproBluetoothDeviceCommandsState.openGoProVersion = action.payload;
    });
    builder.addCase(getHardwareInfoCommand.fulfilled, (state, action) => {
      state.goproBluetoothDeviceCommandsState.getHardwareInfo = action.payload;
      state.deviceName = action.payload.apSsid;
    });
    builder.addCase(requestDevice.pending, (state) => {
      bluetoothDeviceState.device = void 0;
      state.deviceAvailability = 1;
      state.error = void 0;
    });
    builder.addCase(requestDevice.fulfilled, (state, action) => {
      state.deviceAvailability = 3;
      state.error = void 0;
      state.deviceName = action.payload.deviceName;
    });
    builder.addCase(requestDevice.rejected, (state, action) => {
      var _a;
      bluetoothDeviceState.device = void 0;
      state.deviceAvailability = 0;
      state.error = (_a = action.error.message) != null ? _a : "unknown error";
    });
    builder.addCase(getKnownDevice.pending, (state) => {
      state.error = void 0;
    });
    builder.addCase(getKnownDevice.rejected, (state) => {
      state.deviceName = "unknown";
      state.deviceAvailability = 0;
    });
    builder.addCase(getKnownDevice.fulfilled, (state, action) => {
      state.deviceName = action.payload.deviceName;
      state.deviceAvailability = 2;
    });
    builder.addCase(gattConnect.pending, (state) => {
      state.isGattConnecting = true;
      state.isGattConnected = false;
    });
    builder.addCase(gattConnect.fulfilled, (state) => {
      state.isGattConnecting = false;
      state.isGattConnected = true;
    });
    builder.addCase(gattConnect.rejected, (state, action) => {
      var _a;
      state.isGattConnecting = false;
      state.isGattConnected = false;
      state.error = (_a = action.error.message) != null ? _a : "unknown error";
    });
  }
});
const goproBluetoothReducer = goproBluetoothSlice.reducer;
const initialState = {
  isFetching: false
};
const goproSettingsMetadataSlice = createSlice({
  name: "goproSettingsMetadata",
  initialState,
  reducers: {
    setSettingsJson: (state, action) => {
      state.isFetching = false;
      state.settingsJson = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettingsJsonBleCommand.fulfilled, (state, action) => {
      state.isFetching = false;
      state.settingsJson = action.payload;
    });
    builder.addCase(getSettingsJsonCachedCommand.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getSettingsJsonCachedCommand.fulfilled, (state, action) => {
      if (action.payload) {
        state.isFetching = false;
        state.settingsJson = action.payload;
      }
    });
  }
});
const goproSettingsMetadataReducer = goproSettingsMetadataSlice.reducer;
const store = configureStore({
  reducer: {
    goproBluetoothReducer,
    goproSettingsReducer,
    goproSettingsMetadataReducer
  },
  devTools: true
});
const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;
const ConnectToGoProView = () => {
  const isGattConnecting = useAppSelector((state) => state.goproBluetoothReducer.isGattConnecting);
  const deviceName = useAppSelector((state) => state.goproBluetoothReducer.deviceName);
  const currentError = useAppSelector((state) => state.goproBluetoothReducer.error);
  const dispatch = useAppDispatch();
  return /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm"
  }, /* @__PURE__ */ React.createElement(Box, {
    sx: {
      my: 4
    }
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h4",
    component: "h1",
    gutterBottom: true
  }, isGattConnecting ? `Connecting to ${deviceName}...` : `Connect to ${deviceName}`), isGattConnecting ? null : /* @__PURE__ */ React.createElement(Button, {
    onClick: () => dispatch(gattConnect())
  }, "Reconnect"), currentError ? /* @__PURE__ */ React.createElement("div", null, currentError) : null));
};
const ErrorPage = (props) => {
  const {
    errorTitle,
    errorDescription
  } = props;
  return /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm"
  }, /* @__PURE__ */ React.createElement("h1", null, errorTitle), /* @__PURE__ */ React.createElement("p", null, errorDescription));
};
const SearchForGoProView = () => {
  const deviceAvailability = useAppSelector((state) => state.goproBluetoothReducer.deviceAvailability);
  const currentError = useAppSelector((state) => state.goproBluetoothReducer.error);
  const deviceName = useAppSelector((state) => state.goproBluetoothReducer.deviceName);
  const dispatch = useAppDispatch();
  react.exports.useEffect(() => {
    dispatch(getKnownDevice());
  }, [dispatch]);
  const title = getTitle(deviceAvailability, deviceName);
  return /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm"
  }, /* @__PURE__ */ React.createElement(Box, {
    sx: {
      my: 4
    }
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h4",
    component: "h1",
    gutterBottom: true
  }, title), /* @__PURE__ */ React.createElement(Button, {
    onClick: () => dispatch(requestDevice())
  }, deviceAvailability === BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement ? "Manual search" : "Search"), currentError ? /* @__PURE__ */ React.createElement("div", null, currentError) : null));
};
function getTitle(deviceAvailability, deviceName) {
  switch (deviceAvailability) {
    case BluetoothDeviceAvailability.None:
      return "Search for GoPro";
    case BluetoothDeviceAvailability.BeingRequested:
      return "Select your GoPro";
    case BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement:
      return `Trying to find saved GoPro (${deviceName})...`;
    default:
      return "Search for GoPro";
  }
}
function usePwaInstallPrompt() {
  const [prompt, setState] = react.exports.useState();
  const shouldShowPrompt = !!prompt;
  const [isInstalled, setIsInstalled] = react.exports.useState(false);
  const [userAccepted, setUserAccepted] = react.exports.useState(false);
  const [userDismissed, setUserDismissed] = react.exports.useState(false);
  const promptToInstall = () => {
    if (prompt) {
      setUserAccepted(false);
      setUserDismissed(false);
      return prompt.prompt().then(({
        outcome
      }) => {
        setUserAccepted(outcome === "accepted");
        setUserDismissed(outcome === "dismissed");
      });
    }
    return Promise.reject(new Error('Tried installing before browser sent "beforeinstallprompt" event'));
  };
  react.exports.useEffect(() => {
    const ready = (e) => {
      setState(e);
    };
    window.addEventListener("beforeinstallprompt", ready);
    return () => {
      window.removeEventListener("beforeinstallprompt", ready);
    };
  }, []);
  react.exports.useEffect(() => {
    const onInstall = () => {
      setIsInstalled(true);
    };
    window.addEventListener("appinstalled", onInstall);
    return () => {
      window.removeEventListener("appinstalled", onInstall);
    };
  }, []);
  return [shouldShowPrompt, userAccepted, userDismissed, isInstalled, promptToInstall];
}
const InstallPwaButton = () => {
  const [shouldShowPrompt, _userAccepted, userDismissed, isInstalled, promptToInstall] = usePwaInstallPrompt();
  const [showSad, setShowSad] = react.exports.useState(false);
  const [dismissedInstall, setDismissedInstall] = react.exports.useState(false);
  react.exports.useEffect(() => {
    let timeoutHandle;
    if (userDismissed) {
      setShowSad(true);
      timeoutHandle = window.setTimeout(() => {
        setDismissedInstall(true);
      }, 3e3);
    }
    return () => {
      window.clearTimeout(timeoutHandle);
    };
  }, [userDismissed]);
  const handleInstallClick = () => {
    promptToInstall();
  };
  if (!shouldShowPrompt || dismissedInstall || isInstalled) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(Button, {
    color: "inherit",
    onClick: handleInstallClick
  }, "Install", showSad ? " \u{1F494}" : "");
};
const Header = () => /* @__PURE__ */ React.createElement(AppBar, {
  position: "sticky"
}, /* @__PURE__ */ React.createElement(Toolbar, null, /* @__PURE__ */ React.createElement(Typography, {
  variant: "h6",
  sx: {
    flexGrow: 1
  }
}, "GoPro Bluetooth remote"), /* @__PURE__ */ React.createElement(InstallPwaButton, null)));
const selectDeviceName = createSelector((state) => state.goproBluetoothReducer.deviceName, (deviceName) => deviceName);
const selectIsConnectedAndInitialized = createSelector(selectIsStatusInitialized, selectIsSettingsInitialized, (state) => state.goproBluetoothReducer.isGattConnected, (isStatusInitialized, isSettingsInitialized, isGattConnected) => isStatusInitialized && isSettingsInitialized && isGattConnected);
function getIconByLevelBar(batteryPercentage, isCharging) {
  if (batteryPercentage > 80)
    return isCharging ? /* @__PURE__ */ React.createElement(default_1, null) : /* @__PURE__ */ React.createElement(default_1$1, null);
  if (batteryPercentage > 50)
    return isCharging ? /* @__PURE__ */ React.createElement(default_1$2, null) : /* @__PURE__ */ React.createElement(default_1$3, null);
  if (batteryPercentage > 20)
    return isCharging ? /* @__PURE__ */ React.createElement(default_1$4, null) : /* @__PURE__ */ React.createElement(default_1$5, null);
  return isCharging ? /* @__PURE__ */ React.createElement(default_1$6, null) : /* @__PURE__ */ React.createElement(default_1$7, null);
}
const BatteryPercentageIcon = (props) => {
  const {
    batteryPercentage,
    isCharging
  } = props;
  const icon = getIconByLevelBar(batteryPercentage, isCharging);
  return /* @__PURE__ */ React.createElement(IconButton, null, /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1"
  }, batteryPercentage, "%"), icon);
};
const SplitButton = (props) => {
  const {
    buttonChoices,
    primaryButtonId,
    isGroupSelected
  } = props;
  const [open, setOpen] = react.exports.useState(false);
  const anchorRef = react.exports.useRef(null);
  const primaryButton = buttonChoices.find((button) => button.id === primaryButtonId);
  const handleClick = () => {
    primaryButton == null ? void 0 : primaryButton.onClick();
  };
  const handleMenuItemClick = (id) => {
    var _a;
    (_a = buttonChoices.find((button) => button.id === id)) == null ? void 0 : _a.onClick();
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  return /* @__PURE__ */ react.exports.createElement(react.exports.Fragment, null, /* @__PURE__ */ react.exports.createElement(ButtonGroup, {
    variant: isGroupSelected ? "text" : "outlined",
    ref: anchorRef,
    "aria-label": "split button"
  }, /* @__PURE__ */ react.exports.createElement(Button, {
    onClick: handleClick
  }, primaryButton == null ? void 0 : primaryButton.icon), /* @__PURE__ */ react.exports.createElement(Button, {
    size: "small",
    "aria-controls": open ? "split-button-menu" : void 0,
    "aria-expanded": open ? "true" : void 0,
    "aria-label": "select merge strategy",
    "aria-haspopup": "menu",
    onClick: handleToggle
  }, /* @__PURE__ */ react.exports.createElement(default_1$8, null))), /* @__PURE__ */ react.exports.createElement(Popper, {
    open,
    anchorEl: anchorRef.current,
    role: void 0,
    transition: true,
    disablePortal: true,
    popperOptions: {
      placement: "top"
    }
  }, ({
    TransitionProps,
    placement
  }) => /* @__PURE__ */ react.exports.createElement(Grow, __spreadProps(__spreadValues({}, TransitionProps), {
    style: {
      transformOrigin: placement === "bottom" ? "center top" : "center bottom"
    }
  }), /* @__PURE__ */ react.exports.createElement(Paper, null, /* @__PURE__ */ react.exports.createElement(ClickAwayListener, {
    onClickAway: handleClose
  }, /* @__PURE__ */ react.exports.createElement(MenuList, {
    id: "split-button-menu"
  }, buttonChoices.map((buttonChoice) => /* @__PURE__ */ react.exports.createElement(MenuItem, {
    key: buttonChoice.id,
    selected: buttonChoice.id === primaryButtonId,
    onClick: () => handleMenuItemClick(buttonChoice.id)
  }, buttonChoice.icon, buttonChoice.label))))))));
};
const UiModeIcon = (props) => {
  const {
    uiMode
  } = props;
  switch (uiMode) {
    case UiMode.video:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$b, null));
    case UiMode.looping:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$b, null), "2");
    case UiMode.singlePhoto:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$a, null), "0");
    case UiMode.photo:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$a, null));
    case UiMode.burstPhoto:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$a, null), "2");
    case UiMode.nightPhoto:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$a, null), "3");
    case UiMode.timeWarpVideo:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$9, null));
    case UiMode.timeLapseVideo:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$9, null), "2");
    case UiMode.timeLapsePhoto:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$9, null), "3");
    case UiMode.nightLapsePhoto:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(default_1$9, null), "4");
    default:
      return /* @__PURE__ */ React.createElement(React.Fragment, null, "*");
  }
};
function useModesNamesWithTranslations(modesNames) {
  const {
    t,
    i18n
  } = useTranslation();
  return modesNames.map((modeName) => {
    const path = `modes.${modeName.uiMode}`;
    return __spreadProps(__spreadValues({}, modeName), {
      name: i18n.exists(path) ? t(path) : modeName.name
    });
  });
}
const ModeSwitcherGroupButton = (props) => {
  const {
    groupId,
    availableModeIds
  } = props;
  const activeGroupModeId = useAppSelector((state) => selectActiveUiModeByUiModeGroup(state, groupId));
  const uiModesNames = useAppSelector((state) => selectUiModesNames(state, availableModeIds));
  const modeNames = useModesNamesWithTranslations(uiModesNames);
  const currentModeId = useAppSelector(selectCurrentUiMode);
  const isSelected = currentModeId === activeGroupModeId;
  const dispatch = useAppDispatch();
  const availableModes = modeNames.map((x) => ({
    icon: /* @__PURE__ */ React.createElement(UiModeIcon, {
      uiMode: x.uiMode
    }),
    label: x.name,
    onClick: () => dispatch(setUiModeCommand(x.uiMode)),
    id: x.uiMode
  }));
  return /* @__PURE__ */ React.createElement(SplitButton, {
    isGroupSelected: isSelected,
    primaryButtonId: activeGroupModeId,
    buttonChoices: availableModes
  });
};
const ModeSwitchButtons = () => {
  const uiModeGroups = useAppSelector(selectUiModeGroups);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, uiModeGroups.map((x) => /* @__PURE__ */ React.createElement(ModeSwitcherGroupButton, {
    key: x.group,
    groupId: x.group,
    availableModeIds: x.modes
  })));
};
function getIconByStatus(sdCardStatus) {
  switch (sdCardStatus) {
    case SdCardStatus.Unknown:
    case SdCardStatus.SdCardFormatError:
      return /* @__PURE__ */ React.createElement(default_1$d, {
        color: "error"
      });
    default:
      return /* @__PURE__ */ React.createElement(default_1$c, null);
  }
}
const SdCardIcon = (props) => {
  const {
    sdCardStatus,
    storageRemainingTimeText
  } = props;
  const icon = getIconByStatus(sdCardStatus);
  const isError = sdCardStatus === SdCardStatus.SdCardFormatError || sdCardStatus === SdCardStatus.Unknown;
  const text = sdCardStatus === SdCardStatus.SdCardFormatError ? "Format Error" : storageRemainingTimeText;
  return /* @__PURE__ */ React.createElement(IconButton, {
    color: isError ? "error" : void 0
  }, icon, /* @__PURE__ */ React.createElement(Typography, {
    variant: "body1"
  }, text));
};
function useTranslatedSetting(setting) {
  const {
    t,
    i18n
  } = useTranslation();
  const translatedSetting = react.exports.useMemo(() => {
    const settingNamePath = `settings.${setting.id}.name`;
    const settingName = i18n.exists(settingNamePath) ? t(settingNamePath) : setting.displayName;
    const options = setting.options.map((o) => {
      const settingOptionNamePath = `settings.${setting.id}.options.${o.id}.name`;
      const optionName = i18n.exists(settingOptionNamePath) ? t(settingOptionNamePath) : o.displayName;
      return __spreadProps(__spreadValues({}, o), {
        displayName: optionName
      });
    });
    return __spreadProps(__spreadValues({}, setting), {
      displayName: settingName,
      options
    });
  }, [setting, i18n, t]);
  return translatedSetting;
}
const functionQueue = functionQueueProvider();
async function sendSettingCommand(commandData) {
  await functionQueue(async () => {
    const {
      characteristics
    } = bluetoothDeviceState;
    if (!characteristics)
      throw new Error("no characteristics");
    const {
      settingsCharacteristic
    } = characteristics;
    await settingsCharacteristic.writeValue(new Uint8Array(commandData));
  }, sendSettingCommand);
}
function getByteLength(data) {
  let i = 0;
  while (data > 0) {
    i++;
    data /= 256;
  }
  return i;
}
const setSettingValueCommand = createAsyncThunk("settingsCommands/setSettingValue", async (props) => {
  var _a, _b;
  const settingLength = (_b = (_a = allKnownSettings.find((setting) => setting.id === props.settingId)) == null ? void 0 : _a.length) != null ? _b : getByteLength(props.valueId);
  const commandData = [];
  commandData.push(settingLength + 2);
  commandData.push(props.settingId);
  commandData.push(settingLength);
  for (let i = 0; i < settingLength; i++) {
    commandData.push(props.valueId >> i * 8 & 255);
  }
  await sendSettingCommand(commandData);
});
const ToggleWifiOffOnConnect = () => {
  const [isTurnOffWiFiEnabled, setIsTurnOffWiFiEnabled] = react.exports.useReducer((_, cur) => {
    localStorage.setItem("isTurnOffWiFiEnabled", JSON.stringify(cur));
    return cur;
  }, localStorage.getItem("isTurnOffWiFiEnabled") === "true");
  const handleChange = (_, checked) => {
    setIsTurnOffWiFiEnabled(checked);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormControlLabel, {
    control: /* @__PURE__ */ React.createElement(Checkbox, {
      checked: isTurnOffWiFiEnabled,
      onChange: handleChange
    }),
    label: "Turn off WiFi hotspot on connect"
  }));
};
const SettingsPreferencesButton = () => {
  const [isModalOpen, setIsModalOpen] = react.exports.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SettingsPreferencesDialog, {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), /* @__PURE__ */ React.createElement(IconButton, {
    onClick: handleOpenModal
  }, /* @__PURE__ */ React.createElement(default_1$e, null)));
};
const SettingsPreferencesDialog = (props) => {
  const {
    isOpen,
    onClose
  } = props;
  const generalSettings2 = useAppSelector(selectAllGeneralSettings);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Dialog, {
    open: isOpen,
    onClose
  }, /* @__PURE__ */ React.createElement(DialogTitle, null, "Preferences"), /* @__PURE__ */ React.createElement(DialogContent, null, /* @__PURE__ */ React.createElement(ToggleWifiOffOnConnect, null), generalSettings2.map((setting) => /* @__PURE__ */ React.createElement(SingleSetting$1, {
    key: setting.id,
    setting
  })))));
};
const SingleSetting$1 = (props) => {
  const dispatch = useAppDispatch();
  const {
    setting
  } = props;
  const translatedSetting = useTranslatedSetting(setting);
  const currentSettingValue = useAppSelector((state) => state.goproSettingsReducer.settings[translatedSetting.id]);
  const handleChange = (event) => {
    const selectedSettingValue = parseInt(event.target.value, 10);
    dispatch(setSettingValueCommand({
      settingId: translatedSetting.id,
      valueId: selectedSettingValue
    }));
  };
  if (!currentSettingValue)
    return /* @__PURE__ */ React.createElement("div", null, "something went wrong... known setting missing");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormControl, {
    variant: "standard",
    sx: {
      m: 1,
      minWidth: 120
    }
  }, /* @__PURE__ */ React.createElement(InputLabel, null, translatedSetting.displayName), /* @__PURE__ */ React.createElement(Select, {
    value: currentSettingValue.value.toString(),
    onChange: handleChange,
    label: translatedSetting.displayName
  }, translatedSetting.options.map((possibleValue) => /* @__PURE__ */ React.createElement(MenuItem, {
    key: possibleValue.id,
    value: possibleValue.id
  }, possibleValue.displayName)))));
};
const CurrentModeSettingsPreview = () => {
  const previewSettings = useAppSelector(selectCurrentModePreviewSettings);
  return /* @__PURE__ */ React.createElement("p", {
    style: {
      textAlign: "center",
      margin: "auto"
    }
  }, previewSettings.map((setting, index) => /* @__PURE__ */ React.createElement("span", {
    key: setting.id
  }, index > 0 ? "|" : null, /* @__PURE__ */ React.createElement(SingleSettingText, {
    setting
  }))));
};
const SingleSettingText = (props) => {
  const {
    setting
  } = props;
  const {
    currentOptionId
  } = setting;
  const translatedSetting = useTranslatedSetting(setting);
  const currentOption = translatedSetting.options.find((x) => x.id === currentOptionId);
  if (!currentOption)
    return /* @__PURE__ */ React.createElement(React.Fragment, null, "Missing setting option!");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, currentOption.displayName);
};
const useStyles$2 = makeStyles()({
  temp: {
    display: "flex"
  }
});
const SettingsPreview = () => {
  const [isModalOpen, setIsModalOpen] = react.exports.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const [previewElevation, setPreviewElevation] = react.exports.useState(1);
  useStyles$2();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SettingsPreviewModal, {
    isOpen: isModalOpen,
    onClose: handleCloseModal
  }), /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm",
    sx: {
      width: "fit-content",
      marginBottom: "1rem"
    }
  }, /* @__PURE__ */ React.createElement(Paper, {
    elevation: previewElevation,
    onMouseOver: () => setPreviewElevation(3),
    onMouseOut: () => setPreviewElevation(1),
    onClick: handleOpenModal,
    sx: {
      minWidth: "40vw",
      minHeight: "2em"
    }
  }, /* @__PURE__ */ React.createElement(CurrentModeSettingsPreview, null))));
};
const SettingsPreviewModal = (props) => {
  const {
    isOpen,
    onClose
  } = props;
  const currentModeSettings = useAppSelector(selectFilteredCurrentModeSettings);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Dialog, {
    open: isOpen,
    onClose
  }, /* @__PURE__ */ React.createElement(DialogTitle, null, "Change mode settings"), /* @__PURE__ */ React.createElement(DialogContent, null, currentModeSettings.map((setting) => /* @__PURE__ */ React.createElement(SingleSetting, {
    key: setting.id,
    setting
  })))));
};
const SingleSetting = (props) => {
  const dispatch = useAppDispatch();
  const {
    setting
  } = props;
  const translatedSetting = useTranslatedSetting(setting);
  const currentSettingValue = useAppSelector((state) => state.goproSettingsReducer.settings[translatedSetting.id]);
  const handleChange = (event) => {
    const selectedSettingValue = parseInt(event.target.value, 10);
    dispatch(setSettingValueCommand({
      settingId: translatedSetting.id,
      valueId: selectedSettingValue
    }));
  };
  useStyles$2();
  if (!currentSettingValue)
    return /* @__PURE__ */ React.createElement("div", null, "something went wrong... known setting missing");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(FormControl, {
    variant: "standard",
    sx: {
      m: 1,
      minWidth: 120
    }
  }, /* @__PURE__ */ React.createElement(InputLabel, null, translatedSetting.displayName), /* @__PURE__ */ React.createElement(Select, {
    value: currentSettingValue.value.toString(),
    onChange: handleChange,
    label: translatedSetting.displayName
  }, translatedSetting.options.map((possibleValue) => /* @__PURE__ */ React.createElement(MenuItem, {
    key: possibleValue.id,
    value: possibleValue.id
  }, possibleValue.displayName)))));
};
const useStyles$1 = makeStyles()({
  pageWrapper: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  topControls: {
    width: "100%"
  },
  bottomControls: {
    width: "100%"
  },
  bottomCenteredButtons: {
    width: "100%",
    alignSelf: "flex-end",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row"
  },
  alignLeftToRight: {
    display: "flex"
  },
  button: {
    margin: "0.5rem"
  },
  recordButton: {
    margin: "0.5rem",
    "& svg": {
      fontSize: "5rem"
    }
  },
  floatLeft: {
    flex: 1,
    display: "flex"
  },
  floatRight: {
    flex: 1,
    display: "flex",
    alignItems: "center"
  }
});
const MainModeView = () => {
  const {
    classes
  } = useStyles$1();
  const deviceName = useAppSelector(selectDeviceName);
  const isWifiApEnabled = useAppSelector(selectIsWifiApEnabled);
  const batteryPercentage = useAppSelector(selectBatteryPercentage);
  const isCharging = useAppSelector(selectIsBatteryCharging);
  const sdCardStatus = useAppSelector(selectSdCardStatus);
  const storageRemainingTimeText = useAppSelector(selectStorageRemainingTimeText);
  const isShutterActive = useAppSelector(selectIsShutterActive);
  const currentRecordingTimeText = useAppSelector(selectCurrentRecordingTimeText);
  const dispatch = useAppDispatch();
  const handlePowerButtonClick = () => {
    dispatch(sleepCommand());
  };
  const handleWiFiButtonClick = () => {
    if (isWifiApEnabled) {
      dispatch(apControlWiFiApOffCommand());
    } else {
      dispatch(apControlWiFiApOnCommand());
    }
  };
  const handleShutterButtonClick = () => {
    if (isShutterActive) {
      dispatch(setShutterOffCommand());
    } else {
      dispatch(setShutterOnCommand());
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Container, {
    maxWidth: "sm",
    sx: {
      display: "flex",
      flexGrow: 1
    }
  }, /* @__PURE__ */ React.createElement(Paper, {
    className: classes.pageWrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.topControls
  }, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Container, {
    sx: {
      width: "fit-content"
    }
  }, /* @__PURE__ */ React.createElement(Paper, {
    sx: {
      padding: "0.4em"
    },
    elevation: 2
  }, /* @__PURE__ */ React.createElement(Typography, {
    variant: "h4"
  }, deviceName)), /* @__PURE__ */ React.createElement(IconButton, {
    onClick: handlePowerButtonClick
  }, /* @__PURE__ */ React.createElement(default_1$f, null)), /* @__PURE__ */ React.createElement(IconButton, {
    onClick: handleWiFiButtonClick
  }, isWifiApEnabled ? /* @__PURE__ */ React.createElement(default_1$g, null) : /* @__PURE__ */ React.createElement(default_1$h, null)), /* @__PURE__ */ React.createElement(SdCardIcon, {
    sdCardStatus,
    storageRemainingTimeText
  }), /* @__PURE__ */ React.createElement(BatteryPercentageIcon, {
    batteryPercentage,
    isCharging
  }))), /* @__PURE__ */ React.createElement("div", {
    className: classes.bottomControls
  }, /* @__PURE__ */ React.createElement(SettingsPreview, null), /* @__PURE__ */ React.createElement("div", {
    className: classes.bottomCenteredButtons
  }, /* @__PURE__ */ React.createElement(ModeSwitchButtons, null)), /* @__PURE__ */ React.createElement("div", {
    className: classes.alignLeftToRight
  }, /* @__PURE__ */ React.createElement("div", {
    className: classes.floatLeft
  }, /* @__PURE__ */ React.createElement(SettingsPreferencesButton, null)), /* @__PURE__ */ React.createElement("div", {
    className: classes.recordButton
  }, /* @__PURE__ */ React.createElement(IconButton, {
    onClick: handleShutterButtonClick,
    "aria-label": "Record button",
    color: "error"
  }, isShutterActive ? /* @__PURE__ */ React.createElement(default_1$i, null) : /* @__PURE__ */ React.createElement(default_1$j, null))), /* @__PURE__ */ React.createElement("div", {
    className: classes.floatRight
  }, isShutterActive && /* @__PURE__ */ React.createElement(Typography, {
    variant: "h6"
  }, currentRecordingTimeText)))))));
};
const useToggleWiFiOffOnConnect = () => {
  const [isFirstRun, setIsFirstRun] = react.exports.useState(false);
  const [shouldToggleWiFi, setShouldToggleWiFi] = react.exports.useState(false);
  const isWifiApEnabled = useAppSelector(selectIsWifiApEnabled);
  const isInitialized = useAppSelector(selectIsConnectedAndInitialized);
  const dispatch = useAppDispatch();
  react.exports.useEffect(() => {
    if (isInitialized)
      setIsFirstRun(true);
    setShouldToggleWiFi(localStorage.getItem("isTurnOffWiFiEnabled") === "true");
  }, [isInitialized]);
  react.exports.useEffect(() => {
    if (!isFirstRun)
      return;
    if (shouldToggleWiFi && isWifiApEnabled)
      dispatch(apControlWiFiApOffCommand());
    setIsFirstRun(false);
  }, [isFirstRun, shouldToggleWiFi, isWifiApEnabled, dispatch]);
};
const useAllPreferences = () => {
  useToggleWiFiOffOnConnect();
};
const useStyles = makeStyles()({
  flexContent: {
    position: "absolute",
    height: "100%",
    width: "100%",
    maxHeight: "-webkit-fill-available",
    display: "flex",
    flexDirection: "column"
  }
});
const RenderContent = () => {
  const deviceAvailability = useAppSelector((state) => state.goproBluetoothReducer.deviceAvailability);
  const isGattConnected = useAppSelector((state) => state.goproBluetoothReducer.isGattConnected);
  const isSettingsLoaded = useAppSelector((state) => !state.goproSettingsMetadataReducer.isFetching && state.goproSettingsMetadataReducer.settingsJson);
  const isInitialized = useAppSelector(selectIsConnectedAndInitialized);
  if (window.location.protocol !== "https:")
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      errorTitle: "Bluetooth requires https",
      errorDescription: "Web Bluetooth will only work on https pages"
    });
  if (!("bluetooth" in navigator))
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      errorTitle: "Bluetooth not supported",
      errorDescription: "Your browser does not support bluetooth. https://caniuse.com/web-bluetooth"
    });
  switch (deviceAvailability) {
    case BluetoothDeviceAvailability.None:
    case BluetoothDeviceAvailability.BeingRequested:
    case BluetoothDeviceAvailability.SavedAndWaitingForAdvertisement:
      return /* @__PURE__ */ React.createElement(SearchForGoProView, null);
  }
  if (!isGattConnected)
    return /* @__PURE__ */ React.createElement(ConnectToGoProView, null);
  if (!isSettingsLoaded)
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      errorTitle: "Fetching settings...",
      errorDescription: "A little time consuming process, TODO cache this between runs"
    });
  if (!isInitialized)
    return /* @__PURE__ */ React.createElement(ErrorPage, {
      errorTitle: "Getting current camera status...",
      errorDescription: "Should be quick"
    });
  return /* @__PURE__ */ React.createElement(MainModeView, null);
};
const App = () => {
  useAllPreferences();
  const {
    classes
  } = useStyles();
  return /* @__PURE__ */ React.createElement("div", {
    className: classes.flexContent
  }, /* @__PURE__ */ React.createElement(Header, null), /* @__PURE__ */ React.createElement(RenderContent, null));
};
const AppProvider = () => {
  const theme = useAppTheme();
  return /* @__PURE__ */ React.createElement(Provider, {
    store
  }, /* @__PURE__ */ React.createElement(tssReact.GlobalStyles, {
    styles: {
      body: {
        margin: 0,
        padding: 0
      }
    }
  }), /* @__PURE__ */ React.createElement(ThemeProvider, {
    theme
  }, /* @__PURE__ */ React.createElement(DynamicManifestProvider, null), /* @__PURE__ */ React.createElement(ServiceWorkerContainer, null), /* @__PURE__ */ React.createElement(ToastContainer, null), /* @__PURE__ */ React.createElement(CssBaseline, null), /* @__PURE__ */ React.createElement(App, null)));
};
const container = document.getElementById("root");
if (!container)
  throw new Error("Couldn't find root container");
const root = createRoot(container);
root.render(/* @__PURE__ */ React.createElement(AppProvider, null));
