export function moveBar(data, bar, e) {
  const {
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

  isDown = true;
  offset = bar.offsetLeft - e.clientX;
  startIndex = bar.offsetLeft / blockWidth;
  // console.log(startIndex);

  function dropBar() {
    // prevent from firing on multiple mouse events
    isDown = false;
    if (mousePosition) {
      const newBlockIndex = Math.floor(position / blockWidth + 0.5);
      // console.log(newBlockIndex);
      // console.log("send to redux / server", barId, startIndex, newBlockIndex);
      bar.style.left = `${newBlockIndex * 40}px`;
    }
  }

  document.addEventListener("mouseup", dropBar, true);

  document.addEventListener(
    // bar.addEventListener(
    "mousemove",
    function (event) {
      event.preventDefault();
      if (isDown) {
        mousePosition = event.clientX;
        console.log(mousePosition);
        position = Math.min(
          Math.max(mousePosition + offset, leftObstructionIndex * blockWidth),
          (rightObstructionIndex + 1) * blockWidth - barWidth
        );
        // console.log(position);
        bar.style.left = position + "px";
      }
    },
    true
  );
}
