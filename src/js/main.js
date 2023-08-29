
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.scroll-link a');

    navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const yPosition = targetElement.getBoundingClientRect().top - 96 + window.pageYOffset;
        documentBody.classList.remove('show-mobile-menu');

        gsap.to(window, {
        duration: 0.2,
        scrollTo: yPosition,
        onComplete: setActiveClass(link),
        });
    });
    });

    function setActiveClass(clickedLink) {
        navLinks.forEach(link => {
            link.parentNode.classList.remove('active');
        });
        clickedLink.parentNode.classList.add('active');
    }

    const scrollLinks = document.querySelectorAll('.scroll-link');

    function getCurrentSection() {
        let currentSectionId = '';

        scrollLinks.forEach(link => {
            const targetSelector = link.dataset.scroll;
            const targetSection = document.querySelector(targetSelector);

            if (targetSection) {
                const rect = targetSection.getBoundingClientRect();
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    currentSectionId = targetSelector;
                }
            }
        });

        return currentSectionId;
    }

    window.addEventListener('scroll', () => {
        const currentSection = getCurrentSection();

        const activeLink = document.querySelector(`[data-scroll="${currentSection}"] a`);

        if (activeLink) {
            setActiveClass(activeLink);
        }
    });

    function startInfiniteAnimation() {
        const targetImage = document.querySelector('.animated-exosome');
        const targetText = document.querySelector('.what-is__image-title');
        const animationTimeline = gsap.timeline({ repeat: -1 });

        const animationSteps = [
            { rotation: -90, scale: 0.1, opacity: 0, duration: 2, ease: 'power2.out' },
            { rotation: 0, scale: 1, opacity: 1, duration: 3, ease: 'power2.out' },
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
                duration: 4,
                scrollTrigger: {
                    trigger: targetImage,
                    start: 'top 80%',
                },
        });

         gsap.to(targetImage, {
                opacity: 0.2,
                scale: 0.3,
                repeat: -1,
                yoyo: true,
                rotation: 90,
                ease: 'power1.inOut',
                duration: 4,
                scrollTrigger: {
                    trigger: targetImage,
                    start: 'top 80%',
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



    function appereanceAnimation(element, delay = 0.4) {
        const contentBlocks = document.querySelectorAll(`${element} .animation-block`);
        const trigger = document.querySelectorAll(element);
        
        contentBlocks.forEach((block, index) => {
            const animationOrder = block.getAttribute('data-order');
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

        separators.forEach((separator, i) => {
            gsap.set(separator, { opacity: 0 });
            gsap.to(separator, {
                opacity: 1,
                delay: i * 0.7 + 1,
                scrollTrigger: {
                    trigger: statisticList,
                    start: 'top 80%',
                },
            });
        });
    }

    function resultsAnimation() {
        const resultsItems = document.querySelectorAll('.results-item');

        appereanceAnimation('.results__title');

        resultsItems.forEach((block, index) => {
            appereanceAnimation(`.results-item-${index + 1}`, index * 0.05);
        });
    }


    function uniqueAnimation() {
        const uniqueSection = document.querySelector('.unique');
        const animateImage = uniqueSection.querySelector('.unique-media__animate-image');
        const womanImage = uniqueSection.querySelector('.unique-media__woman-image');

        appereanceAnimation('.unique', 0.5);

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
        gsap.set(womanImage, {
            opacity: 0, 
            x: '100%',
        });

        gsap.to(womanImage, {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
                trigger: uniqueSection,
                start: 'top 80%',
            },
        });
    }


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

    appereanceAnimation('.what-is__content');
    uniqueAnimation();
    statisticAnimation();
    appereanceAnimation('.advantages');
    appereanceAnimation('.technologie');
    resultsAnimation();
    appereanceAnimation('.flacons', 0.3);
    appereanceAnimation('.protocol');
    appereanceAnimation('.order', 0.5);
    appereanceAnimation('.order-form', 0.5);


  const phoneInput = document.getElementById('phoneInput');
  const phoneMask = new IMask(phoneInput, {
      mask: '+{38\\0} 00 000 00 00',
  });

});



