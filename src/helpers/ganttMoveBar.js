export function moveBar(data) {
  const {
    barId,
    blockWidth,
    leftObstructionIndex,
    rightObstructionIndex,
    barWidth,
  } = data;

  let isDown = false;
  let offset = 0;
  let mousePosition;
  let startIndex = 0;
  let position = 0;

  const bar = document.getElementById(barId);
  bar.addEventListener(
    "mousedown",
    function (e) {
      if (e.target.id.slice(-1) === "m") isDown = true;
      offset = bar.offsetLeft - e.clientX;
      startIndex = bar.offsetLeft / blockWidth;
    },
    true
  );

  function dropBar() {
    // prevent from firing on multiple mouse events
    isDown = false;
    const newBlockIndex = Math.floor(position / blockWidth + 0.5);
    // console.log("send to redux / server", barId, startIndex, newBlockIndex);
    bar.style.left = `${newBlockIndex * 40}px`;
  }

  bar.addEventListener("mouseup", dropBar, true);
  bar.addEventListener(
    "mouseleave",
    function () {
      if (isDown) dropBar();
    },
    true
  );

  document.addEventListener(
    // bar.addEventListener(
    "mousemove",
    function (event) {
      event.preventDefault();
      if (isDown) {
        mousePosition = event.clientX;
        position = Math.min(
          Math.max(mousePosition + offset, leftObstructionIndex * blockWidth),
          (rightObstructionIndex + 1) * blockWidth - barWidth
        );
        bar.style.left = position + "px";
      }
    },
    true
  );
}
