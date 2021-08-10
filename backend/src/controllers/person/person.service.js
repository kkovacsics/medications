const Person = require('../../models/person.model')

// mindössze az adatbázis CRUD-műveleteket tartalmazza

exports.create = personData => {
  const person = new Person(personData)
  return person.save()
}

exports.findAll = () => Person.find().populate('posts') // a posts "mező" alapját rendeli hozzá a Post-okat

exports.findOne = id => Person.findById(id).populate('posts')

exports.update = (id, updateData) => Person.findByIdAndUpdate(id, updateData, {
  new: true, // a módosítás utáni állapotot adja vissza
  useFindAndModify: false
})

exports.delete = id => Person.findByIdAndRemove(id)
