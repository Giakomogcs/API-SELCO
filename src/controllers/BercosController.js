
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
}

module.exports = BercosController