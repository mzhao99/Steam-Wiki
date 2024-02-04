import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/' className='no-underline'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap m-0'>
                        <span className='text-slate-500'>Steam</span>
                        <span className='text-slate-700'>Wiki</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input 
                        type='text' 
                        placeholder='Search...' 
                        className='bg-transparent focus:outline-none w-24 sm:w-64' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600'/>
                    </button>
                </form>
                <ul className='flex gap-4 m-0'>
                    <Link to='/' className='no-underline'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>
                    
                    <Link to='/profile' className='no-underline'>
                    {currentUser ? (
                        <img src={currentUser.avatar} alt="profile" className='rounded-full h-7 w-7 object-cover'/>
                    ) : (
                        <li className='text-slate-700 hover:underline'>Sign in</li>
                    )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

