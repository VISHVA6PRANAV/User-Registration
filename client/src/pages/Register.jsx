import React, { useState } from 'react'
import axios from 'axios'
import Input from '../components/Input'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', mobile:'', dept:'', rollNo:'', event:'Tech Talk' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  function validate(f){
    const e = {}
    if(!f.name || f.name.length < 3) e.name = 'Name must be at least 3 characters'
    if(!/.+@.+\..+/.test(f.email)) e.email = 'Invalid email'
    if(!/^\d{10}$/.test(f.mobile)) e.mobile = 'Mobile must be 10 digits'
    if(!f.dept) e.dept = 'Required'
    if(!f.rollNo) e.rollNo = 'Required'
    if(!f.event) e.event = 'Required'
    return e
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate(form)
    setErrors(e)
    if(Object.keys(e).length) return

    try{
      const exists = await axios.post(API + '/check-email', { email: form.email, event: form.event })
      if(exists.data.exists){ setMessage('You already registered for this event.'); return; }

      const res = await axios.post(API + '/register', form)
      setMessage(res.data.message || 'Registered. Check your email!')
    }catch(err){
      setMessage(err.response?.data?.message || 'Error submitting form')
    }
  }

  return (
    <form onSubmit={submit}>
      <Input label="Full Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} error={errors.name} />
      <Input label="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} error={errors.email} />
      <Input label="Mobile" value={form.mobile} onChange={e=>setForm({...form, mobile:e.target.value})} error={errors.mobile} />
      <Input label="Department" value={form.dept} onChange={e=>setForm({...form, dept:e.target.value})} error={errors.dept} />
      <Input label="Roll No" value={form.rollNo} onChange={e=>setForm({...form, rollNo:e.target.value})} error={errors.rollNo} />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Event</label>
        <select className="w-full border rounded-lg px-3 py-2 border-gray-300" value={form.event} onChange={e=>setForm({...form, event:e.target.value})}>
          <option>Tech Talk</option>
          <option>Workshop: MERN Bootcamp</option>
          <option>AI Seminar</option>
        </select>
      </div>
      <button className="w-full rounded-xl py-2 bg-black text-white">Register</button>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </form>
  )
}