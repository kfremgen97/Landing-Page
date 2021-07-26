/** Elements */
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
            <a class="nav__link" href="#${sectionId}">${sectionName}</a>
        </li>
    `;
    // Return the string
    return navItemString;
};

// Populate the nav list
const populateNavList = function () {
    sections.forEach((section) => {
        console.log(section);
        // Create the anv item string
        const navItemString = createNavItem(section.dataset.id);
        // Add the nav item to the nav list
        navList.insertAdjacentHTML('beforeend', navItemString);
    });
};

/** Event listeners */

// Add event listner to nav for item click
nav.addEventListener('click', (event) => {
    console.log(event);
    event.preventDefault();

    // If the event target, does not have a class lsit of nav__link return
    if (!event.target.classList.contains('nav__link')) return;

    // Get the section via id based on the href attribute of the target
    const section = document.querySelector(`${event.target.getAttribute('href')}`);

    // Remove the active class list from other nav links
    navList.querySelectorAll('.nav__link').forEach((item) => {
        item.classList.remove('nav__link--active');
    });

    // Set the target nav link to active
    event.target.classList.add('nav__link--active');

    // Scroll into view
    section.scrollIntoView({
        behavior: 'smooth',
    });
});

/** Functions to call immediatley */

// Populate the nav list
populateNavList();