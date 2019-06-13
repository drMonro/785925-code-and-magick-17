'use strict';

var HIDDEN_CLASS = ['hidden'];

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
var RANDOM_WIZARDS = [];
var WIZARDS_COUNT = 4;


var showHiddenBlock = function (hiddenBlock, hiddenClass) {
  var setupDialog = document.querySelector(hiddenBlock);
  setupDialog.classList.remove(hiddenClass);
};

var generateRandom = function (features) {
  return Math.floor(Math.random() * features.length);
};

var generateRandomWizard = function (names, surnames, coatColors, eyesColors) {
  return {
    name: names[generateRandom(names)] + ' ' + surnames[generateRandom(surnames)],
    coatColor: coatColors[generateRandom(coatColors)],
    eyesColor: eyesColors[generateRandom(eyesColors)],
  };
};

var generateWizardsFragment = function (wizards, wizardTemplate) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards.eyesColor;
  return wizardElement;
};


var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();


showHiddenBlock('.setup', HIDDEN_CLASS);

for (var i = 0; i < WIZARDS_COUNT; i++) {
  RANDOM_WIZARDS[i] = generateRandomWizard(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);
}

RANDOM_WIZARDS.forEach(function (randomWizard) {
  fragment.appendChild(generateWizardsFragment(randomWizard, similarWizardTemplate));
});

similarListElement.appendChild(fragment);
showHiddenBlock('.setup-similar', HIDDEN_CLASS);
