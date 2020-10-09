const mongoose = require('mongoose')

const esquema = mongoose.Schema({

    usuario: {type: mongoose.ObjectId, ref: 'Usuario', required: true},
    nomeProd: {type: String, required: true},
    categoria: { //Como o usuário só pode escolher uma categoria então foi tirado o []
        type: String,
        required: true,
        enum: ['Construção', 'Pintura', 'Acabamento']
    },
    modalidade: { //Como o usuário só pode escolher uma modalidade então foi tirado o []
        type: String,
        required: true,
        enum: ['Venda', 'Troca', 'Doação']
    },
    img: {type: String, required: true},
    descricao: {type: String, required: false},
    preco: { type: Number, required: false},
    qtde: {type: Number, required: false},
    unidadeMedida: {
        type: String,
        required: true,
        enum: ['un', 'lts', 'Kg', 'm', 'ml']
    }
   
})

/*
    Parâmetros de método mongoose.model()
    1º Nome do modelo (sempre igual ao nome do arquivo)
    2º Estrutura (esquema) do modelo
    3º Nome da coleção (collection) em que os objetos criados a partir do modelo serão armazenados no mongodb
*/

module.exports = mongoose.model('AnuncioProd', esquema, 'anuncioProds')