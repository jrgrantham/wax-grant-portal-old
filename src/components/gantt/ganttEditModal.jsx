import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  wPRowRemoved,
  wPSetNumberOfBars,
} from "../../store/projectData/workPackages";
// import { validate } from "uuid";

function EditModal(props) {
  console.log("modal");
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const row = props.row;
  const { dayLoading, days, description, workPackageTitle, schedule } = row;
  const barLimit = Math.ceil(schedule.length / 2);

  function numberOfBars() {
    let bars = 0;
    for (let i = schedule.length - 1; i > 0; i--) {
      if (schedule[i].status) {
        bars = schedule[i].barNumber;
        return bars;
      }
    }
  }

  const validationSchema = Yup.object({
    workPackageTitle: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    days: Yup.number()
      .typeError("You must specify a number")
      .min(1, "Minimum 1 day")
      // .max(barLimit, `Maximum ${barLimit} days`)
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
      bars: numberOfBars(),
    },
    onSubmit: (values) => {
      // send bars to function
      // delete object key
      // delete values.bars
      // check remaining object keys
      // send entire object to reducer
      // get reducer to send to different functions
      console.log(values);
    },
    // validate,
    validationSchema,
  });

  const deleteWP = (
    <div className="confirmDelete">
      <button onClick={() => setConfirmDelete(false)}>Cancel</button>
      <button onClick={() => dispatch(wPRowRemoved(row.rowId))}>
        Confirm Delete
      </button>
    </div>
  );

  return (
    <Container>
      <div className="editWindow">
        <div className="top row">
          <button onClick={() => props.setEdit(false)}>Close</button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="work pack">Work pack</label>
          <input
            type="text"
            name="workPackageTitle"
            id="workPackageTitle"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.workPackageTitle}
          />
          {formik.touched.workPackageTitle && formik.errors.workPackageTitle ? (
            <p>{formik.errors.workPackageTitle}</p>
          ) : null}
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <p>{formik.errors.description}</p>
          ) : null}
          <label htmlFor="Assigned days">Assigned days</label>
          <input
            type="text"
            name="days"
            id="days"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.days}
          />
          {formik.touched.bars && formik.errors.bars ? (
            <p>{formik.errors.bars}</p>
          ) : null}
          <label htmlFor="Number of bars">Number of bars</label>
          <input
            type="text"
            name="bars"
            id="bars"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.bars}
          />
          {formik.touched.bars && formik.errors.bars ? (
            <p>{formik.errors.bars}</p>
          ) : null}
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
          {formik.touched.daysLoading && formik.errors.dayLoading ? (
            <p>{formik.errors.dayLoading}</p>
          ) : null}
          <button type="submit">Submit</button>
        </form>
        <div className="content row">
          <button onClick={() => dispatch(wPSetNumberOfBars({ row, bars: 5 }))}>
            set bars
          </button>
        </div>
        <div className="bottom row">
          {confirmDelete ? (
            deleteWP
          ) : (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => setConfirmDelete(true)}
            >
              Delete
            </button>
          )}
        </div>
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

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    padding-bottom: 10px;
  }
  button {
    /* margin-left: 25px; */
  }

  .editWindow {
    width: 500px;
    height: 600px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
  }

  .row {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  .content {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }

  .confirmDelete {
    display: flex;
    justify-content: space-between;
    width: 175px;
  }
`;
