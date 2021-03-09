import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function GanttBlockTrial(props) {
  const rowIndex = props.rowIndex;
  const scheduleLength = 20;
  const blockWidth = 40;
  const barWidth = blockWidth * 4; // barLength
  const leftObstruction = 0;
  const rightObstruction = 19;

  useEffect(() => {
    let isDown = false;
    let offset = 0;
    let mousePosition;
    let startIndex = 0;
    let position;

    const bar = document.getElementById(rowIndex);
    console.log(bar);
    bar.addEventListener(
      "mousedown",
      function (e) {
        isDown = true;
        offset = bar.offsetLeft - e.clientX;
        startIndex = bar.offsetLeft / blockWidth;
      },
      true
    );

    // something for when mouse leaves...
    bar.addEventListener(
      "mouseup",
      function () {
        const blockPercent = Math.floor(position / blockWidth + 0.5);
        console.log("index", startIndex, blockPercent);
        bar.style.left = `${blockPercent * 40}px`;
      },
      true
    );

    document.addEventListener(
      "mouseup",
      function () {
        isDown = false;
      },
      true
    );

    document.addEventListener(
      "mousemove",
      function (event) {
        event.preventDefault();
        if (isDown) {
          mousePosition = event.clientX;
          position = Math.min(
            Math.max(mousePosition + offset, leftObstruction * blockWidth),
            (rightObstruction + 1) * blockWidth - barWidth
          );
          bar.style.left = position + "px";
        }
      },
      true
    );
  });

  return (
    <Container id={`${rowIndex}`} barWidth={barWidth}>
      <div className="test">
        <div className="block start"></div>
        <div className="block middle"></div>
        <div className="block end"></div>
      </div>
    </Container>
  );
}
export const MemoisedBlock = React.memo(GanttBlockTrial);

const Container = styled.div`
  position: absolute;
  left: 40px;
  margin: 2px 0;
  height: 36px;
  width: ${(props) => props.barWidth}px;
  background-color: black;
  border-radius: 5px;
  z-index: 10;
`;
// export default GanttBlockTrial;
