"use client";

import React from "react";
import {
  CreateUserRequestBody,
  CreateUserRequestSchema,
  LoginUserRequestBody,
  LoginUserRequestSchema,
} from "@repo/common/api-types";
import { Formik, FormikErrors, FormikTouched } from "formik";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCreateUser, useLoginUser } from "../hooks/useApi";

interface Props {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: Props) => {
  const isSignup = mode === "signup";

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: loginUser, isPending: isLogging } = useLoginUser();

  const initialValues: CreateUserRequestBody | LoginUserRequestBody = isSignup
    ? { name: "", username: "", password: "" }
    : { username: "", password: "" };
  const validationSchema = isSignup
    ? toFormikValidationSchema(CreateUserRequestSchema)
    : toFormikValidationSchema(LoginUserRequestSchema);

  const handleSubmit = (values: typeof initialValues) => {
    if (isSignup) {
      createUser(values as CreateUserRequestBody);
    } else {
      loginUser(values as LoginUserRequestBody);
    }
  };

  const isLoading = isCreating || isLogging;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {(formik) => {
        const {
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        } = formik;
        const signupValues = values as CreateUserRequestBody;
        const signupErrors = errors as FormikErrors<CreateUserRequestBody>;
        const signupTouched = errors as FormikTouched<CreateUserRequestBody>;
        return (
          <div className="border-4 h-full flex items-center justify-center">
            <Form
              onSubmit={handleSubmit}
              className="w-80 bg-white/80 p-8 rounded-xl shadow-2xl"
            >
              <h1 className="text-2xl font-semibold">
                {isSignup ? "Signup" : "Signin"}
              </h1>
              {isSignup && (
                <Input
                  name="name"
                  label="Name"
                  placeholder="John Doe"
                  error={!!(signupErrors.name && signupTouched.name)}
                  errorMessage={signupErrors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={signupValues.name}
                  disabled={isLoading}
                />
              )}
              <Input
                name="username"
                label="Username"
                placeholder="john-doe-12"
                error={!!(errors.username && touched.username)}
                errorMessage={errors.username}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                disabled={isLoading}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                error={!!(errors.password && touched.password)}
                errorMessage={errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                disabled={isLoading}
              />
              <Button variant="primary" isLoading={isLoading}>
                {isSignup ? "Signup" : "Signin"}
              </Button>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default AuthForm;
