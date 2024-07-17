// Declaration and Initialization of Variables
const bgVideo = document.querySelector(".bg-video");
const heading = document.querySelector("h1");
const timer = document.querySelector(".timer");
const timerValues = {
    years: document.getElementById("yearsVal"),
    months: document.getElementById("monthsVal"),
    days: document.getElementById("daysVal"),
    hrs: document.getElementById("hrsVal"),
    mins: document.getElementById("minsVal"),
    seconds: document.getElementById("secondsVal"),
};
const settingsIcon = document.querySelector(".set-date .fa-gear");
const addDobForm = document.querySelector(".add-dob");
const dobInp = document.querySelector("#dobInp");
let dob;

/* Adding Functionality to "settingsIcon", which when clicked the "add-dob" <div/> gets 
open or visible, and as it's clicked again, the "add-dob" <div/> closes or gets hidden. */
let isAddDOBOpen = false;
settingsIcon.addEventListener("click", () => {
    if (isAddDOBOpen) {
        settingsIcon.nextElementSibling.classList.add("hidden");
    }
    else {
        settingsIcon.nextElementSibling.classList.remove("hidden");
    }

    isAddDOBOpen = !isAddDOBOpen;
});


/* Adding Functionality to "addDobBtn", which when clicked, the webpage content gets updated and displays the
user's live age or the total time duration the user has lived, since his/her birth. */
addDobForm.addEventListener("submit", (event) => {
    event.preventDefault();

    bgVideo.src = "assets/bg-video-2.mp4"; //updating the background-video
    heading.textContent = "How Much Life Journey Covered, Till Now";
    timer.classList.remove("hidden");
    dob = new Date(dobInp.value); //date-of-birth

    calculateAgeTimer();
    setInterval(calculateAgeTimer, 1000); // to update the displayed time every second.
});

// 👇Function to Calculate Age Timer
let calculateAgeTimer = () => {
    const currTime = new Date();
    const timeSpent = currTime - dob; //age

    //Corner Case
    if (isNaN(timeSpent) || dob > currTime) {
        alert("Invalid Date of Birth. Please, Enter Valid Date of Birth. ");
        console.error("Invalid Date of Birth");
        window.location.reload(); //refreshes the current browser tab or window.
        return;
    }

    // Calculate years, months, days, hours, minutes, seconds [Got this👇 formula with the help of ChatGPT]
    const years = Math.floor(timeSpent / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((timeSpent % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((timeSpent % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeSpent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeSpent % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeSpent % (1000 * 60)) / 1000);


    // Updating Timer's Content on the Webpage:    
    let updateTimerContent = (timerVar, timerVal) => { // Function to Update Age Timer's Content
        timerVar.textContent = (timerVal < 10 ? '0' : '') + timerVal;
        return;
    }
    updateTimerContent(timerValues.years, years);
    updateTimerContent(timerValues.months, months);
    updateTimerContent(timerValues.days, days);
    updateTimerContent(timerValues.hrs, hours);
    updateTimerContent(timerValues.mins, minutes);
    updateTimerContent(timerValues.seconds, seconds);
}
