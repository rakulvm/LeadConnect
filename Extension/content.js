chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getName") {
    const element = document.getElementsByTagName("h1")[0].textContent;
    if (element) {
      sendResponse({ text: element });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getSummary") {
    const spans = document.querySelectorAll("span");
    // Find the experience Text
    const element = Array.from(spans).find(
      (span) => span.textContent.trim() === "About"
    );

    if (element) {
      sendResponse({
        text: element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[2].textContent.trim(),
      });
    } else {
      sendResponse({ text: "" });
    }
  } else if (request.action === "getLinkedinURL") {
    sendResponse({ text: window.location.href });
  } else if (request.action === "getHeadline") {
    const element = document
      .getElementsByTagName("h1")[0]
      .parentElement.parentElement.parentElement.parentElement.children[1].textContent.trim();
    if (element) {
      sendResponse({ text: element });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getProfilePicture") {
    const element = document.querySelector(
      ".pv-top-card__non-self-photo-wrapper img"
    );
    if (element) {
      sendResponse({ text: element.getAttribute("src") });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getLocation") {
    const element = document
      .getElementsByTagName("h1")[0]
      .parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].textContent.trim();
    if (element) {
      sendResponse({ text: element });
    } else {
      sendResponse({ text: null });
    }
  } else if (request.action === "getExperience") {
    const spans = document.querySelectorAll("span");
    // Find the experience Text
    const targetSpan = Array.from(spans).find(
      (span) => span.textContent.trim() === "Experience"
    );

    // Locate the parent dic of the experience section
    const experienceSection =
      targetSpan.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement;

    // get the list of experience divs
    const experiences = experienceSection.children[2].querySelectorAll(
      ".artdeco-list__item"
    );

    // Final output list
    let experiencesData = [];

    // Go through each experience
    for (let i = 0; i < experiences.length; i++) {
      // Company Data
      let company = {};
      // check if there are multiple roles in the same company
      let experienceEach = experiences[i].querySelectorAll("div.t-bold");
      if (experienceEach.length > 2) {
        // Multiple roles in the same company
        // Company Name
        const companyName =
          experiences[i].querySelectorAll("span")[0].textContent;
        company["CompanyName"] = companyName;

        // Extract the dynamic class that linkedin uses to extract company roles
        let newexperienceEach = experiences[i].querySelectorAll(
          ".pvs-entity__sub-components"
        );

        let className = newexperienceEach[0]
          .querySelector("ul")
          .querySelectorAll("li")[0]
          .querySelectorAll("div")[0].classList[0];

        let positionList = [];
        let currentCompanyRoles = experiences[i].querySelectorAll(
          "." + className
        );
        // Find the company location
        const companyLocation = experiences[i].querySelectorAll(
          "span.pvs-entity__caption-wrapper"
        );
        let companyLocationText = "";
        // Handle the case when company text is not present
        if (currentCompanyRoles.length == companyLocation.length) {
          // company duration exist
          companyLocationText = companyLocation[0].textContent.split(" · ")[0];
        } else {
          // company duration doesnt exist
          companyLocationText = "";
        }
        // iterate through the roles and extract data of each role
        for (let j = 1; j < currentCompanyRoles.length; j++) {
          let position = {};
          // role
          position["CompanyRole"] = currentCompanyRoles[j]
            .querySelector("a")
            .querySelector("span").textContent;

          // Company Location
          position["companyLocation"] = companyLocationText;
          // 'May 2018 - Aug 2023 · 5 yrs 4 mos'
          position["companyDuration"] = currentCompanyRoles[j]
            .querySelector("a")
            .querySelectorAll(".pvs-entity__caption-wrapper")[0]
            .textContent.split(" · ")[0];

          position["companyTotalDuration"] = currentCompanyRoles[j]
            .querySelector("a")
            .querySelectorAll(".pvs-entity__caption-wrapper")[0]
            .textContent.split(" · ")[1];
          // Bullet point
          let bulletPointsText = currentCompanyRoles[j]
            ?.querySelector("ul")
            ?.querySelectorAll("li")[0]
            ?.textContent.trim();
          position["bulletPoints"] = bulletPointsText ? bulletPointsText : "";
          positionList.push(position);
        }
        company["companyPositions"] = positionList;
      } else {
        // Single role in the comapny
        // Company Role
        let position = {};
        const companyRole =
          experiences[i].querySelectorAll("span")[0].textContent;
        position["companyRole"] = companyRole;

        // Company Name
        const companyName =
          experiences[i].querySelectorAll("span")[3].textContent;
        company["companyName"] = companyName?.trim().split(" · ")[0];

        // Company Location
        let companyData = experiences[i].querySelectorAll("span:not([class])");
        position["companyLocation"] = "";
        position["bulletPoints"] = "";
        if (
          companyData.length == 4 &&
          companyData[2].parentElement?.classList?.contains("t-black--light")
        ) {
          position["companyLocation"] = companyData[2]?.textContent?.trim();
          position["companyLocation"] = position["companyLocation"] ? position["companyLocation"] : ''
          position["bulletPoints"] = companyData[3]?.textContent?.trim();
          position["bulletPoints"] = position["bulletPoints"] ? position["bulletPoints"] : ''
        } else if (
          companyData.length == 3 &&
          companyData[2].parentElement?.classList?.contains("t-black--light")
        ) {
          position["companyLocation"] = companyData[2]?.textContent?.trim();
          position["companyLocation"] = position["companyLocation"] ? position["companyLocation"] : ''
        } else {
          position["bulletPoints"] = companyData[2]?.textContent?.trim();
          position["bulletPoints"] = position["bulletPoints"] ? position["bulletPoints"] : ''
        }

        // Company Duration
        const companyDuration = experiences[i].querySelectorAll(
          ".pvs-entity__caption-wrapper"
        )[0].textContent;
        position["companyDuration"] = companyDuration.split(" · ")[0];
        position["companyTotalDuration"] = companyDuration.split(" · ")[1];

        company["companyPositions"] = [position];
      }
      experiencesData.push(company);
    }
    sendResponse({ text: experiencesData });
  }
});

console.log("Installed");
