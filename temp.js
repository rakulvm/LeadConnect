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

for (let i = 0; i < experiences.length; i++) {
    // Company Name
    const companyName = experiences[i].querySelectorAll("span")[0].textContent;
    console.log(`Company Name [Experience ${i}]:`, companyName);
  
    // Company Duration
    const companyDuration = experiences[i].querySelectorAll("span")[3].textContent;
    console.log(`Company Duration [Experience ${i}]:`, companyDuration);
  
    // Company Location
    const companyLocation = experiences[i].querySelectorAll("span")[6].textContent.trim();
    console.log(`Company Location [Experience ${i}]:`, companyLocation);
  
    // all roles in the company
    // Start from 2 -> End
    let experienceEach = experiences[0].querySelectorAll(
      ".optional-action-target-wrapper"
    );
  
    for (let j = 2; j < experienceEach.length - 1; j++) {
      console.log(" ");
      console.log("____________________________________________________________");
      // Current role
      const currentRole = experienceEach[j].children[0].textContent?.trim();
      console.log(`Current Role [Experience ${i}, Role ${j}]:`, currentRole);
  
      // Current duration (Permanent)
      const currentDuration = experienceEach[j].children[1].children[0].textContent;
      console.log(`Current Duration [Experience ${i}, Role ${j}]:`, currentDuration);
  
      // Current role duration (may - june)
      const roleDuration = experienceEach[j].children[2].children[0].textContent;
      console.log(`Role Duration [Experience ${i}, Role ${j}]:`, roleDuration);
  
      // Current role bullet points
  
      try {
        const bulletPointsInTry = experienceEach[j].parentElement.parentElement.querySelectorAll("span")[8]?.textContent;
        console.log(`Bullet Points in Try Block [Experience ${i}, Role ${j}]:`, bulletPointsInTry);
      } catch (error) {
        console.error(`Error [Experience ${i}, Role ${j}]:`, error);
      }
    }


    console.log(" ");
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  }