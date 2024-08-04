// Get references to DOM elements
let overlay = document.querySelector("#overlay"); // Select the overlay element
let main = document.querySelector("main"); // Select the main content element
let numberSection = document.querySelector("#numbers"); // Select the section with id "numbers"
let statsContainer = document.querySelector("#numbers .container"); // Select the container inside the numbers section
let progressBar = document.querySelector("#progressBar div"); // Select the div inside the progressBar element
let logo = document.querySelector("#logo"); // Select the logo element
let openNav = document.querySelector("#openNav"); // Select the button to open the navigation menu
let closeNav = document.querySelector("#closeNav"); // Select the button to close the navigation menu
let navToggles = [openNav, closeNav]; // Store both navigation buttons in an array
let mobileNav = document.querySelector("#mobileNav"); // Select the mobile navigation menu
let desktoptNav = document.querySelector("#desktopNav"); // Select the desktop navigation menu
let bookmark = document.querySelector("#bookmark"); // Select the bookmark button
let bookmarkLabel = document.querySelector("#bookmark p"); // Select the paragraph inside the bookmark button
let openButtons = document.querySelectorAll("main button"); // Select all buttons inside the main element
let specificButtons = { button1: "#bamboo", button2: "#black", button3: "#mahogany" }; // Store specific buttons and their corresponding input IDs
let modal = document.querySelector("#modal"); // Select the modal element
let closeModal = document.querySelector("#closeModal"); // Select the button to close the modal
let selects = document.querySelectorAll(".select input"); // Select all input elements inside elements with class "select"
let inputConditions = { option1: 0, option2: 25, option3: 75, option4: 200 }; // Store minimum pledge values for different options
let continueButtons = document.querySelectorAll(".selection button"); // Select all buttons inside elements with class "selection"
let confirmation = document.querySelector("#confirmation"); // Select the confirmation element
let finalizeButton = document.querySelector("#confirmation button"); // Select the button inside the confirmation element
let totalRaised = document.querySelector("#totalRaised"); // Select the element displaying the total amount raised
let totalBackers = document.querySelector("#totalBackers"); // Select the element displaying the total number of backers

let pledge = 0; // Initialize the pledge amount

// Helper function to toggle the overlay's visibility
let toggleOverlay = () => {
    overlay.classList.toggle("active"); // Toggle the "active" class on the overlay element
};

// Helper function to toggle the navigation menu's visibility
let toggleNav = () => {
    main.classList.toggle("inactive"); // Toggle the "inactive" class on the main element
    mobileNav.classList.toggle("active"); // Toggle the "active" class on the mobile navigation menu
    overlay.classList.toggle("active"); // Toggle the "active" class on the overlay element
    navToggles.forEach(toggle => toggle.classList.toggle("active")); // Toggle the "active" class on each navigation button
};

// Helper function to toggle the modal's visibility
let toggleModal = () => {
    modal.classList.toggle("active"); // Toggle the "active" class on the modal element
    logo.classList.toggle("inactive"); // Toggle the "inactive" class on the logo element
    openNav.classList.toggle("inactive"); // Toggle the "inactive" class on the openNav button
    desktoptNav.classList.toggle("inactive"); // Toggle the "inactive" class on the desktop navigation menu
};

// Helper function to reset the modal
let resetModal = () => {
    setTimeout(() => {
        clearSelect(); // Clear the current selection
        closeModal.scrollIntoView(); // Scroll the closeModal button into view
    }, 500); // Wait for 500 milliseconds
};

// Helper function to clear the current selection
let clearSelect = () => {
    let currentSelection = document.querySelector(".selection.active"); // Select the currently active selection
    if (currentSelection) { // If there is an active selection
        let radio = document.querySelector(".selection.active .select input"); // Select the radio input inside the active selection
        let pledge = document.querySelector(".selection.active .pledge"); // Select the pledge element inside the active selection
        let currentInput = document.querySelector(".selection.active .pledge input"); // Select the input element inside the pledge element
        currentSelection.classList.remove("active"); // Remove the "active" class from the selection
        radio.checked = false; // Uncheck the radio input
        pledge.style.maxHeight = 0; // Collapse the pledge element
        setTimeout(() => {
            currentInput.parentElement.parentElement.classList.remove("error"); // Remove the "error" class from the input's parent
            currentInput.value = ""; // Clear the input value
        }, 500); // Wait for 500 milliseconds
    };
};

