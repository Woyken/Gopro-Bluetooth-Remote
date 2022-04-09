import { r as react, J as v, K as n } from "./vendor.e61fe395.js";
function registerSW(options = {}) {
  const {
    immediate = false,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisterError
  } = options;
  let wb;
  let registration;
  const updateServiceWorker = async (reloadPage = true) => {
    {
      if (reloadPage) {
        wb == null ? void 0 : wb.addEventListener("controlling", (event) => {
          if (event.isUpdate)
            window.location.reload();
        });
      }
      if (registration && registration.waiting) {
        await n(registration.waiting, { type: "SKIP_WAITING" });
      }
    }
  };
  if ("serviceWorker" in navigator) {
    wb = new v("/Gopro-Bluetooth-Remote/sw.js", { scope: "/Gopro-Bluetooth-Remote/" });
    wb.addEventListener("activated", (event) => {
      if (event.isUpdate)
        ;
      else
        onOfflineReady == null ? void 0 : onOfflineReady();
    });
    {
      const showSkipWaitingPrompt = () => {
        onNeedRefresh == null ? void 0 : onNeedRefresh();
      };
      wb.addEventListener("waiting", showSkipWaitingPrompt);
      wb.addEventListener("externalwaiting", showSkipWaitingPrompt);
    }
    wb.register({ immediate }).then((r) => {
      registration = r;
      onRegistered == null ? void 0 : onRegistered(r);
    }).catch((e) => {
      onRegisterError == null ? void 0 : onRegisterError(e);
    });
  }
  return updateServiceWorker;
}
function useRegisterSW(options = {}) {
  const {
    immediate = true,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisterError
  } = options;
  const [needRefresh, setNeedRefresh] = react.exports.useState(false);
  const [offlineReady, setOfflineReady] = react.exports.useState(false);
  const [updateServiceWorker] = react.exports.useState(() => {
    return registerSW({
      immediate,
      onOfflineReady() {
        setOfflineReady(true);
        onOfflineReady == null ? void 0 : onOfflineReady();
      },
      onNeedRefresh() {
        setNeedRefresh(true);
        onNeedRefresh == null ? void 0 : onNeedRefresh();
      },
      onRegistered,
      onRegisterError
    });
  });
  return {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker
  };
}
export { useRegisterSW };
