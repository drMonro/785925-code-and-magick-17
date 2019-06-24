'use strict';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];
var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];
var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];
var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'];

var WIZARDS_COUNT = 4;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'];


var showHiddenBlock = function (block) {
  var setupDialog = document.querySelector(block);
  setupDialog.classList.remove('hidden');
};

var hiddeBlock = function (block) {
  var setupDialog = document.querySelector(block);
  setupDialog.classList.add('hidden');
};

var generateRandomIntegerNumber = function (features) {
  return Math.floor(Math.random() * features.length);
};

var generateRandomWizard = function (names, surnames, coatColors, eyesColors) {
  return {
    name: names[generateRandomIntegerNumber(names)] + ' ' + surnames[generateRandomIntegerNumber(surnames)],
    coatColor: coatColors[generateRandomIntegerNumber(coatColors)],
    eyesColor: eyesColors[generateRandomIntegerNumber(eyesColors)],
  };
};

var generateWizardsFragment = function (wizard, wizardTemplate) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var generateWizards = function (wizardsCount, names, surnames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizards[i] = generateRandomWizard(names, surnames, coatColors, eyesColors);
  }
  return wizards;
};

var renderWizards = function (generatedWizards, fragment, similarWizardTemplate) {
  generatedWizards.forEach(function (wizard) {
    fragment.appendChild(generateWizardsFragment(wizard, similarWizardTemplate));
  });
};


var wizards = generateWizards(WIZARDS_COUNT, NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

var fragment = document.createDocumentFragment();
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

renderWizards(wizards, fragment, similarWizardTemplate);

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(fragment);


// Обработка событий

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var inputFocusFlag = false;


var openPopup = function () {
  showHiddenBlock('.setup');
  showHiddenBlock('.setup-similar');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  hiddeBlock('.setup');
  hiddeBlock('.setup-similar');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE && !inputFocusFlag) {
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closePopup();
  }
});

setup.querySelector('.setup-user-name').addEventListener('focus', function () {
  inputFocusFlag = true;
});

setup.querySelector('.setup-user-name').addEventListener('blur', function () {
  inputFocusFlag = false;
});

setup.querySelector('.setup-wizard .wizard-coat').addEventListener('click', function (evt) {
  var newColor = COAT_COLORS[generateRandomIntegerNumber(COAT_COLORS)];
  evt.currentTarget.style.fill = newColor;
  document.querySelector('input[name="coat-color"]').value = newColor;
});

setup.querySelector('.setup-wizard .wizard-eyes').addEventListener('click', function (evt) {
  var newColor = EYES_COLORS[generateRandomIntegerNumber(EYES_COLORS)];
  evt.currentTarget.style.fill = newColor;
  document.querySelector('input[name="eyes-color"]').value = newColor;
});


setup.querySelector('.setup-fireball-wrap').addEventListener('click', function (evt) {
  var newColor = FIREBALL_COLORS[generateRandomIntegerNumber(FIREBALL_COLORS)];
  evt.currentTarget.style.backgroundColor = newColor;
  document.querySelector('input[name="fireball-color"]').value = newColor;
});


