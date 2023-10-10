const xlsx = require('xlsx');
const fs = require('fs');
const { promisify } = require('util');

const db = require('../models');

const getOptions = (subRubroName, excelOptions) => {
  let returnOptions = [];
  excelOptions.forEach((o) => {
    if (o['Sub Rubro'] === subRubroName) {
      returnOptions = [
        ...returnOptions,
        {
          name: o.Nombre,
          costo: o.Costo,
          moneda: o.Moneda,
          medidaUnidad: o['Medida por unidad'],
        },
      ];
    }
  });
  return returnOptions;
};

const parseExcel = async (req, res) => {
  try {
    const unlinkAsync = promisify(fs.unlink);
    const Prototipo = db.prototipos;
    const Rubro = db.rubros;
    const SubRubro = db.subRubros;
    const Option = db.options;
    const RubroExterior = db.rubrosExteriores;
    // const AreaRepetible = db.areasRepetibles;
    // The req.file will contain your file data
    // The req.body will contain your text data
    // console.log(req.file, req.body.name);

    const { path } = req.file;
    const workbook = xlsx.readFile(path);
    const workbookSheet = workbook.SheetNames;

    /* ************************************************************************************ */
    // Crear prototipo
    const excelGeneral = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbookSheet[0]],
    );
    const prototipo = await Prototipo.create({
      name: excelGeneral.find((e) => e.Campo === 'Nombre').Datos,
      proyectoDe: excelGeneral.find((e) => e.Campo === 'Proyecto de').Datos,
      shortDesc: excelGeneral.find((e) => e.Campo === 'Descripción corta').Datos,
      m2: excelGeneral.find((e) => e.Campo === 'm2').Datos,
      m2Interiores: excelGeneral.find((e) => e.Campo === 'm2 interiores').Datos,
      m2Exteriores: excelGeneral.find((e) => e.Campo === 'm2 exteriores').Datos,
      dormitorios: excelGeneral.find((e) => e.Campo === 'Dormitorios').Datos,
      banos: excelGeneral.find((e) => e.Campo === 'Baños').Datos,
      usdEstandar: excelGeneral.find((e) => e.Campo === 'USD Estándar').Datos,
      plazoEstandar: excelGeneral.find((e) => e.Campo === 'Plazo Estándar').Datos,
      usdMovimientoTierrasEstandar: excelGeneral.find((e) => e.Campo === 'USD Movimiento de Tierras Estándar').Datos,
      usdImpuestosEstandar: excelGeneral.find((e) => e.Campo === 'USD Impuestos Estándar').Datos,
      usdConstruccion: excelGeneral.find((e) => e.Campo === 'USD Construccion Estándar').Datos,
      description: excelGeneral.find((e) => e.Campo === 'Descripción del prototipo').Datos,
      imgText: excelGeneral.find((e) => e.Campo === 'Texto de imagen').Datos,
    });
    /* ************************************************************************************ */
    // Crear rubros y subRubros y opciones
    const excelAreasGenerales = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbookSheet[1]],
    );
    const excelOptions = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbookSheet[3]],
    );
    let rubrosNuevos = [];
    const rubrosCreados = [];
    excelAreasGenerales.forEach((rubro) => {
      const subRubro = rubrosNuevos.find((r) => r.rubro === rubro.Rubro);
      if (subRubro) {
        subRubro.subRubros = [
          ...subRubro.subRubros,
          {
            name: rubro['Sub rubro'],
            visible: rubro['Sí/No'] === 'TRUE',
            coleccion: rubro['Colección de terminaciones'],
            options: getOptions(rubro['Sub rubro'], excelOptions),
            cantidad: rubro.Cantidad,
          },
        ];
      } else {
        const newSubRubro = {
          rubro: rubro.Rubro,
          visible: rubro.Visible === 'TRUE',
          subRubros: [{
            name: rubro['Sub rubro'],
            visible: rubro['Sí/No'] === 'TRUE',
            coleccion: rubro['Colección de terminaciones'],
            options: getOptions(rubro['Sub rubro'], excelOptions),
            cantidad: rubro.Cantidad,
          }],
        };
        rubrosNuevos = [...rubrosNuevos, newSubRubro];
      }
    });
    rubrosNuevos.forEach(async (rubro) => {
      const newRubro = {
        name: rubro.rubro,
        visible: rubro.visible,
        subRubros: rubro.subRubros,
        prototipoId: prototipo.id,
      };
      console.log('newRubro: ', newRubro);
      rubrosCreados.push(await Rubro.create(newRubro, {
        include: [
          { model: SubRubro, include: [Option] },
        ],
      }));
    });
    /* ************************************************************************************ */
    // Crear rubros exteriores
    const excelRubrosExteriores = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbookSheet[2]],
    );
    const rubrosExteriores = excelRubrosExteriores.map((r) => ({
      name: r.Nombre,
      description: r['Descripción'],
      cost: r.Costo,
      prototipoId: prototipo.id,
    }));
    rubrosExteriores.forEach((r) => {
      RubroExterior.create((r));
    });
    /* ************************************************************************************ */
    // Crear areas repetibles
    /* const excelAreasRepetibles = xlsx.utils.sheet_to_json(
      workbook.Sheets[workbookSheet[4]],
    );
    console.log('excelAreasRepetibles: ', excelAreasRepetibles);
    console.log('rubrosCreados: ', rubrosCreados);
    excelAreasRepetibles.forEach((areaRepetibleExcel) => {
      const rubro = rubrosCreados.find((r) => r.name === areaRepetibleExcel.Rubro);
      if (rubro) {
        subRubro = rubro.subRubros.find((sr) => sr.name === areaRepetibleExcel['Sub rubro']);
        if (subRubro) {
          AreaRepetible.create({
            prototipoId: prototipo.id,

          })
        }
      }
    }); */
    /* ************************************************************************************ */

    // Delete the file like normal
    await unlinkAsync(req.file.path);
    return res.status(200).send({
      message: 'Rubro, rubrosExteriores, subRubros y opciones creados.',
    });
  } catch (error) {
    return res.status(404);
  }
};

module.exports = {
  parseExcel,
};
