import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../../Store/slices/Userslice";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { schema } from "../../Schema/logvalidation";

const initialValues = {
  email: "",
  password: "",
};

function LoginPopup({ open, onToggle }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.User);

  const { touched, handleSubmit, handleChange, errors, values, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => handleSubmitForm(values),
  });

  const handleSubmitForm = (values) => {
    if (error) {
      alert(error);  
      console.log("Error:", error); 
      return;  
    } else {
      dispatch(userlogin(values));
      resetForm();
      onToggle();
    }
};

  const handlegoogle = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse?.credential);
      const googleUser = {
        email: decoded.email,
        password: decoded.name,
      };
      dispatch(userlogin(googleUser));
      onToggle();
    } catch (error) {
      console.log("Google Login Failed:", error);
    }
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={onToggle}
      className="bg-inherit shadow-none mt-24"
    >
      <Card className="mx-auto w-full max-w-[30rem] p-4 border rounded-xl">
        <form onSubmit={handleSubmit}>
          <CardBody className="flex flex-col gap-3">
            <Typography variant="h4" color="gray">
              Sign In
            </Typography>
            <Typography className="font-normal" variant="paragraph" color="gray">
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2 pt-2" variant="h6">
              Your Email
            </Typography>
            <Input
              placeholder="email"
              name="email"
              size="lg"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className="p-3 rounded-lg"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input
              placeholder="password"
              name="password"
              size="lg"
              className="p-3 rounded-lg"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <Button
              variant="outlined"
              type="submit"
              className="w-full h-10 mb-2"
              disabled={loading}
              aria-live="polite"  
            >
              {loading ? "Logging in..." : "Sign In"}
            </Button>
          </CardBody>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <CardFooter className="pt-1 w-full">
          <GoogleLogin
            onSuccess={handlegoogle}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </CardFooter>
      </Card>
    </Dialog>
  );
}

export default LoginPopup;
