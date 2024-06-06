import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-[9999] border">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
