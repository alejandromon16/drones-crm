"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function Signin() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });

    if (res?.error) setError(res.error as string);

    if (res?.ok) return router.push("/admin/");
  };

  return (
    <div className="justify-start h-[100vh] flex items-start">
      <div className="absolute inset-0 z-[-1]">
        <img 
          className="w-full h-full object-cover"
          src="https://www.jouav.com/wp-content/uploads/2022/10/multi-rotor-drone-under-sunset.jpg" alt="" />
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-20 w-1/3 h-full shadow-lg">
        {error && <div className="bg-red-200 text-black p-2 mb-2 rounded-lg">Credenciales Incorrectos</div>}
        <h1 className="text-4xl font-bold mb-7">Iniciar Session</h1>

        <label className="text-slate-300">Email:</label>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 block mb-2 w-full"
          name="email"
        />

        <label className="text-slate-300">Contra:</label>
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 block mb-2 w-full"
          name="password"
        />

        <button className="bg-orange-400 text-white px-4 py-2 block w-full mt-4 rounded-md">
          Iniciar Session
        </button>

        <a href="/register" className="text-blue-500 align-middle justify-center items-center w-full">Crear Cuenta</a>
      </form>
    </div>
  );
}

export default Signin;
