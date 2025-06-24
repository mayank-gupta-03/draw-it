"use client";

import { useEffect, useState } from "react";

const useSessionStorage = (key: string) => {
  const [item, setItem] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageItem = sessionStorage.getItem(key);
      if (storageItem !== null) setItem(storageItem);
    }
  }, [key]);
  return [item, setItem] as const;
};

export default useSessionStorage;
