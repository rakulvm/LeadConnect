
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

document.getElementById("generateCV").addEventListener("click", () => {
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
      { action: "getJD" },

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
  
        alert(results['jD'])
        chrome.tabs.update(tabId, {url: "http://localhost:5173/#/main?query="+encodeURI(results['jD'])});
      })
    })

})

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
    { action: "getName" },
    { action: "getLinkedinURL" },
    { action: "getSummary" },
    { action: "getHeadline" },
    { action: "getLocation" },
    { action: "getProfilePicture" },
    { action: "getExperience" },
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
        // if(results['token'] == "Element text not found."){
        //   alert("Please login into leadconnect website.. Will be redirecting now")
        //   chrome.tabs.update(tabId, {url: "https://leadconnectai.in/"});
        //   return;

        // }
        alert(JSON.stringify(results));
        console.log(results);
        let token = localStorage.getItem("leadconnect_token");
        const url = 'http://localhost:5000/api/createcontact';
        fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(results)
        })
        .then(response => {
          if (response.status === 401) {
            // If unauthorized, remove the token from local storage
            localStorage.removeItem("leadconnect_token");
            window.location = "login.html";
            throw new Error('Unauthorized');

          }
          return response.json();
        })
          .then(data => console.log('Success:', data))
          .catch(error => console.error('Error:', error));
      })
      .catch((error) => {
        console.error("Error in sending messages:", error);
      });
  });
});