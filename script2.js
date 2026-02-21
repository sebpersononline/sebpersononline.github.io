let file;
let projects;
let skills;

let selectedSkills = [];

window.onload = function () {
    // Change message based on the time of day!
    let currentHour = new Date().getHours();
    document.querySelector("#timeOfDay").innerHTML 
    = (currentHour <= 12) ? (currentHour < 6 ? "Happy Late Night!" : "Good Morning!")
    : (currentHour < 18 ? "Good Afternoon!" : "Good Evening!");

    // make AJAX call to retrieve the data
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        file = xhr.responseText;
        projects = JSON.parse(file).projects;
        skills = JSON.parse(file).skills;

        loadProjects();
        loadSkills();
    }};
    document.querySelector(".skills").addEventListener("click",clickSkill);
    xhr.open("GET","data.json",true); xhr.send();
}

function loadSkills() {
    let html = ``;
    let skillsContainer = document.querySelector(".skills");
    for (let s = 0; s < skills.length; s++) {
        let skill = skills[s];
        html += `<div class="skillCard"><img class="skillImage" src="${skill.image}" alt="${skill.name}"><div class="skillName">${skill.name}</div></div>`;
    }
    skillsContainer.innerHTML = html;
}
function loadProjects() {
    let html = ``;
    let projectsContainer = document.querySelector(".projects");
    console.log(selectedSkills);

    for (let i = 0; i < projects.length; i++) {
        let p = projects[i];
        // Filter out if does not contain any selected skills
        if (selectedSkills.length > 0) {
            let valid = false;
            for (s = 0; s < p.skills.length; s++) {
                let skillName = p.skills[s];
                if (selectedSkills.includes(skillName)) valid = true;
            }
            if (!valid) { continue; }
        }
        
        html += `<div class="projectCard">`;
        html += `<div><h2>${p.name}</h2>${p.description}`;
        // Links
        html += `<div class="projectLinks">`;
        if (p.downloadLink !== undefined) { html += `<a href="${p.downloadLink}">Download Page</a>`; }
        if (p.gitLink !== undefined) { html += `<a href="${p.gitLink}">Github Repository</a>`; }
        if (p.demoLink !== undefined) { html += `<a href="${p.demoLink}">Video Demonstration</a>`; }
        html += `</div>`;
        // Request Required
        if (p.requiresRequest) {
            html += `<div class="projectLinks">`;
            html += `<a class="hl projectLinkBlocked" href="#contact">Source Code is available on request.</a>`;
            html += `</div>`;
        }

        // Skills
        html += `<div class="projectSkills">`;
        for (let s = 0; s < p.skills.length; s++) {
            let skillName = p.skills[s];
            let skillObj = getSkillfromName(skillName);
            if (skillObj != null) { html += `<img src="${skillObj.image}" alt="${skillObj.name}">`; }
        }
        html += `</div></div>`;
        // Image
        html += `<div>`;
        html += `<img class="projectImage" src="${p.image[0]}" alt="${p.image[1]}">`;
        html += `</div></div>`;
    }

    // No projects found
    if (html === ``) {
        html += `<div class="hl noProjectsFound">No projects found...<br>I'll post more of my work here soon!</div>`;
    }
    projectsContainer.innerHTML = html;
}

function getSkillfromName(name) {
    for (let s = 0; s < skills.length; s++) {
        let skill = skills[s];
        if (skill.name === name) { return skill; }
    }
}

function clickSkill(evt) {
    let element = evt.target;
    if (element.classList.contains("skillImage") || element.classList.contains("skillName")) { element = element.parentElement; }
    if (element.classList.contains("skillCard")) {
        // add selected
        if (!element.classList.contains("selectedSkill")) {
            element.classList.add("selectedSkill");
            selectedSkills.push(element.querySelector(".skillName").innerHTML);
            loadProjects();
        }
        // remove selected
        else {
            element.classList.remove("selectedSkill");
            selectedSkills.splice(selectedSkills.indexOf(element.querySelector(".skillName").innerHTML),1);
            loadProjects();
        }
    }
    
}