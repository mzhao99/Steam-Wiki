import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import GameItem from '../components/GameItem'

export default function Home() {
    const [recentGames, setRecentGames] = useState([])
    const [saleGames, setOnSaleGames] = useState([])
    SwiperCore.use([Navigation]);

    useEffect(() => {
        const fetchRecentGames = async () => {
            try {
                const res = await fetch('/search?type=recent&limit=9')
                const data = await res.json()
                setRecentGames(data)
                fetchOnSaleGames()
            } catch(error) {
                console.log(error)
            }
        }

        const fetchOnSaleGames = async () => {
            try {
                const res = await fetch('/search?type=sale_recent&limit=9')
                const data = await res.json()
                setOnSaleGames(data)
            } catch(error) {
                console.log(error)
            }
        }
        fetchRecentGames()
    },[])

    function chunkArray(array, size) {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
          chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    }

    const recentChunks = chunkArray(recentGames, 3);
    const saleChunks = chunkArray(saleGames, 3)

    return (
        <div>
            <img src="https://mmos.com/wp-content/uploads/2021/07/steam-logo-welcome-banner.jpg" className='w-full h-auto'/>
            {/* top */}
            <div className='flex flex-col gap-6 pt-28 pb-14 px-3 max-w-6xl mx-auto'>
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

            {/* Results of recent games and recent on sale games */}
            <div className='max-w-[1440px] mx-auto p-3 flex flex-col gap-8 my-10'>
                {recentGames && recentGames.length > 0 && (
                    <div className=''>
                        <div className='my-3 mx-14'>
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent Releases</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=recent'}>Show more games</Link>
                        </div>
                        <Swiper navigation>
                            {recentChunks.map((chunk, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex justify-evenly"> 
                                        {chunk.map((game) => (
                                            <GameItem game={game} key={game._id}/>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
                {saleGames && saleGames.length > 0 && (
                    <div className=''>
                        <div className='my-3 mx-14'>
                            <h2 className='text-2xl font-semibold text-slate-600'>On Sale Now</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale_recent'}>Show more games</Link>
                        </div>
                        <Swiper navigation>
                            {saleChunks.map((chunk, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex justify-evenly"> 
                                        {chunk.map((game) => (
                                            <GameItem game={game} key={game._id}/>
                                        ))}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>
        </div>
    )
}
