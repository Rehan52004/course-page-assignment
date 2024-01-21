import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";
import { Navigate } from "react-router-dom";
const Signup = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signup(e) {
    e.preventDefault();
    firebase.createUser(name, email, password);
    setName("");
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    const user = firebase.current;
    if (user) {
      console.log(user);
      navigate("/");
    }
  }, [firebase]);

  return (
    <Container fluid="md">
      <Row className="justify-content-center mt-3 pt-3  mt-md-5 pt-md-5">
        <Col md="6">
          <Form onSubmit={signup}>
            <h3 className="text-center mb-4">Create Account</h3>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <div className="mt-3 text-secondary">
              <small>
                Already have an account?<Link to="/signin">Signin</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
