const UseRouter = require('./UserRoutes')
const ProductRouter = require('./ProductRoutes')
const OrderRouter = require('./OrderRoutes')
const routes = (app) => {
  app.use('/api/user', UseRouter)
  app.use('/api/product', ProductRouter)
  app.use('/api/order', OrderRouter)
}
module.exports = routes