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
var SPACES_HEIGHTS = CLOUD_HEIGHT - ((FONT_GAP + GAP) + BAR_HEIGHT);

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);

};

var getMaxElement = function (arr) {
  var maxElement = '' + Math.round(arr[0]);

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = '' + Math.round(arr[i]);
    }
    arr[i] = '' + Math.round(arr[i]);
  }
  return maxElement;
};

var sortYourself = function (arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    if (arr[i] === 'Вы') {
      var swap = arr[0];
      arr[0] = arr[i];
      arr[i] = swap;
    }
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.strokeStyle = 'hsla(230, 86%, 48%, 1)';
  ctx.strokeRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  var maxTime = getMaxElement(times);
  sortYourself(names);

  if ((names.length - times.length !== 0) && (names.length - times.length >= 0)) {
    times.push('0');
  } else if (times.length - names.length !== 0) {
    names.push('???');
  }

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  var title = 'Ура вы победили!\nСписок результатов:';
  var titleArrow = title.split('\n');
  for (var j = 0; j < titleArrow.length; j++) {
    ctx.fillText(titleArrow[j], CLOUD_X + 20, CLOUD_Y + 30 + (GAP * 2) * j);
  }

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var random = '' + (1 - Math.random());
      ctx.fillStyle = 'hsla(230, 86%, 48%,' + random + ')';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, SPACES_HEIGHTS + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime), BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px PT Mono';
    ctx.fillText(times[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, SPACES_HEIGHTS - FONT_GAP + (BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime));
  }

};
