// const request = require('supertest');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv').config({path: '../../../.env'});
// const mongoUri = process.env.MONGODB_URI;
// const express = require('express');
// const app = express();
// const Game = require('../../models/gameModel');

// describe('/games routes', () => {
//     beforeAll(async () => {
//         await mongoose.connect(mongoUri);
//     });
    
//     afterAll(async () => {
//         await mongoose.connection.close();
//     });

//     describe('GET /games', () => {
//         it('should return all games', async () => {
//             const game1 = await Game.create({ name: 'Game 1' });
//             const game2 = await Game.create({ name: 'Game 2' });
//             const res = await request(app).get('/games');
            
//             expect(res.statusCode).toBe(200);
//             expect(res.body.length).toBe(2);
//             expect(res.body[0]._id).toBe(game1._id.toString());
//             expect(res.body[1]._id).toBe(game2._id.toString());
//         });
//     });

    // describe('GET /games/:id', () => {
    //     it('should return a game if valid id is passed', async () => {
    //         const game = await Game.create({ name: 'Super Mario' });
    //         const res = await request(app).get(`/games/${game._id}`);

    //         expect(res.statusCode).toBe(200);
    //         expect(res.body).toEqual(expect.objectContaining({
    //             name: 'Super Mario'  
    //         }));
    //     });

    //     it('should return 404 if invalid id is passed', async () => {
    //         const res = await request(app).get('/games/1234');
    //         expect(res.statusCode).toBe(404);
    //     });
    // });

    // describe('GET /games/search', () => {
    //     // tests here
    // });
// });