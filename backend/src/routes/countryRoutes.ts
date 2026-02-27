import express from 'express'
import routeNames from '../config/countryRoutes.config'
import authJwt from '../middlewares/authJwt'
import * as countryController from '../controllers/countryController'

const routes = express.Router()

routes.route(routeNames.validate).post(authJwt.verifyToken, authJwt.authAgency, countryController.validate)
routes.route(routeNames.create).post(authJwt.verifyToken, authJwt.authAgency, countryController.create)
routes.route(routeNames.update).put(authJwt.verifyToken, authJwt.authAgency, countryController.update)
routes.route(routeNames.delete).delete(authJwt.verifyToken, authJwt.authAgency, countryController.deleteCountry)
routes.route(routeNames.getCountry).get(authJwt.verifyToken, authJwt.authAgency, countryController.getCountry)
routes.route(routeNames.getCountries).get(authJwt.verifyToken, authJwt.authAgency, countryController.getCountries)
routes.route(routeNames.getCountriesWithLocations).get(countryController.getCountriesWithLocations)
routes.route(routeNames.checkCountry).get(authJwt.verifyToken, authJwt.authAgency, countryController.checkCountry)
routes.route(routeNames.getCountryId).get(authJwt.verifyToken, authJwt.authAgency, countryController.getCountryId)

export default routes
