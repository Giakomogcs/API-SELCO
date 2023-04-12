const {Router} = require("express")

const BercosController = require("../controllers/BercosController")

const bercosRoutes = Router()
const bercosController = new BercosController()

bercosRoutes.post("/", bercosController.create)
bercosRoutes.put("/:name", bercosController.update)
bercosRoutes.get("/:name", bercosController.index)
bercosRoutes.get("/", bercosController.show)
bercosRoutes.delete("/:name", bercosController.deleteOne)
bercosRoutes.delete("/", bercosController.deleteAll)

module.exports = bercosRoutes
