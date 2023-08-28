
// animations

gsap.registerPlugin(ScrollTrigger);



function startInfiniteAnimation() {
  const targetImage = document.querySelector('.animated-exosome');
  const targetText = document.querySelector('.what-is__image-title');
  const animationTimeline = gsap.timeline({ repeat: -1 });

  const animationSteps = [
    { rotation: -90, scale: 0.1, opacity: 0, duration: 2, ease: 'power2.out' },
    { rotation: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' },
  ];

  animationSteps.forEach((step) => {
    animationTimeline.to(targetImage, {
      ...step,
      delay: 1,
    });
  });

  gsap.to(targetText, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 3,
        scrollTrigger: {
            trigger: targetImage,
            start: 'top 80%',
        },
    });

  animationTimeline.play();
}


function appereanceAnimation(element, delay = 0.5) {
    const contentBlocks = document.querySelectorAll(`${element} .animation-block`);
    const trigger = document.querySelectorAll(element);

    contentBlocks.forEach((block, index) => {

        gsap.set(block, { opacity: 0, y: 50 });
        gsap.to(block, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: animationOrder ? animationOrder * delay : index * delay,
            scrollTrigger: {
                trigger,
                start: 'top 80%',
            },
        });
    });
}

function statisticAnimation() {
    const statisticItems = document.querySelectorAll('.statistic-list__item');
    const statisticList = document.querySelectorAll('.statistic-list');
    const separators = document.querySelectorAll('.separator');

    statisticItems.forEach((item, index) => {
        let animation = gsap.timeline({
            scrollTrigger: {
                trigger: statisticList,
                start: 'top 80%',
            },
        });

        if (index === 0) {
            animation.fromTo(
                item,
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1 }
            );
        } else if (index === 1) {
            animation.fromTo(
                item,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1 }
            );
        } else if (index === 2) {
            animation.fromTo(
                item,
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0, duration: 1 }
            );
        }
    });

    separators.forEach((separator) => {
        gsap.set(separator, { opacity: 0 });
        gsap.to(separator, {
            opacity: 1,
            scrollTrigger: {
                trigger: statisticList,
                start: 'top 80%',
            },
        });
    });
}


function uniqueAnimation() {
    const uniqueSection = document.querySelector('.unique');
    const animateImage = uniqueSection.querySelector('.unique-media__animate-image');

    appereanceAnimation('.unique', 0.7)



    gsap.to(animateImage, {
        opacity: 1,
        x: 0,
        rotation: 60,
        scale: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 3,
        scrollTrigger: {
            trigger: uniqueSection,
            start: 'top 80%',
        },
    });
}


function advantagesAnimation() {
    const advantagesTitle = document.querySelector('.advantages__title');
    const advantagesItems = document.querySelectorAll('.advantages-list__item');
    const advantagesImage = document.querySelector('.advantages__image');

    const titleAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: advantagesTitle,
            start: 'top 80%',
        },
    });

    titleAnimation.fromTo(
        advantagesTitle,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
    );

    advantagesItems.forEach((item, index) => {
        const itemAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            },
        });

        itemAnimation.fromTo(
            item,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 0.5, delay: index * 0.3 }
        );
    });

    const imageAnimation = gsap.timeline({
        scrollTrigger: {
            trigger: advantagesImage,
            start: 'top 80%',
        },
    });

    imageAnimation.fromTo(
        advantagesImage,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
    );
}


function flaconsAnimation() {
    const flaconsItems = document.querySelectorAll('.flacons-item');

    flaconsItems.forEach((item, index) => {
        const offset = index % 2 === 0 ? -100 : 100;
        
        gsap.from(item, {
            x: offset,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.flacons',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    });
}

function resultsAnimation() {
    gsap.utils.toArray('.results-item').forEach((item, index) => {
        const offset = index % 2 === 0 ? -100 : 100;

        gsap.from(item, {
            x: offset,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    });
}

function orderAnimation() {
    const orderImage = document.querySelector('.order img');
    const orderContent = document.querySelector('.order-content');

    gsap.from(orderImage, {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: orderImage,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
    });

    gsap.from(orderContent, {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: orderContent,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
    });
}


const whatIsSection = documentQuerySelector = '#about';
gsap.to(whatIsSection, {
  scrollTrigger: {
    trigger: whatIsSection,
    start: 'top center',
    end: 'bottom center',
    toggleActions: 'play none none reverse',
    onEnter: () => startInfiniteAnimation(),
  },
});


document.addEventListener('DOMContentLoaded', function() {
  //video controller
    const video = document.querySelector('.hero-video');
    const muteButton = document.querySelector('.mute-button');
    const documentBody = document.querySelector('.ui_body');

    let isMuted = true;

    muteButton.addEventListener('click', function() {
      isMuted = !isMuted;
      video.muted = isMuted;
      
      if (isMuted) {
        muteButton.classList.remove('volume-up');
      } else {
        muteButton.classList.add('volume-up');
      }
    });

    //mobile controller
    const burgerButton = document.querySelector('.header__menu-switch');
    let showMenu = false;

    burgerButton.addEventListener('click', function() {
      showMenu = !showMenu;
      
      if (showMenu) {
        documentBody.classList.add('show-mobile-menu');
      } else {
       documentBody.classList.remove('show-mobile-menu');
      }
    });

    


  const navLinks = document.querySelectorAll('.header-menu__item.ui_link a');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      documentBody.classList.remove('show-mobile-menu');

      gsap.to(window, {
        duration: 0.3,
        scrollTo: yPosition,
        onComplete: setActiveClass(link),
      });
    });
  });

  const accordionCheckboxes = document.querySelectorAll('.accordion-item input');

  accordionCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
        if (this.checked) {
            accordionCheckboxes.forEach((otherCheckbox) => {
                if (otherCheckbox !== this) {
                    otherCheckbox.checked = false;
                }
            });
        } 
  })
});

  function setActiveClass(clickedLink) {
    navLinks.forEach(link => {
      link.parentNode.classList.remove('active');
    });
    clickedLink.parentNode.classList.add('active');
  }

  appereanceAnimation('.what-is__content');
  uniqueAnimation();
  statisticAnimation();
  appereanceAnimation('.advantages');
  appereanceAnimation('.technologie');
  appereanceAnimation('.results', 0.7);
  appereanceAnimation('.flacons', 0.3);
  appereanceAnimation('.order', 0.6);


  const phoneInput = document.getElementById('phoneInput');
  const phoneMask = new IMask(phoneInput, {
      mask: '+{38\\0} 00 000 00 00', // Change this mask as needed
  });

});



