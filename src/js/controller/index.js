// Imports
import view from '../view/view.js';

// Nav link handler
const navLinkHandler = function (link) {
    // If the event target, does not have a class list of nav__link return
    if (!link.classList.contains('nav__link')) return;

    // Get the section via id based on the href attribute of the target
    const section = view.getSection(link.getAttribute('href'));

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
const scrollHandler = function (windowScrollPosition) {
    // Hold the current section
    let currentSection = '';

    // Check if the window scroll Y position is greater than the header element height
    if (windowScrollPosition > view.header.offsetHeight) {
        // Show the back to top button
        view.showTopButton();
    } else {
        // Hide the back to top button
        view.hideTopButton();
    }

    // Check if the window scroll position is greater than the sections top position 
    view.sections.forEach((section) => {
        if (windowScrollPosition >= section.offsetTop - 100) {
            // If it is set the current section
            currentSection = section.dataset.id;
        }
    });

    // Reset nav links
    view.resetNavLinks();

    // If current section is not an empty string ,set the active link
    if (currentSection) view.setActiveNavLink(document.querySelector(`.nav__link[href='#${currentSection}']`));
};

// Populate nav
view.populateNavList();

// Call listeners with corresponding handlers
view.navPublisher(navLinkHandler);
view.topButtonPublisher(topButtonHandler);
view.headerButtonPublisher(headerButtonHandler);
view.navButtonPublisher(navButtonHandler);
view.formPublisher(formSubmissionHandler);
view.scrollPublisher(scrollHandler);
