const UseRouter = require('./UserRoutes')
const ProductRouter = require('./ProductRoutes')
const OrderRouter = require('./OrderRoutes')
const PayMentRouter = require('./PaymentRoutes')
const ChatBotRouter = require('./ChatbotRoutes')
const routes = (app) => {
  app.use('/api/user', UseRouter)
  app.use('/api/product', ProductRouter)
  app.use('/api/order', OrderRouter)
  app.use('/api/payment', PayMentRouter)
  app.use('/api/chatbot', ChatBotRouter)
}
module.exports = routes