import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase.init";
import img from "./images/login.60b00691.png";
const auth = getAuth(app);

const LogIn = () => {
  const navigate = useNavigate();
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
      signInWithEmailAndPassword(auth, email, pass)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPass("");
          toast.success("Successfully Enrolled", { id: "success" });
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.message;
          if (errorMessage.includes("user-not-found")) {
            toast.error("User Not Found, Please Register!", {
              id: "not-success",
            });
          } else if (errorMessage.includes("wrong-password")) {
            toast.error("Wrong Password", { id: "not-success" });
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
            <h1 className="text-primary my-4">WELCOME BACK</h1>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
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
                Log in
              </Button>
              <h6 className="mt-3">
                Don’t have a account?
                <span>
                  <Link to="/registration"> Register now</Link>
                </span>
              </h6>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
