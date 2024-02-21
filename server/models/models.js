const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Books = sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true,},
    description: {type: DataTypes.STRING},
    image: {type: DataTypes.STRING},
});

const Favorites = sequelize.define('favorites', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Authors = sequelize.define('authors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
});

const Genre = sequelize.define('genres', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
});

const BooksAuthor = sequelize.define('books_authors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const BooksGenre = sequelize.define('books_genres', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});



User.belongsToMany(Books, {through: Favorites});
Books.belongsToMany(User, {through: Favorites});



Books.belongsToMany(Authors, { through: BooksAuthor });
Books.belongsToMany(Genre, { through: BooksGenre });


Authors.belongsToMany(Books, { through: BooksAuthor });


Genre.belongsToMany(Books, { through: BooksGenre });


module.exports = {
    User,
    Books,
    Favorites,
    Authors,
    Genre,
    BooksAuthor,
    BooksGenre
};