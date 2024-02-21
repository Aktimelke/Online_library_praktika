const {Favorites,Books} = require('../models/models');

class FavoritesController {
    async AddOne(req, res) {
        try {
            const userId = req.user.id;
            const { bookId } = req.params;
    
            
            const favorite = await Favorites.create({ userId, bookId });
    
            return res.status(201).json(favorite);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const userId = req.user.id; 
    
            
            const favorites = await Favorites.findAll({ where: { userId } });
    
            
            const bookIds = favorites.map(favorite => favorite.bookId);
    
            
            const books = await Books.findAll({ where: { id: bookIds } });
    
            return res.json(books);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const userId = req.user.id; 
            const { bookId } = req.params; 
    
            
            await Favorites.destroy({ where: { userId, bookId } });
    
            return res.status(200).json({ message: 'Запись успешно удалена из избранного' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FavoritesController();
