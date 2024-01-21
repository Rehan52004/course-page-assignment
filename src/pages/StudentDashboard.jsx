import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Container, Row } from "react-bootstrap";
import EnrolledCourseCard from "../components/EnrolledCourseCard";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    async function load() {
      if (enrolledCourses.length === 0) {
        try {
          const courses = await firebase.getStudentDetails();
          console.log(courses);
          setEnrolledCourses(courses);
        } catch (err) {
          console.log(err);
        }
      }
      const user = await firebase.current;
      if (!user) {
        navigate("/signin");
      }
    }
    load();
  }, [firebase]);

  return (
    <>
      <Header />
      <Container fluid="md">
        <Row>
          <Col md="4">
            <h4>Student Details</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rem
            cupiditate doloribus labore alias debitis! Nesciunt delectus quo
            dignissimos. Sed possimus enim aut deserunt nemo, accusantium ipsum
            libero dicta quos, non animi quis! Nulla quas dolorem earum fuga
            totam recusandae.
          </Col>
          <Col md="8">
            <h4>Enrolled Courses</h4>
            <Row>
              <Col md={6} lg={4} key={i} className="gy-2">
                <EnrolledCourseCard
                  courseId={course.course_id}
                  courseName={course.course_name}
                  courseDescription={course.description}
                  imgUrl={course.img_url}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentDashboard;
