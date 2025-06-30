"use client";

import {
  JoinRoomRequestBody,
  JoinRoomRequestSchema,
} from "@repo/common/api-types";
import { Formik } from "formik";
import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Form from "./Form";
import Input from "./Input";
import { useJoinRoom } from "../hooks/useApi";
import Button from "./Button";
import FormContainer from "./FormContainer";

const JoinRoom = () => {
  const { mutate: joinRoom, isPending: isJoining } = useJoinRoom();

  const initialValues: JoinRoomRequestBody = {
    slug: "",
  };

  const handleSubmit = (values: JoinRoomRequestBody) => {
    joinRoom(values);
  };

  const validationSchema = toFormikValidationSchema(JoinRoomRequestSchema);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold">Join a room</h1>
            <Input
              name="slug"
              label="Room name"
              placeholder="Enter room name"
              error={!!(errors.slug && touched.slug)}
              errorMessage={errors.slug}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.slug}
              disabled={isJoining}
            />
            <Button variant="primary" isLoading={isJoining}>
              Join
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default JoinRoom;
