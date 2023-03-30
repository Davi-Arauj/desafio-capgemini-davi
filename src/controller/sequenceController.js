const data = require('../database/data/data')

// create contém a lógica de negócio para validar sequência e adicionar a matriz no banco de dados
const create = async (req, res) => {

    // devemos validar se há sequência
    if (req.body.letters === "" || req.body.letters == []) {
        return res.status(400).json({
            message: 'matriz invalida'
        })
    }

    // devemos verificar se a sequência ja foi verificada
    const cont = await data.listaSequenceBySequence(req.body.letters)
    if (cont.length > 0 ){
        return res.status(400).json({
            message: 'matriz já verificada'
        })
    }

    // criando nova sequência
    const newSequence = ({
        letter: req.body.letters,
        isValid: false
    });

    var yMatriz = newSequence.letter.length
    var xMatriz = newSequence.letter[0].length
    var matriz = new Array(xMatriz)

    // removendo os espaços em branco e transformando as letras minusculas em maiusculas
    for (let index = 0; index < yMatriz; index++) {
        const elementTmp = newSequence.letter[index];
        const palavra = elementTmp.replace(" ", "").toUpperCase()
        newSequence.letter[index] = palavra;
    }

    yMatriz = newSequence.letter.length
    xMatriz = newSequence.letter[0].length

    // verificando o tamanho da matriz
    if (xMatriz < 4 || yMatriz < 4) {
        return res.status(400).json({
            message: 'matriz de tamanho invalida'
        })
    }

    if (xMatriz != yMatriz) {
        return res.status(400).json({
            message: 'A matriz deve ser NxN'
        })
    }

    // validando as letras da matriz
    for (let i = 0; i < yMatriz; i++) {
        matriz[i] = newSequence.letter[i].split("");

        for (let j = 0; j < matriz[i].length; j++) {
            const palavraTemp = matriz[i][j]

            if (palavraTemp != "B" && palavraTemp != "U" && palavraTemp != "D" && palavraTemp != "H") {
                return res.status(400).json({
                    message: 'Somente as letras B, U, D e H são permitidas'
                })
            }
        }
    }

    // buscamos a quantidade de sequência válidas
    // quando a matriz for válida a busca de parar

    var contSequence = 0
    contSequence += verifyHorizontalSequence(matriz)
    if (contSequence < 2) {
        contSequence += verifyVerticalSequence(matriz)
    }
    if (contSequence < 2) {
        contSequence += verifyDiagonalSequence(matriz)
    }
    if (contSequence < 2) {
        contSequence += verifySecondaryDiagonalSequence(matriz)
    } else {
        newSequence.isValid = true
    }

    //  passamos a sequência para camada de dados para ser inserida no banco
    await data.addBanco(newSequence)

    return res.status(200).json(newSequence)
};

// verifyHorizontalSequence busca sequências de letras iguais em uma matriz de forma horizontal
function verifyHorizontalSequence(matriz = []) {
    var aux = 3
    var sequenceFound = 0
    var valorTemp = String

    for (let i = 0; i < matriz.length; i++) {
        valorTemp = matriz[i][0]
        for (let j = 0; j < matriz.length; j++) {
            if ((matriz.length) - j < aux) {
                break;
            }

            if (matriz[i][j] === valorTemp) {
                aux--
                if (aux === 0) {
                    sequenceFound++
                    aux = 3
                }
            } else {
                valorTemp = matriz[i][j]
                aux = 3
            }
        }
    }

    return sequenceFound
}

// verifyVerticalSequence busca sequências de letras iguais em uma matriz de forma vertical
function verifyVerticalSequence(matriz = []) {
    var aux = 3
    var sequenceFound = 0
    var valorTemp = String

    for (let i = 0; i < matriz.length; i++) {
        valorTemp = matriz[0][i]
        for (let j = 0; j < matriz.length; j++) {
            if ((matriz.length) - j < aux) {
                break;
            }
            if (matriz[j][i] === valorTemp) {
                aux--
                if (aux === 0) {
                    sequenceFound++
                    aux = 3
                }
            } else {
                valorTemp = matriz[j][i]
                aux = 3
            }
        }
    }
    return sequenceFound
}

// verifyDiagonalSequence busca sequências de letras iguais em uma matriz de forma diagonal principal
function verifyDiagonalSequence(matriz = []) {
    var i = matriz.length - 1
    var j = 0
    var aux = 3
    var sequenceFound = 0

    for (var z = 2; z > 0; z++) {

        if ((j === matriz.length) && i === 0) {
            break
        }

        var iAux = i
        var jAux = j

        var valorTemp = matriz[i][j]

        while ((iAux + 1 < matriz.length) && (jAux + 1 < matriz.length)) {

            if (((matriz.length - iAux) < aux) || (matriz.length - jAux) < aux) {
                break;
            }
            if (valorTemp === matriz[iAux + 1][jAux + 1]) {
                aux--
                if (aux === 0) {
                    sequenceFound++
                    aux = 3
                }
            } else {
                valorTemp = matriz[iAux][jAux]
                aux = 3
            }

            iAux++;
            jAux++;
        }
        if (i > 0) {
            i--;
            j = 0;
            continue
        }
        j++
    }
    return sequenceFound
}

// verifySecondaryDiagonalSequence busca sequências de letras iguais em uma matriz de forma diagonal secundária
function verifySecondaryDiagonalSequence(matriz = []) {
    var i = matriz.length - 1
    var j = matriz.length - 1
    var aux = 3
    var sequenceFound = 0


    for (var z = 2; z > 0; z++) {
        if (j === 0 && i === 0) {
            break;
        }
        var iAux = i
        var jAux = j

        var valorTemp = matriz[i][j]

        while (iAux < matriz.length && jAux > 0) {
            if (((matriz.length - iAux) < aux) || (jAux < aux)) {
                break;
            }

            if ((iAux + 1 < matriz.length) && ((jAux - 1) >= 0)) {
                if (valorTemp === matriz[iAux + 1][jAux - 1]) {
                    aux--;
                    if (aux === 0) {
                        sequenceFound++;
                        aux = 3;
                    }
                } else {
                    valorTemp = matriz[iAux + 1][jAux - 1];
                    aux = 3;
                }
            }
            iAux++;
            jAux++;
        }
        if (i > 0) {
            i--;
            j = 5;
            continue;
        }
        j--;
    }
    return sequenceFound
}

// stats contém a lógica de negócio para buscar o status de sequências no banco de dados
const stats = async (_req, res) => {
    const newStats = ({
        count_valid: 0,
        count_invalid: 0,
        ratio: 0.0
    });

    const seq = await data.listaSequenceValid();
    newStats.count_valid = seq.length

    const seqF = await data.listaSequenceInValid();
    newStats.count_invalid = seqF.length

    newStats.ratio = (newStats.count_valid / (newStats.count_valid + newStats.count_invalid)).toFixed(2);

    return res.status(200).json(newStats);
}


module.exports = {
    create,
    stats
}