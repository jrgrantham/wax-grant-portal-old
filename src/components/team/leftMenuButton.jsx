import React from "react";
import styled from "styled-components";
import { tableLeftHighlight, teamFontColor } from "../../helpers";

function LeftMenuButton(props) {
  const { selectedOption, updateOption, color } = props.data;
  const option = props.option;

  return (
    <Button
      color={color}
      style={
        selectedOption === option.toLocaleLowerCase()
          ? { backgroundColor: tableLeftHighlight, color: color }
          : null
      }
      onClick={() => updateOption(option.toLocaleLowerCase())}
    >
      <h3>{option}</h3>
    </Button>
  );
}
export default LeftMenuButton;

const Button = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  padding: 15px 10px;
  color: white;
  margin-bottom: 10px;
  border-radius: 0;
`;
