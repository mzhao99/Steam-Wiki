import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
        {/* top */}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
            <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                Steam simplified with <span className='text-slate-500'>direct data</span> <br/>and <span className='text-slate-500'>no distractions</span>
            </h1>
            <div className='text-gray-400 text-lg'>
                Where every detail matters: Get streamlined access to the game information you need, without getting <br/>bogged down by unnecessary details.
            </div>
            <Link to={'/search'} className='text-lg text-blue-800 font-bold hover:underline'>
                Get Started...
            </Link>
        </div>
    </div>
  )
}
