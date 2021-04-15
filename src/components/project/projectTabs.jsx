import React from "react";

function Tabs(selectedLeader, setSelectedLeader) {
  return (
    <div className="tabs">
      <h3
        id="lead"
        className={
          selectedLeader === "lead" ? "leader selectedLeader" : "leader"
        }
        onClick={() => setSelectedLeader("lead")}
      >
        Lead Applicant
      </h3>
      <h3
        id="pOne"
        className={
          selectedLeader === "pOne" ? "leader selectedLeader" : "leader middle"
        }
        onClick={() => setSelectedLeader("pOne")}
      >
        Partner One
      </h3>
      <h3
        id="pTwo"
        className={
          selectedLeader === "pTwo" ? "leader selectedLeader" : "leader"
        }
        onClick={() => setSelectedLeader("pTwo")}
      >
        Partner Two
      </h3>
    </div>
  );
}
export default Tabs;
