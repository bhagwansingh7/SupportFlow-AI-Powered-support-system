import React, { useState } from 'react'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../apis/Backend_url'
const CreateTicket = () => {
    const [title,setTitle]=useState('');
    const [category,setCategory]=useState('');
    const [description,setDescription]=useState('');
    const [priority,setPriority]=useState('');
    const {user}=useUser();
    const navigate=useNavigate();

  const handleCreateTicket=async(e)=>{
    e.preventDefault()
    console.log(title)
    try {

      const ticket=await axios.post(`${URL}/api/tickets/createTicket`,{
        title,
        description,
        priority,
        category
      },{
        withCredentials:true
      })
      console.log(ticket.data)
      navigate('/')
      
    } catch (error) {
      console.log("error in ticket creation",error)

    }
    

  }





  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-sm">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create a Ticket
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Tell us about your issue and our support team will help you.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6"
        onSubmit={handleCreateTicket}
        >

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter ticket title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="6"
              placeholder="Describe your issue..."
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Priority + Category */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Priority
              </label>

              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e)=>setPriority(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select category</option>
                <option value="technical">Technical</option>
                <option value="billing">Billing</option>
                <option value="account">Account</option>
                <option value="general">General</option>
              </select>
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Create Ticket
          </button>

        </form>

      </div>
    </div>
  )
}

export default CreateTicket