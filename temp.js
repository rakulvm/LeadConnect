const spans = document.querySelectorAll("span");
const targetSpan = Array.from(spans).find(
  (span) => span.textContent.trim() === "Experience"
);
const experienceSection =
  targetSpan.parentElement.parentElement.parentElement.parentElement
    .parentElement.parentElement;
const experiences = experienceSection.querySelectorAll(
  ".pkDhwOIEuoAIIiZRFGgXppNhdmUWwvlrVFqX.qWWKhMYtHtbRUZyWOlGEcnApsjZvtoA"
);


let experiencesData = []

for (let i = 0; i < experiences.length; i++) {
    // Company Data
    let company = {}
    // Company Name
    const companyName = experiences[i].querySelectorAll("span")[0].textContent;
    company['CompanyName'] = companyName;
  
    // Company Duration
    const companyDuration = experiences[i].querySelectorAll("span")[3].textContent;
    company['companyDuration'] = companyDuration;
  
    // Company Location
    const companyLocation = experiences[i].querySelectorAll("span")[6].textContent.trim().split(" · ")[0];
    company['companyLocation'] = companyLocation;

    // Work Location (Remote | Hybrid)
    const companyWorkLocation = experiences[i].querySelectorAll("span")[6].textContent.trim().split(" · ")[1];
    company['companyWorkLocation'] = companyWorkLocation;
  

    let positions = []
    // all roles in the company
    // Start from 2 -> End
    let experienceEach = experiences[0].querySelectorAll(
      ".optional-action-target-wrapper"
    );
  
    for (let j = 2; j < experienceEach.length - 1; j++) {
      let position = {};
      console.log("____________________________________________________________");
      // Current role
      const currentRole = experienceEach[j].querySelector('span').textContent?.trim();
      position['role'] = currentRole
  
      // Current duration (Permanent)
      const currentDuration = experienceEach[j].children[1].children[0].textContent;
      position['totalRoleDuration'] = currentDuration
  
      // Current role duration (may - june)
      const roleDuration = experienceEach[j].children[2].children[0].textContent;
      position['roleDuration'] = roleDuration.split(" · ")[0]
      position['roleTotalDuration'] = roleDuration.split(" · ")[1]
  
      // Current role bullet points
  
      try {
        const bulletPointsInTry = experienceEach[j].parentElement.parentElement.querySelectorAll("span")[8]?.textContent;
        position['bulletPoints'] = bulletPointsInTry ? bulletPointsInTry : "";
      } catch (error) {
        position['bulletPoints'] = "";

      }
      positions.push(position);
    }

    company['companyPositions'] = positions
    console.log(" ");
    experiencesData.push(company);
  }
console.log(experiencesData)