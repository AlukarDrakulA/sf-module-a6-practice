const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let fails = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.target').removeClass('target')
  $('.miss').removeClass('miss')

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).text(hits + 1)
  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    $(divSelector).text(1);
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('.game-field').hide();
  $('#button-reload').show();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $('#totalScores').text(hits - fails);

  $("#win-message").removeClass("d-none");

}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  let target = $(event.target)

  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    target.text('');
    $('#button-reload').hide();
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    fails += 1
    $(event.target).addClass('miss')
  }

}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    hits = 0;
    fails = 0;
    firstGitTime = 0;
    $('.game-field').show();
    $('#win-message').addClass('d-none');
  });
}

$(document).ready(init);
