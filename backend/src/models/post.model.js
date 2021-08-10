const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator') // ellenőrzi, hogy a mongoDB is megfelelő-e

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // mongoDB ObjectId
      ref: 'Person', // a Person kollekció dokumentumára mutat az id
      required: true
    }
  }, {
    timestamps: true // a mongoDB időbélyegeket hoz létre, amiben tárolja, mikor hoztuk létre, mikor módosítottuk a dokumentumokat
  }
)

PostSchema.plugin(idValidator) // ellenőrzi, hogy az id jó mongoDB objectId-e

module.exports = mongoose.model('Post', PostSchema) // Post model, ami a PostSchema-n alapul
