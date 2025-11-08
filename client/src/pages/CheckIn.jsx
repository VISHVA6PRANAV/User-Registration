import React, { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function CheckIn(){
  const [payload, setPayload] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      const parsed = JSON.parse(payload)
      const res = await axios.post(API + '/checkin', { id: parsed.id })
      setMsg(res.data.message)
    }catch(err){
      setMsg(err.response?.data?.message || 'Invalid payload')
    }
  }

  return (
    <div>
      <p className="mb-3 text-sm text-gray-600">
        For demo: paste scanned QR JSON (e.g., {"{"}"id":"...","email":"a@b.com","event":"Tech Talk"{"}"})
      </p>
      <form onSubmit={submit}>
        <textarea value={payload} onChange={e=>setPayload(e.target.value)} className="w-full h-40 border rounded-lg p-2"></textarea>
        <button className="mt-3 w-full rounded-xl py-2 bg-black text-white">Check In</button>
      </form>
      {msg && <p className="mt-3">{msg}</p>}
    </div>
  )
}