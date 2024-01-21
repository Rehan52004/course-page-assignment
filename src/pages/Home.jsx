import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CourseCard from "../components/CourseCard";
import { useFirebase } from "../context/Firebase";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      if (courses.length === 0) {
        try {
          const courses = await firebase.fetchAllCourses();
          setCourses(courses);
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
        <h2 className="my-3">All Courses</h2>
        <Row>
          {courses.map((course, i) => (
            <Col md={6} lg={4} xxl={3} key={i} className="gy-2">
              <CourseCard
                courseId={course.course_id}
                courseName={course.course_name}
                courseDescription={course.description}
                imgUrl={course.img_url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
