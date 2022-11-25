/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddFurnitureController } from '../factories/controllers/furniture/add-furniture/add-furniture-controller-factory'

export default (router: Router): void => {
  router.post('/add-furniture', adaptRoute(makeAddFurnitureController()))
}
