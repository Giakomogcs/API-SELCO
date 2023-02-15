
const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")

class BercosController {
 async create(request,responde){
    const {name, machine, measure, measured} = request.body
    const database = await sqliteConnection()

    const checkNameExists = await database.get("SELECT * FROM users WHERE name = (?)", [name])

    if(!name){
      throw new AppError("name is required")
    }

    if(checkNameExists){
      throw new AppError("this name is already in use")
    }

    await database.run(
      'INSERT INTO users (name, machine, measure, measured) VALUES (?,?,?,?)', 
      [name, machine, measure, measured])

    return response.status(201).json({name, machine, measure, measured})
 }
}

module.exports = BercosController