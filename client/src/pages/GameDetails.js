import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function GameDetails() {
    const params = useParams()
    const [game, setGame] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchGame = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/games/${params.gameId}`)
                const data = await res.json()
                if (data.success === false) {
                    setError(true)
                    setLoading(false)
                    return
                }
                setGame(data)
                setLoading(false)
                setError(false)
            } catch(error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchGame()
    }, [params.gameId])

    if (loading)    return <p className="text-center my-7 text-2xl">Loading...</p>;
    if (error)    return <p className="text-center my-7 text-2xl">Something went wrong. Please try again.</p>;

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] ">
            <main className="max-w-4xl mx-auto shadow-lg bg-slate-200 rounded-[20px]">
                <img src={game.image_url} alt={game.name} className="w-full object-cover h-96 rounded-[20px]" />
                <div className="mt-6 pl-10 pb-8">
                    <h1 className="text-3xl font-bold text-slate-700">{game.name}</h1>

                    <p className="mt-2 text-lg text-slate-700">Release Date: <strong>{game.release_date || "Unavailable"}</strong></p>

                    <div className="text-lg text-slate-700"><p>Genres:</p>
                        {game.genres?.length > 0 && game.genres.map(genre => (
                            <span className="mr-2 inline-block bg-blue-200 text-blue-800 text-sm px-2 rounded-full" key={genre}>{genre}</span>
                        ))}
                        {(!game.genres || game.genres.length === 0) && <span className="mr-2 inline-block bg-blue-200 text-blue-800 text-sm px-2 rounded-full">N/A</span>}
                    </div>

                    <div className="text-lg text-slate-700"><p>Platforms:</p>
                        {game.platforms?.length > 0 && game.platforms.map(platform => (
                            <span className="mr-2 inline-block bg-teal-200 text-teal-800 text-sm px-2 rounded-full" key={platform}>
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </span>
                        ))}
                        {(!game.platforms || game.platforms.length === 0) && <span className="mr-2 inline-block bg-teal-200 text-teal-800 text-sm px-2 rounded-full">N/A</span>}
                    </div>

                    <div className="text-lg text-slate-700"><p>Categories:</p>
                        {game.categories?.length > 0 && game.categories.map(category => (
                            <span className="mr-2 inline-block bg-purple-200 text-purple-800 text-sm px-2 rounded-full" key={category}>{category}</span>
                        ))}
                        {(!game.categories || game.categories.length === 0) && <span className="mr-2 inline-block bg-purple-200 text-purple-800 text-sm px-2 rounded-full">N/A</span>}
                    </div>

                    <div className="mt-4 text-slate-700">
                        <p className="text-lg">Initial Price: <strong>{game.initial_price === 0 ? "Free" : `$${game.initial_price / 100}`}</strong></p>
                        <p className="text-lg">Final Price: <strong>{game.final_price === 0 ? "Free" : `$${game.final_price / 100}`}</strong></p>
                        <p className="text-lg">Discount Rate: <strong>{game.discount_rate === 0 ? "None" : `${game.discount_rate}%`}</strong></p>
                    </div>
                </div>
            </main>
        </div>
    )
}

