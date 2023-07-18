import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import pluslogo from "../assests/images/plus.png";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "./Mycontext";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
};

export default function ProjectCreate(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [index, setIndex] = React.useState([]);
  const [resError, setResError] = useState();
  const [errors, setErrors] = useState({});
  const { text } = React.useContext(MyContext);
  const { setProject } = React.useContext(MyContext);

  console.log(text, "allcontext");

  const [createProject, setCreateProject] = useState({
    PROJECT_PARENT_ID: text?.COMPANY_ID,
    PROJECT_PARENT_USERNAME: text?.COMPANY_USERNAME,
    PROJECT_MEMBER_PARENT_ID: text?.COMPANY_PARENT_ID,
    PROJECT_MEMBER_PARENT_USERNAME: text?.COMPANY_PARENT_USERNAME,
    PROJECT_NAME: "",
    PROJECT_USERNAME: "",
    PROJECT_PHONE: "",
    PROJECT_ADD: "",
    PROJECT_CITY: "",
    PROJECT_START_DATE: "",
    PROJECT_END_DATE: "",
    PROJECT_SUPERVISOR: "",
    PROJECT_EMROLMNT_TYPE: "",
  });

  const validateValues = (inputValues) => {
    let errors = {};

    if (inputValues.PROJECT_USERNAME.trim() === "") {
      errors.PROJECT_USERNAME = "Username is required";
    } else if (
      inputValues.PROJECT_USERNAME.length < 6 ||
      inputValues.PROJECT_USERNAME.length > 10
    ) {
      errors.PROJECT_USERNAME = "Username length must be between 6 and 10";
    } else if (!/^[a-zA-Z0-9]+$/.test(inputValues.PROJECT_USERNAME)) {
      errors.PROJECT_USERNAME = "Username should not contain symbols";
    }

    if (inputValues.PROJECT_NAME.trim() === "") {
      errors.PROJECT_NAME = "Project Name is required";
    } else if (inputValues.PROJECT_NAME.length > 10) {
      errors.PROJECT_NAME = "Project Name should not exceed 10 characters";
    } else if (/\d/.test(inputValues.PROJECT_NAME)) {
      errors.PROJECT_NAME = "Project Name should not contain numbers";
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(inputValues.PROJECT_NAME)) {
      errors.PROJECT_NAME = "Project Name should not contain symbols";
    }

    if (inputValues.PROJECT_PHONE.trim() === "") {
      errors.PROJECT_PHONE = "Phone Number is required";
    }
    if (inputValues.PROJECT_EMROLMNT_TYPE.trim() === "") {
      errors.PROJECT_EMROLMNT_TYPE = "Please select an option";
    }
    if (inputValues.PROJECT_START_DATE.trim() === "") {
      errors.PROJECT_START_DATE = "Start Date is required";
    } else {
      const currentDate = new Date().toISOString().split("T")[0];
      if (inputValues.PROJECT_START_DATE < currentDate) {
        errors.PROJECT_START_DATE = "Start Date cannot be in the past";
      }
    }

    if (inputValues.PROJECT_END_DATE.trim() === "") {
      errors.PROJECT_END_DATE = "End Date is required";
    } else if (inputValues.PROJECT_START_DATE > inputValues.PROJECT_END_DATE) {
      errors.PROJECT_END_DATE = "End Date must be greater than Start Date";
    }
    if (inputValues.PROJECT_EMROLMNT_TYPE.trim() === "") {
      errors.PROJECT_EMROLMNT_TYPE = "Please select Enrollment Type";
    }
    if (inputValues.PROJECT_SUPERVISOR.trim() === "") {
      errors.PROJECT_SUPERVISOR = "Please Provide the Supervisor's Name";
    }
    if (inputValues.PROJECT_ADD.trim() === "") {
      errors.PROJECT_ADD = "Address is Required";
    }
    if (inputValues.PROJECT_CITY.trim() === "") {
      errors.PROJECT_CITY = "City is Required";
    }

    return errors;
  };

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const handleCreate = (e) => {
    setCreateProject({ ...createProject, [e.target.name]: e.target.value });
    console.log("heello world", createProject);
  };

  //api create project
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateValues(createProject));
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://3.84.137.243:5001/create_project", createProject, {
          headers,
        })
        .then((response) => {
          console.log("response of create project", response.data);
          if (response.data.operation == "failed") {
            setOpen(true);
          } else if (response.data.operation == "successfull") {
            setOpen(false);
            setProject(response.data.result);
          }
        })
        .catch((error) => {
          console.error(error, "ERR");
        });
    }
  };

  console.log("ind", index);

  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ color: "#277099" }}
        className=" border-0"
        variant="outlined"
        size="small"
      >
        + Add New Project
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <div className="row py-2">
              <div className="form-group col-xl-4">
                <label> Project Username</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputusername"
                  placeholder="Username"
                  value={createProject.PROJECT_USERNAME}
                  name="PROJECT_USERNAME"
                  onChange={handleCreate}
                />
                {errors.PROJECT_USERNAME && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_USERNAME}
                  </p>
                )}

                {resError ? (
                  <p className="error text-danger fw-light">{resError}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group col-xl-4">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputname"
                  placeholder="Project Name"
                  value={createProject.PROJECT_NAME}
                  name="PROJECT_NAME"
                  onChange={handleCreate}
                />
                {errors.PROJECT_NAME && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_NAME}
                  </p>
                )}
              </div>
              <div className="form-group col-xl-4">
                <label>Contact</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Enter Phone Number"
                  name="PROJECT_PHONE"
                  value={createProject.PROJECT_PHONE}
                  onChange={handleCreate}
                />
                {errors.PROJECT_PHONE && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_PHONE}
                  </p>
                )}
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Project start date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_START_DATE}
                  name="PROJECT_START_DATE"
                  onChange={handleCreate}
                  className="form-control"
                />
                {errors.PROJECT_START_DATE && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_START_DATE}
                  </p>
                )}
              </div>
              <div className="form-group col-xl-6">
                <label>Project End date</label>
                <input
                  type="date"
                  value={createProject.PROJECT_END_DATE}
                  name="PROJECT_END_DATE"
                  onChange={handleCreate}
                  className="form-control"
                />
                {errors.PROJECT_END_DATE && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_END_DATE}
                  </p>
                )}
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group col-xl-6">
                <label>Enrollment</label>
                <select
                  id="inputEnroll"
                  className="form-control "
                  onChange={handleCreate}
                  name="PROJECT_EMROLMNT_TYPE"
                  value={createProject.PROJECT_EMROLMNT_TYPE}
                >
                  <option selected>Choose...</option>
                  <option>Painter</option>
                  <option>Fitter</option>
                  <option>Plumber</option>
                  <option>Engineer</option>
                </select>
                {errors.PROJECT_EMROLMNT_TYPE && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_EMROLMNT_TYPE}
                  </p>
                )}
              </div>

              <div className="form-group col-md-6">
                <label>Supervisor</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputsupervisor"
                  name="PROJECT_SUPERVISOR"
                  value={createProject.PROJECT_SUPERVISOR}
                  onChange={handleCreate}
                />
                {errors.PROJECT_SUPERVISOR && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_SUPERVISOR}
                  </p>
                )}
              </div>
            </div>
            <div className="row py-2">
              <div className="form-group  col-md-8">
                <label>Address</label>
                <textarea
                  type="text"
                  className="form-control "
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                  name="PROJECT_ADD"
                  value={createProject.PROJECT_ADD}
                  onChange={handleCreate}
                />

                {errors.PROJECT_ADD && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_ADD}
                  </p>
                )}
              </div>
              <div className="form-group col-md-4">
                <label>City</label>
                <input
                  type="text"
                  className="form-control "
                  id="inputCity"
                  name="PROJECT_CITY"
                  value={createProject.PROJECT_CITY}
                  onChange={handleCreate}
                />
                {errors.PROJECT_CITY && (
                  <p className="error text-danger fw-light">
                    {errors.PROJECT_CITY}
                  </p>
                )}
              </div>
            </div>
            <div className="row py-2"></div>
            <button
              type="submit"
              className="btn btn-info text-white "
              onClick={handleSubmit}
            >
              Submit
            </button>{" "}
            <button
              onClick={handleClose}
              className="btn btn-danger text-white "
            >
              Discard
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