// Helper function to select a new option
let selectNew = select => {
    let parentSelection = select.parentElement.parentElement; // Get the parent element of the select input
    parentSelection.classList.toggle("active"); // Toggle the "active" class on the parent element
    let pledge = document.querySelector(".selection.active .pledge"); // Select the pledge element inside the active selection
    pledge.style.maxHeight = pledge.scrollHeight + "px"; // Expand the pledge element to its full height
    select.checked = true; // Check the select input
    setTimeout(() => parentSelection.scrollIntoView({ behavior: "smooth" }), 500); // Smoothly scroll the parent element into view after 500 milliseconds
};

// Helper function to update the stock count
let updateStock = () => {
    let selector = document.querySelector(".selection.active .select input").getAttribute("value"); // Get the value attribute of the select input inside the active selection
    let options = document.querySelectorAll(`.option.${selector}`); // Select all elements with the class matching the selector
    let stock = document.querySelectorAll(`.option.${selector} h6`); // Select all h6 elements inside the matching options
    if (selector !== "noReward") { // If the selected option is not "noReward"
        let newStock = Number(stock[0].innerHTML) - 1; // Decrement the stock count
        stock.forEach(s => {
            s.innerHTML = newStock.toString(); // Update the stock count for each matching option
        });
        if (newStock === 0) { // If the stock count is zero
            options.forEach(o => {
                o.classList.add("inactive"); // Add the "inactive" class to each matching option
                document.querySelectorAll(".option.inactive button").forEach(b => b.innerHTML = "Out of Stock"); // Update the button text to "Out of Stock"
            });
        };
    };
};

// Event listener to close the overlay
overlay.addEventListener("click", () => {
    if (mobileNav.classList.contains("active")) { // If the mobile navigation menu is active
        toggleNav(); // Toggle the navigation menu
        mobileNav.style.opacity = 0; // Set the opacity of the mobile navigation menu to 0
        mobileNav.style.maxHeight = 0; // Set the maximum height of the mobile navigation menu to 0
    } else {
        resetModal(); // Reset the modal
        toggleModal(); // Toggle the modal
        toggleOverlay(); // Toggle the overlay
    };
});

// Event listener to open the mobile navigation menu
openNav.addEventListener("click", () => {
    mobileNav.style.opacity = 1; // Set the opacity of the mobile navigation menu to 1
    mobileNav.style.maxHeight = mobileNav.scrollHeight + "px"; // Set the maximum height of the mobile navigation menu to its scroll height
    toggleNav(); // Toggle the navigation menu
});

// Event listener to close the mobile navigation menu
closeNav.addEventListener("click", () => {
    mobileNav.style.opacity = 0; // Set the opacity of the mobile navigation menu to 0
    mobileNav.style.maxHeight = 0; // Set the maximum height of the mobile navigation menu to 0
    toggleNav(); // Toggle the navigation menu
});

// Event listener to toggle the bookmark button
bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("active"); // Toggle the "active" class on the bookmark button
    if (bookmark.classList.contains("active")) { // If the bookmark button is active
        bookmarkLabel.innerHTML = "Bookmarked"; // Set the bookmark label to "Bookmarked"
    } else {
        bookmarkLabel.innerHTML = "Bookmark"; // Set the bookmark label to "Bookmark"
    };
});

// Event listeners to open the modal
openButtons.forEach(b => {
    b.addEventListener("click", () => {
        toggleModal(); // Toggle the modal
        toggleOverlay(); // Toggle the overlay
        if (b.classList.contains("specific")) { // If the button has the "specific" class
            let inputID = specificButtons[b.id]; // Get the corresponding input ID
            let checkedOption = document.querySelector(inputID); // Select the input element with the corresponding ID
            checkedOption.checked = true; // Check the input element
            selectNew(checkedOption); // Select the new option
        };
    });
});

