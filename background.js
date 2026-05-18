const blockedSites = [
  "*://*.tiktok.com/*",
  "*://*.twitter.com/*",
  "*://*.x.com/*",
  "*://*.instagram.com/*",
];

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: chrome.runtime.getURL("blocked.html") };
  },
  { urls: blockedSites },
  ["blocking"]
);
