var menuBarIcon = document.getElementById("nav_menu_icon");
var navMenu = document.getElementById("navMenu");
var barIcon = document.querySelector(".bar_icon");
var closeIcon = document.querySelector(".close_icon");
var fontendSkillsBtn = document.querySelector(".fontend_skill_btn");
var fontendSkills = document.querySelector(".fontend_skills");
var backendSkillsBtn = document.querySelector(".backend_skill_btn");
var backendSkills = document.querySelector(".backend_skills");
var fontEndDownIcon = document.querySelector(".fontend_skill_down");
var fontEndUpIcon = document.querySelector(".fontend_skill_up");
var backEndDownIcon = document.querySelector(".backend_skill_down");
var backEndUpIcon = document.querySelector(".backend_skill_up");
var educationTitle = document.querySelector(".education_title");
var workTitle = document.querySelector(".work_title");
var education = document.querySelector(".education");
var work = document.querySelector(".work");

function toggleMenu() {
  navMenu.classList.toggle("hide");
  barIcon.classList.toggle("hide");
  closeIcon.classList.toggle("hide");
}

function toggleFontEndSkills() {
  fontendSkills.classList.toggle("hideMenu");
  fontEndDownIcon.classList.toggle("hideMenu");
  fontEndUpIcon.classList.toggle("hideMenu");
}

function toggleBackEndSkills() {
  backendSkills.classList.toggle("hideMenu");
  backEndDownIcon.classList.toggle("hideMenu");
  backEndUpIcon.classList.toggle("hideMenu");
}

var isEducationClicked = 1;
var isWorkClicked = 0;

function toggleEducationInfo() {
  isWorkClicked = 0;
  if (!isEducationClicked) {
    work.classList.toggle("hideMenu");
    education.classList.toggle("hideMenu");
    isEducationClicked = 1;
  }
}

function toggleWorkInfo() {
  isEducationClicked = 0;
  if (!isWorkClicked) {
    education.classList.toggle("hideMenu");
    work.classList.toggle("hideMenu");
    isWorkClicked = 1;
  }
}

menuBarIcon.addEventListener("click", toggleMenu);
fontendSkillsBtn.addEventListener("click", toggleFontEndSkills);
backendSkillsBtn.addEventListener("click", toggleBackEndSkills);
educationTitle.addEventListener("click", toggleEducationInfo);
workTitle.addEventListener("click", toggleWorkInfo);
