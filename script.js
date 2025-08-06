// Enhanced card hover effects with smooth performance
document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("mousemove", throttle(e=>{
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x',`${e.clientX - rect.left}px`);
        card.style.setProperty('--y',`${e.clientY - rect.top}px`);
    }, 16)); // 60fps throttling
});

// Add smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            smoothScrollTo(target, 80); // 80px offset for header
        }
    });
});

// const video1 = document.getElementById("project1");
// const video2 = document.getElementById("project2");
// const video3 = document.getElementById("project3");
// const video4 = document.getElementById("project4");
// const video5 = document.getElementById("project5");
// const video6 = document.getElementById("project6");
// const video7 = document.getElementById("project7");
// const video8 = document.getElementById("project8");
// const video9 = document.getElementById("project9");

// Video event listeners are now handled dynamically in the project loading code


let but = document.getElementById("xx");
if (but) {
    but.addEventListener("click", ()=> {
       //scroll to contact section with enhanced smooth scrolling
        const target = document.getElementById("contactFormmain");
        if (target) {
            target.scrollIntoView({ 
                behavior: "smooth", 
                block: "start",
                inline: "nearest"
            });
        }
    });
}
//to remove the event listener after the first click
but.removeEventListener("click", ()=> {
    document.getElementById("contactFormmain").scrollIntoView({ behavior: "smooth" });
});

let d = document.getElementById("todown");
if (d) {
    d.addEventListener("click", ()=>{
        const target = document.getElementById("down");
        if (target) {
            target.scrollIntoView({ 
                behavior: "smooth", 
                block: "start",
                inline: "nearest"
            });
        }
    });
}
d.removeEventListener("click", ()=>{
    document.getElementById("down").scrollIntoView({ behavior: "smooth" });
});

//form
const contactForm = document.getElementById("ContactForm");
if (contactForm) {
    contactForm.addEventListener("submit",function(e){
        e.preventDefault();

        const successMessage = document.getElementById("successMessage");
        if (successMessage) {
            successMessage.style.display = "block";
        }

        this.reset();

        setTimeout(() => {
            if (successMessage) {
                successMessage.style.display = "none";
            }
        }, 3000);
    });
}

// Smooth scrolling utility function
function smoothScrollTo(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Dynamically load projects from projects.json and render them in the .list div
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded, fetching projects...");
    fetch("projects.json")
        .then(response => {
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(projects => {
            console.log("Projects loaded:", projects);
            const listDiv = document.querySelector(".list");
            console.log("List div found:", listDiv);
            if (!listDiv) {
                console.error("List div not found!");
                return;
            }
            listDiv.innerHTML = ""; // Clear any existing content
            projects.forEach((project, idx) => {
                console.log("Creating project:", project.title);
                const itemDiv = document.createElement("div");
                itemDiv.className = "item";
                itemDiv.style.setProperty('--position', idx + 1);

                const video = document.createElement("video");
                video.src = project.videoUrl;
                video.loop = true;
                video.playsInline = true;
                video.muted = true;
                video.controls = true;
                video.setAttribute("tabindex", "0");
                video.addEventListener("mouseover", () => video.play());
                video.addEventListener("mouseout", () => video.pause());
                video.addEventListener("error", (e) => {
                    console.error("Video error for", project.title, e);
                });

                const desc = document.createElement("div");
                desc.className = "project-desc";
                desc.innerHTML = `<h4>${project.title}</h4><p>${project.description}</p>`;

                itemDiv.appendChild(video);
                itemDiv.appendChild(desc);
                listDiv.appendChild(itemDiv);
            });
            console.log("All projects rendered! Total projects:", projects.length);
        })
        .catch(err => {
            console.error("Failed to load projects.json", err);
            // Show error message on page
            const listDiv = document.querySelector(".list");
            if (listDiv) {
                listDiv.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #ff6b6b;">
                        <h3>Error Loading Projects</h3>
                        <p>Failed to load project data. Please check the console for details.</p>
                    </div>
                `;
            }
        });
});