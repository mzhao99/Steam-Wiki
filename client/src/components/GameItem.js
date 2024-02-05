import { Link } from "react-router-dom"

export default function GameItem({ game }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] lg:w-[400px]'>
        <Link to={`/games/${game._id}`}>
            <img src={game.image_url} alt='game image' className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>{game.name}</p>
                <div className="flex gap-2">
                    <div className={game.discount_rate > 0 ? 'text-gray-500 font-semibold line-through' : 'text-slate-700 font-semibold'}>
                        {game.initial_price > 0 ? `$${game.initial_price / 100}` : `Free`}
                    </div>
                    <div className='text-green-700 font-semibold text-lg'>
                        {game.discount_rate > 0 ? `$${game.final_price / 100}`: ``}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
