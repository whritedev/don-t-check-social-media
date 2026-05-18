const CONFIG = {
  blockedSites: [
    "*://*.tiktok.com/*",
    "*://*.twitter.com/*",
    "*://*.x.com/*",
    "*://*.instagram.com/*",
  ],
  redirectPage: "blocked.html",
};

/**
 * Handles the blocking logic by redirecting requests to the blocked page.
 */
function handleRequest() {
  return { redirectUrl: chrome.runtime.getURL(CONFIG.redirectPage) };
}

// Register the listener for the blocked sites
chrome.webRequest.onBeforeRequest.addListener(
  handleRequest,
  { urls: CONFIG.blockedSites },
  ["blocking"]
);
