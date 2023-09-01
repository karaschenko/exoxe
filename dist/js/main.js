gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.scroll-link a');
    const documentBody = document.querySelector('.ui_body');


    let userClickedNav = false;
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            userClickedNav = true;
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const headerHeight = document.querySelector('#header').offsetHeight;
            const targetElement = document.querySelector(targetId);
            const yPosition = targetElement.getBoundingClientRect().top - headerHeight + window.pageYOffset;
            documentBody.classList.remove('show-mobile-menu');
            if (!isMuted) {
                muteVideo();
            }

            gsap.to(window, {
                duration: 0.2,
                scrollTo: yPosition,
                onStart: () => {
                    setActiveClass(link);
                },
                onComplete: () => {
                    setTimeout(() => {
                        userClickedNav = false;
                    }, 800);
                }
            });
        });
    });

    function setActiveClass(clickedLink) {
        const headerHeight = document.querySelector('#header').offsetHeight;
        const regex = /#([^#]+)/;
        const dataScrollValue = clickedLink.href;
        const match = dataScrollValue.match(regex);
        const elementsWithMatchingDataScroll = document.querySelectorAll(`a[href$="${match[0]}"]`);
        const heroVideo = document.querySelector('.hero');
        const heroVideoBottom = heroVideo.getBoundingClientRect().bottom - headerHeight + window.scrollY;

        elementsWithMatchingDataScroll.forEach((item) => {
            const siblings = Array.from(item.parentNode.parentNode.children);
            const footerLinks = document.querySelectorAll('.sticky-footer .scroll-link');
            siblings.forEach((sibling) => {
                sibling.classList.remove('active');
            });
            footerLinks.forEach((sibling) => {
                sibling.classList.remove('active');
            });

            if (window.scrollY > heroVideoBottom) {
                item.parentNode.classList.add('active');
                if (!isMuted) {
                    muteVideo();
                }
            }
        });
    }

    const scrollLinks = document.querySelectorAll('.scroll-link');

    function getCurrentSection() {
        let currentSectionId = '';
        const regex = /#([^#]+)/;

        scrollLinks.forEach(link => {
            const match = link.querySelector('a').href.match(regex);
            const targetSelector = match[0];

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
        const stickyFooter = document.querySelector('.sticky-footer');
        const activeLink = document.querySelector(`a[href$="${currentSection}"]`);

        if (activeLink && !userClickedNav) {
            setActiveClass(activeLink);
        }

        console.log(currentSection);
        if (window.innerWidth <= 1024) {
            if (currentSection === '#contacts') {
                stickyFooter.style.display = 'none';
            } else {
                stickyFooter.style.display = 'flex';
            }
        }

    });

    function startInfiniteAnimation() {
        const targetImage = document.querySelector('.animated-exosome');
        const targetText = document.querySelector('.what-is__image-title');
        const animationTimeline = gsap.timeline({repeat: -1});

        const animationSteps = [
            {rotation: -90, scale: 0.1, opacity: 0, duration: 2, ease: 'power2.out'},
            {rotation: 0, scale: 1, opacity: 1, duration: 3, ease: 'power2.out'},
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
            duration: 5,
            delay: 4,
            scrollTrigger: {
                trigger: targetImage,
                start: 'top 80%',
            },
        });

        gsap.to(targetImage, {
            opacity: 0,
            scale: 0.3,
            repeat: -1,
            yoyo: true,
            rotation: 90,
            ease: 'power1.inOut',
            duration: 7,
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


    function appereanceAnimation(element, delay = 0.4, duration = 1, onCompleteCallback) {
        const contentBlocks = document.querySelectorAll(`${element} .animation-block`);
        const trigger = document.querySelectorAll(element);

        contentBlocks.forEach((block, index) => {
            const animationOrder = block.getAttribute('data-order');
            gsap.set(block, {opacity: 0, y: 50});
            gsap.to(block, {
                opacity: 1,
                y: 0,
                duration: duration,
                delay: animationOrder ? animationOrder * delay : index * delay,
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 80%',
                },
                onComplete: onCompleteCallback,
            });
        });
    }

    function resultsAnimation() {
        function animateResultsItem(item, delay) {
            const num = item.querySelector('.results-item__num');
            const line = item.querySelector('.title__line');
            const title = item.querySelector('.title__text');
            const text = item.querySelector('.results-item__text');

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.results-list',
                    start: 'top 80%',
                },
                delay
            });

            timeline
                .fromTo(num, {opacity: 0}, {opacity: 1,})
                .fromTo(line, {opacity: 0}, {opacity: 1, duration: 0.25,})
                .fromTo(title, {opacity: 0, x: 300}, {opacity: 1, x: 0, duration: 0.25})
                .fromTo(text, {opacity: 0,}, {opacity: 1, duration: 0.25, delay: 0.25});
        }

        const resultsItems = document.querySelectorAll('.results-item');

        gsap.from('.results__title', {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: '.results__title',
                start: 'top 80%',
            },
        });
        resultsItems.forEach((item, index) => {
            let delay;

            switch (index) {
                case 0:
                case 3:
                    delay = 1;
                    break;
                case 1:
                case 4:
                    delay = 2;
                    break;
                case 2:
                case 5:
                    delay = 3;
                    break;
                default:
                    delay = index * 0.3;
                    break;
            }
            setTimeout(() => {
                animateResultsItem(item, delay);
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
                    {opacity: 0, x: -150},
                    {opacity: 1, x: 0, duration: 0.3}
                );
            } else if (index === 1) {
                animation.fromTo(
                    item,
                    {opacity: 0, y: 100},
                    {opacity: 1, y: 0, duration: 0.3}
                );
            } else if (index === 2) {
                animation.fromTo(
                    item,
                    {opacity: 0, x: 150},
                    {opacity: 1, x: 0, duration: 0.3}
                );
            }
        });

        separators.forEach((separator, i) => {
            gsap.set(separator, {opacity: 0});
            gsap.to(separator, {
                opacity: 1,
                delay: i * 0.5 + 0.7,
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
        const womanImage = uniqueSection.querySelector('.unique-media__woman-image');

        appereanceAnimation('.unique', 0.8);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: uniqueSection,
                start: 'top 80%',
            },
        });

        tl.set(animateImage, {
            opacity: 0,
        })
            .to(animateImage,
                {
                    opacity: 1,
                    delay: 1.6,
                    duration: 1,
                })
            .from(animateImage, {opacity: 1,  duration: 0,})
            .to(animateImage, {
                opacity: 1,
                x: 0,
                rotation: 60,
                scale: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                duration: 3,
            });


        gsap.set(womanImage, {
            opacity: 0,
            x: '25%',
        });

        gsap.to(womanImage, {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.8,
            scrollTrigger: {
                trigger: uniqueSection,
                start: 'top 80%',
            },
        });
    }


    //video controller
    const video = document.querySelector(window.innerWidth < 1024 ? '.hero-video.hidden-desktop': '.hero-video.hidden-tablet');
    const muteButton = document.querySelector('.mute-button');


    let isMuted = true;

    muteButton.addEventListener('click', function () {
        muteVideo();
    });

    function muteVideo() {
        isMuted = !isMuted;
        video.muted = isMuted;

        if (isMuted) {
            muteButton.classList.add('volume-up');
        } else {
            muteButton.classList.remove('volume-up');
        }
    }

    //mobile controller
    const burgerButton = document.querySelector('.header__menu-switch');
    let showMenu = false;

    burgerButton.addEventListener('click', function () {
        showMenu = !showMenu;

        if (showMenu) {
            documentBody.classList.add('show-mobile-menu');
        } else {
            documentBody.classList.remove('show-mobile-menu');
        }
    });


    const accordionCheckboxes = document.querySelectorAll('.accordion-item input');

    accordionCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                accordionCheckboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });

    appereanceAnimation('.what-is__content', 0.8);
    uniqueAnimation();
    statisticAnimation();
    appereanceAnimation('.advantages', 0.8);
    appereanceAnimation('.technologie', 0.8);
    resultsAnimation();
    appereanceAnimation('.flacons', 0.5, 0.5);
    appereanceAnimation('.protocol');
    appereanceAnimation('.order', 0.5);
    appereanceAnimation('.order-form', 0.5);


    const phoneInput = document.getElementById('phoneInput');
    new IMask(phoneInput, {
        mask: '+{38} (000) 000 00 00',
        lazy: false,

    });

});
