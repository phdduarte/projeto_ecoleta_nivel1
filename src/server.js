const express = require("express")
const cors = require("cors")
const server = express()

server.use(cors());
//pegar o banco de dados
const db = require("./database/db")

//configurar pasta pública
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended:true}))

//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,  
    noCache: true
})

//configurar caminhos para a minha aplicação
//req é requisição , res é a resposta
server.get("/",(req,res) => {  //get é um verbo http // o / via get vai responder uma aplicação
  return res.render("index.html",{title:"Um titulo"})
})

server.get("/create-point",(req,res) => {  
    return res.render("create-point.html")
})

server.post("/savepoint",(req,res)=>{
  
  //req.body = corpo do forumulário
  //console.log(req.body)

  //inserir dados no banco de dados
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
    req.body.image,
    req.body.name,
    req.body.adress,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items
  ]
  function afterInsertData(err){
    if(err){
      console.log(err)
      return res.send("Erro no cadastro!")
    }
    console.log("Cadastrado com sucesso")
    console.log(this)
    
    return res.render("create-point.html",{saved: true })
  }
  db.run(query,values,afterInsertData)
})

server.get("/search-results",(req,res) => {  

  const search = req.query.search

  if(search ==""){
    //pesquisa vazi
    return res.render("search-results.html",{ total: 0}) 
  }

  //pegar os dados do banco de dados
  db.all(`SELECT  *  FROM places WHERE city LIKE '%${search}%'`,function(err,rows){ //*Significa tudo 
    if(err){
        return console.log(err)
    }
    
    const total = rows.length

    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html",{places: rows, total: total})
  })
   
  
})
  
//ligar o servidor 
server.listen(3000) 

