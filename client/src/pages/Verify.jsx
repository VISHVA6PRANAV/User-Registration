import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Verify(){
  const [status, setStatus] = useState('Verifying...')
  const [qr, setQr] = useState(null)

  useEffect(()=>{
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    async function run(){
      try{
        const res = await axios.get(API + '/verify/' + token)
        setStatus(res.data.message || 'Verified!')
        setQr(res.data.qrCode || null)
      }catch(e){
        setStatus(e.response?.data?.message || 'Invalid link')
      }
    }
    if(token) run()
  }, [])

  return (
    <div className="text-center">
      <p className="text-lg mb-4">{status}</p>
      {qr && <img alt="QR" src={qr} className="mx-auto w-56 h-56" />}
      <p className="text-sm text-gray-500 mt-2">Show this QR at the venue to check in.</p>
    </div>
  )
}