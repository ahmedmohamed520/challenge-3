"use strict";
const form = document.querySelector(".form");
const dayEl = form.day;
const monthEl = form.month;
const yearEl = form.year;
const errors = {
    day: "",
    month: "",
    year: "",
    date: "",
};
const daysContainer = document.getElementById("days");
const monthsContainer = document.getElementById("months");
const yearsContainer = document.getElementById("years");
const inputGroups = document.querySelectorAll(".form-control");

const date = new Date();
const now = new Date();

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
const validateDay = (day, numOfDaysInMonth) => {
    if (day < 1 || day > numOfDaysInMonth) {
        errors.day = "Must be a valid day";
    }
    if (day === "") {
        errors.day = "this field is required";
    }
};
const validateMonth = (month) => {
    if (month < 0 || month > 11) {
        errors.month = "Must be a valid month";
    }
    if (month === "") {
        errors.month = "this field is required";
    }
};
const validateYear = (year) => {
    if (year > date.getFullYear) {
        errors.year = "year must be in the past";
    }
    if (year === "") {
        errors.year = "this field is required";
    }
};
const validateEnteredDate = (enteredDate) => {
    if (now < enteredDate) {
        errors.date = "Must be a valid date";
    }
};
const calcAndDisplayAge = (now, enteredDate) => {
    let years = new Date(now).getFullYear() - new Date(enteredDate).getFullYear();
    let months = new Date(now).getMonth() - new Date(enteredDate).getMonth();
    let days = new Date(now).getDate() - new Date(enteredDate).getDate();
    if (days < 0) {
        months -= 1;
        days += 30;
    }

    if (months < 0) {
        years -= 1;
        months += 12;
    }
    console.log(days, months, years);
    daysContainer.textContent = days;
    monthsContainer.textContent = months;
    yearsContainer.textContent = years;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const day = dayEl.value;
    const month = monthEl.value;
    const currMonth = month - 1;
    const year = yearEl.value;
    const numOfDaysInMonth = getDaysInMonth(year, month);
    const enteredDate = new Date(year, currMonth, day);

    // Reset errors
    Object.keys(errors).forEach((key) => {
        errors[key] = "";
    });
    // Check inputs validations
    validateDay(day, numOfDaysInMonth);
    validateMonth(month);
    validateYear(year);
    validateEnteredDate(enteredDate);

    if (Object.values(errors).join("").length <= 0) {
        //  Remove error classes
        [...inputGroups].forEach((group) => {
            group.classList.remove("error");
            group.querySelector("span").textContent = "";
        });

        //   Valid: Calc Age and display it
        calcAndDisplayAge(now, enteredDate);
    } else {
        //   Invalid
        [...inputGroups].forEach((group) => {
            group.classList.add("error");
        });
        Object.values(errors).forEach((err, i) => {
            const span = [...inputGroups][i]?.querySelector("span");
            if (span) {
                span.textContent = err;
            }
        });
        if (errors.date !== "") {
            [...inputGroups][0].querySelector("span").textContent = errors.date;
        }
    }
});
