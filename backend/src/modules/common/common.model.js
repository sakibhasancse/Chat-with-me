Id.pre('save', function (next) {
  this._id = nid(17)
  next()
})