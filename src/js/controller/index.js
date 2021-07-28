// Imports
import view from '../view/view.js';

// Nav link handler
const navLinkHandler = function (link) {
    // If the event target, does not have a class list of nav__link return
    if (!link.classList.contains('nav__link')) return;

    // Get the section via id based on the href attribute of the target
    const section = document.querySelector(`${link.getAttribute('href')}`);

    // Reset the nav links
    view.resetNavLinks();

    // Set the active link
    view.setActiveNavLink(link);

    // Scroll into view
    view.scrollInto(section);
};

// Nav button handler
const navButtonHandler = function () {
    // Toggle the nav button
    view.toggleNavButton();

    // Toggle the nav list
    view.toggleNavList();
};

// Top button handler
const topButtonHandler = function () {
    // Reset nav links
    view.resetNavLinks();

    // Scroll to header
    view.scrollInto(view.header);
};

// Header Button handler
const headerButtonHandler = function (navItems) {
    // Reset the nav links
    view.resetNavLinks();

    // Set the packages section to the active link
    for (let index = 0; index < navItems.length; index += 1) {
        const item = navItems[index];
        // If the item href attribute is packages
        if (item.getAttribute('href') === '#packages') {
            view.setActiveNavLink(navItems[index]);
            // Scroll the packages into view
            view.scrollInto(view.packageSection);
            // break out of the loop
            break;
        }
    }
};

// Form submission handler
const formSubmissionHandler = function (formData) {
    // Get the form data values
    const [email, name, date] = formData.values();
    // Present alert
    view.showAlert(`Congradulations ${name}, your hike is booked for ${date}.
Please check your email,${email}, for confimration.`);
};

// Scroll handler
const scrollHandler = function (windowScrollPosition, headerHeight, topButton) {
    // Check if the window scroll Y position is greater than the header element height
    if (windowScrollPosition > headerHeight) {
        topButton.classList.remove('hidden');
    } else {
        topButton.classList.add('hidden');
    }
};

// Section observer handler
const sectionObserverHandler = function (entries) {
    // Since there is only one threshold get the first element in the array
    // Check if it is interecting with the observer, else return function
    if (!entries[0].isIntersecting) return;

    // Remove the active class list from other nav links
    view.resetNavLinks();

    // check if header is intersecting with observer, return
    if (entries[0].target.classList.contains('header')) return;

    // If intersection is a section, add the active style to the corresponding link
    // Get the target dataset id to style the link
    const sectionId = entries[0].target.dataset.id;

    // Set the active link
    view.setActiveNavLink(view.navList.querySelector(`.nav__link[href='#${sectionId}']`));
};

// Populate nav
view.populateNavList();

// Call listeners with corresponding handlers
view.navPublisher(navLinkHandler);
view.topButtonPublisher(topButtonHandler);
view.headerButtonPublisher(headerButtonHandler);
view.formPublisher(formSubmissionHandler);
view.scrollPublisher(scrollHandler);
view.addSectionObserver(sectionObserverHandler);
view.navButtonPublisher(navButtonHandler);
