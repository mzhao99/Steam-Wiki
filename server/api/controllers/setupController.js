const Game = require('../../models/gameModel');

const loadGames = async (country_code) => {
    // const response = await fetch('http://api.steampowered.com/ISteamApps/GetAppList/v0001/');
    // const gamesResponse = await response.json();
    // const games = gamesResponse.applist.apps.app;

    for (let counter = 46850; counter < 100000; counter ++) {
        // console.log("counter: " + counter);
        const appid = counter;
        const response = await fetch(`http://store.steampowered.com/api/appdetails?appids=${appid}&cc=${country_code}`);
        const game = await response.json();
    
        // Save details to database
        if (game != null && game[appid].success){
            const details = game[appid].data;
            const gameData = {
                game_id: details.steam_appid,
                name: details.name,
                type: details.type,
                final_price: details.is_free || details.price_overview === undefined ? 0 : details.price_overview.final,
                initial_price: details.is_free || details.initial_price === undefined ? 0 : details.price_overview.initial,
                discount_rate: details.is_free || details.discount_rate === undefined ? 0 : details.price_overview.discount_percent,
                release_date: details.release_date.coming_soon === false ? details.release_date.date : "Coming Soon",
                genres: details.genres === undefined ? [] : details.genres.map(e => e.description),
                platforms: details.platforms === undefined ? [] : Object.keys(details.platforms).filter(key => details.platforms[key]),
                categories: details.categories === undefined ? [] : details.categories.map(e => e.description),
                image_url: details.header_image === undefined ? '' : details.header_image
            };
            try{
                const newGame = await Game.create(gameData);
            }catch(e){
                console.log("counter: " + counter);
                console.log(e);
            }
            console.log(appid); 
        }    
    }
    console.log('Finished');
}

module.exports = { loadGames };