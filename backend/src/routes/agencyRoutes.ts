import express from 'express'
import routeNames from '../config/agencyRoutes.config'
import authJwt from '../middlewares/authJwt'
import * as agencyController from '../controllers/agencyController'

const routes = express.Router()

routes.route(routeNames.validate).post(authJwt.verifyToken, agencyController.validate)
routes.route(routeNames.update).put(authJwt.verifyToken, agencyController.update)
routes.route(routeNames.delete).delete(authJwt.verifyToken, agencyController.deleteAgency)
routes.route(routeNames.getAgency).get(authJwt.verifyToken, agencyController.getAgency)
routes.route(routeNames.getAgencies).get(authJwt.verifyToken, agencyController.getAgencies)
routes.route(routeNames.getAllAgencies).get(agencyController.getAllAgencies)

export default routes
