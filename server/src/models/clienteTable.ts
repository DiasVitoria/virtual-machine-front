import {  } from 'mysql2';
const Sequelize = require('sequelize');

const database = require('./connect')

 
const cliente = database.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//cliente.sync({ alter: true });

module.exports = cliente;