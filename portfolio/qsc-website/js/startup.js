// Function that fades the background of the navbar in and out
var fadeNavbar = function () {
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
    // If at top of of the banner (i.e. top of page on most devices), get rid of background
    } else if (window.scrollY >= bannerTop && window.scrollY < (bannerTop + bannerHeight*0.5)) {
        navbar.classList.remove('solid-background')
        navbar.classList.remove('trans-background')
    // Otherwise, add the background in
    } else {
        // This class automatically fades in/out any alterations to the "background-color" CSS property as
        // defined with the "transition" property for the #mainNav
        navbar.classList.add('trans-background')
    }

};


// Wait until the 'DOMContentLoaded' event fires, which indicates the webpage has been completely loaded.
window.addEventListener('DOMContentLoaded', event => {

    console.log("LOADED")

    fadeNavbar()

    // Whenever a scroll is detected, execute the fadeNavbar function.
    document.addEventListener('scroll', fadeNavbar);

});