$(document).ready(function () {
   $('.header__burger').click(function () {
      $('.header__burger, .header__menu').toggleClass('active');
      $('body').toggleClass('_lock');
   });
});

const histSwiper = new Swiper('.history-slider', {
   navigation: {
      nextEl: '.his_swiper-button-next',
      prevEl: '.his_swiper-button-prev'
   },
   loop: true,
   // centeredSlides: true,
   spaceBetween: 17,
   breakpoints: {
      1350: {
         slidesPerView: 3,
      },
      1024: {
         slidesPerView: 2,
      },
      319: {
         centeredSlides: true,
         slidesPerView: 1,
      }
   }
});
const swiperPrev = document.getElementById('hist-button-prev'),
   swiperNext = document.getElementById('hist-button-next');



if (swiperPrev) {
   swiperPrev.addEventListener('click', () => {
      histSwiper.slidePrev();
   });
   swiperNext.addEventListener('click', () => {
      histSwiper.slideNext();
   });
}


const revSwiper = new Swiper('.review-slider', {
   navigation: {
      nextEl: '.rev_swiper-button-next',
      prevEl: '.rev_swiper-button-prev'
   },
   loop: true,
});
const swiperPrev2 = document.getElementById('rev-button-prev'),
   swiperNext2 = document.getElementById('rev-button-next');


if (swiperPrev2) {
   swiperPrev2.addEventListener('click', () => {
      revSwiper.slidePrev();
   });
   swiperNext2.addEventListener('click', () => {
      revSwiper.slideNext();
   });
}

let currentHref = document.location.href;


let headerLinks = document.querySelectorAll('.header-menu__link');
for (let i = 0; i < headerLinks.length; i++) {
   const headerLink = headerLinks[i];
   let idOfHeaderLink = headerLink.getAttribute('id');
   if (idOfHeaderLink == pageName.replace('.html', '')) {
      headerLink.classList.add('active-link');
      break;
   }
}


let possibilityBtns = document.querySelectorAll('.possibility__btn');
if (possibilityBtns.length > 0) {
   for (let i = 0; i < possibilityBtns.length; i++) {
      const possibilityBtn = possibilityBtns[i];
      let possibilityBtnText = possibilityBtn.textContent;
      possibilityBtn.addEventListener('click', () => {
         possibilityBtn.previousSibling.previousSibling.classList.toggle('active');
         possibilityBtn.innerHTML = `<svg width="42" height="19" viewBox="0 0 42 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2 17L19.6649 2L40 17" stroke="#9681BC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
         `;
         possibilityBtn.classList.toggle('active');
         // possibilityBtn.innerHTML = possibilityBtnText;
         if (!possibilityBtn.classList.contains('active')) {
            possibilityBtn.innerHTML = possibilityBtnText;
         }
      });

   }
}






function testWebP(callback) {

   var webP = new Image();
   webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});;
const popupuLinks = document.querySelectorAll('.popup-link'),
   body = document.querySelector('body'),
   lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupuLinks.length > 0) {
   for (let index = 0; index < popupuLinks.length; index++) {
      const popupLink = popupuLinks[index];
      popupLink.addEventListener('click', e => {
         const popupName = popupLink.getAttribute('href').replace('#', '');

         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }

}

const popupCloseIcon = document.querySelectorAll('.popup__close');

if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', (e) => {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {


   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', (e) => {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}

function bodyUnLock() {
   setTimeout(() => {
      if (lockPadding.length > 0) {

         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(() => {
      unlock = true;
   }, timeout)
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
   if (lockPadding.length > 0) {

      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;
      }
   }

   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(() => {
      unlock = true;
   }, timeout);
}


document.addEventListener('keydown', (e) => {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function () {
   if (!Element.prototype.closest) {
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   if (!Element.prototype.matches) {
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();;