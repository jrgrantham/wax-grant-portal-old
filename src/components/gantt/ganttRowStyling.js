import styled from "styled-components";
import { wpBackground, wpHighlight } from "../../helpers";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  width: 100%;
  max-width: 550px;
  height: 40px;
  border-bottom: 1px solid lightgrey;
  &:hover .hidden {
    transition: opacity 0.3s;
    opacity: 1;
  }
  &:hover .highlight {
    transition: background-color 0.3s;
    background-color: ${wpHighlight};
  }
  .hidden {
    opacity: 0;
  }
  .icon {
    padding: 3px 1px 0px 1px;
    border: none;
  }
  .rowDescription {
    display: flex;
    align-items: center;
    width: 100%;
    /* margin: 0 5px; */
    p {
      margin-left: 5px;
    }
    input {
      width: 280px;
      width: 100%;
      margin-left: 5px;
      padding-left: 5px;
      text-overflow: ellipsis;
      @media screen and (max-width: 750px) {
      }
    }
    .menu {
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
  }

  .rowData {
    display: flex;
    justify-content: space-between;
    align-items: center;
    select {
      cursor: pointer;
      padding-left: 8px;
      padding-right: 5px;
      margin-right: 5px;
      background-color: transparent;
    }
    img {
      max-height: 18px;
      max-width: 18px;
    }
    .resources {
      cursor: pointer;
      height: 27px;
      width: 100px;
      /* padding-left: 5px; */
      padding: 0 5px;
      margin-left: 14px;
      margin-right: 14px;
      border: none;
      border-radius: 5px;
      overflow: hidden;
      /* border: 1px solid red; */
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      @media screen and (max-width: 350px) {
        display: none;
      }
    }
    .days {
      width: 40px;
      height: 27px;
      margin-right: 5px;
      text-align: right;
      padding-right: 5px;
    }
    .editDays {
      position: relative;
      display: flex;
      align-items: center;
      z-index: 1;
      .accept {
        background-color: ${wpBackground};
        position: absolute;
        display: flex;
        align-items: center;
        /* bottom: 6px; */
        right: -17px;
        max-width: 22px;
        max-height: 22px;
      }
    }
  }
`;
