document.getElementById('getName').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
  
      // Send a message to the content script
      chrome.tabs.sendMessage(tabId, { action: "getName" }, (response) => {
        if (response && response.text) {
          alert(response.text);
        } else {
          alert("Element text not found.");
        }
      });
    });
  });
  

  document.getElementById('getExperience').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
  
      // Send a message to the content script
      chrome.tabs.sendMessage(tabId, { action: "getExperience" }, (response) => {
        if (response && response.text) {
          alert(response.text);
        } else {
          alert("Element text not found.");
        }
      });
    });
  });
  