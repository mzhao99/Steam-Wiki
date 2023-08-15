const Game = require('../../models/gameModel');
const { getAll, search, getOne } = require('../../api/controllers/gameController'); 

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