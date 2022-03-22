const mainWrapperElement = document.querySelector('.wrapper');
const navToggleElement = document.querySelector('.header__toggle');
const headerMenuElement = document.querySelector('.navigation__list--header');
const nameInputElement = document.querySelector('.name-input');
const phoneInputElement = document.querySelector('.phone-input');
const emailInputElement = document.querySelector('.email-input');
const formSubmitElement = document.querySelector('.booking__button');
const checkboxElement = document.querySelector('.booking__checkbox');
const labelElement = document.querySelector('.booking__label');

mainWrapperElement.classList.remove('wrapper--nojs');

const closeMenu = () => {
  document.body.classList.remove('menu-opened');
  mainWrapperElement.classList.add('wrapper--menu-closed');
  mainWrapperElement.classList.remove('wrapper--menu-opened');
};

navToggleElement.addEventListener('click', function () {
  if (mainWrapperElement.classList.contains('wrapper--menu-closed')) {
    mainWrapperElement.classList.remove('wrapper--menu-closed');
    mainWrapperElement.classList.add('wrapper--menu-opened');
    document.body.classList.add('menu-opened');
  } else {
    mainWrapperElement.classList.add('wrapper--menu-closed');
    mainWrapperElement.classList.remove('wrapper--menu-opened');
    document.body.classList.remove('menu-opened');
  }
});

headerMenuElement.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'A' && mainWrapperElement.classList.contains('wrapper--menu-opened')) {
    closeMenu();
  }
});

document.addEventListener('click', function (evt) {
  if (!evt.target.closest('.header__container') && mainWrapperElement.classList.contains('wrapper--menu-opened')) {
    closeMenu();
  }
});

const nameInputRe = /[A-Za-zA-Яа-яЁё0-9\s]$/;
const phoneInputRe = /[0-9]$/;
const emailInputRe = /\S+@\S+\.\S+/;

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

const onLabelClick = () => {
  if (!checkboxElement.classList.contains('booking__label--checked')) {
    checkboxElement.classList.add('booking__label--checked');
    formSubmitElement.setAttribute('disabled', 'disabled');
  } else {
    checkboxElement.classList.remove('booking__label--checked');
    formSubmitElement.removeAttribute('disabled');
  }
};

labelElement.addEventListener('click', function () {
  onLabelClick();
});

validateInput(nameInputElement, nameInputRe, 'Здесь могут быть только буквы и цифры');
validateInput(phoneInputElement, phoneInputRe, 'Здесь могут быть только цифры');
validateInput(emailInputElement, emailInputRe, 'Впишите пожалуйста электронный адрес корректно');

const isEnterKey = (evt) => (
  evt.key === 'Enter'
);

const pushLabel = () => {
  onLabelClick();
};

const onLabelEnterKeydown = (evtClose) => {
  if (isEnterKey(evtClose)) {
    pushLabel();
  }
};

labelElement.addEventListener('keydown', onLabelEnterKeydown);
