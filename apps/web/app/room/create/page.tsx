"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { createRoom } from "../../../api-client/apiClient";
import { Input, Button } from "../../../components";
import { Formik } from "formik";
import {
  CreateRoomRequestBody,
  CreateRoomRequestSchema,
} from "@repo/common/api-types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createRoom,
  });

  const initialValues: CreateRoomRequestBody = {
    slug: "",
  };

  const onSubmit = (values: CreateRoomRequestBody) => {
    mutate(values, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={toFormikValidationSchema(CreateRoomRequestSchema)}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        touched,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="w-screen h-screen flex flex-col items-center justify-center border-1 bg-slate-900"
          aria-label="Create room form"
        >
          <div className="flex flex-col gap-8 shadow-xl py-32 px-14 border border-gray-100 bg-white opacity-80 rounded-xl">
            <Input
              name="slug"
              label="Room name"
              placeholder="Enter room name"
              value={values.slug}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!(errors.slug && touched.slug)}
              errorMessage={errors.slug}
            />
            <Button type="submit" variant="primary" disabled={isPending}>
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreateRoom;
