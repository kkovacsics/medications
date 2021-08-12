const Entity = require('../../models/stock')

exports.create = entityData => {
  const entity = new Entity(entityData)
  return entity.save()
}

exports.findAll = () => Entity.find().populate('residentId').populate('medicineId')

exports.findOne = id => Entity.findById(id).populate('residentId').populate('medicineId')

exports.update = (id, updateData) => Entity.findByIdAndUpdate(id, updateData, {
  new: true,
  useFindAndModify: false
})

exports.delete = id => Entity.findByIdAndRemove(id)
