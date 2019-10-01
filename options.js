'use strict';

const saveOptions = () => {
  const urlPattern = document.getElementById('urlPattern').value;
  const alertMessage = document.getElementById('alertMessage').value;

  const options = { urlPattern, alertMessage };

  chrome.storage.sync.set(options);
};

const restoreOptions = async () => {
  const options = await new Promise((resolve) => {
    chrome.storage.sync.get(['urlPattern', 'alertMessage'], resolve);
  });

  document.getElementById('urlPattern').value = options.urlPattern || '';
  document.getElementById('alertMessage').value = options.alertMessage || '';
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
