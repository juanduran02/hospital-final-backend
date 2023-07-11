var express = require('express');
var router = express.Router();
const { connection } = require ('../database/conexion.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM cita_medica' , (error, results)=>{
    if (error){
      console.log("error en la consulta",error)
      res.status(500).send("error en la consulta")
    }else{
      res.render('citas', { title: 'tabla citas', citas: results});
    }
  })
});
router.get('/agregar-cita', function (req, res, next) {
  connection.query('SELECT cedula_paciente FROM paciente', (error, results) => {
      if (error) {
          console.log("Error en la consulta", error)
          res.status(500).send("Error en la consulta")
      } else {
          connection.query('SELECT especialidad FROM medicos', (error, results2) => {
              if (error) {
                  console.log("Error en la consulta", error)
                  res.status(500).send("Error en la consulta")
              } else {
                connection.query('SELECT nombres FROM medicos', (error, results3) => {
                  if (error) {
                      console.log("Error en la consulta", error)
                      res.status(500).send("Error en la consulta")
                  } else{
                
                  res.render('registro-citas', { tittle: 'registro', pacientes: results, medicos: results2, medicos:results3 })
                }
              });
              }
          });
      }
  });
});
router.post('/agregar', function(req, res, next){
  const cedula_paciente= req.body.cedula_cita;
  const nombre_medico=req.body.nombre_cita;
  const especialidad= req.body.especialidad_cita;
  const fecha= req.body.fecha;
  connection.query(`INSERT INTO cita_medica (id_paciente, id_medico, especialidad_cita, fecha) VALUES (${cedula_paciente},'${nombre_medico}', '${especialidad}', '${fecha}')`, (error, result) => {
    if (error) {
        console.log("Ocurrio un error en la ejecución", error)
        res.status(500).send("Error en la consulta");
    } else {
        res.redirect('/citas');
    }
});
})

module.exports = router;
