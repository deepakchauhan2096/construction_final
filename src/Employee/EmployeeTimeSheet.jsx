import React, { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment/moment";


let MyDateCurrent = new Date();
let MyDateStringCurrent;
MyDateCurrent.setDate(MyDateCurrent.getDate());
MyDateStringCurrent =
MyDateCurrent.getFullYear() +
"-" +
("0" + (MyDateCurrent.getMonth() + 1)).slice(-2) +
"-" +
("0" + MyDateCurrent.getDate()).slice(-2);

console.log(MyDateStringCurrent,"Mydate")


//Day after seven

let MyDateAfter = new Date();
let MyDateStringAfter;

MyDateAfter.setDate(MyDateAfter.getDate());

MyDateStringAfter =
MyDateAfter.getFullYear() +
"-" +
("0" + (MyDateAfter.getMonth() + 7)).slice(-2) +
"-" +
("0" + MyDateAfter.getDate()).slice(-2);

console.log(MyDateStringAfter,"Mydate")


const EmployeeTimeSheet = (props) => {
  console.log(props, "props data in timesheet");

  const [workvalue, setWorkvalue] = useState([]);
  const [timeResultIN, settimeResultIN] = useState([]);
  const [timeResultOUT, settimeResultOUT] = useState([]);
  const [dateValue, setDate] = useState({
    ATTENDANCE_START_DATE: MyDateStringCurrent,
    ATTENDANCE_END_DATE: MyDateAfter,
  });

  useEffect(() => {
    gettimesheet();
  },[props.mainData.EMPLOYEE_MEMBER_PARENT_USERNAME]);

  console.log(dateValue, "datevalue");

  // get employee report

  const headers = {
    "Content-Type": "application/json",
    authorization_key: "qzOUsBmZFgMDlwGtrgYypxUz",
  };

  const gettimesheet = async (e) => {
    try {
      const response = await axios.put(
        "http://3.84.137.243:5001/get_employee_all_for_attendence",
        {
          ATTENDANCE_ADMIN_USERNAME:
            props.mainData.EMPLOYEE_MEMBER_PARENT_USERNAME,
          ATTENDANCE_EMPLOYEE_USERNAME: props.mainData.EMPLOYEE_USERNAME,
          ATTENDANCE_START_DATE: dateValue.ATTENDANCE_START_DATE,
          ATTENDANCE_END_DATE: dateValue.ATTENDANCE_END_DATE,
        },
        { headers }
      );
      setTimeout(() => {
        console.log("ALL EMPLOYEE TIMESHEET ", response);
        setWorkvalue(response.data.result);
      }, 1000);
    } catch (err) {
      console.log("something Went wrong: =>", err);
    }
  };

  


  // time calculation

  const timeValueHours = (x, y) => {
    return new Date(x).getUTCHours() - new Date(y).getUTCHours();
  };

  const timeValueMinutes = (x, y) => {
    return new Date(x).getUTCMinutes() - new Date(y).getUTCMinutes();
  };

  const allHours = workvalue.map((e) => {
    return (
      new Date(e.ATTENDANCE_OUT).getUTCHours() -
      new Date(e.ATTENDANCE_IN).getUTCHours() +
      ":" +
      (new Date(e.ATTENDANCE_OUT).getUTCMinutes() -
        new Date(e.ATTENDANCE_IN).getUTCMinutes())
    );
  });


  const sum = allHours.reduce(
    (time1, time2) => time1.add(moment.duration(time2)),
    moment.duration()
  );


  var startTime = moment("12:16:59 am", "hh:mm:ss a");
  var endTime = moment("06:12:07 pm", "hh:mm:ss a");

  var result =
    endTime.diff(startTime, "hours") +
    " Hrs and " +
    endTime.diff(startTime, "minutes") +
    " Mns";

  console.log(result, "hhh");



  //gate cuurent and addition seven days
 

 
  


  return (
    <>
    <div className="container-fluid border" style={{height:"70vh"}}>
      <p>
        {" "}
        <b style={{ fontWeight: "600", color: "black" }}>Employee Name : </b>
        {props.mainData.EMPLOYEE_NAME}
      </p>
      <form style={{ display: "flex", gap: 10, padding: "5px 0" }}>
        <div className="form-group col-xl-1">
          <label>Date From: </label>
          <input
            type="date"
            className="form-control"
            onChange={(event) =>
              setDate((prev) => ({
                ...prev,
                ATTENDANCE_START_DATE: event.target.value,
              }))
            }
          />
        </div>
        <div className="form-group col-xl-1">
          <label>Date to: </label>
          <input
            type="date"
            className="form-control"
            onChange={(event) =>
              setDate((prev) => ({
                ...prev,
                ATTENDANCE_END_DATE: event.target.value,
              }))
            }
          />
        </div>
        <div className="form-group col-xl-1">
          <label style={{ visibility: "hidden" }}>Result</label>
          <input
            type="submit"
            className="form-control btn btn-info"
            onClick={gettimesheet}
            value="Submit"
          />
        </div>
      </form>
      <table className="table table-hover border">
        <thead style={{ border: "1px solid black" }}>
          <tr className="table-dark">
            {/* <th scope="col">Date</th>
            <th scope="col">Day</th> */}
            <th scope="col">Date</th>
            <th scope="col">In</th>
            <th scope="col">Out</th>
            <th scope="col">Working hours</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {workvalue?.map((item) => (
            <tr className="table table-striped">
              <td>{item.ATTENDANCE_DATE_ID}</td>
              <td>{moment(item.ATTENDANCE_IN).format("LT")}</td>
              <td>{moment(item.ATTENDANCE_OUT).format("LT")}</td>
              <td>
                {timeValueHours(item.ATTENDANCE_OUT, item.ATTENDANCE_IN)} hours{" "}
                {timeValueMinutes(item.ATTENDANCE_OUT, item.ATTENDANCE_IN)} mins
              </td>
              <td>
                {item.ATTENDANCE_IN && item.ATTENDANCE_OUT
                  ? "present"
                  : "absent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="container" style={{position:"",bottom:"0"}}>
        <div className="row border" >
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
            {/* <p className="fw-semibold text-dark  mt-2">
              Manager Signature: <span></span>
            </p> */}
          </div>

          <div className="col-5" >
            <div className="row">
              <div className="col-5  m-2">
                <p className="text-dark fw-semibold">Total Hours</p>
                <p className="text-dark fw-semibold">Rate Per Hour</p>
                <p className="text-dark fw-semibold">Total Pay</p>
              </div>
              <div className="col-4  m-2">
                <p className="bg-warning text-center fs-6 text-light">
                  {Math.floor(sum.hours()) + "hours"+" " + sum.minutes() + "mins"}
                </p>
                <p className="bg-primary text-center fs-6 text-light"> {props.mainData.EMPLOYEE_HOURLY_WAGE}</p>
                <p className="bg-success text-center fs-6 text-light">{Math.floor(sum.hours())*(props.mainData.EMPLOYEE_HOURLY_WAGE)} $</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTimeSheet;
