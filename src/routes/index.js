const {Router} = require("express")

const bercosRouter = require("./bercos.routes")

const routes = Router()

routes.use("/bercos", bercosRouter)

module.exports = routes