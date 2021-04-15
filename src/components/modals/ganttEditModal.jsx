import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { removeTask, updateTaskPack } from "../../store/projectData/tasks";
import { deleteTaskAllocations } from "../../store/projectData/allocations";
import close from "../../images/close-grey.png";
import save from "../../images/save-grey.png";
import bin from "../../images/bin-grey.png";
import { wpTitleColor } from "../../helpers";

function numberOfBars(schedule) {
  let bars = 0;
  for (let i = schedule.length - 1; i >= 0; i--) {
    if (schedule[i].status) {
      bars = schedule[i].barNumber;
      return bars;
    }
  }
}

function EditModal(props) {
  const dispatch = useDispatch();
  // const [confirmDelete, setConfirmDelete] = useState(false);
  const { task, taskPackTitles } = props;
  const { dayLoading, days, description, workPackageTitle, schedule } = task;
  const barLimit = Math.ceil(schedule.length / 2);
  const bars = numberOfBars(schedule);

  const validationSchema = Yup.object({
    workPackageTitle: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    days: Yup.number()
      .typeError("You must specify a number")
      .min(1, "Minimum 1 day")
      .required("Required")
      .integer("Must be a whole number"),
    dayLoading: Yup.string().required("Required"),
    bars: Yup.number()
      .typeError("You must specify a number")
      .min(1, "Minimum 1 bar")
      .max(barLimit, `Maximum ${barLimit} bars`)
      .required("Required")
      .integer("Must be a whole number"),
  });

  const formik = useFormik({
    initialValues: {
      workPackageTitle,
      description,
      days,
      dayLoading,
      bars,
    },
    onSubmit: (values) => {
      const parsedBars = parseInt(values.bars);
      const parsedDays = parseInt(values.days);
      const newBars = bars === parsedBars ? false : parsedBars;
      const newDays = days === parsedDays ? false : parsedDays;
      const newWorkPackageTitle =
        workPackageTitle === values.workPackageTitle
          ? false
          : values.workPackageTitle;
      const newDescription =
        description === values.description ? false : values.description;
      const newDayLoading =
        dayLoading === values.dayLoading ? false : values.dayLoading;
      const changes = {
        newBars,
        newDays,
        newWorkPackageTitle,
        newDescription,
        newDayLoading,
      };
      dispatch(
        updateTaskPack({
          task,
          changes,
        })
      );
      closeModal();
    },
    validationSchema,
  });

  window.addEventListener("keydown", checkCloseModal, false);

  function checkCloseModal(e) {
    console.log("listening");
    if (e.target.id === "background" || e.key === "Escape" || e.keycode === 27)
      closeModal();
  }

  function closeModal() {
    console.log('closed');
    window.removeEventListener("keydown", checkCloseModal);
    props.setEditModal(false);
  }

  function resetBars() {
    // send bars = 1 then days = 1
    const changes = {
      newBars: 1,
      newDays: 1,
      reset: true, // to stop toast notification
    };
    dispatch(
      updateTaskPack({
        task,
        changes,
      })
    );
    closeModal();
  }
  function deleteTask(taskId) {
    dispatch(removeTask(taskId));
    dispatch(deleteTaskAllocations({ taskId }));
  }

  // useEffect(() => {
  //   return window.removeEventListener("keydown", checkCloseModal);
  // })

  return (
    <Container id="background" onClick={checkCloseModal}>
      <div className="editWindow">
        <div className="color" />
        <div className="topRow">
          <button onClick={() => closeModal()}>
            <img src={close} alt="close" />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="formField">
            <div className="inputArea">
              <label htmlFor="description">Task Title</label>
              <input
                type="text"
                name="description"
                id="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
            {formik.touched.description && formik.errors.description ? (
              <p className="errorMessage">{formik.errors.description}</p>
            ) : null}
          </div>

          <div className="formField">
            <div className="inputArea">
              <label htmlFor="work pack">Work Package</label>
              <select
                value={formik.values.workPackageTitle}
                onChange={formik.handleChange}
                name="workPackageTitle"
                id="workPackageTitle"
              >
                {taskPackTitles.map((title, index) => (
                  <option value={title} key={index} className="title">
                    {title}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.workPackageTitle &&
            formik.errors.workPackageTitle ? (
              <p className="errorMessage">{formik.errors.workPackageTitle}</p>
            ) : null}
          </div>

          <div className="formField">
            <div className="inputArea">
              <label htmlFor="Assigned days">Assigned days</label>
              <input
                type="text"
                name="days"
                id="days"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.days}
              />
            </div>
            {formik.touched.days && formik.errors.days ? (
              <p className="errorMessage">{formik.errors.days}</p>
            ) : null}
          </div>

          <div className="formField">
            <div className="inputArea">
              <label htmlFor="Number of bars">Number of bars</label>
              <input
                type="text"
                name="bars"
                id="bars"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bars}
              />
            </div>
            {formik.touched.bars && formik.errors.bars ? (
              <p className="errorMessage">{formik.errors.bars}</p>
            ) : null}
          </div>

          <div className="formField">
            <div className="inputArea">
              <label htmlFor="Days Loading">Days Loading</label>
              <select
                id="dayLoading"
                name="dayLoading"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dayLoading}
              >
                <option value="front">Front</option>
                <option value="level">Level</option>
                <option value="back">Back</option>
              </select>
            </div>
            {formik.touched.daysLoading && formik.errors.dayLoading ? (
              <p className="errorMessage">{formik.errors.dayLoading}</p>
            ) : null}
          </div>
          <div className="bottomRow">
            <button className="leftB" onClick={resetBars}>
              Reset Bars
            </button>
            <button onClick={() => deleteTask(task.taskId)}>
              <img src={bin} alt="delete" />
            </button>
            <button type="submit">
              <img src={save} alt="save" />
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.6);
  z-index: 2;

  .editWindow {
    position: relative;
    width: 450px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
    label {
      font-weight: 600;
      color: white;
      z-index: 1;
      margin-left: 10px;
    }
  }
  .color {
    position: absolute;
    width: 160px;
    height: 100%;
    background-color: ${wpTitleColor};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 100%; */
  }
  button {
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }

  .errorMessage {
    font-size: 12px;
    color: red;
  }

  .formField {
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-end;
    flex-direction: column;
    width: 95%;
    height: 45px;
    margin-bottom: 5px;
    margin-right: 10px;
  }
  .inputArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  select,
  input {
    width: 250px;
    border: 1px solid #d1d1d1;
    margin-right: 0;
  }
  .topRow {
    display: flex;
    justify-content: flex-end;
    margin: 10px 5px 10px 0;
    img {
      height: 25px;
    }
  }
  .bottomRow {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    padding-right: 5px;
  }
  img {
    height: 25px;
  }
  .content {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
  /* .leftB {
    margin-right: 10px;
  } */
`;
