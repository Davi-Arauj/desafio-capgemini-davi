// mongodb.test.js
const mongoose = require('mongoose')

const MONGODB_DSN = 'mongodb://root:root@172.24.0.3:27017'

test('Conexão com MongoDB', async () => {
  const promise = mongoose.connect(MONGODB_DSN)

  await expect(promise).resolves.toBeInstanceOf(mongoose.Mongoose)

  await mongoose.connection.close()
})

var SequenceSchema = new mongoose.Schema({
  letter: {
    type: [],
  },
  isValid: {
    type: Boolean,
  }
});

var Sequence = mongoose.model('Sequence', SequenceSchema);


test('Inserção no MongoDB', async () => {
  // Nós já vimos que a linha abaixo conecta ao DB
  await mongoose.connect(MONGODB_DSN)

  // Criamos uma sequencia nova
  const sequencia = new Sequence({
    letter: ["DUHBHB", "DUBUHD", "UBUUHU", "BHBUHH", " DDDDUB", "UDBDUH"]
  })

  await sequencia.save()

  // 'sequencia' agora deverá ter um campo '_id'
  expect(sequencia._id).toBeInstanceOf(mongoose.Types.ObjectId)
})
