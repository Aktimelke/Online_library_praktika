'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Создание таблицы пользователей
    await queryInterface.createTable('users', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      email: {type: Sequelize.STRING, unique: true,},
      password: {type: Sequelize.STRING},
      role: {type: Sequelize.STRING, defaultValue: "USER"},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });

    // Создание таблицы книг
    await queryInterface.createTable('books', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      title: {type: Sequelize.STRING, unique: true,},
      description: {type: Sequelize.STRING},
      image: {type: Sequelize.STRING},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });

    // Создание таблицы избранных книг
    await queryInterface.createTable('favorites', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });

    // Создание таблицы авторов
    await queryInterface.createTable('authors', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      first_name: {type: Sequelize.STRING},
      last_name: {type: Sequelize.STRING},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });

    // Создание таблицы жанров
    await queryInterface.createTable('genres', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: {type: Sequelize.STRING},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });

    // Создание промежуточной таблицы между книгами и авторами
    await queryInterface.createTable('books_author', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });

    // Создание промежуточной таблицы между книгами и жанрами
    await queryInterface.createTable('books_genre', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      createdAt: {type: Sequelize.DATE, allowNull: false},
      updatedAt: {type: Sequelize.DATE, allowNull: false}
    });
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('books_genre');
    await queryInterface.dropTable('books_author');
    await queryInterface.dropTable('genres');
    await queryInterface.dropTable('authors');
    await queryInterface.dropTable('favorites');
    await queryInterface.dropTable('books');
    await queryInterface.dropTable('users');
  }
};
