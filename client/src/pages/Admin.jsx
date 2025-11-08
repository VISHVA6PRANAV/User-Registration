import React, { useEffect, useState } from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Admin(){
  const [rows, setRows] = useState([])
  useEffect(()=>{
    axios.get(API + '/participants').then(r=>setRows(r.data))
  },[])
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Participants</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead><tr className="text-left border-b">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Email</th>
            <th className="py-2 pr-4">Event</th>
            <th className="py-2 pr-4">Verified</th>
            <th className="py-2 pr-4">Attended</th>
          </tr></thead>
          <tbody>
            {rows.map(x=>(
              <tr key={x._id} className="border-b">
                <td className="py-2 pr-4">{x.name}</td>
                <td className="py-2 pr-4">{x.email}</td>
                <td className="py-2 pr-4">{x.event}</td>
                <td className="py-2 pr-4">{x.verified?'Yes':'No'}</td>
                <td className="py-2 pr-4">{x.attended?'Yes':'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}