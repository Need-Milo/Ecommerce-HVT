'use client';

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginThunk } from "../lib/redux/auth/authThunk";
import Link from "next/link";

const SignInClient = () => {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  if (user) {
    return (
      <Link href={"/order-history"} className="text-sm font-semibold">
        Hi, {user.name}
      </Link>
    );
  }

};

export default SignInClient;
