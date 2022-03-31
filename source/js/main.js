import IMask from 'imask';

const mainWrapperElement = document.querySelector('.wrapper');
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.header__button-link');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const footerContainerElement = document.querySelector('.footer__container');
const feedbackFormElement = document.querySelector('.feedback__form');
const aboutWrapperElement = document.querySelector('.about__info-wrapper');
const aboutButtonElement = document.querySelector('.about__button');
const navigationToggleElement = document.querySelector('.footer__toggle-nav');
const contactsToggleElement = document.querySelector('.footer__toggle-contacts');


mainWrapperElement.classList.remove('wrapper--nojs');
aboutWrapperElement.classList.remove('all-text');
footerContainerElement.classList.remove('footer__container--navigation-opened');
footerContainerElement.classList.remove('footer__container--contacts-opened');

const isEscapeKey = (evt) => (
  evt.key === 'Escape'
);

const closePopup = () => {
  document.body.classList.remove('popup-opened');
  mainWrapperElement.classList.remove('popup--opened');
};

const onPopupEscKeydown = (evtClose) => {
  if (isEscapeKey(evtClose)) {
    evtClose.preventDefault();
    closePopup();
  }
};

const removeEscListener = () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const setEditClickHandler = (element) => {
  element.addEventListener('input', () => {
    const maskOptions = {
      mask: '+{7}(000)000-00-00',
    };

    IMask(element, maskOptions);
  });
};

const isEnterKey = (evt) => (
  evt.key === 'Enter'
);

const nameInputRe = /[A-Za-zA-Яа-яЁё0-9\s]$/;
const phoneInputRe = /[0-9]$/;

const validateInput = (element, re, text) => {
  element.addEventListener('input', () => {
    const nameInputArray = element.value.split(' ');

    if (element.value.endsWith(' ')) {
      nameInputArray.pop();
    }

    const booleanNameInputArray = nameInputArray.map((nameValidity) =>
      re.test(nameValidity)
    );

    nameInputArray.forEach((word) => {

      if (!re.test(word) || booleanNameInputArray.includes(false)) {
        element.setCustomValidity(text);
      } else {
        element.setCustomValidity('');
      }
      element.reportValidity();
    });
  });
};

const validateForm = (form) => {
  const nameInputElement = form.querySelector('input[name="name"]');
  const phoneInputElement = form.querySelector('input[name="phone"]');
  const labelFormElement = form.querySelector('.checkbox-label');
  const buttonFormElement = form.querySelector('.form__button');

  const onLabelClick = (label, submitButton) => {
    if (!label.classList.contains('checkbox-label--checked')) {
      label.classList.add('checkbox-label--checked');
      submitButton.removeAttribute('disabled');
    } else {
      label.classList.remove('checkbox-label--checked');
      submitButton.setAttribute('disabled', 'disabled');
    }
  };

  const pushLabel = (someLabel, buttonToDisable) => {
    onLabelClick(someLabel, buttonToDisable);
  };
  const onLabelEnterKeydown = (evtClose) => {
    if (isEnterKey(evtClose)) {
      pushLabel(labelFormElement, buttonFormElement);
    }
  };

  labelFormElement.addEventListener('click', function () {
    onLabelClick(labelFormElement, buttonFormElement);
  });

  labelFormElement.addEventListener('keydown', onLabelEnterKeydown);

  validateInput(nameInputElement, nameInputRe, 'Здесь могут быть только буквы и цифры');
  validateInput(phoneInputElement, phoneInputRe, 'Здесь могут быть только цифры');

  setEditClickHandler(phoneInputElement);
};

validateForm(feedbackFormElement);

function modalShow() {
  const popupNameInputElement = popupElement.querySelector('.name-input');
  popupNameInputElement.focus();
  popupElement.setAttribute('tabindex', '0');
}

function focusRestrict() {
  document.addEventListener('focus', function (evt) {
    if (mainWrapperElement.classList.contains('popup--opened') && !popupElement.contains(evt.target)) {
      evt.stopPropagation();
      popupElement.focus();
    }
  }, true);
}

popupOpenButtonElement.addEventListener('click', function () {

  modalShow();
  focusRestrict();
  console.log(document.activeElement);
  const popupFormElement = popupElement.querySelector('.popup__form');
  validateForm(popupFormElement);

  document.addEventListener('keydown', onPopupEscKeydown);

  mainWrapperElement.classList.add('popup--opened');
  document.body.classList.add('popup-opened');

  popupCloseButtonElement.addEventListener('click', function () {
    closePopup();
    removeEscListener();
  });

  document.addEventListener('click', function (evt) {
    if (!evt.target.closest('.popup__container') && !evt.target.classList.contains('header__button-link') && mainWrapperElement.classList.contains('popup--opened')) {
      closePopup();
      removeEscListener();
    }
  });
});

aboutButtonElement.addEventListener('click', function () {
  aboutWrapperElement.classList.toggle('all-text');

  if (aboutButtonElement.classList.contains('about__button--more-info')) {
    aboutButtonElement.classList.toggle('about__button--more-info');
    aboutButtonElement.textContent = 'Свернуть';
  } else {
    aboutButtonElement.classList.toggle('about__button--more-info');
    aboutButtonElement.textContent = 'Подробнее';
  }
});

const toggleTabs = (footerContainer, hiddingElement, togglingElement) => {
  if (footerContainer.classList.contains(`${hiddingElement}-opened`)) {
    footerContainer.classList.remove(`${hiddingElement}-opened`);
  }

  footerContainer.classList.toggle(`${togglingElement}-opened`);
};

navigationToggleElement.addEventListener('click', function () {
  toggleTabs(footerContainerElement, 'footer__container--contacts', 'footer__container--navigation');
});

contactsToggleElement.addEventListener('click', function () {
  toggleTabs(footerContainerElement, 'footer__container--navigation', 'footer__container--contacts');
});
