const gameSystem = {
  $mainField: null,
  $scores: null,
  $circle: null,
  key1: "z",
  key2: "x",
  idx: 1,
  score: 0,
  x: -1,
  y: -1,
  _keys: {},
  init: function () {
    gameSystem.$mainField = $("#main-field");
    gameSystem.$scores = $("#scores");
    gameSystem.$circle = $("#circle");
    $(document).mousemove(function(e) {
      gameSystem.x = e.pageX;
      gameSystem.y = e.pageY;
  });
    $(document).on("keydown", function (e) {
      const ch = String.fromCharCode(e.which).toLowerCase();
      if (ch !== gameSystem.key1 && ch !== gameSystem.key2) return;
      if (gameSystem._keys[ch]) return;
      gameSystem._keys[ch] = true;
      document.elementFromPoint(gameSystem.x - window.pageXOffset, gameSystem.y - window.pageYOffset)?.click();
    });
    $(document).on("keyup", function (e) {
      const ch = String.fromCharCode(e.which).toLowerCase();
      if (ch !== gameSystem.key1 && ch !== gameSystem.key2) return;
      gameSystem._keys[ch] = false;
    });
    gameSystem.$circle.click(function (e) {
      gameSystem.idx++;
      $("#circle-number").text(gameSystem.idx);
      gameSystem.doIncrement(300);
      const oldLeft = gameSystem.$circle.css("left");
      const oldTop = gameSystem.$circle.css("top");
      $("#circle-effect")
        .clone()
        .css({
          display: "block",
          left: oldLeft,
          top: oldTop,
        })
        .appendTo("#main-field")
        .fadeOut(function () {
          $(this).remove();
        });
      let newLeft =
        Math.random() *
          (gameSystem.$mainField.width() - gameSystem.$circle.width() - 5) +
        5;
      let newTop =
        Math.random() *
          (gameSystem.$mainField.height() - gameSystem.$circle.height() - 5) +
        5;
      if (Math.abs(oldLeft - newLeft) < 50)
        newLeft = Math.max(
          (newLeft * 2) %
            (gameSystem.$mainField.width() - gameSystem.$circle.width()),
          10
        );
      if (Math.abs(oldTop - newTop) < 50)
        newTop = Math.max(
          (newTop * 2) %
            (gameSystem.$mainField.height() - gameSystem.$circle.height()),
          10
        );
      $(this).css({
        left: newLeft,
        top: newTop,
      });
    });
  },
  doIncrement: function (value) {
    $({ scoreValue: gameSystem.score }).animate(
      { scoreValue: gameSystem.score + value },
      {
        duration: 300,
        easing: "swing",
        step: function () {
          gameSystem.$scores.text(Math.ceil(this.scoreValue));
        },
        complete: function () {
          gameSystem.score += value;
          gameSystem.$scores.text(gameSystem.score);
        },
      }
    );
  },
};

$(document).ready(function () {
  $(".anm").viewportChecker({
    classToAdd: "visible",
    offset: -50,
    classToRemove: "anm",
    repeat: false,
  });
  gameSystem.init();
});
