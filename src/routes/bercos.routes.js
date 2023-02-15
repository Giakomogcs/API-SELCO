const {Router} = require("express")

const BercosController = require("../controllers/BercosController")

const bercosRoutes = Router()
const bercosController = new BercosController()

bercosRoutes.post("/", bercosController.create)
//bercosRoutes.put("/:id", bercosController.update)
//bercosRoutes.delete("/:id", bercosController.delete)

module.exports = bercosRoutes
