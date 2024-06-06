import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-white z-[9999] border">
      <SignIn />
    </div>
  );
};

export default SignInPage;
