import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const Signin = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();
    try {
      const user = await firebase.signInUser(email, password);
      console.log(user);
      console.log(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    const user = firebase.current;
    console.log(user);
    if (user) {
      console.log(user);
      navigate("/");
    }
  }, [firebase]);

  return (
    <Container fluid="md">
      <Row className="justify-content-center mt-3 pt-3 mt-md-5 pt-md-5">
        <Col md="6">
          <Form onSubmit={loginUser}>
            <h3 className="text-center mb-4">Login</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                Don't have an account?<Link to="/signup">Signup</Link>
              </small>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signin;