// Event listener to close the modal
closeModal.addEventListener("click", () => {
    resetModal(); // Reset the modal
    toggleModal(); // Toggle the modal
    toggleOverlay(); // Toggle the overlay
});

// Event listeners to select a new option
selects.forEach(select => {
    select.addEventListener("change", () => {
        clearSelect(); // Clear the current selection
        selectNew(select); // Select the new option
    });
});

// Event listeners to validate the form and update stock
continueButtons.forEach(b => {
    b.addEventListener("click", event => {
        event.preventDefault(); // Prevent the default form submission
        let input = document.querySelector(".selection.active .amount input"); // Select the input element inside the active selection
        let inputID = input.id; // Get the ID of the input element
        pledge = Number(input.value); // Get the pledge amount from the input value
        if (!pledge || pledge < inputConditions[inputID]) { // If the pledge amount is invalid
            input.parentElement.parentElement.classList.add("error"); // Add the "error" class to the input's parent
        } else {
            input.parentElement.parentElement.classList.remove("error"); // Remove the "error" class from the input's parent
            updateStock(); // Update the stock count
            resetModal(); // Reset the modal
            overlay.classList.toggle("inactive"); // Toggle the "inactive" class on the overlay
            modal.classList.toggle("active"); // Toggle the "active" class on the modal
            setTimeout(() => {
                confirmation.classList.toggle("active"); // Toggle the "active" class on the confirmation element
            }, 1000); // Wait for 1000 milliseconds
        };
    });
});

// Event listener to finalize the pledge
finalizeButton.addEventListener("click", () => {
    overlay.classList.toggle("inactive"); // Toggle the "inactive" class on the overlay
    overlay.classList.toggle("active"); // Toggle the "active" class on the overlay
    confirmation.classList.toggle("active"); // Toggle the "active" class on the confirmation element
    logo.classList.toggle("inactive"); // Toggle the "inactive" class on the logo
    openNav.classList.toggle("inactive"); // Toggle the "inactive" class on the openNav button
    numberSection.classList.toggle("loading"); // Toggle the "loading" class on the numbers section
    let newTotal = Math.round(parseFloat(totalRaised.innerHTML.replace(",", "")) + pledge); // Calculate the new total amount raised
    let totalString = newTotal.toString(); // Convert the new total to a string
    let newBackers = (parseFloat(totalBackers.innerHTML.replace(",", "")) + 1).toString(); // Calculate the new total number of backers
    let backersString = newBackers.toString(); // Convert the new total backers to a string
    for (let i = 3; i < totalString.length; i += 4) {
        totalString = totalString.slice(0, -i) + "," + totalString.slice(-i); // Format the total amount with commas
    }
    for (let i = 3; i < backersString.length; i += 3) {
        backersString = backersString.slice(0, -i) + "," + backersString.slice(-i); // Format the total backers with commas
    }
    setTimeout(() => {
        numberSection.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll the numbers section into view
        progressBar.style.transition = "width 0s ease-out"; // Set the progress bar transition to zero
        progressBar.style.maxWidth = 0; // Set the maximum width of the progress bar to zero
        progressBar.style.width = 0; // Set the width of the progress bar to zero
        setTimeout(() => {
            totalRaised.innerHTML = totalString; // Update the total amount raised
            totalBackers.innerHTML = backersString; // Update the total number of backers
            numberSection.classList.toggle("loading"); // Toggle the "loading" class on the numbers section
            progressBar.style.maxWidth = "100%"; // Set the maximum width of the progress bar to 100%
            let newWidth = newTotal * 100 / 100000; // Calculate the new width of the progress bar
            if (newWidth < 100) { // If the new width is less than 100%
                progressBar.style.transition = `width ${newWidth * 0.01 * 2}s ease-out`; // Set the progress bar transition based on the new width
                progressBar.style.width = newWidth + "%"; // Set the new width of the progress bar
            } else {
                progressBar.style.transition = "width 2s ease-out"; // Set the progress bar transition to 2 seconds
                progressBar.style.width = "100%"; // Set the width of the progress bar to 100%
            };
        }, 500); // Wait for 500 milliseconds
    }, 500); // Wait for 500 milliseconds
});
