class View {

    /** Elements */
    header = document.querySelector('.header');
    sections = document.querySelectorAll('section');
    packageSection = document.querySelector('.packages');
    nav = document.querySelector('.nav');
    navList = document.querySelector('.nav__list');
    form = document.querySelector('.form');
    headerButton = document.querySelector('.button--header');
    aboutButton = document.querySelector('.button--about');
    topButton = document.querySelector('.button--top');

    // Construcotr
    constructor() {
    }

    // Create the nav item element
    _createNavItem = function (sectionId) {
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
    populateNavList = function () {
        this.sections.forEach((section) => {
            console.log(section);
            // Create the anv item string
            const navItemString = this._createNavItem(section.dataset.id);
            // Add the nav item to the nav list
            this.navList.insertAdjacentHTML('beforeend', navItemString);
        });
    };

    // Reset the nav links
    resetNavLinks() {
        // Remove the active class list from other nav links
        this.navList.querySelectorAll('.nav__link').forEach((item) => {
            item.classList.remove('nav__link--active');
        });
    }

    // Set the target nav link to active
    setActiveNavLink(link) {
        link.classList.add('nav__link--active');
    }

    //Scroll the element into view
    scrollInto(element) {
        // Scroll into view
        element.scrollIntoView({ behavior: 'smooth' });
    }

    // Show an alert
    showAlert(message) {
        alert(message);
    }

    // Add event listner to nav for item click
    navPublisher(handler) {
        this.nav.addEventListener('click', function (event) {
            console.log(event);
            event.preventDefault();
            handler(event.target);
        });
    }

    // Add event listener for header button
    headerButtonPublisher(handler) {
        this.headerButton.addEventListener('click', (event) => {
            console.log(event);
            event.preventDefault();
            handler(this.navList.querySelectorAll('.nav__link'));
        });
    }

    // Add event listener for about button
    aboutButtonPublisher() {
        aboutButton.addEventListener('click', (event) => {
            event.preventDefault();
        });
    }

    // Add event listener for form submit
    formPublisher(handler) {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Create the form data object
            const formData = new FormData(this.form);
            handler(formData);
        })
    }

    // Add an event listener for the top button
    topButtonPublisher(handler) {
        this.topButton.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        });
    }

    // Add event listener for scroll
    scrollPublisher(handler) {
        window.addEventListener('scroll', () => {
            handler(window.pageYOffset, this.header.offsetHeight, this.topButton);
        });
    }

    // Add section observer
    addSectionObserver(observerCallback) {
        // Intersection observer options
        // Set the root to null so the viewport becomes the intersection listener
        // Set the threshold to .25, for the observer to fire when 25%  in viewport
        const options = {
            root: null,
            threshold: [0.45],
        };

        // Create the observer
        const observer = new IntersectionObserver(observerCallback, options);

        // Add header to observer
        observer.observe(this.header);

        // Add sections to observer
        this.sections.forEach((section) => {
            observer.observe(section);
        });
    }
}


// Export an instance the View class
export default new View();