// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");
if (mainColors != null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  // remove active class from all children
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    // add active class on element with data color === local storage item

    if (e.dataset.color === mainColors) {
      // add active class
      e.classList.add("active");
    }
  });
}

// random backgorund option
let randomBackgroundOption = true;
// variable to control the background interval
let backgroundInterval;
//

// random background option from local storage
// check if there's random background in local storage
let randomBackgroundOptionFromLocalStorage = localStorage.getItem(
  "random_background_option"
);
if (randomBackgroundOptionFromLocalStorage != null) {
  if (randomBackgroundOptionFromLocalStorage === "true") {
    randomBackgroundOption = true;
  } else {
    randomBackgroundOption = false;
  }
}
// settings box
const settingsBox = document.querySelector(".settings-box");
const toggleSettings = document.querySelector(".toggle-settings");
toggleSettings.addEventListener("click", () => {
  settingsBox.classList.toggle("active");
  document.querySelector(".icon-container").classList.toggle("active");
});

// select landing page element
const landingPage = document.querySelector(".landing-page");

// get imgs' array
const imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
randomizeBackgroundOptionFunction();
// function to randomize option
function randomizeBackgroundOptionFunction() {
  if (randomBackgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background image url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 5000);
  } else {
    randomBackgroundOption = false;
    clearInterval(backgroundInterval);
  }

  // remove active class from all span
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (randomBackgroundOption === true) {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
// loop on all list items
colorsLi.forEach((li) => {
  // loop on every list items

  li.addEventListener("click", (e) => {
    // set color on root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    // remove active class from all children
    handleActiveState(e);
  });
});
// switch random background option
const randomBackgroundsElements = document.querySelectorAll(
  ".random-backgrounds span"
);
// loop on all spans
randomBackgroundsElements.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    // remove active class from all spans
    handleActiveState(e);
    ///////////////////////////////////////////////////////////////////
    if (e.target.dataset.background === "yes") {
      randomBackgroundOption = true;
      randomizeBackgroundOptionFunction();
      localStorage.setItem("random_background_option", true);
    } else {
      randomBackgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("random_background_option", false);
    }
    ///////////////////////////////////////////////////////////////////
  });
});
// changing about us image
const aboutUsImage = document.querySelector(".image-box img");
function changeAboutUsImage(src) {
  aboutUsImage.src = src;
  // add active class
}
function addActiveClassToTheCurrentImage(id) {
  document.querySelectorAll(".control-about-us-image img").forEach((img) => {
    img.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}
// select skills selector
const ourSkills = document.querySelector(".skills");
window.onscroll = () => {
  // skills offset top
  let ourSkillsOffsetTop = ourSkills.offsetTop;
  // skills outer height
  let ourSkillsOuterHeight = ourSkills.offsetHeight;
  // window height
  let windowHeight = this.innerHeight;
  // window scrollTop
  let windowScrollTop = this.pageYOffset;
  if (
    windowScrollTop >
    ourSkillsOffsetTop + ourSkillsOuterHeight - windowHeight - 300
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span:nth-child(1)"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
  let allNumbers = document.querySelectorAll(
    ".skill-box .skill-progress span:nth-child(2)"
  );
  allNumbers.forEach((number) => {
    setTimeout(() => {
      number.classList.add("active");
    }, 900);
    number.innerText = number.dataset.number;
  });
};
// create popup with the image
const ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    // create overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to the body
    document.body.appendChild(overlay);
    // create the popup
    let popupBox = document.createElement("div");
    // add class to the popup
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      // create text for heading
      let imgText = document.createTextNode(img.alt);
      // append text to the heading
      imgHeading.appendChild(imgText);
      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }
    // create the img
    let popupImg = document.createElement("img");
    // set image source
    popupImg.src = img.src;
    // add the image to popup box
    popupBox.appendChild(popupImg);
    // append the popup box to the body
    document.body.appendChild(popupBox);

    // create close span
    let closeButton = document.createElement("span");
    // add text to the close button
    closeButton.textContent = "X";
    // add class to the close button
    closeButton.className = "close-button";
    // add close button to the popup
    popupBox.appendChild(closeButton);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");
function scrollToSomeWhere(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);
// handle active state
function handleActiveState(event) {
  // remove active class from all children
  event.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  // add class active to clicked element [current span]
  event.target.classList.add("active");
}

const bulletsSpan = document.querySelectorAll(".bullets-option span");
const bulletsContainer = document.querySelector(".nav-bullets");

let showBulletsOptionInLocalStorage = localStorage.getItem("bullets_option");
if (showBulletsOptionInLocalStorage != null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (showBulletsOptionInLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }

    handleActiveState(e);
  });
});
// reset button
document.querySelector(".reset-options").addEventListener("click", () => {
  let itemsInLocalStorage = [
    "color_option",
    "random_background_option",
    "bullets_option",
  ];
  itemsInLocalStorage.map((item) => localStorage.removeItem(item));
  window.location.reload();
});
// toggle menu
const toggleButton = document.querySelector(".toggle-menu");
const links = document.querySelector("ul.links");
toggleButton.addEventListener("click", (e) => {
  // stop propagation
  e.stopPropagation();
  toggleButton.classList.toggle("menu-active");
  links.classList.toggle("open");
});
// click anywhere outside the menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== links) {

    // check if menu is opened ? 
    if (links.classList.contains("open")) {

      toggleButton.classList.toggle("menu-active");
      links.classList.toggle("open");

    }

  }
});

// stop propagation in the menu
links.onclick = function (e) {
  e.stopPropagation();
};
