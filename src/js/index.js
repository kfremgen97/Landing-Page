// Elements
const sections = document.querySelectorAll('section');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav__list');

// Create the nav item element
const createNavItem = function (sectionId) {
    // Convert the id to a stirng with the first letter capital
    const sectionName = `${sectionId[0].toUpperCase()}${sectionId.slice(1)}`;
    // Create the anv item string
    const navItemString = `
        <li class="nav__item">
            <a class="nav__link" href="#${sectionName}">${sectionName}</a>
        </li>
    `;
    // Return the string
    return navItemString;
};

// Populate the nav list
sections.forEach((section) => {
    console.log(section);
    // Create the anv item string
    const navItemString = createNavItem(section.dataset.id);
    // Add the nav item to the nav list
    navList.insertAdjacentHTML('beforeend', navItemString);
});
