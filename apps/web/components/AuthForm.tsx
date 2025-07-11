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
import { useCreateUser, useLoginUser } from "../hooks/useUser";
import FormContainer from "./FormContainer";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: Props) => {
  const isSignup = mode === "signup";

  const router = useRouter();
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
      createUser(values as CreateUserRequestBody, {
        onSuccess: () => {
          toast.success("Logged in successfully.");
          router.push("/room/join");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data.message;
            toast.error(message);
          } else {
            toast.error("Unexpected error occurred.");
          }
        },
      });
    } else {
      loginUser(values as LoginUserRequestBody, {
        onSuccess: () => {
          toast.success("Logged in successfully.");
          router.push("/room/join");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            const message = error.response?.data.message;
            toast.error(message);
          } else {
            toast.error("Unexpected error occurred.");
          }
        },
      });
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
          <FormContainer>
            <Form onSubmit={handleSubmit} className="text-black">
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
          </FormContainer>
        );
      }}
    </Formik>
  );
};

export default AuthForm;
