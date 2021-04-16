import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
// import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./projectStyling";
import { updateProjectInfo } from "../../store/projectData/project";

function ProjectRows(props) {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.data);

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    value = value.slice(0, 50);
    dispatch(updateProjectInfo({ key, value }));
  }

  const {
    productPlatformName,
    applicationNumber,
    nature,
    protection,
    projectName,
    projectLength,
    ProjectStart,
    projectManager,
    software,
    funding,
    ganttRef,
    competitor,
  } = useSelector((state) => state.project.data);

  return (
    <Container>
      <div className="rows">
        <Tippy content="Product / Platform Name">
          <div className="row">
            <input
              type="text"
              value={productPlatformName}
              className="field"
              name="productPlatformName"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Application Number">
          <div className="row">
            <input
              type="text"
              value={applicationNumber}
              className="field"
              name="applicationNumber"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Project Nature">
          <div className="row">
            <input
              type="text"
              value={nature}
              className="field"
              name="nature"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="IP Protection">
          <div className="row">
            <input
              type="text"
              value={protection}
              className="field"
              name="protection"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Project Name">
          <div className="row">
            <input
              type="text"
              value={projectName}
              className="field"
              name="projectName"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Project Length (months)">
          <div className="row">
            <input
              type="number"
              value={projectLength}
              className="field"
              name="projectLength"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Project Start">
          <div className="row">
            <input
              type="date"
              value={ProjectStart}
              className="field"
              name="ProjectStart"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Project Manager">
          <div className="row">
            <input
              type="text"
              value={projectManager}
              className="field"
              name="projectManager"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Management Software">
          <div className="row">
            <input
              type="text"
              value={software}
              className="field"
              name="software"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Commercialisation Funding Required">
          <div className="row">
            <input
              type="boolean"
              value={funding}
              className="field"
              name="funding"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Gantt Appendix Reference">
          <div className="row">
            <input
              type="text"
              value={ganttRef}
              className="field"
              name="ganttRef"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
        <Tippy content="Competitors Appendix Reference">
          <div className="row">
            <input
              type="text"
              value={competitor}
              className="field"
              name="competitor"
              onChange={onchangeHandler}
            />
          </div>
        </Tippy>
      </div>
    </Container>
  );
}
export default ProjectRows;
