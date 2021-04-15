import styled from "styled-components";
import {
  appTop,
  appWidth,
  tableMinHeight,
  tableRightWidth
} from "../../helpers";

export const TableContainer = styled.div`
  position: relative;
  top: ${appTop};
  margin: auto;
  max-width: ${appWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  .displayArea {
    margin-bottom: 50px;
    display: flex;
    min-height: ${tableMinHeight};
    overflow: hidden;
    border-radius: 6px;
  }
  .content {
    width: ${tableRightWidth};
    background-color: white;
    display: flex;
    flex-direction: column;
  }
`;
