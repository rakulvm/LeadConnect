// Refactor

document.getElementById('getName').addEventListener('click', () => {
  // Function to send a message and get a response as a promise
  const sendMessageToTab = (tabId, message) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve({ action: message.action, text: response ? response.text : null });
        }
      });
    });
  };

  // Initialize an object to store the results
  let results = {
  };

  // Example messages to send
  const messages = [{ action: "getName" }, { action: "getLocation" }, { action: "getProfilePicture" }];

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    const promises = messages.map(message => sendMessageToTab(tabId, message));

    Promise.all(promises)
      .then(responses => {
        // Populate the results object with the responses
        responses.forEach(response => {
          if (response && response.text) {
            results[response.action] = response.text;
          } else {
            results[response.action] = "Element text not found.";
          }
        });

        alert(JSON.stringify(results));
      })
      .catch(error => {
        console.error('Error in sending messages:', error);
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
  