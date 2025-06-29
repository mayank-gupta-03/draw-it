"use client";

import { useParams } from "next/navigation";

const Room = () => {
  const params = useParams();
  return <div>{params.slug}</div>;
};

export default Room;
