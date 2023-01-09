"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// Since the querySelector only select the first one
const btnsOpenModal = document.querySelectorAll(".show-modal");

// A function to call when you want to open the modal window
function openModal() {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

// A function to call when you want to close the modal window
function closeModal() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

// Use the For-loop to add the event listener to all the three open modals
for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener("click", openModal);
}

// Notice: We do NOT add () after the function name, because we only want it to execute after the click action. If a () ia added after the function name, then when the line below will be executed, then the function will be executed immediately.
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});
