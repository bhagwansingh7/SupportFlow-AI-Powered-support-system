import React, { useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const {setUser}=useUser()

  const handleLogin=async (e)=>{
    e.preventDefault()
    try {
      const res=await axios.post('http://localhost:5000/api/user/login',{
        email,
        password
      },
      {
       withCredentials:true
      }
    )

      console.log("login successfull",res.data)
      setUser(res.data.user)
      navigate('/')
      
    } catch (error) {
      console.log(error)
      
    }

  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <NavBar />
      <div className="mx-auto flex min-h-[80vh] max-w-md items-center justify-center">

        <div className="w-full">

          {/* Heading */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
              S
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Sign in to your Support<span className="text-indigo-600">Flow</span> account
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <form className="space-y-5"
            onSubmit={handleLogin}
            >

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-indigo-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Login */}
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>

            </form>

            {/* Register */}
            <div className="mt-6 border-t border-slate-100 pt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Create an account
                </a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;