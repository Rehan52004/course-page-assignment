import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
  const { courseId, courseName, courseDescription, imgUrl } = props;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body>
        <Card.Title>{courseName}</Card.Title>
        <Card.Text>{courseDescription}</Card.Text>
        <Link to={`course-details/${courseId}`} className="nav-link">
          <Button variant="primary">More Details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
