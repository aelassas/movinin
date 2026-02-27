import express from 'express'
import multer from 'multer'
import routeNames from '../config/propertyRoutes.config'
import authJwt from '../middlewares/authJwt'
import * as propertyController from '../controllers/propertyController'

const routes = express.Router()

routes.route(routeNames.create).post(authJwt.verifyToken, authJwt.authAgency, propertyController.create)
routes.route(routeNames.update).put(authJwt.verifyToken, authJwt.authAgency, propertyController.update)
routes.route(routeNames.checkProperty).get(authJwt.verifyToken, authJwt.authAgency, propertyController.checkProperty)
routes.route(routeNames.delete).delete(authJwt.verifyToken, authJwt.authAgency, propertyController.deleteProperty)
routes.route(routeNames.uploadImage).post([authJwt.verifyToken, authJwt.authAgency, multer({ storage: multer.memoryStorage() }).single('image')], propertyController.uploadImage)
routes.route(routeNames.deleteImage).post(authJwt.verifyToken, authJwt.authAgency, propertyController.deleteImage)
routes.route(routeNames.deleteTempImage).post(authJwt.verifyToken, authJwt.authAgency, propertyController.deleteTempImage)
routes.route(routeNames.getProperty).get(propertyController.getProperty)
routes.route(routeNames.getProperties).post(authJwt.verifyToken, authJwt.authAgency, propertyController.getProperties)
routes.route(routeNames.getBookingProperties).post(authJwt.verifyToken, authJwt.authAgency, propertyController.getBookingProperties)
routes.route(routeNames.getFrontendProperties).post(propertyController.getFrontendProperties)

export default routes
