
let temp = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VybmFtZSI6ImhheWRlbiIsImV4cCI6MTcxODU1NTg3MH0.qJH56GBKHtjm7hg__K1uveelqyGvOk34HYKaEWTwXVw"
localStorage.setItem("leadconnect_token", temp);
let token = localStorage.getItem("leadconnect_token");
if(token && token.length > 5){
  window.location = "popup.html";

}

// Refactor
function convertToCamelCase(str) {
  // Remove "get" from the start of the string
  let newStr = str.replace(/^get/, "");

  // Convert to camel case
  return newStr.replace(/(?:^\w|[A-Z]|\b\w|\s+|[-_]+)/g, (match, index) => {
    if (+match === 0) return ""; // or if (/\d/.test(match)) for number removal
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

document.getElementById("getName").addEventListener("click", () => {
  // Function to send a message and get a response as a promise
  const sendMessageToTab = (tabId, message) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve({
            action: message.action,
            text: response ? response.text : null,
          });
        }
      });
    });
  };

  // Initialize an object to store the results
  let results = {};

  // Example messages to send
  const messages = [
    { action: "getToken" },

  ];

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    const promises = messages.map((message) =>
      sendMessageToTab(tabId, message)
    );

    Promise.all(promises)
      .then((responses) => {
        // Populate the results object with the responses
        responses.forEach((response) => {
          let key = convertToCamelCase(response.action);
          if (response && response.text) {
            results[key] = response.text;
          } else {
            results[key] = "Element text not found.";
          }
        });
        if(results['token'] == "Element text not found."){
          // If not on our website then redirect

          alert("Please login into leadconnect website.. Will be redirecting now")
          // chrome.tabs.update(tabId, {url: "https://leadconnectai.in/"});


    
          return;
        }
        localStorage.setItem("leadconnect_token", results['token']);
      })
      .catch((error) => {
        console.error("Error in sending messages:", error);
      });
  });
});