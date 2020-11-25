
const
  body = document.querySelector('.body'),
  mainPage = document.querySelector(".main-page"),
  rules = document.querySelector(".rules"),
  comission = document.querySelector(".comission"),
  prices = document.querySelector(".prices"),
  providers = document.querySelector(".providers"),
  header = document.querySelector(".header"),
  searchButton = document.querySelector(".header__search"),
  searchBox = document.querySelector(".header__searchbox"),
  menuButton = document.querySelector(".menu-icon"),
  mobileMenu = document.querySelector('.header__menu'),
  fixedBlock = document.querySelector('.rules__nav ul'),
  rulesNav = document.querySelector('.rules__nav'),
  mainBlock = document.querySelector('.rules__description')
  container = document.querySelector('.container');
  
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

let scrollpos = window.scrollY;


menuButton.addEventListener('click', function () {
 this.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  body.classList.toggle('locked');
});

let offsetLeft = container.offsetLeft + 30,
    scrollDistance = window.scrollY;

window.addEventListener('resize', function() {
    offsetLeft = container.offsetLeft + 30;
});

if (isMobile.any()) {
  body.classList.add('touch');
  let arrow = document.querySelectorAll('.arrow');
  for (i = 0; i < arrow.length; i++) {
		let thisLink = arrow[i].previousElementSibling;
		let subMenu = arrow[i].nextElementSibling;
		let thisArrow = arrow[i];

		thisLink.classList.add('parent')
		arrow[i].addEventListener('click', function () {
			subMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
		});
	}
} else {
	body.classList.add('mouse')
}

if (mainPage) {
    let benefitsMobileSlider = new Swiper('.benefits__mobile', {
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    });
  const banksBlock = document.querySelector('.steps__banks');
  let banksBlockHeight = banksBlock.offsetHeight;
  banksBlock.style.bottom = `-${banksBlockHeight}px`;
}


if (rules) {
  const rulesNavOffsetTop = rulesNav.offsetTop,
    showNavButton = document.querySelector('.rules__show-naw');
  let rulesNavItem = document.querySelectorAll('.rules__nav a')
  
  const fixedScrollBlock = () => {
    let scrollDistance = window.scrollY;
    if (scrollDistance > (rulesNavOffsetTop) && scrollDistance <= (mainBlock.offsetHeight - (fixedBlock.offsetHeight + 30))) {
      fixedBlock.style.left = `${offsetLeft}px`;
      fixedBlock.classList.remove('absolute');
      fixedBlock.classList.add('fixed');
    } else {
      fixedBlock.style.left = `0px`;
      fixedBlock.classList.remove('fixed');
    }

    if (scrollDistance >= rulesNavOffsetTop + mainBlock.offsetHeight - fixedBlock.offsetHeight) {
      fixedBlock.classList.add('absolute');
      fixedBlock.style.left = `0px`;
      fixedBlock.classList.remove('fixed');
    }
  };

  const hideShowButton = () => {
    let scrollDistance = window.scrollY;
    if (scrollDistance >= mainBlock.offsetHeight) {
      showNavButton.classList.add('hidden');
    } else {
      showNavButton.classList.remove('hidden');
    }
  };

  const activeNavClass = () => {
    let scrollDistance = window.scrollY;
    document.querySelectorAll('.rules__item').forEach((el, i) => {
      if (el.offsetTop <= scrollDistance) {
        document.querySelectorAll('.rules__nav a').forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          }
        });

        document.querySelectorAll('.rules__nav li')[i].querySelector('a').classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', function () {
    fixedScrollBlock();
    hideShowButton();
    activeNavClass();
  });

  showNavButton.addEventListener('click', function() {
    rulesNav.classList.toggle('visible');
    header.classList.toggle('hide');
    
  });

  rulesNavItem.forEach((element) => {
    element.addEventListener('click', function () {
      rulesNav.classList.remove('visible');
      header.classList.remove('hide');
    });
  });

}

if (providers || prices || comission) {
  
  document.querySelectorAll('.sort').forEach((element) => {
    element.addEventListener('click', function () {
       this.classList.toggle('rotated') 
    });
  });

}


document.addEventListener('click', function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
        if (target.hasAttribute('data-target')) {
            var m_ID = target.getAttribute('data-target');
            document.getElementById(m_ID).classList.add('open');
            e.preventDefault();
        }
    }


    if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
        var modal = document.querySelector('[class="modal open"]');
        modal.classList.remove('open');
        e.preventDefault();
    }
}, false);

//===========class with scroll============

function add_class_on_scroll() {
	header.classList.add("scrollable");
}

function remove_class_on_scroll() {
	header.classList.remove("scrollable");
}

window.addEventListener('scroll', function () {
	scrollpos = window.scrollY;

	if (scrollpos > 300) {
		add_class_on_scroll();
	} else {
		remove_class_on_scroll();
	}
});