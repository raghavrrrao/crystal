import { eyeClinicsData } from './data.js';

export function toggleSidebar(toggleButton, sidebar, closeButton) {
    // Toggle sidebar visibility when the toggle button is clicked
    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });

    // Close sidebar when the close button is clicked
    closeButton.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });

    // Close sidebar when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });

    // Close sidebar when a nav link is clicked
    const navLinks = sidebar.querySelectorAll('.nav-link'); // Select all nav links inside the sidebar
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove("active"); // Close the sidebar
        });
    });
}


export function setupBackToTop(button) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    });
    button.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

export function copyText(element, text) {
    element.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(() => {
            if (element.classList.contains("copyButton")) {
                element.innerText = "COPIED!";
                setTimeout(() => (element.innerText = "CLICK TO COPY"), 2000);
            } else {
                const relatedButton = element.parentElement.querySelector(".copyButton");
                if (relatedButton) {
                    relatedButton.innerText = "COPIED!";
                    setTimeout(() => (relatedButton.innerText = "CLICK TO COPY"), 2000);
                }
            }
        }).catch(err => console.error("Failed to copy:", err));
    });
}

export function setupCursorMovement(cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

export function animateWords(words) {
    let wordArray = [], currentWord = 0;
    words[currentWord].style.opacity = 1;

    for (let word of words) {
        splitLetters(word);
    }

    function changeWord() {
        let cw = wordArray[currentWord];
        let nw = currentWord === words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];

        for (let i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (let i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord === wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(() => cw[i].className = 'letter out', i * 20);
    }

    function animateLetterIn(nw, i) {
        setTimeout(() => nw[i].className = 'letter in', 340 + (i * 20));
    }

    function splitLetters(word) {
        const content = word.textContent;
        word.innerHTML = '';
        const letters = [];

        for (let i = 0; i < content.length; i++) {
            const letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i) === ' ' ? '&nbsp;' : content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    // Start the animation after the first word has been visible for 5 seconds
    setTimeout(() => {
        changeWord();
        setInterval(changeWord, 3000);
    }, 3000);
}

export function setupButtonHover(buttons) {
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - button.offsetWidth / 2;
            const y = e.clientY - rect.top - button.offsetHeight / 2;
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// export function createLocationTabs() {
//     const tabList = eyeClinicsData.map((locationData, index) => `
//         <li class="nav-item me-3 ms-3">
//             <a class="nav-link ${index === 0 ? 'active' : ''}" data-bs-toggle="pill" href="#${locationData.location}">${locationData.location}</a>
//         </li>
//     `).join('');

//     const tabContent = eyeClinicsData.map((locationData, index) => `
//         <div id="${locationData.location}" class="tab-pane fade ${index === 0 ? 'active show' : ''}">
//             <div class="row g-4">
//                 ${locationData.branches.map(branch => `
//                     <section class="col-md-3 ">
//                         <section class="smallBox pt-4">
//                             <p>Doctor: ${branch.doctor}</p>
//                             <p>Clinic: ${branch.clinic}</p>
                        
//                         </section>
//                     </section>`).join('')}
//             </div>
//         </div>
//     `).join('');

//     return { tabList, tabContent };
// }

// export function renderTabs() {
//     const { tabList, tabContent } = createLocationTabs();
//     document.querySelector('#locationTabs').innerHTML = tabList;
//     document.querySelector('#locationTabsContent').innerHTML = tabContent;
// }
