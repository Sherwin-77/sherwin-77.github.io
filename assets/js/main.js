$(document).ready(function () {
  const $mainField = $("#main-field");
  const $scores = $("#scores");
  const $circle = $("#circle");
  let score = 0;
  let idx = 1;
  function doIncrement(value) {
    $({ scoreValue: score }).animate(
      { scoreValue: score + value },
      {
        duration: 300,
        easing: "swing",
        step: function () {
          $scores.text(Math.ceil(this.scoreValue));
        },
        complete: function () {
          score += value;
          $scores.text(score);
        },
      }
    );
  }
  $(".anm").viewportChecker({
    classToAdd: "visible",
    offset: -50,
    classToRemove: "anm",
    repeat: false,
  });
  $circle.click(function (e) {
    idx++;
    $("#circle-number").text(idx);
    doIncrement(300);
    const oldLeft = $circle.css("left");
    const oldTop = $circle.css("top");
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
      Math.random() * ($mainField.width() - $circle.width() - 5) + 5;
    let newTop =
      Math.random() * ($mainField.height() - $circle.height() - 5) + 5;
    if (Math.abs(oldLeft - newLeft) < 50)
      newLeft = Math.max(
        (newLeft * 2) % ($mainField.width() - $circle.width()),
        10
      );
    if (Math.abs(oldTop - newTop) < 50)
      newTop = Math.max(
        (newTop * 2) % ($mainField.height() - $circle.height()),
        10
      );
    $(this).css({
      left: newLeft,
      top: newTop,
    });
  });
});
