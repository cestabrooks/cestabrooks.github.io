// Function that fades the background of the navbar
function fadeNavBar() {
    const navbar= document.body.querySelector('#mainNav');

    // If no navbar element found, then exit function.
    if (!navbar) {
        return;
    }

    var bannerTop = document.body.querySelector('#banner').getBoundingClientRect().top;
    var bannerHeight = document.body.querySelector('#banner').getBoundingClientRect().height;

    // If for some reason the navbar loads in above the banner (instead of on top of it), then add a solid 
    // background right away to ensure you can see it.
    if (window.scrollY < bannerTop) {
        navbar.classList.add('solid-background')
    // If at top half of the banner, get rid of background
    } else if (window.scrollY >= bannerTop && window.scrollY < (bannerTop + bannerHeight*0.5)) {
        navbar.classList.remove('solid-background')
    // Otherwise, add the background in
    } else {
        navbar.classList.add('solid-background')
    }

};

// Function that fades the jump-ahead arrow that skips to the about section
function fadeAboutArrow() {
    var aboutArrow = document.body.querySelector('#about-arrow');

    // If no navbar element found, then exit function.
    if (!aboutArrow) {
        return;
    }

    var bannerTop = document.body.querySelector('#banner').getBoundingClientRect().top;
    var bannerHeight = document.body.querySelector('#banner').getBoundingClientRect().height;

    // If at top 75% of the banner, get rid of arrow
    if (window.scrollY >= bannerTop && window.scrollY < (bannerTop + bannerHeight*0.75)) {
        aboutArrow.classList.remove('hide')
    // Otherwise, add the arrow in
    } else {
        aboutArrow.classList.add('hide')
    }

}; 

// Scrolls to target element id while accounting for the navigation bar overlay
function scrollToTargetIDAdjusted(href){
    var name = href.slice(1)
    var element = document.getElementById(name);
    var elementPosition = element.getBoundingClientRect().top;

    var headerOffset = document.body.querySelector('#mainNav').getBoundingClientRect().height;
    
    var offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });
}

// Adjusts the carousel's multi-item representation (depending on screen width)
function adjustCarousel() {
    // number of slides to show per carousel item
    var numSlides = 1

    // medium and large screen
    if( window.innerWidth >= 768 && window.innerWidth < 1200) {
        numSlides = 2
    // x-large and greater screens
    } else if( window.innerWidth >= 1200) {
        numSlides = 3
    }
    
    // manually add next slides to show alongside the current carousel item
    let carouselItems = document.querySelectorAll('.carousel .carousel-item')
    carouselItems.forEach((el) => {
        let next = el.nextElementSibling
        for (var i=1; i<numSlides; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = carouselItems[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])

            next = next.nextElementSibling
        }
    })
}


// Wait until the 'DOMContentLoaded' event fires, which indicates the webpage has been completely loaded.
window.addEventListener('DOMContentLoaded', event => {

    console.log("LOADED")

    document.addEventListener('scroll', fadeNavBar)
    document.addEventListener('scroll', fadeAboutArrow)

    const anchors = document.querySelectorAll('a[href^="#"]')
    for (const a of anchors) {
        a.addEventListener('click', function (event) {
            event.preventDefault()
            scrollToTargetIDAdjusted(this.hash);
        });
    }

    // addEventListener( 'resize', adjustCarousel )
    // adjustCarousel()

    // Setting up Bootstrap tooltips
    // const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    // const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

});