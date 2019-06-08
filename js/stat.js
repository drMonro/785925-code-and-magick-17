'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var SPACES_HEIGHT = CLOUD_HEIGHT - ((FONT_GAP + GAP) + BAR_HEIGHT);
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_COLOR = '#ffffff';
var CLOUD_BORDER_COLOR = 'hsla(230, 86%, 48%, 1)';
var BAR_COLOR_TEMPLATE = 'hsla(230, 86%, 48%, {opacity})';
var FONT_COLOR = '#000000';
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var WINNER_TEXT_TOP_MARGIN = 20;
var WINNER_TEXT_LINE_HEIGHT = 30;
var BOLD_FONT_STYLE = '16px PT Mono';
var WINNER_TEXT = 'Ура вы победили!\nСписок результатов:';
var NAMES_FONT_STYLE = 'bold 16px PT Mono';
var USER_NAME = 'Вы';
var UNKNOWN_TIME = '0';
var UNKNOWN_NAME = '???';


var renderCloud = function (ctx, x, y, color, cloudWidth, cloudHeight) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

var getMaxElement = function (arrow) {
  var maxElement = '' + Math.round(arrow[0]);

  for (var i = 0; i < arrow.length; i++) {
    if (arrow[i] > maxElement) {
      maxElement = '' + Math.round(arrow[i]);
    }
    arrow[i] = '' + Math.round(arrow[i]);
  }

  return maxElement;
};

var sortYourself = function (arrow, userName) {

  arrow.forEach(function (element, i) {
    if (element === userName) {
      var swap = arrow[0];
      arrow[0] = element;
      arrow[i] = swap;
    }
  });
};

var renderText = function (ctx, fontColor, fontStyle, text, x, textMargin, y, lineHeight, gap) {
  ctx.fillStyle = fontColor;
  ctx.font = fontStyle;
  var lines = text.split('\n');
  for (var i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x + textMargin, y + lineHeight + (gap * 2) * i);
  }
};

var generateRandomDecimal = function (min, max) {
  return Math.random() * (max - min) + min;
};

var renderBar = function (ctx, i, fontColor, fontStyle, name, x, barGap, barWidth, cloudHeight, fontGap, userName, userColor, spacesHeight, barHeight, time, maxTime, boldFontStyle, barColorTemplate) {
  ctx.fillStyle = fontColor;
  ctx.font = fontStyle;
  ctx.textBaseline = 'hanging';
  ctx.fillText(name, x + barGap + (barWidth + barGap) * i, cloudHeight - fontGap);
  if (name === userName) {
    ctx.fillStyle = userColor;
  } else {
    var opacity = generateRandomDecimal(0.2, 1);
    ctx.fillStyle = barColorTemplate.replace('{opacity}', opacity.toString());
  }

  ctx.fillRect(x + barGap + (barWidth + barGap) * i, spacesHeight + (barHeight - (barHeight * time) / maxTime), barWidth, (barHeight * time) / maxTime);

  ctx.fillStyle = fontColor;
  ctx.font = boldFontStyle;
  ctx.fillText(time, x + barGap + (barWidth + barGap) * i, spacesHeight - fontGap + (barHeight - (barHeight * time) / maxTime));
};


window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeStyle = CLOUD_BORDER_COLOR;
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  renderText(ctx, FONT_COLOR, BOLD_FONT_STYLE, WINNER_TEXT, CLOUD_X, WINNER_TEXT_TOP_MARGIN, CLOUD_Y, WINNER_TEXT_LINE_HEIGHT, GAP);

  var maxTime = getMaxElement(times);
  sortYourself(names, USER_NAME);

  if ((names.length - times.length !== 0) && (names.length - times.length >= 0)) {
    times.push(UNKNOWN_TIME);
  } else if (times.length - names.length !== 0) {
    names.push(UNKNOWN_NAME);
  }

  for (var i = 0; i < names.length; i++) {
    renderBar(ctx, i, FONT_COLOR, NAMES_FONT_STYLE, names[i], CLOUD_X, BAR_GAP, BAR_WIDTH, CLOUD_HEIGHT, FONT_GAP, USER_NAME, USER_COLOR, SPACES_HEIGHT, BAR_HEIGHT, times[i], maxTime, BOLD_FONT_STYLE, BAR_COLOR_TEMPLATE);
  }

};
