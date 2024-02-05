import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import GameItem from '../components/GameItem';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [games, setGames] = useState([])
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: '',
        genres: [], 
        platforms: [], 
        categories: [],
        sort: 'createdAt', 
        order: 'desc'
    })

    // console.log(games)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const genres = urlParams.getAll('genres'); 
        const platforms = urlParams.getAll('platforms');
        const categories = urlParams.getAll('categories');

        setSidebarData({
          searchTerm: urlParams.get('searchTerm') || '',
          type: urlParams.get('type') || '',
          genres: genres, 
          platforms: platforms,
          categories: categories,
          sort: urlParams.get('sort') || 'createdAt',
          order: urlParams.get('order') || 'desc',
        });

        const fetchGames = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/search?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
              setShowMore(true);
            } else {
              setShowMore(false);
            }
            setGames(data);
            setLoading(false);
        };
        fetchGames();
    }, [location.search]);

    console.log(sidebarData)

    const handleChange = (e) => {
        // handle search box update
        if (e.target.id === 'searchTerm') {
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }

        // handle checkbox for type
        if (e.target.id.startsWith('type-')) {
            const item = e.target.id.split('-')[1];
            const checked = e.target.checked;
            if (checked) {
                setSidebarData({ ...sidebarData, type: item });
            } else {
                if (sidebarData.type === item) {
                    setSidebarData({ ...sidebarData, type: '' });
                }
            }
        }

        // handle genres, platforms, and categories arrays update
        if (e.target.id.startsWith('genres-') || e.target.id.startsWith('platforms-') || e.target.id.startsWith('categories-')) {
            const [section, item] = e.target.id.split('-');
            const checked = e.target.checked;
            // Create a copy of the existing array from the state
            const updatedArray = [...sidebarData[section]];
            if (checked) {
                // Add the item if it's checked and not already in the array
                if (!updatedArray.includes(item)) {
                    updatedArray.push(item);
                }
            } else {
                // Remove the item if it's unchecked
                const index = updatedArray.indexOf(item);
                if (index !== -1) {
                    updatedArray.splice(index, 1);
                }
            }
            // Update the state
            setSidebarData({ ...sidebarData, [section]: updatedArray });
        }
      
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({ ...sidebarData, sort, order });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        // Append array values
        sidebarData.genres.forEach(genre => urlParams.append('genres', genre));
        sidebarData.platforms.forEach(platform => urlParams.append('platforms', platform));
        sidebarData.categories.forEach(category => urlParams.append('categories', category));
        // Create search query
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const onShowMoreClick = async () => {
        let additionalGamesNeeded = 9;
        let newGames = [];
        let attempts = 0;
        const maxAttempts = 5; // Prevent infinite loops
        let lastIndex = games.length;
    
        while (newGames.length < additionalGamesNeeded && attempts < maxAttempts) {
            const urlParams = new URLSearchParams(location.search);
            urlParams.set('startIndex', lastIndex);  // Start from the last index of currently loaded games
            urlParams.set('limit', additionalGamesNeeded * 2); // Fetch twice the needed amount to account for potential duplicates
            const searchQuery = urlParams.toString();
            const res = await fetch(`/search?${searchQuery}`);
            const data = await res.json();
    
            // Filter out duplicates
            const uniqueNewGames = data.filter(game => !games.some(g => g._id === game._id));
            // Add the unique new games to the newGames array
            newGames = [...newGames, ...uniqueNewGames].slice(0, additionalGamesNeeded);
            // Update lastIndex for the next iteration
            lastIndex += additionalGamesNeeded * 2;
            // Increment the attempts counter
            attempts++;
    
            if (data.length < additionalGamesNeeded * 2) {
                setShowMore(false);    // No more data to fetch
                break;     // Exit the loop if we fetched all remaining data but it's still less than needed
            }
        }
        // Update the games state with new unique games
        setGames(prevGames => [...prevGames, ...newGames]);
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 sm:border-r-2 md:min-h-screen">
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input 
                            type="text" 
                            id="searchTerm" 
                            placeholder="Search..." 
                            className="border rounded-lg p-3 w-full"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Types */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="type-sale_recent" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.type === 'sale_recent'}
                            />
                            <span>Recent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="type-recent" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.type === 'recent'}
                            />
                            <span>Recently Released</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="type-sale" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                    </div>

                    {/* Genres */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Genres:</label>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="genres-indie" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.genres.includes('indie')}
                            />
                            <span>Indie</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="genres-strategy" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.genres.includes('strategy')}
                            />
                            <span>Strategy</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="genres-action" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.genres.includes('action')}
                            />
                            <span>Action</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="genres-adventure" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.genres.includes('adventure')}
                            />
                            <span>Adventure</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="genres-rpg" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.genres.includes('rpg')}
                            />
                            <span>RPG</span>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Platforms:</label>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="platforms-windows" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.platforms.includes('windows')}
                            />
                            <span>Windows</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="platforms-mac" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.platforms.includes('mac')}
                            />
                            <span>macOS</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="platforms-linux" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.platforms.includes('linux')}
                            />
                            <span>Linux</span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Categories:</label>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="categories-single" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.categories.includes('single')}
                            />
                            <span>Single-player</span>
                        </div>
                        <div className='flex gap-2'>
                            <input 
                                type="checkbox" 
                                id="categories-multi" 
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebarData.categories.includes('multi')}
                            />
                            <span>Multi-player</span>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select 
                            id="sort_order" 
                            className='border rounded-lg p-3'
                            onChange={handleChange}
                            defaultValue={'createdAt_desc'}
                        >
                            <option value='price_desc'>Price High to Low</option>
                            <option value='price_asc'>Price Low to High</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>

                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
                </form>
            </div>

            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 pl-7 text-slate-700 mt-5'>Search Results</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {/* No game found */}
                    {!loading && games.length === 0 && (
                        <p className='text-xl text-slate-700'>No game found!</p>
                    )}
                    {/* Loading effect */}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                    )}
                    {/* Show the games */}
                    {!loading && games && games.map((game) => (
                        <GameItem key={game._id} game={game} />
                    ))}
                    {/* Show more button */}
                    {showMore && (
                        <button onClick={onShowMoreClick} className='text-green-700 hover:underline p-7 text-center w-full'>
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
