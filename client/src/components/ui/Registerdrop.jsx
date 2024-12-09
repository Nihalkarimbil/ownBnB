import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import { schema } from "../../Schema/regvalidation";
import { useDispatch } from "react-redux";
import { registeruser } from "../../Store/slices/Userslice";

import {
  Button, Dialog, Card, CardBody, CardFooter, Typography, Input,
} from "@material-tailwind/react";


const initialValues = {
  username: "",
  email: "",
  password: "",
};

function DialogWithReForm({ open, onToggle }) {
  const Dispatch = useDispatch()
  const {
    touched,
    handleSubmit,
    handleChange,
    errors,
    values,
    handleBlur,
    resetForm } = useFormik({
      initialValues,
      validationSchema: schema,

      onSubmit: (values) => {
        Dispatch(registeruser(values));
        resetForm();
        onToggle();
      },
    });

  const handlegoogleauth =  (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const googleUser = {
        username: decoded.name,
        email: decoded.email,
        password: decoded.name,
        profileimage:decoded.picture
      }
      Dispatch(registeruser(googleUser))
      onToggle()
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <Dialog
      size="xs"
      open={open}
      handler={onToggle}
      className="bg-inherit shadow-none mt-16"
    >
      <Card className="mx-auto w-full max-w-[30rem] p-4 border rounded-xl">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-3">
            <Typography variant="h4" color="blue-gray">
              Sign up
            </Typography>
            <Typography className="font-normal" color="gray">
              Enter your email and password to Signup.
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Your name
            </Typography>
            <Input
              name="username"
              placeholder="Name"
              size="lg"
              className="p-3 rounded-lg"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}

            <Typography className="-mb-2 pt-2" variant="h6">
              Your Email
            </Typography>
            <Input
              name="email"
              placeholder="Email"
              size="lg"
              className="p-3 rounded-lg"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input
              name="password"
              placeholder="Password"
              size="lg"
              className="p-3 rounded-lg"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <Button
              variant="outlined"
              className="w-full h-10 mb-2"
              type="submit"
              onClick={() => {
                console.log("button clicked");
              }}
            >
              Sign up
            </Button>
          </CardBody>
        </form>
        <CardFooter className="pt-1">

          <GoogleLogin
            text="Sign up with Google"
            onSuccess={handlegoogleauth}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export default DialogWithReForm