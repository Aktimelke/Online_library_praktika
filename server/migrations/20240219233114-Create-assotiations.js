'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    // связь между таблицей пользователей и избранными книгами
    await queryInterface.addColumn('favorites', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // связь между таблицей книг и избранными книгами
    await queryInterface.addColumn('favorites', 'bookId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // связь между таблицей книг и авторами
    await queryInterface.addColumn('books_author', 'bookId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // связь между таблицей авторов и книгами
    await queryInterface.addColumn('books_author', 'authorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // связь между таблицей книг и жанрами
    await queryInterface.addColumn('books_genre', 'bookId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // связь между таблицей жанров и книгами
    await queryInterface.addColumn('books_genre', 'genreId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'genres',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.removeColumn('favorites', 'userId');
    await queryInterface.removeColumn('favorites', 'bookId');
    await queryInterface.removeColumn('books_author', 'bookId');
    await queryInterface.removeColumn('books_author', 'authorId');
    await queryInterface.removeColumn('books_genre', 'bookId');
    await queryInterface.removeColumn('books_genre', 'genreId');
  }
};
