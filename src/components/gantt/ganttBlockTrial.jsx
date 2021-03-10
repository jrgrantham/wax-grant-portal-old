import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { wpBarColor } from "../../helpers";

toast.configure();

function GanttBlockTrial(props) {
  // unique string for barId
  const blockId = props.blockId;
  const leftHandle = props.leftHandle;
  const rightHandle = props.rightHandle;
  const blockPosition = blockId.slice(-1);

  return (
    <Container id={blockId}>
      4
      {blockPosition === "s" ? (
        <div id={leftHandle} className="dragHandle left"></div>
      ) : null}
      {blockPosition === "e" ? (
        <div id={rightHandle} className="dragHandle right"></div>
      ) : null}
    </Container>
  );
}
export const MemoisedBlock = React.memo(GanttBlockTrial);

const Container = styled.div`
  flex-grow: 1;
  width: 40px;
  height: 36px;
  background-color: ${wpBarColor};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  &:hover .dragHandle {
    opacity: 1;
  }

  .dragHandle {
    opacity: 0;
    transition: opacity 0.3s;
    position: absolute;
    height: 18px;
    width: 18px;
    background-color: ${wpBarColor};
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    z-index: 3;
  }
  .right {
    margin-left: 35px;
  }
  .left {
    margin-right: 35px;
  }
`;
// export default GanttBlockTrial;
