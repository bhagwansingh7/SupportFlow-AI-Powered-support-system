import React from "react";
import NavBar from "./NavBar";
import useState from "react"





const Home = () => {
   



  return (
    <main className="min-h-screen bg-slate-50">
       

      
      <section className="relative overflow-hidden">
         <NavBar />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">

          <div className="mx-auto max-w-3xl text-center">
            
           
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
              Smart Customer Support Platform
            </div>

            
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Manage customer support
              <span className="block text-indigo-600">
                smarter with SupportFlow
              </span>
            </h1>

            
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Streamline tickets, automate workflows, and help your support
              team resolve customer issues faster with one powerful platform.
            </p>

            
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

              <a
                href="/register"
                className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#features"
                className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 sm:w-auto"
              >
                Explore Features
              </a>

            </div>
          </div>

          {/* Feature Cards */}
          <div
            id="features"
            className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3"
          >

            {/* Card 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                🎫
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Smart Tickets
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Organize, assign and track customer support tickets from one
                centralized system.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                ⚡
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                Automated Workflow
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Automate repetitive support tasks and route customer issues
                to the right team.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-xl">
                🤖
              </div>

              <h3 className="text-lg font-semibold text-slate-900">
                AI Powered
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use AI to classify tickets, summarize conversations and help
                support agents respond faster.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;