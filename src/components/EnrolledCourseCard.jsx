import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

const EnrolledCourseCard = (props) => {
  const { courseId, courseName, courseDescription, imgUrl } = props;

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title>{courseName}</Card.Title>
          <Card.Text>{courseDescription}</Card.Text>
          <ProgressBar label={`60%`} now={60} />
          <FormCheckLabel className="mt-2">
            Completed
            <FormCheckInput />
          </FormCheckLabel>
        </Card.Body>
      </Card>
    </>
  );
};

export default EnrolledCourseCard;
