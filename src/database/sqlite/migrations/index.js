const sqliteConnection = require("../../sqlite")

const createBercos = require("./createBercos")

async function migrationsRun(){
  const schemas = [
    createBercos
  ].join('')

  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
}

module.exports = migrationsRun
