import styled from "styled-components";
import {wpBackground} from '../../helpers'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
  @media screen and (max-width: 750px) {
    border-radius: 0;
    margin-bottom: 0;
  }
  input {
    width: 100%;
    max-width: 300px;
    margin-right: 5px;
  }
  .packBackground {
    background-color: ${wpBackground};
  }
  .titleBar {
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 500px;
    padding-left: 30px;
    padding-right: 31px;
    background-color: ${(props) => props.titleBarColor};
    @media screen and (max-width: 750px) {
      width: 400px;
    }
    @media screen and (max-width: 550px) {
      width: 100%;
    }
    .title {
      width: 100%;
      background-color: transparent;
      border-color: transparent;
      color: white;
      font-size: 16px;
      text-overflow: ellipsis;
      font-weight: 800;
      &:hover {
        border-color: #a1a1a1;
      }
      &:focus {
        border-color: #a1a1a1;
      }
    }
    .titleButton {
      margin-left: 5px;
    }
    .info {
      display: flex;
    }
    .resources {
      margin-right: 26px;
      @media screen and (max-width: 350px) {
        display: none;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    padding-left: 30px;
    padding-right: 31px;
    p {
      font-weight: 700;
    }
  }
`;
