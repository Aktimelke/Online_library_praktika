const {Books,Genre,Authors,BooksAuthor,BooksGenre} = require('../models/models');

class BookController{
    async create(req, res) {
        try {
            const { title, description, image, author, genre } = req.body;
    
            
            const book = await Books.create({ title, description, image });
    
            
            for (const authorId of author) {
                await BooksAuthor.create({ bookId: book.id, authorId });
            }
    
            
            for (const genreId of genre) {
                await BooksGenre.create({ bookId: book.id, genreId });
            }
    
            return res.status(201).json(book);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    
    
    

    async createGenre(req, res) {
        try {
            const { name } = req.body; 
    
           
            let genre = await Genre.findOne({ where: { name } });
            if (!genre) {
                
                genre = await Genre.create({ name });
            }
    
            return res.status(201).json(genre);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    

    async createAuthor(req, res) {
        try {
            const { first_name, last_name } = req.body; 
    
            
            let author = await Authors.findOne({ where: { first_name, last_name } });
            if (!author) {
                
                author = await Authors.create({ first_name, last_name });
            }
    
            return res.status(201).json(author);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    

    async getAll (req,res){
        const book = await Books.findAll()
        return res.json(book)

    }
    async delete(req, res) {
        try {
            const { id } = req.params; 
    
           
            await BooksAuthor.destroy({ where: { bookId: id } });
    
           
            await BooksGenre.destroy({ where: { bookId: id } });
    
            
            const deletedCount = await Books.destroy({ where: { id } });
    
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Книга не найдена' });
            }
    
            return res.status(200).json({ message: 'Книга успешно удалена' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    
    async getByID(req, res) {
        try {
            const { id } = req.params; 
    
           
            const book = await Books.findByPk(id);
    
            
            if (!book) {
                return res.status(404).json({ message: 'Книга не найдена' });
            }
    
            
            return res.status(200).json({ description: book.description });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
}

module.exports = new BookController()