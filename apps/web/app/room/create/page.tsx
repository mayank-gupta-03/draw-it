"use client";

import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { createRoom, joinRoom } from "../../../api-client/apiClient";
import { Input, Button } from "../../../components";
import { Formik } from "formik";
import {
  CreateRoomRequestBody,
  CreateRoomRequestSchema,
  CreateRoomResponseBody,
  GetRoomRequestBody,
} from "@repo/common/api-types";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const action = useRef<"create" | "join" | null>(null);
  const router = useRouter();

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: (values: CreateRoomResponseBody) =>
      router.push(`${values.data.slug}`),
  });

  const { mutate: joinMutation, isPending: isJoining } = useMutation({
    mutationFn: joinRoom,
    onSuccess: (values: CreateRoomResponseBody) =>
      router.push(`${values.data.slug}`),
  });

  const isLoading = isCreating || isJoining;

  const initialValues: CreateRoomRequestBody | GetRoomRequestBody = {
    slug: "",
  };

  const onSubmit = (values: CreateRoomRequestBody) => {
    if (action.current === "create") {
      createMutation(values);
    } else if (action.current === "join") {
      joinMutation(values);
    }
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
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                onClick={() => (action.current = "create")}
                variant="primary"
                disabled={isLoading}
              >
                Create
              </Button>
              <Button
                type="submit"
                onClick={() => (action.current = "join")}
                variant="outline"
                disabled={isLoading}
              >
                Join
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CreateRoom;
