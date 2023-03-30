const mongoose = require('mongoose')

const MONGODB_DSN = 'mongodb://root:root@localhost:27017'

mongoose.connect(MONGODB_DSN)

// SequenceSchema modelo de coleções para salvar no banco
var SequenceSchema = new mongoose.Schema({
    letter: {
        type: [],
    },
    isValid: {
        type: Boolean,
    }
});

var Sequence = mongoose.model('Sequence', SequenceSchema);

// addBanco adiciona no banco de dados uma sequência
const addBanco = async (newSequence) => {
    const sequ = new Sequence({
        letter: newSequence.letter,
        isValid: newSequence.isValid
    })

    sequ.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })

}

// listaSequenceValid lista as sequências validas no banco
const listaSequenceValid = async () => {
    return Sequence.find({ isValid: true })
}

// listaSequenceInValid lista as sequências Invalidas no banco
const listaSequenceInValid = async () => {
    return Sequence.find({ isValid: false })
}

// listaSequenceBySequence busca no banco de dados através de uma sequência passada
const listaSequenceBySequence = async (letter) => {
    return Sequence.find({ letter })
}

module.exports = {
    addBanco,
    listaSequenceValid,
    listaSequenceInValid,
    listaSequenceBySequence
}

