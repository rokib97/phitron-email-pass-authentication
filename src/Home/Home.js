import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import app from "../firebase.init";
import "./Home.css";
import img from "./images/register.e58071de.png";

const auth = getAuth(app);
const Home = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handlePassBlur = (event) => {
    setPass(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass)) {
      setError(
        "Must contain at least one number and one uppercase and lowercase letter,one special character and at least 8 or more characters"
      );
      return;
    }
    if (form.checkValidity() === true) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="img-details">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="login-details p-5 mt-2">
            <h1 className="my-3 text-primary">WELCOME BACK</h1>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  onBlur={handleEmailBlur}
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  onBlur={handlePassBlur}
                  type="password"
                  placeholder="Password"
                />
                <p className="text-danger">{error}</p>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Log in
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
