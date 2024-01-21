import { Route, Routes } from "react-router-dom";
import CourseDetails from "./pages/CourseDetails";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course-details/:id" element={<CourseDetails />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </>
  );
}

export default App;
