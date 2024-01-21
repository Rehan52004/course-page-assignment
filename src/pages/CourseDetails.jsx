import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Container } from "react-bootstrap";

const CourseDetails = () => {
  const firebase = useFirebase();
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const fetchedCourses = await firebase.fetchData();
        const foundedCourse = fetchedCourses.find(
          (course) => course.course_id === id
        );
        console.log(foundedCourse);
        setCourse(foundedCourse);
        console.log(course);
      } catch (err) {
        console.log(err);
      }
    }
    load();
  }, [firebase, id]);

  return (
    <>
      <Container fluid="lg">
        <div
          style={{
            height: "200px",
            width: "auto",
            objectFit: "cover",
            textAlign: "center",
          }}
        >
          <img
            src={course.img_url}
            alt="image"
            style={{ width: "auto", height: "100%" }}
          />
        </div>
      </Container>
      <h3>Coure Name: {course.course_name}</h3>
      <h4>Course Description: {course.description}</h4>
      <h5>Course Instructor: {course.instructor_name}</h5>
      <p>Duration: {course.duration} month</p>
      <p>Pre-requisites: {course.pre_requisites} month</p>
    </>
  );
};

export default CourseDetails;
