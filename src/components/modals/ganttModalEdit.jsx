import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { wPRowRemoved, wPEdited } from "../../store/projectData/workPackages";

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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const row = props.row;
  const { dayLoading, days, description, workPackageTitle, schedule } = row;
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
        wPEdited({
          row,
          changes,
        })
      );
      props.setEditModal(false);
    },
    validationSchema,
  });

  function closeModal(e) {
    if (e.target.id === "background") props.setEditModal(false);
  }

  function resetBars() {
    // send bars = 1 then days = 1
    const changes = {
      newBars: 1,
      newDays: 1,
      reset: true, // to stop toast notification
    };
    dispatch(
      wPEdited({
        row,
        changes,
      })
    );
    props.setEditModal(false);
  }

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.keycode === 27)
      props.setEditModal(false);
  });

  return (
    <Container id="background" onClick={(e) => closeModal(e)}>
      <div className="editWindow">
        <div className="topRow">
          <button onClick={() => props.setEditModal(false)}>Cancel</button>
          {confirmDelete ? (
            <div>
              <button className="leftB" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
              <button onClick={() => dispatch(wPRowRemoved(row.rowId))}>
                Confirm
              </button>
            </div>
          ) : (
            <div>
              <button className="leftB" onClick={resetBars}>
                Reset Bars
              </button>
              <button onClick={() => setConfirmDelete(true)}>Delete</button>
            </div>
          )}
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="formField">
            <div className="inputArea">
              <label htmlFor="work pack">Work pack</label>
              <select
                value={workPackageTitle}
                onChange={formik.handleChange}
                name="workPackageTitle"
                id="workPackageTitle"
              >
                {props.allTitles.map((title, index) => (
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
              <label htmlFor="description">Description</label>
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

          <button type="submit">Submit changes</button>
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
    width: 500px;
    height: 390px;
    padding: 15px 15px 30px 15px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
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
    width: 80%;
    height: 45px;
    margin-bottom: 5px;
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
  }

  .topRow {
    display: flex;
    justify-content: space-between;
  }
  .content {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
  .leftB {
    margin-right: 10px;
  }
`;
