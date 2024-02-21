const { stringify } = require('csv');


const {Books,Genre,Authors,BooksAuthor,BooksGenre} = require('../models/models');

class DownloadController{


    async download(req, res) {
        try {
            const books = await Books.findAll({
                include: [
                    {
                        model: Authors,
                        attributes: ['first_name', 'last_name'],
                        through: {
                            model: BooksAuthor,
                            attributes: []
                        }
                    },
                    {
                        model: Genre,
                        attributes: ['name'],
                        through: {
                            model: BooksGenre,
                            attributes: []
                        }
                    }
                ]
            });


// Преобразование информации в формат CSV
const csvData = [];
books.forEach(book => {
    const bookData = book.get({ plain: true }); 
    const authors = bookData.authors.map(author => `${author.first_name} ${author.last_name}`).join(', ');
    const genres = bookData.genres.map(genre => genre.name).join(', '); 
    const rowData = {
        ID: bookData.id,
        Title: bookData.title,
        Description: bookData.description,
        Image: bookData.image,
        Authors: authors,
        Genres: genres
    }; 
    csvData.push(rowData); 
});

// CSV файл в качестве ответа на запрос
res.setHeader('Content-Type', 'text/csv; charset=utf-8');
res.setHeader('Content-Disposition', 'attachment; filename=books.csv');

stringify(csvData, { header: true, columns: ['ID', 'Title', 'Description', 'Image', 'Authors', 'Genres'] }).pipe(res); //  CSV данные как поток ответа

        } catch (error) {
            console.error(error);
            res.status(500).send('Ошибка сервера');
        }
    }

}


module.exports = new DownloadController()