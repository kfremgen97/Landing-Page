/** Elements */
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const nav = document.querySelector('.nav');
const navList = document.querySelector('.nav__list');
const form = document.querySelector('.form');
const headerButton = document.querySelector('.button--header');

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

// Add event listener for header button
headerButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Select all the items in the nav list
    const linkItems = navList.querySelectorAll('.nav__link');

    linkItems.forEach((item) => {
        // Remove the active class from the other links
        item.classList.remove('nav__link--active');
    });

    // Set the packages section to the active link
    linkItems.forEach((item) => {
        if (item.getAttribute('href') === '#packages') {
            item.classList.add('nav__link--active');
            // Scroll into view
            document.querySelector('.packages').scrollIntoView({
                behavior: 'smooth',
            });
        }
    });
});

// Add event listener for form submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Create the form data object
    const formData = new FormData(form);
    // Get the form data values
    const [email, name, date] = formData.values();
    // Present alert
    alert(`Congradulations ${name}, your hike is booked for ${date}.
Please check your email,${email}, for confimration.`);
});

/** Observers */

// Intersection observer options
// Set the root to null so the viewport becomes the intersection listener
// Set the threshold to .25, for the observer to fire when 25%  in viewport
const options = {
    root: null,
    threshold: [0.45],
};

// Intersection call back
const observerCallBack = function (entries) {
    console.log(entries);

    // Since there is only one threshold get the first element in the array
    // Check if it is interecting with the observer, else return function
    if (!entries[0].isIntersecting) return;

    // Remove the active class list from other nav links
    navList.querySelectorAll('.nav__link').forEach((item) => {
        item.classList.remove('nav__link--active');
    });

    // check if header is intersecting with observer, return
    if (entries[0].target.classList.contains('header')) return;

    // If intersection is a section, add the active style to the corresponding link
    // Get the target dataset id to style the link
    const sectionId = entries[0].target.dataset.id;
    navList.querySelector(`.nav__link[href='#${sectionId}']`).classList.add('nav__link--active');
};

// Create the observer
const observer = new IntersectionObserver(observerCallBack, options);

// Add header to observer
observer.observe(header);

// Add sections to observer
sections.forEach((section) => {
    observer.observe(section);
});

/** Functions to call immediatley */

// Populate the nav list
populateNavList();
