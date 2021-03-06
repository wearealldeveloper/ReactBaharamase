import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { auth, firestore } from "../config/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/registration.css";
import "../css/button.css";
import "../css/style.css";

import axios from "axios";

function Registration({ token }) {
  console.log("Registration page", token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterScreen, setIsRegisterScreen] = useState(true);

  const onRegister = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("User is register", cred.user.uid);
        // save to firebase
        firestore
          .collection("users")
          .doc(cred.user.uid)
          .set({
            createdDate: Date().toLocaleString(),
            creditBalance: 2000,
            deviceToken: token,
            displayName: email,
            email: email,
            lastOnline: "2020-07-06 11:51:04",
            phoneNumber: 99999999,
            status: "offline",
            uid: cred.user.uid,
            password: password,
          })
          .then(cred => {
            console.log("save to firebase");
          })
          .catch(err => {
            console.log("firestore errorss " + err);
          });
      })
      .catch(err => {
        console.log("error " + err);
        notify(err.toString());
      });
  };

  const onLogin = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(cred => {
        console.log("User is Login", cred.user.uid);
      })
      .catch(err => {
        console.log("error " + err);
        notify(err.toString());
      });
  };

  const loginHere = () => {
    setIsRegisterScreen(false);
  };
  const registerHere = () => {
    setIsRegisterScreen(true);
  };

  const notify = message => toast(message);

  return (
    <div className="registerPage">
      <ToastContainer />
      <div className="register_background_top"></div>
      <div className="register_background_bottom"></div>
      <div className="container_box"></div>
      {isRegisterScreen ? (
        <div className="container" id="register_container">
          <h3>Registration</h3>
          <Form onSubmit={onRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <div className="vertical_space"></div>
            <button className="login_button" type="submit">
              Register
            </button>
          </Form>
        </div>
      ) : (
        <div className="container" id="login">
          <h3>Login</h3>
          <Form onSubmit={onLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </Form.Group>
            <div className="vertical_space"></div>
            <button className="login_button" type="submit">
              Login
            </button>
          </Form>
        </div>
      )}
      <div className="register__footer">
        <div className="div__button" onClick={() => loginHere()}>
          Login Here
        </div>
        <div className="div__button" onClick={() => registerHere()}>
          Register Here
        </div>
      </div>
    </div>
  );
}

export default Registration;
