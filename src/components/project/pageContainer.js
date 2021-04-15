import styled from "styled-components";
import {
  tabHeight,
  tableRightWidth,
  // tableHeadingHeight,
  tabUnselected,
  teamColor,
  tableInputUnderline,
  tableContentTopMargin,
  tableInputMargin,
  tableInputPadding,
  tableContentSideMargin,
} from "../../helpers";

export const PageContainer = styled.div`
  width: ${tableRightWidth};
  background-color: white;
  color: black;
  .tabs {
    height: ${tabHeight};
    display: flex;
    background-color: ${tabUnselected};
  }
  .leader {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }
  .middle {
    border-left: 2px solid rgba(0, 0, 0, 0.2);
    border-right: 2px solid rgba(0, 0, 0, 0.2);
  }
  .selectedLeader {
    background-color: white;
    color: black;
    border-radius: 6px 6px 0 0;
  }
  .header {
    display: flex;
    margin-top: ${tableContentTopMargin};
    margin-bottom: 5px;
  }
  .person {
    display: flex;
    align-items: center;
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
  }
  .title {
    display: flex;
    margin-right: 20px;
    padding: 5px 0px;
  }
  .info {
    margin: 0;
    margin-left: 7px;
    width: 13px;
    height: 13px;
  }
  .field {
    margin: ${tableInputMargin};
    padding: ${tableInputPadding};
    border-radius: 0;
    border-bottom: 2px solid ${tableInputUnderline};
    /* padding: 0; */
    &:focus {
      border: none;
      border-bottom: 2px solid ${teamColor};
    }
    /* flex-grow: 1; */
  }
  .menu {
    width: 20px;
    margin: 0px 5px 0px 8px;
    padding-top: 4px;
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }
  .name {
    width: 150px;
  }
  .acronym {
    width: 100px;
    flex-grow: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .role {
    width: 150px;
  }
  .salary {
    width: 75px;
    flex-grow: 0;
  }
  .dayRate {
    width: 90px;
  }
  .location {
    width: 75px;
  }
  .profile {
    background-color: ${teamColor};
    color: white;
    padding: 5px 10px;
  }
  .hidden {
    opacity: 0;
  }
  .delete {
    width: 18px;
    padding-top: 4px;
    margin-left: 15px;
  }
  .add {
    height: 25px;
    width: 25px;
    margin: 15px ${tableContentSideMargin} 30px ${tableContentSideMargin};
  }
  .duplicate {
    color: red;
  }
  img {
    height: 100%;
    width: 100%;
    margin: auto;
  }
  button {
    border: none;
    padding: 0;
  }
`;
