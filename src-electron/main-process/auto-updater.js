import { dialog } from "electron";
import isDev from "electron-is-dev";
import { autoUpdater } from "electron-updater";

let isUpdating = false;

async function checkForUpdate(getMainWindow, onQuitAndInstall) {
  // Disable for development
  if (isDev) {
    return;
  }

  if (isUpdating) {
    return;
  }

  autoUpdater.logger = console;

  try {
    // Get the update using electron-updater
    try {
      const info = await autoUpdater.checkForUpdates();
      if (!info.downloadPromise) {
        console.info("auto-update: no update to download");

        return;
      }
      await info.downloadPromise;
    } catch (error) {
      await showCannotUpdateDialog(getMainWindow());
      throw error;
    }

    // Update downloaded successfully, we should ask the user to update
    console.info("auto-update: showing update dialog...");
    const shouldUpdate = await showUpdateDialog(getMainWindow());
    if (!shouldUpdate) {
      return;
    }

    console.info("auto-update: calling quitAndInstall...");
    if (onQuitAndInstall) {
      onQuitAndInstall(autoUpdater);
    }
  } catch (error) {
    console.error("auto-update error:", getPrintableError(error));
  } finally {
    isUpdating = false;
  }
}

function getPrintableError(error) {
  return error && error.stack ? error.stack : error;
}

async function showUpdateDialog(mainWindow) {
  const RESTART_BUTTON = 0;
  const LATER_BUTTON = 1;
  const options = {
    type: "info",
    buttons: ["Restart Wallet", "Later"],
    title: "Loki Electron Wallet update available",
    message: "There is a new version of Loki Electron Wallet available.",
    detail: "Press Restart Wallet to apply the update",
    defaultId: LATER_BUTTON,
    cancelId: RESTART_BUTTON
  };
  return new Promise(resolve => {
    dialog.showMessageBox(mainWindow, options, response => {
      resolve(response === RESTART_BUTTON);
    });
  });
}

async function showCannotUpdateDialog(mainWindow) {
  const options = {
    type: "error",
    buttons: ["Ok"],
    title: "Cannot update",
    message:
      "Loki Electron Wallet failed to update but there is a new version available. Please go to https://loki.network/ and install the new version manually."
  };

  return new Promise(resolve => {
    dialog.showMessageBox(mainWindow, options, () => {
      resolve();
    });
  });
}

export { checkForUpdate };
