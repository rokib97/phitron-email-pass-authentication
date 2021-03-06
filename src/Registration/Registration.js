import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase.init";
import img from "./images/register.e58071de.png";
import "./Registration.css";

const auth = getAuth(app);
const Registration = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };
  const handleNameBlur = (event) => {
    setName(event.target.value);
  };
  const handlePassBlur = (event) => {
    setPass(event.target.value);
  };
  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
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
          setEmail("");
          setPass("");
          setUserName();
          toast.success("Successfully Registered", { id: "success" });
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.message;
          if (errorMessage.includes("email-already-in-use")) {
            toast.error("Email Already In Used", { id: "not-success" });
          } else if (errorMessage.includes("invalid-email")) {
            toast.error("Invalid Email", { id: "not-success" });
          } else {
            setError(errorMessage);
          }
        });
    }
  };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <div className="img-details mt-5">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="login-details p-5 mt-5">
            <h1 className="text-primary">Hello There,</h1>
            <h4 className="mb-4">Register now to explore more</h4>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  className=""
                  required
                  onBlur={handleNameBlur}
                  type="text"
                  placeholder="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  className=""
                  required
                  onBlur={handleEmailBlur}
                  type="email"
                  placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                {/* <Form.Label>Password</Form.Label> */}
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
              {/*               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group> */}
              <Button variant="primary" type="submit">
                Register
              </Button>
              <h6 className="mt-3">
                Already have a account?{" "}
                <span>
                  <Link to="/login">Log in</Link>
                </span>
              </h6>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
