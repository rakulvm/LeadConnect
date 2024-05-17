chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getName") {
        const element = document.getElementsByTagName('h1')[0].textContent
        if (element) {
        sendResponse({ text: element });
      } else {
        sendResponse({ text: null });
      }
    }
    else if (request.action === "getExperience") {
        const element = document.getElementsByClassName('artdeco-list__item')[3].textContent;
        if (element) {
          sendResponse({ text: element.replace(/\n/g, '') });
        } else {
          sendResponse({ text: null });
        }
      }
  });
  
console.log("Installed");