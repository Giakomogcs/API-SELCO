
const sqliteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError")

class BercosController {
  async create(request,response){
    const {name, machine, measure, measured} = request.body
    const database = await sqliteConnection()

    const checkNameExists = await database.get("SELECT * FROM bercos WHERE name = (?)", [name])

    if(!name){
      throw new AppError("name is required")
    }

    if(checkNameExists){
      throw new AppError("this name is already in use")
    }

    await database.run(
      'INSERT INTO bercos (name, machine, measure, measured) VALUES (?,?,?,?)', 
      [name, machine, measure, measured])

    return response.status(201).json({name, machine, measure, measured})
  }

  async update(request, response){
    const {machine, measure, measured} = request.body
    const {name} = request.params

    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM bercos WHERE name = (?)", [name])

    if(!user){
      throw new AppError("Berço not found")
    }

    user.machine = machine ?? user.machine
    user.measure = measure ?? user.measure
    user.measured = measured ?? user.measured


    await database.run(`
      UPDATE bercos SET
      machine = ?,
      measure = ?,
      measured = ?,
      updated_at = DATETIME('now')
      WHERE name = ?`,
      [user.machine, user.measure, user.measured, name]
    )

    return response.json("Update done successfully!")
  }

  async deleteOne(request,response) {
    const {name} = request.params
    const database = await sqliteConnection()

    if (name) {
      await database.run(
        `DELETE FROM bercos WHERE name = ${name}`)
    }

    return response.json("Successfully deleted berço")
  }


  async deleteAll(request,response) {
    const database = await sqliteConnection()
 
    await database.run(
      'DELETE FROM bercos')

    return response.json("Successfully deleted berço")
  }

  
  async index(request,response) {

    const {name} = request.params
    const database = await sqliteConnection()

    if(!name){
      throw new AppError("name is required")
    }

    else{

      const berco = await database.get("SELECT * FROM bercos WHERE name = (?)", [name])
  
      return response.json({
        berco
      })
      
    }
  }

  async show(request,response) {

    const database = await sqliteConnection()


      const berco = await database.all("SELECT * FROM bercos")
  
      return response.json({
        berco
      })
      
  }


}

module.exports = BercosController