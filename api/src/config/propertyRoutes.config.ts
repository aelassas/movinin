export default {
  create: '/api/create-property',
  update: '/api/update-property',
  delete: '/api/delete-property/:id',
  uploadImage: '/api/upload-image',
  deleteTempImage: '/api/delete-temp-image/:fileName',
  deleteImage: '/api/delete-image/:property/:image',
  getProperty: '/api/property/:id/:language',
  getProperties: '/api/properties/:page/:size',
  getBookingyProperties: '/api/booking-properties/:page/:size',
  getFrontendProperties: '/api/frontend-properties/:page/:size',
  checkProperty: '/api/check-property/:id',
}
