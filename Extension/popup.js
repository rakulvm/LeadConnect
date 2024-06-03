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
    { action: "getName" },
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

        alert(JSON.stringify(results));
        console.log(results);
      })
      .catch((error) => {
        console.error("Error in sending messages:", error);
      });
  });
});

// OLD CODE

// document.getElementById('getName').addEventListener('click', () => {
//   let finalData = "";
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tabId = tabs[0].id;
//       // Send a message to the content script
//       chrome.tabs.sendMessage(tabId, { action: "getName" }, (response) => {
//         if (response && response.text) {
//           finalData = response.text;
//         } else {
//           alert("Element text not found.");
//         }
//       });

//     });
//     console.log(finalData);
//   });

// document.getElementById('getProfilePicture').addEventListener('click', () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const tabId = tabs[0].id;

//     // Send a message to the content script
//     chrome.tabs.sendMessage(tabId, { action: "getProfilePicture" }, (response) => {
//       if (response && response.text) {
//         alert(response.text);
//       } else {
//         alert("Element text not found.");
//       }
//     });
//   });
// });

// document.getElementById('getLocation').addEventListener('click', () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const tabId = tabs[0].id;

//     // Send a message to the content script
//     chrome.tabs.sendMessage(tabId, { action: "getLocation" }, (response) => {
//       if (response && response.text) {
//         alert(response.text);
//       } else {
//         alert("Element text not found.");
//       }
//     });
//   });
// });

// document.getElementById('getExperience').addEventListener('click', () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const tabId = tabs[0].id;

//     // Send a message to the content script
//     chrome.tabs.sendMessage(tabId, { action: "getExperience" }, (response) => {
//       if (response && response.text) {
//         alert(response.text);
//       } else {
//         alert("Element text not found.");
//       }
//     });
//   });
// });
