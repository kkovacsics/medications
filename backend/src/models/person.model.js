const mongoose = require('mongoose')

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps

// hogyan tároljuk az adatbázisban egy személy adatait
const PersonSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    posts: [ // egy személynek több post-ja is lehet
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
  }, {
    timestamps: true // a mongoDB időbélyegeket hoz létre, amiben tárolja, mikor hoztuk létre, mikor módosítottuk a dokumentumokat
  }
)

module.exports = mongoose.model('Person', PersonSchema) // Person model, ami a PersonSchema-n alapul
