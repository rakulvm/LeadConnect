chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.url && (details.url.includes("https://www.linkedin.com") || details.url.includes("http://localhost:5173/") )) {
    chrome.action.enable(details.tabId);
  } else {
    chrome.action.disable(details.tabId);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
