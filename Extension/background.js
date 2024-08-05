// background.js

chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url && (details.url.includes("https://www.linkedin.com") || details.url.includes("http://localhost:5173/"))) {
    chrome.action.setIcon({
      tabId: details.tabId,
      path: {
        "16": "icon16.png", 
        "48": "icon48.png", 
        "128": "icon128.png" 
      }
    });
    chrome.action.enable(details.tabId);
  } else {
    chrome.action.setIcon({
      tabId: details.tabId,
      path: {
        "16": "icon-16-grey.png",
        "48": "icon-48-grey.png",
        "128": "icon-128-grey.png"
      }
    });
    chrome.action.disable(details.tabId);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
