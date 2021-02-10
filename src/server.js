/* CONFIGURAÇÃO DO SERVER */

const express = require("express"); //call express
const nunjucks = require("nunjucks"); // call template engine
const routes = require("./routes"); //call routes na raiz do projeto
const methodOverride = require("method-override");

const server = express();

server.use(express.urlencoded({ extended: true })); // faz funcionar o req.body
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(routes);

//CONFIGURAÇÃO DA VIEW ENGINE
server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(5000, () => {
  console.log("server is running");
});
