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


var showHiddenBlock = function (block) {
  var setupDialog = document.querySelector(block);
  setupDialog.classList.remove('hidden');
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


showHiddenBlock('.setup');
showHiddenBlock('.setup-similar');

var wizards = generateWizards(WIZARDS_COUNT, NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

var fragment = document.createDocumentFragment();
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

renderWizards(wizards, fragment, similarWizardTemplate);

var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(fragment);


