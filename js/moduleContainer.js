import { eyeClinicsData } from './data.js';
import {
    toggleSidebar,
    setupBackToTop,
    copyText,
    animateWords,
    setupButtonHover
} from './testModule.js';
import { showSlideshow } from './slideshow.js';

onload = function () {

    // Sidebar Toggle
    let toggleSidebarButton = document.querySelector("#toggleSidebar");
    let sidebar = document.querySelector("#sidebar");
    let closeSidebarButton = document.querySelector("#closeSidebar");
    if (toggleSidebarButton && sidebar && closeSidebarButton) {
        console.log("moduleContainer: Setting up sidebar toggle");
        toggleSidebar(toggleSidebarButton, sidebar, closeSidebarButton);
    }

    // Back to Top Button
    let backToTopButton = document.querySelector("#backToTop");
    if (backToTopButton) {
        console.log("moduleContainer: Setting up back-to-top button");
        setupBackToTop(backToTopButton);
    }

    // Copy Text Functionality
    let copyElements = document.querySelectorAll("[data-copy-target]");
    copyElements.forEach(element => {
        let textToCopy = element.getAttribute("data-copy-target");
        copyText(element, textToCopy);
    });

    // Word Animation
    let words = document.getElementsByClassName('word');
    if (words.length > 0) {
        console.log("moduleContainer: Setting up word animation");
        animateWords(words);
    }

    // Button Hover Animation
    let circleButtons = document.querySelectorAll('.smallBox1');
    if (circleButtons.length > 0) {
        console.log("moduleContainer: Setting up button hover animation");
        setupButtonHover(circleButtons);
    }


    let currentIndex = 0;
    let track = document.querySelector('.carousel-track');
    let slides = Array.from(track.children);
    let nextButton = document.querySelector('.carousel-button.next');
    let prevButton = document.querySelector('.carousel-button.prev');

    // Function to update the carousel position
    let updateCarousel = () => {
        let slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;  // Fix here
    };

    // Function to go to the next slide
    let goToNextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    };

    // Set up an interval for automatic sliding
    let autoSlideInterval = setInterval(goToNextSlide, 3000); // Slide every 3 seconds

    // Event listeners for manual control
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Pause auto-slide when manually controlled
        goToNextSlide();
        autoSlideInterval = setInterval(goToNextSlide, 4000); // Resume auto-slide
    });

    prevButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Pause auto-slide when manually controlled
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
        autoSlideInterval = setInterval(goToNextSlide, 4000); // Resume auto-slide
    });

    document.getElementById('viewFeaturesBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        showSlideshow();
    });

    let tableBody = $("#clinicsTable tbody");

    // Function to render clinic data into the table
    let renderTable = () => {
        tableBody.empty(); // Clear the table before appending new rows

        eyeClinicsData.forEach(locationData => {
            locationData.branches.forEach(branch => {
                let row = `
                <tr>
                    <td>${locationData.location}</td>
                    <td>${branch.doctor || "N/A"}</td>
                    <td>${branch.clinic || "N/A"}</td>
                    <td class="hide-area">${branch.area || "N/A"}</td>
                    
                </tr>
            `;
                tableBody.append(row);
            });
        });
    };

    renderTable();

    $("#filter").keyup(function () {
        if ($(this).val().length > 1) {
            var rex = new RegExp($(this).val(), "i");
            $(".searchable tr").hide();
            $(".searchable tr").filter(function () {
                return rex.test($(this).text());
            }).show();
        } else {
            $(".searchable tr").show();
        }
    });


}
