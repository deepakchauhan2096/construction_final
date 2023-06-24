import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AddEmployee from "../modal/AddEmployee";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import teamImg1 from "../assests/images/team-1.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Backdrop, CircularProgress } from "@mui/material";




const EmployeeSrc = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [employeDatatable, setEmployeeDataTable] = useState({
    COMPANY_PARENT_ID: 18,
    COMPANY_PARENT_USERNAME: "deepanshu1",
    COMPANY_ID: 45,
    COMPANY_USERNAME: "company21",
  });
  console.log("employeerowdata: =>", employeDatatable);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const [filterData, setFilteredData] = useState({
    row: {
      id: 1,
      EmployeeName: "",
      Birthdate: "",
      PhoneNumber: "",
      Employeerole: "",
      Employementtype: "",
      Hiringdate: "",
      hourlywages: "",
      address: "",
      action: "",
      doc1: "",
      doc2: "",
      doc3: "",
    },
  });
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = useState(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.put(
        "http://54.89.160.62:5001/get_company",
        {
          COMPANY_PARENT_ID: 18,
          COMPANY_PARENT_USERNAME: "deepanshu1",
          COMPANY_ID: 45,
          COMPANY_USERNAME: "company21",
        },
        { headers }
      );
      setTimeout(()=>{
        console.log("API DATA EMPLOYEE", response);
      const data = response.data;
      setEmployeeDataTable(data.result[0].COMPANY_EMPLOYIES);
      setIsLoading(false);
      },1000)
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };
  const columns = [
    { field: "EMPLOYEE_ID", headerName: "ID", width: 60 },
    {
      field: "EMPLOYEE_USERNAME",
      headerName: "USERNAME",
      width: 120,
      // editable: true,
    },
    {
      field: "EMPLOYEE_NAME",
      headerName: "Employee Name",
      width: 120,
      // editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <button
            variant="contained"
            className="primary btn btn-success rounded-0"
            style={{ padding: "2px 2px" }}
            onClick={(event) => {
              handleClick(cellValues);
            }}
          >
            Show Detail
          </button>
        );
      },
    },
  ];

  const rows = employeDatatable;

  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  const handleClick = (event) => {
    setFilteredData(event);
    handleOpen();
  };

  const tablerows = [
    {
      date: "12/06/23",
      day: "Monday",
      status: "Present",
      in: 10,
      out: 6,
      workinghrs: 8,
    },
    {
      date: "13/06/23",
      day: "Tuesday",
      status: "Present",
      in: 10,
      out: 6,
      workinghrs: 8,
    },
    {
      date: "14/06/23",
      day: "Wednesday",
      status: "Absend",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Thursday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Friday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
    {
      date: "14/06/23",
      day: "Saturday",
      status: "Present",
      in: 11,
      out: 6,
      workinghrs: 7,
    },
  ];
  


  return (
    <>
      <div id="content" style={{ height: "100vh", position: "relative" }}>
        <Box
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100vh",
            background: "#fff",
          }}
          className="p-4"
        >
          <button className="btn btn-info text-white rounded-0  border-white">
            Employee
          </button>
          <div>
            <AddEmployee />

            {isLoading ? (
              <Backdrop open={isLoading}>
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row.EMPLOYEE_ID}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                density="compact"
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            )}
          </div>
        </Box>

        <Box
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100vh",
            background: "#fff",
            display: open ? "block" : "none",
          }}
          className="p-4 position-absolute"
        >
          <button
            onClick={handleClose}
            className="btn btn-info text-white rounded-0 border-white"
          >
            <ArrowBackIcon />
          </button>
          <button
            className="btn btn-info rounded-0 border-white"
            style={{ background: index === 1 ? "#fff" : "" }}
            onClick={(e) => setIndex(1)}
          >
            Employee Details
          </button>

          <button
            className="btn btn-info rounded-0 border-white"
            style={{ background: index === 2 ? "#fff" : "" }}
            onClick={(e) => setIndex(2)}
          >
            Documents
          </button>

          <button
            className="btn btn-info rounded-0 border-white"
            style={{ background: index === 3 ? "#fff" : "" }}
            onClick={(e) => setIndex(3)}
          >
            Timesheet
          </button>

          {index === 1 ? (
            <div className="container p-4 border">
              <h5 style={{ textDecoration: "underline" }}>Employee Detail</h5>

              <div className="row">
                <div className="col-3 border">
                  <div className="text-center py-2">
                    <img
                      src={teamImg1}
                      className="rounded"
                      alt="img1"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>

                <div className="col-4 border mx-2">
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Name :{" "}
                    <span style={{ color: "red" }}>
                      {/* {rows.map((item) => item.EMPLOYEE_USERNAME)} */}
                    </span>
                  </p>
                  {/* Date of Birth  */}
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Date Of Birth :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Birthdate}
                    </span>
                  </p>

                  {/* Phone number               */}
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Phone Number :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.PhoneNumber}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    State :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.state}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    City :{" "}
                    <span style={{ color: "grey" }}>{filterData.row.city}</span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Role :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employeerole}
                    </span>
                  </p>
                </div>

                <div className="col-4 border ">
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employeement Type :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employementtype}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hire Date :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Hiringdate}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Working On Contract :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.holdingContract}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hourly Wages :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.hourlywages}
                    </span>
                  </p>
                </div>
              </div>

              <div className="row">
                {/* <h5 style={{ textDecoration: "underline" }} className="pt-4">
                  Work Detail
                </h5> */}

                <div className="col-5 border m-4">
                  <h5 style={{ textDecoration: "underline" }} className="pt-4">
                    Work Detail
                  </h5>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Role :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employeerole}
                    </span>
                  </p>

                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employeement Type :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employementtype}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hire Date :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Hiringdate}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Working On Contract :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.holdingContract}
                    </span>
                  </p>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Hourly Wages :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.hourlywages}
                    </span>
                  </p>
                </div>

                <div className="col-5 border m-4">
                  <h5 style={{ textDecoration: "underline" }} className="pt-4">
                    Salary Detail
                  </h5>
                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employee Role :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employeerole}
                    </span>
                  </p>

                  <p style={{ color: "black", fontWeight: "500" }}>
                    Employeement Type :{" "}
                    <span style={{ color: "grey" }}>
                      {filterData.row.Employementtype}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {index === 2 ? (
            <div className=" container  border p-2">
              <h5 style={{ textDecoration: "underline" }}>All Documents</h5>
              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Education Document
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(filterData.complianceDoc)}
                >
                  Download file
                </button>
              </div>

              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Valid ID
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(filterData.complianceDoc)}
                >
                  Download file
                </button>
              </div>
              <div
                className="form-control rounded-0 mb-1"
                style={{ position: "relative" }}
              >
                Other
                <button
                  style={{ position: "absolute", right: "0", top: "0" }}
                  className="btn btn-primary rounded-0"
                  onClick={() => downloadPDF(filterData.complianceDoc)}
                >
                  Download file
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {index === 3 ? (
            <div className=" container  border p-2">
              <p>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Employee Name :{" "}
                </b>
                Anurag Pal
              </p>
              <p>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Manager Name :{" "}
                </b>
                Varun Kamboj
              </p>
              <p style={{ textAlign: "right" }}>
                {" "}
                <b style={{ fontWeight: "600", color: "black" }}>
                  Week Starting :{" "}
                </b>
                6/23/2022
              </p>
              <table className="table table-hover border">
                <thead style={{ border: "1px solid black" }}>
                  <tr className="table-dark">
                    <th scope="col">Date</th>
                    <th scope="col">Day</th>
                    <th scope="col">Status</th>
                    <th scope="col">In</th>
                    <th scope="col">Out</th>
                    <th scope="col">Working hours</th>
                  </tr>
                </thead>
                <tbody>
                  {tablerows?.map((item) => (
                    <tr className="table table-striped">
                      <td scope="row">{item.date}</td>
                      <td scope="row">{item.day}</td>
                      <td scope="row">
                        <span className=" bg-success text-light rounded-pill p-1">
                          {item.status}
                        </span>
                      </td>
                      <td>{item.in}</td>
                      <td>{item.out}</td>
                      <td>{item.workinghrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="container">
                <div className="row border">
                  <div className="col-6  pt-5 ">
                    <p className="fw-semibold text-dark">
                      Employee Signature:{" "}
                      <span
                        style={{
                          borderBottom: "2px solid black",
                          width: "200px",
                        }}
                      ></span>
                    </p>
                    <p className="fw-semibold text-dark  mt-2">
                      Manager Signature: <span></span>
                    </p>
                  </div>

                  <div className="col-5  border m-2">
                    <div className="row">
                      <div className="col-5  m-2">
                        <p className="text-dark fw-semibold">Total Hours</p>
                        <p className="text-dark fw-semibold">Rate Per Hour</p>
                        <p className="text-dark fw-semibold">Total Pay</p>
                      </div>
                      <div className="col-2  m-2">
                        <p className="bg-warning text-center fs-6 text-light">
                          48
                        </p>
                        <p className="bg-primary text-center fs-6 text-light">
                          100
                        </p>
                        <p className="bg-success text-center fs-6 text-light">
                          $4800
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row float-end  border border-danger">
                      <div className="col-6  ">
                        <button
                          className="btn btn-info text-white rounded-0 border-white"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Previous Week"
                        >
                          <ArrowBackIcon />
                        </button>
                      </div>
                      <div className="col-6 ">
                        <button
                          className="btn btn-info text-white rounded-0 border-white"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          data-bs-title="Tooltip on top"
                        >
                          <ArrowForwardIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Box>
      </div>
    </>
  );
};

export default EmployeeSrc;
