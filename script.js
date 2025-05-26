document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("mousemove",e=>{
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x',`${e.clientX - rect.left}px`);
        card.style.setProperty('--y',`${e.clientY - rect.top}px`);

    });
});

const video1 = document.getElementById("project1");
const video2 = document.getElementById("project2");
const video3 = document.getElementById("project3");
const video4 = document.getElementById("project4");
const video5 = document.getElementById("project5");
const video6 = document.getElementById("project6");
const video7 = document.getElementById("project7");

const videolist = [video1,video2,video3,video4,video5,video6,video7];

videolist.forEach(function(video){
    video.addEventListener("mouseover",function(){
        video.play();
    });
    video.addEventListener("mouseout",function(){
        video.pause();
    })
});


let but = document.getElementById("xx");
but.addEventListener("click", ()=> {
   //scroll to contact section
    document.getElementById("contactFormmain").scrollIntoView({ behavior: "smooth" });
});
//to remove the event listener after the first click
but.removeEventListener("click", ()=> {
    document.getElementById("contactFormmain").scrollIntoView({ behavior: "smooth" });
});

let d = document.getElementById("todown");
d.addEventListener("click", ()=>{
    document.getElementById("down").scrollIntoView({ behavior: "smooth" });
});
d.removeEventListener("click", ()=>{
    document.getElementById("down").scrollIntoView({ behavior: "smooth" });
});

//form
document.getElementById("contactForm").addEventListener("submit",function(e){
    e.preventDefault();

    document.getElementById("successMessage").style.display = "block";

    this.reset();

    setTimeout(() => {
        document.getElementById("successMessage").style.display = "none";
    }, 3000);
});