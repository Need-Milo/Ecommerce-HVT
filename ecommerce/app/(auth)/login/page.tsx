"use client";

import "../../globals.css";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { loginThunk } from "@/lib/redux/auth/authThunk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { clearAuth } from "@/lib/redux/auth/authSlice";
import { clearCart } from "@/lib/redux/carts/cartsSlice";
import { fetchCart } from "@/lib/redux/carts/cartsThunk";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, token, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

 useEffect(() => {
  if (user) {
    const userId = user.id || user._id
    dispatch(clearCart())
    dispatch(fetchCart(userId))
    router.push("/")
  }
}, [user, router,dispatch]);

useEffect(() => {
  dispatch(clearAuth());
}, [dispatch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-400 ">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 bg-white shadow rounded flex flex-col gap-3"
      >
        <h1 className="text-lg font-semibold text-center">Login</h1>

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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Link href="/register" > Đăng ký</Link>
      </form>
      
    </div>
  );
}
