// import modules
const { Sequelize, DataTypes } = require('sequelize');
// Database connection with dialect of postgres specifying the database we are using
// port for my database is 5433
// database name is discover
const sequelize = new Sequelize(
  process.env.postgresqlURL,
  { dialect: 'postgres' },
);

// checking if connection is done and sync db
sequelize.authenticate().then(async () => {
  await sequelize.sync({ force: true });
  console.log('Database connected to discover');
  console.log('All models were synchronized successfully.');
}).catch((err) => {
  console.log(err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// connecting to model
db.users = require('./userModel')(sequelize, DataTypes);
db.prototipos = require('./prototipoModel')(sequelize, DataTypes);
db.rubros = require('./rubroModel')(sequelize, DataTypes);
db.subRubros = require('./subRubroModel')(sequelize, DataTypes);
db.options = require('./optionModel')(sequelize, DataTypes);
db.rubrosExteriores = require('./rubroExteriorModel')(sequelize, DataTypes);
db.results = require('./resultModel')(sequelize, DataTypes);
db.images = require('./imageModel')(sequelize, DataTypes);
db.areasRepetibles = require('./areaRepetibleModel')(sequelize, DataTypes);

// relationships
// set Models:
const Prototipo = db.prototipos;
const Rubro = db.rubros;
const SubRubro = db.subRubros;
const Option = db.options;
const RubroExterior = db.rubrosExteriores;
const Result = db.results;
const Image = db.images;
const AreaRepetible = db.areasRepetibles;
// un prototipo tiene muchos rubros - un rubro pertenece a un prototipo
Prototipo.hasMany(Image);
Image.belongsTo(Prototipo);
// un prototipo tiene muchos rubros - un rubro pertenece a un prototipo
Prototipo.hasMany(Rubro);
Rubro.belongsTo(Prototipo);

// un rubro tiene muchos subRubros - un subRubro pertenece a un rubro
Rubro.hasMany(SubRubro);
SubRubro.belongsTo(Rubro);

// un subRubro tiene muchas options - una option tiene muchos subRubros
SubRubro.belongsToMany(Option, { through: 'optionSubRubros' });
Option.belongsToMany(SubRubro, { through: 'optionSubRubros' });

// un prototipo tiene muchos rubrosExteriores - un rubroExterior pertenece a un prototipo
Prototipo.hasMany(RubroExterior);
RubroExterior.belongsTo(Prototipo);

// un prototipo tiene muchos results - un result pertenece a un prototipo
Prototipo.hasMany(Result);
Result.belongsTo(Prototipo);
// un result tiene un rubroExterior - un rubroExterior pertenece a varios results
RubroExterior.hasMany(Result);
Result.belongsTo(RubroExterior);
// un result tiene muchas Rubros - un Rubro pertenece a varios results
Rubro.belongsToMany(Result, { through: 'resultRubros' });
Result.belongsToMany(Rubro, { through: 'resultRubros' });
// un result tiene muchas Rubros - un Rubro pertenece a varios results
SubRubro.belongsToMany(Result, { through: 'resultSubRubros' });
Result.belongsToMany(SubRubro, { through: 'resultSubRubros' });
// un result tiene muchas opts - una opt pertenece a varios results
Option.belongsToMany(Result, { through: 'optionResults' });
Result.belongsToMany(Option, { through: 'optionResults' });
// un prototipo tiene muchas areas repetibles - un area repetible pertenece a un prototipo
Prototipo.hasMany(AreaRepetible);
AreaRepetible.belongsTo(Prototipo);
// un areaRepetible tiene muchos subRubros - un subRubro pertenece a un areaRepetible
AreaRepetible.hasMany(SubRubro);
SubRubro.belongsTo(AreaRepetible);

// exporting the module
module.exports = db;
