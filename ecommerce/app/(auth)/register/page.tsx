"use client";
import { clearAuth } from "@/lib/redux/auth/authSlice";
import "../../globals.css";
import { registerThunk } from "@/lib/redux/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, user, token, success } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConFirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }
    dispatch(registerThunk({ name, email, password}));

  };

 useEffect(() => {
  if(success){
    toast.success("Register successfully!")
    const timer = setTimeout(() => {
      dispatch(clearAuth())
      router.push("/login");
    },1500 )
    return () => clearTimeout(timer)
  }
}, [success, router]);



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 bg-white shadow rounded flex flex-col gap-3"
      >
        <h1 className="text-lg font-semibold text-center">Register</h1>

        <input
          placeholder="Name"
          className="border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConFirmPassword(e.target.value)}
          required
        />
        {success && <p className="text-green-600 text-sm" >{success}</p> }
        
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <Link href="/login" className="text-sm underline text-center">
        Đăng nhập
         </Link>
      </form>
    </div>
  );
}
