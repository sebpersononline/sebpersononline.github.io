window.onload = function () {
    // Jump to top on refresh
    window.scrollTo(0, 0);

    // Change message based on the time of day!
    let currentHour = new Date().getHours();
    document.querySelector("#intro2").innerHTML 
    = (currentHour <= 12) ? (currentHour < 6 ? "Happy Late Night" : "Good Morning")
    : (currentHour < 18 ? "Good Afternoon" : "Good Evening");

    window.addEventListener("scroll",onScroll);
}

function onScroll() {
    let tab1 = document.querySelector(".tab1");
    let tab2 = document.querySelector(".tab2");
    let tab3 = document.querySelector(".tab3");
    let tab4 = document.querySelector(".tab4");

    // Divs relative to document (viewport offset + window offset)
    let jump2 = document.querySelector("#jump2").getBoundingClientRect().top + window.scrollY-600;
    let jump3 = document.querySelector("#jump3").getBoundingClientRect().top + window.scrollY-600;
    let jump4 = document.querySelector("#jump4").getBoundingClientRect().top + window.scrollY-600;

    let page1 = document.querySelector(".introPage");
    let page2 = document.querySelector(".aboutmePage");
    let page3 = document.querySelector(".skillsPage");
    let page4 = document.querySelector(".projectsPage");

    let pixels = window.scrollY;

    // tab1.innerHTML = pixels;
    // tab2.innerHTML = jump2;
    // tab3.innerHTML = jump3;
    // tab4.innerHTML = jump4;

    if (pixels <= jump2) {
        tab1.classList.add("selected");
        page1.classList.remove("hidden");
    } else { tab1.classList.remove("selected"); }
    if (pixels > jump2 && pixels <= jump3) {
        tab2.classList.add("selected");
        page2.classList.remove("hidden");
    } else { tab2.classList.remove("selected"); }
    if (pixels > jump3 && pixels <= jump4) {
        tab3.classList.add("selected");
        page3.classList.remove("hidden");
    } else { tab3.classList.remove("selected"); }
    if (pixels > jump4) {
        tab4.classList.add("selected");
        page4.classList.remove("hidden");
    } else { tab4.classList.remove("selected"); }
}