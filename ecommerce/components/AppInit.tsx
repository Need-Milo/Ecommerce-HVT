"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getMeThunk } from "@/lib/redux/auth/authThunk";

export default function AppInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMeThunk());
  }, []);

  return null;
}
