////// Popup nav

const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.main-menu');

function handleEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    const dropdown = this.querySelector('.dropdown');
    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();
    
    const coords = {
        height: dropdownCoords.height,
        width: dropdownCoords.width,
        top: dropdownCoords.top - navCoords.top,
        left: dropdownCoords.left - navCoords.left,
    };

    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);

} 

function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));

////// Popup nav   

// ////// Change Nav 
// const navChange = document.querySelector('#about');
// const topOfNav = navChange.offsetTop;

// function fixNav() {
//     if(window.scrollY >= topOfNav) {
//         document.body.style.paddingTop = navChange.offsetHeight + 'px';
//         document.body.classList.add('fixed-nav');
//     } else {
//         document.body.style.paddingTop = 0;
//         document.body.classList.remove('fixed-nav')
//     }
// }

// window.addEventListener('scroll', fixNav)        

// /////// Change Nav 

////////////////// NAV /////////////////////

const header = document.querySelector("header");
const sectionOne = document.querySelector("section");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-change");
    } else {
      header.classList.remove("nav-change");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

////////////////// NAV /////////////////////


/////// Tabs

const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');


tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.tabTarget);
        tabContents.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')
    })
})

/////// Tabs

/////// Slider

let sliderImages = document.querySelectorAll('.slide'),
    arrowLeft = document.querySelector('#arrow-left'),
    arrowRight = document.querySelector('#arrow-right'),
    current = 0,
    timer;


// Clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = 'none';
    }
}


//Initial slider
function startSlide() {
    reset()
    sliderImages[0].style.display = 'block';
}

// Show prev
function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = 'block';
    current--;
}

// Show next
function slideRight() {
    reset();
    sliderImages[current + 1].style.display = 'block';
    current++;
}

// left arrow click
arrowLeft.addEventListener('click', function() {
    if(current === 0){
        current = sliderImages.length;
    }
    slideLeft();
})

// right arrow click
arrowRight.addEventListener('click', function() {
    if(current === sliderImages.length - 1){
        current = -1;
    }
    slideRight();
})



startSlide();

/////// Slider

//////////////// MODAL //////////////////

const addModal = document.getElementById('add-modal');
const startMenuButton = document.querySelector('.service-video .fa-play');
const backdrop = document.getElementById('backdrop');
const closeMenuButton = addModal.querySelector('.close');
const video = document.getElementById('video');

// addModal.style.display = "none"

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const toggleMenuModal = () => {
    addModal.classList.toggle('visible');
    toggleBackdrop();
} 

const backdropClickHandler = () => {
    toggleMenuModal();
}

const closeMenuModal = () => {
    toggleMenuModal()
}

// Stop video 
function stopVideo() {
    video.currentTime = 0;
    video.pause();
  }

startMenuButton.addEventListener('click', toggleMenuModal);
backdrop.addEventListener('click', backdropClickHandler);
closeMenuButton.addEventListener('click', closeMenuModal);
backdrop.addEventListener('click', stopVideo);
closeMenuButton.addEventListener('click', stopVideo);

//////////////// MODAL //////////////////

//////////////// GALLERY //////////////////

const lightBoxContainer = document.querySelector('.lightbox-big');
const lightboxImage = document.querySelector('.lightbox-img');
const counter = document.querySelector('.lightbox-counter');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const lightboxText = document.querySelector('.lightbox-text');
const lightboxItems = document.querySelector('.collection-gallery').children;

let index;
let imgSrc;

for (let i = 0; i<lightboxItems.length; i++){
    lightboxItems[i].querySelector(".icon").addEventListener('click',() => {
        // console.log(lightboxItems[i].querySelector('h2'))
        index=i;
        changeImage();
        lightbox();
    })
}


lightBoxContainer.addEventListener("click", (event) => {
    if(event.target !== lightboxImage && event.target !== prevButton && event.target !== nextButton) {
        lightbox()
    }
})

const next = () => {
    if(index == lightboxItems.length - 1) {
        index=0
    } else {
        index++;
    }
    changeImage();
}

const prev = () => {
    if(index == 0) {
        index = lightboxItems.length - 1;
    } else {
        index--;
    }
    changeImage()
}

const lightbox = () => {
    lightBoxContainer.classList.toggle('open');
}

const changeImage = () => {
    imgSrc = lightboxItems[index].querySelector('img').getAttribute('src');
    lightboxImage.src = imgSrc;
    counter.innerHTML = (index + 1) + " of " + lightboxItems.length;
    lightboxText.innerHTML = lightboxItems[index].querySelector('h2').innerHTML;
}


//////////////// GALLERY ////////////////
