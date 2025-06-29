import React from "react";
import AuthForm from "../../../components/AuthForm";

const Signup = () => {
  return (
    <div className="h-screen w-screen bg-slate-900">
      <AuthForm mode="signup" />
    </div>
  );
};

export default Signup;
