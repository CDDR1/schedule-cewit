const daysChecked = document.querySelectorAll(".checkbox");
const gridItems = document.getElementsByClassName("grid-item");
const submitButton = document.getElementById("submit-form");
let daysPicked = [];
let blockTakenList = [];

const player1 = {
    courseInput: document.querySelector("#courseTitle"),
    colorInput: document.querySelector("#colorPicker"),
    dropDownMenu: document.querySelector("#time-slots"),
    locationInput: document.querySelector(".location-input"),
    professorInput: document.querySelector(".professor-input"),
};

const hidePopup = () => {
    // Hides the popup's background
    document.querySelector(":root").style.setProperty("--popup-bg-display", "none");

    // Hides the popup
    document.querySelector(".popup").classList.remove("show-popup");
};

const showPopup = (content) => {
    // Shows the popup's background
    document.querySelector(":root").style.setProperty("--popup-bg-display", "block");

    // Shows the popup
    document.querySelector(".popup").classList.add("show-popup");

    // Populate popup's content
    document.querySelector(".popup-content").innerText = content;

    const closePopupBtn = document.querySelector(".close-popup-btn");
    const gotItBtn = document.querySelector(".gotit-btn");

    closePopupBtn.addEventListener("click", hidePopup);
    gotItBtn.addEventListener("click", hidePopup);
};

const emtpyInput = () => {
    if (player1.dropDownMenu.value === "" || player1.courseInput.value === "") {
        return true;
    }
    return false;
};

// const findBlock = (days) => {
//     //if true, there is repeating time block
//     let index = 0;
//     let placement = 0;
//     for (let gridItem of gridItems) {
//         if (gridItem.innerText === player1.dropDownMenu.value) {
//             for (let i of days) {
//                 placement = index + i + 1;
//                 if (gridItems[placement].innerText != "") {
//                     // finds a repeating block
//                     return true;
//                 }
//             }
//             return false;
//         }
//     }
// };

submitButton.addEventListener("click", (e) => {
    // we need to check for the following:
    //  course title
    //  time slot matches
    //  day matches

    e.preventDefault();

    // Fill in array (daysChecked) for the days chosen.
    daysChecked.forEach((checkbox) => {
        if (checkbox.checked) {
            daysPicked.push(true);
        } else {
            daysPicked.push(false);
        }
    });

    let index = 0;
    let placement = 0;

    for (let gridItem of gridItems) {
        // checks for input
        if (emtpyInput()) {
            showPopup("You are missing either course title or time"); // pop up location
            break;
        }

        // finds the time block
        if (gridItem.innerText === player1.dropDownMenu.value) {
            for (let i = 0; i < daysPicked.length; i++) {
                placement = index + i + 1; // where the actual block is
                if (daysPicked[i]) {
                    if (gridItems[placement].innerText === "") {
                        gridItems[placement].style.backgroundColor = player1.colorInput.value;
                        gridItems[placement].innerText = `${player1.courseInput.value}\n${player1.locationInput.value}\n${player1.professorInput.value}`;
                    } else {
                        showPopup("One of the timeblocks is being used"); // pop up location
                        break;
                    }
                }
            }
        }
        index++;
    }
    document.querySelector("#add-course").reset(); //end
});
