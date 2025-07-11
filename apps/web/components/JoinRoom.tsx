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
import { useJoinRoom } from "../hooks/useRoom";
import Button from "./Button";
import FormContainer from "./FormContainer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const JoinRoom = () => {
  const { mutate: joinRoom, isPending: isJoining } = useJoinRoom();
  const router = useRouter();

  const initialValues: JoinRoomRequestBody = {
    slug: "",
  };

  const handleSubmit = (values: JoinRoomRequestBody) => {
    joinRoom(values, {
      onSuccess: (response) => {
        toast.success(`Successfully joined ${response.data.slug}`);
        router.push(`${response.data.slug}/chat`);
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
          <Form
            onSubmit={handleSubmit}
            className="bg-white text-gray-800 px-8 py-10 space-y-6 rounded-2xl shadow-xl w-full max-w-md"
          >
            <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
              Join a Room
            </h1>

            <Input
              name="slug"
              label="Room Name"
              placeholder="e.g., react-study-group"
              error={!!(errors.slug && touched.slug)}
              errorMessage={errors.slug}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.slug}
              disabled={isJoining}
            />

            <Button
              variant="primary"
              isLoading={isJoining}
              className="w-full py-3 text-lg font-medium rounded-xl mt-2"
            >
              Join Room
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default JoinRoom;
