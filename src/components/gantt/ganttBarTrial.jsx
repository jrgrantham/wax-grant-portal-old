import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MemoisedBlock } from "./ganttBlockTrial";
import {leadingZero, monthWidth, wpBarColor} from '../../helpers'

toast.configure();

function GanttBarTrial(props) {
  // unique string for barId
  const wpIndex = leadingZero(props.wpIndex)
  const rowIndex = leadingZero(props.rowIndex)
  const barNumber =  leadingZero(props.barNumber)
  const barId = "bar" + wpIndex + rowIndex + barNumber;

  // all from props
  const blockWidth = monthWidth.slice(0, 2);
  const barLength = 5;
  const firstBlockIndex = 0;
  const startPosition = firstBlockIndex * blockWidth;

  const blocks = [];
  for (let i = 0; i < barLength; i++) {
    const blockNum = leadingZero(i)
    if (i === 0) blockNum = blockNum + "s";
    else if (i === barLength - 1) blockNum = blockNum + "e";
    else blockNum = blockNum + "m";
    const blockId = barId + blockNum;
    blocks.push(blockId);
  }

  return (
    <Container id={barId} startPosition={startPosition}>
      {blocks.map((block, index) => (
        <MemoisedBlock blockId={block} key={index} barId={barId} index={index}/>
      ))}
    </Container>
  );
}
export const MemoisedBar = React.memo(GanttBarTrial);

const Container = styled.div`
  position: absolute;
  left: ${(props) => props.startPosition}px;
  margin: 2px 0;
  background-color: ${wpBarColor};
  color: white;
  border-radius: 5px;
  z-index: 10;
  display: flex;
`;
// export default GanttBarTrial;
