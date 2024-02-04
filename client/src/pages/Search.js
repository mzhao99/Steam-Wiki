
export default function Search() {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen">
                <form className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-3 w-full"/>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="type-sale-recent" className="w-5"/>
                            <span>Recent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="type-recent" className="w-5"/>
                            <span>Recently Released</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="type-sale" className="w-5"/>
                            <span>Sale</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Tags:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="tag-indie" className="w-5"/>
                            <span>Indie</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="tag-singleplayer" className="w-5"/>
                            <span>Singleplayer</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="tag-action" className="w-5"/>
                            <span>Action</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="tag-adventure" className="w-5"/>
                            <span>Adventure</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="tag-casual" className="w-5"/>
                            <span>Casual</span>
                        </div>
                    </div>

                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Platforms:</label>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="platform-windows" className="w-5"/>
                            <span>Windows</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="platform-mac" className="w-5"/>
                            <span>macOS</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="platform-linux" className="w-5"/>
                            <span>Linux</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select id="sort_order" className='border rounded-lg p-3'>
                            <option>Price High to Low</option>
                            <option>Price Low to High</option>
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>

            <div className=''>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
            </div>
        </div>
    )
}
