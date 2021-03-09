import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function GanttBlockTrial(props) {
  const rowIndex = props.rowIndex;
  console.log(rowIndex);
  const blockWidth = 40;

  useEffect(() => {
    let isDown = false;
    let offset = 0;
    let mousePosition;
    let startIndex = 0;
    let leftPosition;

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

    bar.addEventListener(
      "mouseup",
      function () {
        const blockPercent =
          Math.floor(leftPosition / blockWidth + 0.5);
        console.log('index', startIndex, blockPercent);

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
          leftPosition = Math.max(0, mousePosition + offset);
          // let rightPosition = Math.min(20 * 40, mousePosition.x + offset)
          // minus bar length
          bar.style.left = leftPosition + "px";
        }
      },
      true
    );
  });

  return (
    <Container id={`${rowIndex}`}>
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
  width: 120px;
  background-color: black;
  border-radius: 5px;
  z-index: 10;
`;
// export default GanttBlockTrial;
