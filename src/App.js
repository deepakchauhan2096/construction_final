import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/css/sidebar.css";
import "./assests/css/style.css";
import "./assests/css/graph.css";
import { MyContext } from "./context/Mycontext";
import AdminCreate from "./Admin/AdminCreate";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import EmployeeAttendance from "./employee/EmployeeAttendance";
import EmployeeLogin from "./employee/EmployeeLogin";
import Temp from "./Attendance/Temp";
import Cookies from "js-cookie";
import EmployeeHistory from "./employee/EmployeeHistory";
import EmployeeDetail from "./employee/EmployeeDetail";
import CompanyDashboard from "./company/CompanyDashboard";
import Project from "./company/Project";
import EmployeeSrc from "./employee/EmployeeSrc";
import AttendanceReport from "./Attendance/AttendanceAcknowledge";
import Document from "./Document/Documents";
import Csc from "./components/Csc"

function App() {

  const [data, setData] = useState("")
  const [user, userData] = useState("")
  const [dataEmp, setDataEmp] = useState("")
  const [userEmp, userDataEmp] = useState("")

  // get cookie

  useEffect(() => {
    let cookdata;
    let isAuthenticated;
    
    const cookieData = Cookies.get("myResponseData");
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cookdata = parsedData
      userData(parsedData)
      isAuthenticated = cookdata?.operation === "successfull";
      setData(isAuthenticated)
    } else {
      console.log("myResponseData Cookie data not found.");
    }

    // let isAuthenticated = cookdata?.operation === "successfull";
    // setData(isAuthenticated)

  }, [])


  useEffect(() => {
    let cookdataEmp;
    let isAuthenticated;

    const cookieData = Cookies.get("myResponseEmployee");
    console.log("cookieData", cookieData)
    if (cookieData) {
      const parsedData = JSON.parse(cookieData);
      cookdataEmp = parsedData
      userDataEmp(parsedData)
      
      console.log(cookdataEmp?.operation, "stored data emp")
      isAuthenticated = cookdataEmp?.operation === "successfull";
      setDataEmp(isAuthenticated)
    } else {
      console.log("myResponseEmployee Cookie data not found.");
    }

    // console.log(cookdataEmp?.operation, "stored data emp")
    // let isAuthenticated = cookdataEmp?.operation === "successfull";
    // setDataEmp(isAuthenticated)

  }, [])

  console.log(user,"datawind")

  return (
    <div className="wrapper" style={{ overflowX: "scroll", overflow: "hidden" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <>
          <Route path="/temp/*" element={<Csc />} />
            <Route path="/signup/*" element={<AdminCreate />} />
            <Route path="/login/*" element={<AdminLogin />} />
            <Route path="/*" element={<AdminLogin />} />
            <Route path="/employee/login/*" element={<EmployeeLogin />} />
          </>

          {data ?
            <>
              <Route
                path="/"
                element={<Navigate to="/admin" />} // Redirect to admin dashboard
              />
            <Route path="/admin/*" element={<AdminDashboard state={user} />} />
            <Route path="/company/:id/*" element={<CompanyDashboard/>}/>
            <Route path="/company/projects/:id/*" element={<Project/>}/>
            <Route path="/company/employees/:id/*" element={<EmployeeSrc/>}/>
            <Route path="/company/attendance/:id/*" element={<AttendanceReport/>}/>
            <Route path="/company/documents/:id/*" element={<Document/>}/>
            <Route path="/temp/*" element={<Csc />} />

            {user.ADMIN_COMPANIES?.map((e)=> <Route path={`/company/${e.COMPANY_ID}&${e.COMPANY_USERNAME}&${e.COMPANY_PARENT_ID}&${e.COMPANY_PARENT_USERNAME}`} element={<Navigate to="/admin" />}/>)}

            </> :
            <Route path="/*" element={<Navigate to="/login" />} />

          }

          {dataEmp ?
            <>

            <Route path="/employee/*" element={<EmployeeDetail state={userEmp.result} />} />
            <Route path="/employee/attendance/:id/*" element={<EmployeeAttendance state={userEmp} />} />
            <Route path="/employee/history/:*" element={<EmployeeHistory state={userEmp} />} />

            </> :
            // <Route path="/employee/*" element={<Navigate to="/employee/login" />} />
            ""
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
