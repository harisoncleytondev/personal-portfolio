"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaServer, FaLock, FaUser, FaWifi } from "react-icons/fa";
import { NextRequestLoginDTO } from "../api/login/route";
import { useLogin } from "@/hooks/useLogin";

const LoginPage = () => {
  const { mutate } = useLogin();
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: NextRequestLoginDTO = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    mutate(data, {
      onSuccess: () => router.push("/dashboard"),
      onError: () => alert("Você não tem acesso."),
    });
  };

  return (
    <div className="min-h-screen w-full bg-light-gray flex items-center justify-center p-4 transition-colors duration-300 font-secondary text-dark-gray">
      <div className="w-full max-w-md bg-[var(--color-card)] rounded shadow-2xl border border-gray/20 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-secondary animate-pulse"></div>

        <div className="bg-light-gray/50 border-b border-gray/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary/10 rounded flex items-center justify-center text-secondary">
              <FaServer />
            </div>
            <div>
              <h1 className="font-primary font-bold text-sm text-secondary uppercase tracking-wider">
                Dashboard
              </h1>
              <p className="text-[10px] text-gray uppercase tracking-widest">
                Olá... Você realmente deveria estar aqui?
              </p>
            </div>
          </div>
          <FaWifi className="text-secondary/50 text-xl animate-pulse" />
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-primary text-[10px] font-bold uppercase tracking-widest text-gray flex items-center gap-2">
              <FaUser className="text-xs" /> Identificação
            </label>
            <input
              type="text"
              name="username"
              className="w-full bg-light-gray p-3 rounded border border-gray/10 outline-none text-sm font-secondary text-dark-gray focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-gray/40"
              placeholder="username"
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-primary text-[10px] font-bold uppercase tracking-widest text-gray flex items-center gap-2">
              <FaLock className="text-xs" /> Senha
            </label>
            <input
              type="password"
              name="password"
              className="w-full bg-light-gray p-3 rounded border border-gray/10 outline-none text-sm font-secondary text-dark-gray focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder:text-gray/40"
              placeholder="••••••••"
            />
          </div>

          <button className="mt-4 w-full bg-secondary text-white py-3 rounded shadow-lg hover:bg-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-primary font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            Autenticar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
