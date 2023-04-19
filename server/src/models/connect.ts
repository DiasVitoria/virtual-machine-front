import { Sequelize } from 'sequelize'


 const connection = new Sequelize("virtualMachine", "fatec", "11", {
      host: '172.16.13.201',
      dialect: 'mysql',
      port: 3306
   })

connection.authenticate()
.then(function(){
    console.log("Conexão com banco de dados realizada com sucesso!");
}).catch(function(){
    console.log("Erro: Conexão com banco de dados");
})

module.exports = connection;