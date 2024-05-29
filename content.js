chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getName") {
    const element = document.getElementsByTagName("h1")[0].textContent;
    if (element) {
      sendResponse({ text: element });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getProfilePicture") {
    const element = document.querySelector(".pv-top-card__non-self-photo-wrapper img")
    if (element) {
      sendResponse({ text: element.getAttribute('src') });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getLocation") {
    const element = document.querySelector(".FMPgtzKYgIWGcGavuUNkHpFYmDiRWEYmpwVFjw.mt2 span")
    let elementTextContent = element.textContent.trim()

    if (element) {
      sendResponse({ text: elementTextContent });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getExperience") {
    const element =
      document.getElementsByClassName("artdeco-list__item")[3].textContent;
    if (element) {
      sendResponse({ text: element.replace(/\n/g, "") });
    } else {
      sendResponse({ text: null });
    }
  }
});

console.log("Installed");
