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

    return (
        <main>
            {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
            {error && <p className='text-center my-7 text-2xl'>Something went wrong. Please try again</p>}
            {game && !loading && !error && (
                <h1>{game.name}</h1>
            )}
        </main>
    )
}

