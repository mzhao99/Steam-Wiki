const Game = require('../../models/gameModel');
const { getAll, getOne, search } = require('../../api/controllers/gameController'); 

// Tests for getAll function
describe('getAll', () => {
    test('returns 200 and games on success', async () => {
        // Mock Game model find method
        const mockFind = jest.fn().mockResolvedValue([
            { game_id: 1, name: 'Game 1' }, 
            { game_id: 2, name: 'Game 2' }  
        ]);
        Game.find = mockFind;

        // Create mocked request and response objects, and next function
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        // Call the getAll route handler with mocked args
        await getAll(req, res, next);

        // Assertions
        expect(res.status).toBeCalledWith(200);
        expect(mockFind).toBeCalledWith({});
        expect(res.json).toBeCalledWith([
            { game_id: 1, name: 'Game 1' },
            { game_id: 2, name: 'Game 2' }
        ]);
    });

    test('returns 404 if no games found', async () => {
        Game.find = jest.fn().mockResolvedValueOnce([]);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        await getAll(req, res, next);
    
        expect(next).toBeCalledWith(new Error('No Games Found', 404));
    });
    
    test('returns 500 on uncaught error', async () => {
        Game.find = jest.fn().mockRejectedValue(new Error('Database Error'));
        // Create mocked req, res, and next
        const req = {};
        const res = {};
        const next = jest.fn();
        await getAll(req, res, next);
    
        expect(next).toBeCalledWith(
            expect.objectContaining({
                message: 'Database Error' 
            })
        );
    });
});

// Tests for getOne function
describe('getOne', () => {
    test('returns 200 and game on success', async () => {
        // Mock Game model find method
        const mockFindById = jest.fn().mockResolvedValue([
            { game_id: 1, name: 'Game 1' }
        ]);
        Game.findById = mockFindById;

        // Create mocked request and response objects, and next function
        const req = { params: { _id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        // Call the getAll route handler with mocked args
        await getOne(req, res, next);

        // Assertions
        expect(res.status).toBeCalledWith(200);
        expect(mockFindById).toHaveBeenCalledWith(1);
        expect(res.json).toBeCalledWith([
            { game_id: 1, name: 'Game 1' }
        ]);
    });

    test('returns 404 if game not found', async () => {
        // Mock the Game.findById function to return null (game not found)
        Game.findById = jest.fn().mockResolvedValue(null);
        const req = { params: { _id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await getOne(req, res, next);

        // Assertions
        expect(next).toHaveBeenCalledWith(new Error('Game Not Found', 404));
    });

    test('returns 500 on uncaught error', async () => {
        Game.findById = jest.fn().mockRejectedValue(new Error('Database Error'));
        // Create mocked req, res, and next
        const req = { params: { _id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        await getOne(req, res, next);
    
        expect(next).toBeCalledWith(
            expect.objectContaining({
                message: 'Database Error' 
            })
        );
        expect(res.status).not.toHaveBeenCalled();    // Make sure res.status is not called
        expect(res.json).not.toHaveBeenCalled();    // Make sure res.json is not called
    });
});