import { useState, lazy, Suspense } from "react";
import Loader from "./loader/Loader";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedTeacherRoute from "./ProtectedTeacherRoute";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const Login = lazy(() => import("./pages/Login"));
  const Sidebar = lazy(() => import("./components/Sidebar"));
  const TeacherSidebar = lazy(() => import("./components/TeacherSidebar"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
  const AllStudents = lazy(() => import("./pages/AllStudents"));
  const PromoteStudents = lazy(() => import("./pages/PromoteStudents"));
  const AllTeachers = lazy(() => import("./pages/AllTeachers"));
  const AddTeachers = lazy(() => import("./pages/AddTeachers"));
  const AddStudents = lazy(() => import("./pages/AddStudents"));
  const AllParents = lazy(() => import("./pages/AllParents"));
  const AddParents = lazy(() => import("./pages/AddParents"));
  const AddFeePayment = lazy(() => import("./pages/AddFeePayment"));
  const AddExpense = lazy(() => import("./pages/AddExpense"));
  const AddExpenseType = lazy(() => import("./pages/AddExpenseType"));
  const FeeCollections = lazy(() => import("./pages/FeeCollections"));
  const Expenses = lazy(() => import("./pages/Expenses"));
  const Budget = lazy(() => import("./pages/Budget"));
  const AddClass = lazy(() => import("./pages/AddClass"));
  const ManageClass = lazy(() => import("./pages/ManageClass"));
  const ManageAcademicYear = lazy(() => import("./pages/ManageAcademicYear"));
  const AddSubjects = lazy(() => import("./pages/AddSubjects"));
  const ManageSubjects = lazy(() => import("./pages/ManageSubjects"));
  const ViewAllTeachersAttendence = lazy(() =>
    import("./pages/ViewAllTeachersAttendence")
  );
  const ViewAllStudentsAttendence = lazy(() =>
    import("./pages/ViewAllStudentsAttendence")
  );

  const TakeTeacherAttendence = lazy(() =>
    import("./pages/TakeTeacherAttendence")
  );

  const ViewTeacherAttendance = lazy(() =>
    import("./pages/ViewTeacherAttendence")
  );

  const TeacherAllStudents = lazy(() => import("./pages/TeacherAllStudents"));
  const TakeStudentAttendance = lazy(() =>
    import("./pages/TakeStudentAttendance")
  );
  const ViewStudentsAttendance = lazy(() =>
    import("./pages/ViewStudentsAttendance")
  );

  const AddMarks = lazy(() => import("./pages/AddMarks"));

  const ViewMarks = lazy(() => import("./pages/ViewMarks"));

  const AllInActiveStudents = lazy(() => import("./pages/AllInActiveStudents"));

  const AllAlumni = lazy(() => import("./pages/AllAlumni"));

  return (
    <>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route
                  path="/dashboard"
                  element={<Sidebar PageComponent={<Dashboard />} />}
                />
                <Route
                  path="/all-students"
                  element={<Sidebar PageComponent={<AllStudents />} />}
                />
                <Route
                  path="/all-inactive-students"
                  element={<Sidebar PageComponent={<AllInActiveStudents />} />}
                />
                <Route
                  path="/all-teachers"
                  element={<Sidebar PageComponent={<AllTeachers />} />}
                />
                <Route
                  path="/all-alumni"
                  element={<Sidebar PageComponent={<AllAlumni />} />}
                />
                <Route
                  path="/add-teachers"
                  element={<Sidebar PageComponent={<AddTeachers />} />}
                />
                <Route
                  path="/add-students"
                  element={<Sidebar PageComponent={<AddStudents />} />}
                />
                <Route
                  path="/all-parents"
                  element={<Sidebar PageComponent={<AllParents />} />}
                />
                <Route
                  path="/add-parents"
                  element={<Sidebar PageComponent={<AddParents />} />}
                />
                <Route
                  path="/add-fee-payment"
                  element={<Sidebar PageComponent={<AddFeePayment />} />}
                />
                <Route
                  path="/fee-collections"
                  element={<Sidebar PageComponent={<FeeCollections />} />}
                />

                <Route
                  path="/add-expense"
                  element={<Sidebar PageComponent={<AddExpense />} />}
                />
                <Route
                  path="/add-expense-type"
                  element={<Sidebar PageComponent={<AddExpenseType />} />}
                />
                <Route
                  path="/expenses"
                  element={<Sidebar PageComponent={<Expenses />} />}
                />
                <Route
                  path="/budget"
                  element={<Sidebar PageComponent={<Budget />} />}
                />

                <Route
                  path="/add-class"
                  element={<Sidebar PageComponent={<AddClass />} />}
                />

                <Route
                  path="/manage-class"
                  element={<Sidebar PageComponent={<ManageClass />} />}
                />
                <Route
                  path="/manage-academic-year"
                  element={<Sidebar PageComponent={<ManageAcademicYear />} />}
                />

                <Route
                  path="/add-subjects"
                  element={<Sidebar PageComponent={<AddSubjects />} />}
                />
                <Route
                  path="/manage-subjects"
                  element={<Sidebar PageComponent={<ManageSubjects />} />}
                />
                <Route
                  path="/view-all-teachers-attendence"
                  element={
                    <Sidebar PageComponent={<ViewAllTeachersAttendence />} />
                  }
                />
                <Route
                  path="/view-all-students-attendence"
                  element={
                    <Sidebar PageComponent={<ViewAllStudentsAttendence />} />
                  }
                />
              </Route>

              <Route path="/" element={<ProtectedTeacherRoute />}>
                <Route
                  path="/teacher-dashboard"
                  element={
                    <TeacherSidebar PageComponent={<TeacherDashboard />} />
                  }
                />
                <Route
                  path="/take-teacher-attendence"
                  element={
                    <TeacherSidebar PageComponent={<TakeTeacherAttendence />} />
                  }
                />
                <Route
                  path="/view-teacher-attendence"
                  element={
                    <TeacherSidebar PageComponent={<ViewTeacherAttendance />} />
                  }
                />

                <Route
                  path="/teacher-all-students"
                  element={
                    <TeacherSidebar PageComponent={<TeacherAllStudents />} />
                  }
                />

                <Route
                  path="/take-students-attendance"
                  element={
                    <TeacherSidebar PageComponent={<TakeStudentAttendance />} />
                  }
                />
                <Route
                  path="/view-students-attendence"
                  element={
                    <TeacherSidebar
                      PageComponent={<ViewStudentsAttendance />}
                    />
                  }
                />
                <Route
                  path="/promote-students"
                  element={
                    <TeacherSidebar PageComponent={<PromoteStudents />} />
                  }
                />
                <Route
                  path="/add-marks"
                  element={<TeacherSidebar PageComponent={<AddMarks />} />}
                />

                <Route
                  path="/view-marks"
                  element={<TeacherSidebar PageComponent={<ViewMarks />} />}
                />
              </Route>
            </Routes>
          </Router>
        </Suspense>
      </AuthProvider>
    </>
  );
}

export default App;
