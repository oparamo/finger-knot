'use-strict';

const getItemsFromStorage = async (items) => {
  const getItemsPromise = new Promise((resolve) => {
    chrome.storage.sync.get(items, resolve);
  });

  return getItemsPromise;
};

const onCompletedListener = async () => {
  const items = await getItemsFromStorage('alertMessage');

  if (items && items.alertMessage && items.alertMessage !== '') {
    alert(items.alertMessage);
  }
};

const registerListener = async () => {
  const items = await getItemsFromStorage('urlPattern');

  if (items && items.urlPattern && items.urlPattern !== '') {
    chrome.webNavigation.onCompleted.addListener(onCompletedListener, { url: [{ originAndPathMatches: items.urlPattern }] });
  }
};

const storageChangedListener = async () => {
  chrome.webNavigation.onCompleted.removeListener(onCompletedListener);

  await registerListener();
};

registerListener();

chrome.storage.onChanged.addListener(storageChangedListener);
