const spans = document.querySelectorAll("span");
const targetSpan = Array.from(spans).find(
  (span) => span.textContent.trim() === "Experience"
);
const experienceSection =
  targetSpan.parentElement.parentElement.parentElement.parentElement
    .parentElement.parentElement;
// const experiences = experienceSection.querySelectorAll(
//   ".pkDhwOIEuoAIIiZRFGgXppNhdmUWwvlrVFqX.qWWKhMYtHtbRUZyWOlGEcnApsjZvtoA"
// );

const experiences = experienceSection.children[2].querySelectorAll(
  ".artdeco-list__item"
);

let experiencesData = [];

for (let i = 0; i < experiences.length; i++) {
  // Company Data
  let company = {};

  // all roles in the company
  // Start from 2 -> End
  let experienceEach = experiences[i].querySelectorAll(
    ".pvs-entity__sub-components"
  );

  if (experienceEach.length > 2) {
    // Multiple roles in the same company
    // Company Name
    const companyName = experiences[i].querySelectorAll("span")[0].textContent;
    company["CompanyName"] = companyName;

    // Company Duration
    // const companyDuration =
    //   experiences[i].querySelectorAll("span")[3].textContent;
    // company["companyDuration"] = companyDuration;

    // Company Location
    const companyLocation = experiences[i]
      .querySelectorAll("span")[12]
      .textContent.trim();
    if (companyLocation.includes("·")) {
      company["companyLocation"] = companyLocation.split(" · ")[0];
    } else {
      company["companyLocation"] = "";
    }

    // Work Location (Remote | Hybrid)
    // const companyWorkLocation = experiences[i]
    //   .querySelectorAll("span")[6]
    //   .textContent.trim()
    //   .split(" · ")[1];
    // company["companyWorkLocation"] = companyWorkLocation;

    let newexperienceEach = experiences[i].querySelectorAll(
      ".pvs-entity__sub-components"
    );

    let className = newexperienceEach[0]
      .querySelector("ul")
      .querySelectorAll("li")[0]
      .querySelectorAll("div")[0].classList[0];
    let positionList = [];
    let currentCompanyRoles = experiences[i].querySelectorAll("." + className);
    for (let j = 1; j < currentCompanyRoles.length; j++) {
      let position = {};
      // role
      position["CompanyRole"] = currentCompanyRoles[j]
        .querySelector("a")
        .querySelector("span").textContent;
      // 'May 2018 - Aug 2023 · 5 yrs 4 mos'
      position["CompanyDuration"] = currentCompanyRoles[j]
        .querySelector("a")
        .querySelectorAll("span")[3]
        .textContent.split(" · ")[0];
      position["companyTotalDuration"] = currentCompanyRoles[j]
        .querySelector("a")
        .querySelectorAll("span")[3]
        .textContent.split(" · ")[1];
      // Bullet point
      position["bulletPoints"] = currentCompanyRoles[j]
        .querySelector("ul")
        .querySelectorAll("li")[0]
        .textContent.trim();
      positionList.push(position);
    }
    company["companyPositions"] = positionList;
  } else {
    // Single role in the comapny
    // Company Role
    let position = {};
    const companyRole = experiences[i].querySelectorAll("span")[0].textContent;
    position["CompanyRole"] = companyRole;

    // Company Name
    const companyName = experiences[i].querySelectorAll("span")[3].textContent;
    company["companyName"] = companyName.trim().split(" · ")[0];

    // Company Location

    let companyData = experiences[i].querySelectorAll("span:not([class])");
    if(companyData.length == 4){
      position["companyLocation"] = companyData[2].textContent.trim();
      position["bulletPoints"] = companyData[3].textContent.trim();

    }
    else if(companyData.length == 3){
      position["bulletPoints"] = companyData[2].textContent.trim();
      position["companyLocation"] = "";

    }
    else{
      position["bulletPoints"] = "";
      position["companyLocation"] = ""; 
    }

    // OLD CODE
    // let companyLocation = experiences[i]
    //   .querySelectorAll("span")[9];
    // companyLocation = companyLocation ? companyLocation.textContent : ""
    // company["companyLocation"] = companyLocation.split(" · ")[0];

    // OLD CODE
    // company["companyWorkLocation"] = companyLocation.split(" · ")[1];

    // Company Duration
    const companyDuration =
      experiences[i].querySelectorAll("span")[6].textContent;
    position["CompanyDuration"] = companyDuration.split(" · ")[0];
    position["companyTotalDuration"] = companyDuration.split(" · ")[1];


    // let bulletPoints = experiences[i]
    // .querySelectorAll("span")[11];
    // position["bulletPoints"] = bulletPoints ? bulletPoints.textContent.trim() : "";
    company["companyPositions"] = [position];
  }
  experiencesData.push(company);
}
console.log(experiencesData);
