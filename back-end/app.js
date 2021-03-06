var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const db = require('./config/database')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
db(`mongodb+srv://${dbUser}:${dbPass}@cluster0.p8uzg.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`)

var app = express();

//habilita a chamada do back-end a partir de um servidor distinto
//é necessário instalar npm install cors --save
const cors = require('cors')
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const teste = require('./routes/teste')
app.use('/teste', teste)

const curso = require('./routes/curso')
app.use('/curso', curso)

const professor = require('./routes/professor')
app.use('/professor', professor)

const sala_aula = require('./routes/sala_aula')
app.use('/sala-aula', sala_aula)

const turma = require('./routes/turma')
app.use('/turma', turma)

const usuario = require('./routes/usuario')
app.use('/usuario', usuario)

const anuncioProd = require('./routes/anuncioProd')
app.use('/anuncioProd', anuncioProd)

const anuncioServ = require('./routes/anuncioServ')
app.use('/anuncioServ', anuncioServ)

const denuncia = require('./routes/denuncia')
app.use('/denuncia', denuncia)

const chat = require('./routes/chat')
app.use('/chat', chat)

module.exports = app;
