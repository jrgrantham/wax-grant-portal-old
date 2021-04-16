import React from "react";
import Tippy from "@tippy.js/react";
// import "tippy.js/dist/tippy.css";
// import "react-tippy/dist/tippy.css";
import { useSelector } from "react-redux";

import qMark from "../../images/qMark.png";
import { Container } from "./teamStyling";

function Titles() {
  const employmentType = useSelector((state) => state.user.selectedTeamOption);
  return (
    <Container>
      <div className="row titles">
        <div className="title name">
          <h3>Name</h3>
        </div>
        <div className="title acronym">
          <h3>Acronym</h3>
          <Tippy content="Identifies the team member on the Gantt Chart (red text indicates duplicate)">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        <div className="title role">
          <h3>Role</h3>
          <Tippy content="Project role (not necessarily job title)">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        {employmentType === "staff" ? (
          <div className="title salary">
            <h3>Salary</h3>
            <Tippy content="Gross salary including company NI, company pension contribution and life insurance (£)">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
        ) : (
          <>
            <div className="title dayRate">
              <h3>Day rate</h3>
              <Tippy content="Day rate (£)">
                <div className="info">
                  <img src={qMark} alt="add" />
                </div>
              </Tippy>
            </div>
            <div className="title location">
              <h3>Location</h3>
            </div>
          </>
        )}
        <div className="delete"></div>
      </div>
    </Container>
  );
}
export default Titles;