// 👇 Declaration and Initialization of Variables
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

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const DAYS_PER_YEAR = 365.25;
const DAYS_PER_MONTH = 30.44; // Note: this is an approximation

/* 👇 Adding event listener to "settingsIcon", which when clicked/triggered the "add-dob" <div/> gets 
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


/* 👇 Adding event listener to "addDobBtn", which when clicked/triggered, the webpage content gets 
updated and displays the user's live age or the total time duration the user has lived, since his/her birth. */
addDobForm.addEventListener("submit", (event) => {
    event.preventDefault();

    bgVideo.src = "assets/bg-video-2.mp4"; //updating the background-video
    heading.textContent = "How Much Life Journey Covered, Till Now";
    timer.classList.remove("hidden");
    dob = new Date(dobInp.value); //date-of-birth

    let isDobValid = true;
    isDobValid = calculateAgeTimer(isDobValid);
    if (isDobValid) {
        let intervalId = setInterval(() => {
            isDobValid = calculateAgeTimer(isDobValid);
            if (!isDobValid) {
                clearInterval(intervalId);
                reset();
            }
        }, 1000); // to update the displayed time every second.
    }
    else {
        reset();
    }
});

// 👇 Function to Calculate Age Timer
const calculateAgeTimer = (isDobValid) => {
    if (isDobValid) {
        const currTime = new Date();
        const ageInMS = currTime - dob; //age in milliseconds or time spent

        //Corner Case
        if (isNaN(ageInMS) || dob > currTime) {
            alert("Invalid Date of Birth. Please, Enter Valid Date of Birth. ");
            console.error("Invalid Date of Birth");
            return false; //'isDobValid' becomes 'false'
        }

        // Get user's age (years, months, days, hours, minutes, seconds)
        const years = calculateYears(ageInMS);
        const months = calculateMonths(ageInMS);
        const days = calculateDays(ageInMS);
        const hours = calculateHours(ageInMS);
        const minutes = calculateMinutes(ageInMS);
        const seconds = calculateSeconds(ageInMS);

        // Updating Timer's Content on the Webpage:    
        updateTimerContent(timerValues.years, years);
        updateTimerContent(timerValues.months, months);
        updateTimerContent(timerValues.days, days);
        updateTimerContent(timerValues.hrs, hours);
        updateTimerContent(timerValues.mins, minutes);
        updateTimerContent(timerValues.seconds, seconds);

        return true; //'isDobValid' becomes 'true'
    }
    else {
        return false;
    }
}

// 👇 Function to Reset the website to initial state or landing page:
const reset = () => {
    bgVideo.src = "assets/bg-video.mp4";
    heading.textContent = "Kindly Enter Your Date of Birth";
    timer.classList.add("hidden");
    settingsIcon.nextElementSibling.classList.add("hidden");
    isAddDOBOpen = false;
    dobInp.value = "";
}

// 👇 Functions to Calculate user's age -- years, months, days, hours, minutes, seconds -- [Got this👇 formula with the help of ChatGPT]
const calculateYears = (ageInMS) => {
    return Math.floor(ageInMS / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_YEAR));
};

const calculateMonths = (ageInMS) => {
    return Math.floor((ageInMS % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_YEAR)) / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_MONTH));
};

const calculateDays = (ageInMS) => {
    return Math.floor((ageInMS % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY * DAYS_PER_MONTH)) / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY));
};

const calculateHours = (ageInMS) => {
    return Math.floor((ageInMS % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY)) / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR));
};

const calculateMinutes = (ageInMS) => {
    return Math.floor((ageInMS % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE));
};

const calculateSeconds = (ageInMS) => {
    return Math.floor((ageInMS % (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE)) / MILLISECONDS_PER_SECOND);
};

// 👇 Function to Update Age Timer's Content
const updateTimerContent = (timerVar, timerVal) => {
    timerVar.textContent = (timerVal < 10 ? '0' : '') + timerVal;
    return;
}