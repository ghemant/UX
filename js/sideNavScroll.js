    // Side Navigation scroll is-active behaviour

    //locate all the navigation links
    var quicklinks = document.querySelectorAll(".menu-list a");
    for (var i = 0; i < quicklinks.length; i++) {
      quicklinks[i].addEventListener('click', function (event) {

        //disable scroll listener after clicking on nav link
        document.removeEventListener('scroll', scrollHandler, true);

        // check if a link is currently selected, remove is-active class if yes
        isActive = document.getElementsByClassName('is-active')[0];
        if (isActive != undefined) {
          isActive.classList.remove('is-active');
        }

        //re-enable scroll event 1 second after is-active class is added
        setTimeout(function () {
          document.addEventListener("scroll", scrollHandler, true);
        }, 2000);

        // then add is-active class to the most recent selected link
        this.classList.add('is-active');
      });
    }



    // Auto link highlighter on page scroll
    const scrollSections = document.querySelectorAll('.scroll-padding');
    const navLinks = document.querySelectorAll('aside ul li a');

    window.addEventListener('scroll', () => {
      let current = '';

      scrollSections.forEach(scrollSection => {
        const scrollSectionTop = scrollSection.offsetTop;
        const scrollSectionHeight = scrollSection.clientHeight;
        // console.log(scrollSectionTop);
        // console.log(scrollSectionHeight);        

        if (pageYOffset >= (scrollSectionTop - scrollSectionHeight / 3)) {
          current = scrollSection.getAttribute('id');
        }

        navLinks.forEach(link => {
          link.classList.remove('is-active');
          if (link.classList.contains(current)) {
            link.classList.add('is-active');
          }
        })
      })
    })