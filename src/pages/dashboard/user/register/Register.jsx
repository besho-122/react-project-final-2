import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './register.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { toast, Flip } from'react-toastify';
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`https://ecommerce-node4.onrender.com/auth/signup`, value);
      if (response.status == 201) {
        toast.success('Thank you for sign up welcome !! check your email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });

        navigate('/login');
      }

      else {
        toast.error('error in creating new user', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    }

    catch (error) {
      if (error.response.status == 409) {
        setServerError("email already in use");
        
      }
      else  
      serverError("server error");
    } finally {
      setIsLoading(false);
    }

  }
  return (


    <>

      <div className='container register'>
        <div className='card1'>


          <div className='card32'>
            <h1 className='title'>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <Form onSubmit={handleSubmit(registerUser)}>
            {serverError? <div className='text-danger'>{serverError}</div>:null}
              <FloatingLabel
                controlId="floatingInput"
                label="User Name"
                className="mb-4 f2"

              >
                <Form.Control type="userName" placeholder="name@example.com" className='f1'  {...register("userName", { required: "user name is required" })} />
                {errors.userName ? <div className='text-danger'>{errors.userName.message}</div> : null}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-4 f2"
              >
                <Form.Control type="email" placeholder="name@example.com" className='f1'  {...register("email", { required: "email is required" })} />
                {errors.email ? <div className='text-danger'>{errors.email.message}</div> : null}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb f2"
              >
                <Form.Control type="password" placeholder="name@example.com" className='f1' {...register("password", { required: "password is required" })} />
                {errors.password ? <div className='text-danger'>{errors.password.message}</div> : null}
              </FloatingLabel>

              <button type="submit" className="btn1" disabled={isLoading}>

                <strong>
                  {isLoading ? "Please wait..." : "Sign Up"}

                </strong>
                <div id="container-stars1">
                  <div id="stars1"></div>
                </div>

                <div id="glow1">
                  <div className="circle1"></div>
                  <div className="circle1"></div>
                </div>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}