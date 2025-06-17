import express from 'express'
import multer from 'multer'
import routeNames from '../config/propertyRoutes.config'
import authJwt from '../middlewares/authJwt'
import * as propertyController from '../controllers/propertyController'

const routes = express.Router()

routes.route(routeNames.create).post(authJwt.verifyToken, propertyController.create)
routes.route(routeNames.update).put(authJwt.verifyToken, propertyController.update)
routes.route(routeNames.checkProperty).get(authJwt.verifyToken, propertyController.checkProperty)
routes.route(routeNames.delete).delete(authJwt.verifyToken, propertyController.deleteProperty)
routes.route(routeNames.uploadImage).post([authJwt.verifyToken, multer({ storage: multer.memoryStorage() }).single('image')], propertyController.uploadImage)
routes.route(routeNames.deleteImage).post(authJwt.verifyToken, propertyController.deleteImage)
routes.route(routeNames.deleteTempImage).post(authJwt.verifyToken, propertyController.deleteTempImage)
routes.route(routeNames.getProperty).get(propertyController.getProperty)
routes.route(routeNames.getProperties).post(authJwt.verifyToken, propertyController.getProperties)
routes.route(routeNames.getBookingProperties).post(authJwt.verifyToken, propertyController.getBookingProperties)
routes.route(routeNames.getFrontendProperties).post(propertyController.getFrontendProperties)

export default routes
