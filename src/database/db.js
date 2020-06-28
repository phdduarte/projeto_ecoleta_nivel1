//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports =db
//utilizar o objeto de banco de dados para nossas operações
/*
db.serialize( ()=>{
    //Com comandos SQL
    //criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //inserir dados na tabela
   const query =`
   INSERT INTO places(
       image,
       name,
       adress,
       adress2,
       state,
       city,
       items
   ) VALUES(?,?,?,?,?,?,?); `   
   const values =[
    "https://images.unsplash.com/photo-1580706483913-b6ea7db483a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=637&q=80",
    "Colectoria",
    "Guilherme Gemballa, jardim america",
    "Numero 160",
    "Santa catarina",
    "Rio do Sul",
    "Residuos eletrônicos e lampadas"
 ]

    function afterIInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
 
 
    //db.run(query,values,afterIInsertData)   

    //consultar os dados da tabel
    db.all(`SELECT  *  FROM places`,function(err,rows){ //*Significa tudo 
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão os seus registros:")
        console.log(rows)
    })

    //deletar um dado da tabela

    db.run(`DELETE FROM places WHERE id=?`,[1],function(err){
        if(err){
            return console.log(err)
        }
        console.log("Reigistro Deletado com Sucesso!")
    })
})
*/