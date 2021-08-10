const User = require('../../models/user.model')

exports.create = personData => {
  const person = new User(personData)
  return person.save()
}

exports.findAll = () => User.find().populate()

exports.findOne = id => User.findById(id).populate()

exports.update = (id, updateData) => User.findByIdAndUpdate(id, updateData, {
  new: true,
  useFindAndModify: false
})

exports.delete = id => User.findByIdAndRemove(id)
