import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

export default function DialogWithreForm({ open, onToggle }) {
  return (
    <Dialog
      size="xs"
      open={open}
      handler={onToggle}
      className="bg-inherit shadow-none mt-16 "
    >
      <Card className="mx-auto w-full max-w-[30rem] p-1 border rounded-xl">
        <CardBody className="flex flex-col gap-3">
          <Typography variant="h4" color="blue-gray ">
            sign up
          </Typography>
          <Typography
            className="font-normal"
            variant="paragraph"
            color="gray"
          >
            Enter your email and password to Signup.
          </Typography>
          
          <Typography className="-mb-2" variant="h6">
            Your name
          </Typography>
          <Input placeholder="name" size="lg" className="p-3 rounded-lg" />
          <Typography className="-mb-2 pt-2" variant="h6">
            Your Email
          </Typography>
          <Input placeholder="email" size="lg" className="p-3 rounded-lg" />
          <Typography className="-mb-2" variant="h6">
            Your Password
          </Typography>
          <Input placeholder="password" size="lg"className="p-3 rounded-lg" />
        </CardBody>
        <CardFooter className="pt-1">
          <Button variant="outlined" onClick={onToggle} className="w-full h-10 mb-2">
            Sign up
          </Button>
          <Typography  variant="h6">
            -------------------------------or--------------------------------
          </Typography>
          <GoogleLogin
            text="sign up with google"
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse?.credential)
              console.log(decoded);
            }}
            onError={() => {
              console.log("Login Failed");
            }}/>
         
        </CardFooter>
      </Card>
    </Dialog>
  );
}
