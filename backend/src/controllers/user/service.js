const Entity = require('../../models/user')

exports.create = entityData => {
  const entity = new Entity(entityData)
  return entity.save()
}

exports.findAll = () => Entity.find()

exports.findOne = id => Entity.findById(id)

exports.update = (id, updateData) => Entity.findByIdAndUpdate(id, updateData, {
  new: true,
  useFindAndModify: false
})

exports.delete = id => Entity.findByIdAndRemove(id)
