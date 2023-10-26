// /*
// 1. User type something on the input field
// 2. When user click the add button or the enter on the keyboard, it will added
//    the value of the input field to the list
// */

"use script";

const listContainer = document.querySelector(".list--container");
const addTextBtn = document.querySelector(".list-add-btn");
const inputField = document.querySelector(".list-add-text");

const addFunction = function () {
  if (inputField.value === "") {
    alert("Cannot be empty");
  } else {
    const structure = `
          <li class="list-item">
            <p class="list-item-text">
            ${inputField.value}
            </p>
            <input type="text" class="list-edit-text hidden" />
            <div class="list-item-action">
              <i class="ri-check-line clear-icon"></i>
              <i class="ri-edit-fill edit-icon"></i>
              <i class="ri-delete-bin-fill delete-icon"></i>
            </div>
          </li>

            `;
    listContainer.insertAdjacentHTML("afterbegin", structure);
    inputField.value = "";
  }
};

addTextBtn.addEventListener("click", addFunction);

document.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    addFunction();
  }
});

listContainer.addEventListener("click", e => {
  /////////////////////////////////////[CLEAR]
  const clickedElement = e.target;
  if (clickedElement.classList.contains("clear-icon")) {
    const listText =
      clickedElement.parentElement.parentElement.querySelector("p");
    listText.classList.toggle("clear");
  }
  /////////////////////////////////////[REMOVE]
  if (clickedElement.classList.contains("delete-icon")) {
    const listItem = clickedElement.parentElement.parentElement;
    listItem.remove();
  }

  /*
  /////////////////////////////////////[EDIT]
  1. When user click the edit icon, the current text will change to input field [OK]
  2. The icon of the edit change as well [OK]
  3. If the new icon is clicked while having a new text in it, the current text
     will be replaced by the new one, if it's empty, then just use the previous one
  */
  if (clickedElement.classList.contains("ri-edit-fill")) {
    const listItem = clickedElement.parentElement.parentElement;
    const listText = listItem.querySelector(".list-item-text");
    const listEdit = listItem.querySelector(".list-edit-text");
    listText.classList.toggle("hidden");
    listEdit.classList.toggle("hidden");
    console.log(clickedElement);
    clickedElement.classList.replace("ri-edit-fill", "ri-edit-circle-fill");
  }

  if (clickedElement.classList.contains("ri-edit-circle-fill")) {
    const editText = clickedElement.parentElement.previousElementSibling;
    const editTextNewValue = editText.value;
    const listText =
      clickedElement.parentElement.parentElement.querySelector("p");
    const listTextOriginalValue = listText.textContent;

    editTextNewValue === ""
      ? (listText.textContent = listTextOriginalValue)
      : (listText.textContent = editTextNewValue);

    clickedElement.classList.replace("ri-edit-circle-fill", "ri-edit-fill");
  }
});

/*
/////////////////////////////////////[With local storage]

"use strict";

const listContainer = document.querySelector(".list--container");
const addTextBtn = document.querySelector(".list-add-btn");
const inputField = document.querySelector(".list-add-text");

const saveListItemsToLocalStorage = () => {
  const listItems = Array.from(
    listContainer.querySelectorAll(".list-item-text")
  ).map(item => item.textContent);
  localStorage.setItem("listItems", JSON.stringify(listItems));
};

const addFunction = () => {
  if (inputField.value === "") {
    alert("Cannot be empty");
  } else {
    const structure = `
      <li class="list-item">
        <p class="list-item-text">
          ${inputField.value}
        </p>
        <input type="text" class="list-edit-text hidden" />
        <div class="list-item-action">
          <i class="ri-check-line clear-icon"></i>
          <i class="ri-edit-fill edit-icon"></i>
          <i class="ri-delete-bin-fill delete-icon"></i>
        </div>
      </li>
    `;
    listContainer.insertAdjacentHTML("afterbegin", structure);
    inputField.value = "";

    // Save the updated list items to localStorage
    saveListItemsToLocalStorage();
  }
};

addTextBtn.addEventListener("click", addFunction);

document.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    addFunction();
  }
});

listContainer.addEventListener("click", e => {
  const clickedElement = e.target;
  const listItem = clickedElement.closest(".list-item");

  if (!listItem) {
    return; // Exit the event handler if the clicked element is not inside a list item
  }

  if (clickedElement.classList.contains("clear-icon")) {
    const listText = listItem.querySelector(".list-item-text");
    listText.classList.toggle("clear");
  }

  if (clickedElement.classList.contains("delete-icon")) {
    listItem.remove();
    // Save the updated list items to localStorage after removal
    saveListItemsToLocalStorage();
  }

  if (clickedElement.classList.contains("edit-icon")) {
    const listText = listItem.querySelector(".list-item-text");
    const listEdit = listItem.querySelector(".list-edit-text");
    listText.classList.add("hidden");
    listEdit.classList.remove("hidden");

    // Switch the edit icon to the save icon (use the same icon to save changes)
    clickedElement.classList.replace("ri-edit-fill", "ri-check-line");
  }

  if (clickedElement.classList.contains("ri-check-line")) {
    const listText = listItem.querySelector(".list-item-text");
    const listEdit = listItem.querySelector(".list-edit-text");

    listText.textContent = listEdit.value;
    listText.classList.remove("hidden");
    listEdit.classList.add("hidden");

    // Switch back to the edit icon (use the same icon)
    clickedElement.classList.replace("ri-check-line", "ri-edit-fill");

    // Save the updated list items to localStorage after editing
    saveListItemsToLocalStorage();
  }
});

// Retrieve the list items from localStorage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const savedListItems = JSON.parse(localStorage.getItem("listItems")) || [];
  savedListItems.forEach(itemText => {
    const structure = `
      <li class="list-item">
        <p class="list-item-text">
          ${itemText}
        </p>
        <input type="text" class="list-edit-text hidden" />
        <div class="list-item-action">
          <i class="ri-check-line clear-icon"></i>
          <i class="ri-edit-fill edit-icon"></i>
          <i class="ri-delete-bin-fill delete-icon"></i>
        </div>
      </li>
    `;
    listContainer.insertAdjacentHTML("beforeend", structure);
  });
});
*/
