var express = require('express');
var router = express.Router();
const { connection } = require ('../database/conexion.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM paciente' , (error, results)=>{
    if (error){
      console.log("error en la consulta",error)
      res.status(500).send("error en la consulta")
    }else{
      res.render('pacientes', { title: 'tabla pacientes', pacientes: results, opcion:'disabled', estado: true});
    }
  })
  
});
router.get('/enviar/:clave', function (req, res, next) {
  const clave = req.params.clave;
  connection.query('SELECT * FROM paciente', (error, results) => {
      if (error) {
          console.log("Error en la consulta", error)
          res.status(500).send("Error en la consulta")
      } else {
          res.render('pacientes', { title: 'pacientes', claveSeleccionada: clave, pacientes: results, opcion: 'disabled', estado: false })
      }
  });
});

router.get('/agregar-paciente', function(req, res, next){
  const clave = req.params.clave;
  connection.query
  res.sendFile('registro-pacientes.html',{root: 'public'})
});
router.post('/agregar', (req, res) => {
  const cedula_paciente= req.body.cedula_paciente
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const edad = req.body.edad
  const telefono = req.body.telefono
  connection.query(`INSERT INTO paciente (cedula_paciente,nombre,apellido,edad,telefono_duenio) VALUES (${cedula_paciente},'${nombre}','${apellido}',${edad},'${telefono}');`, (error, results) => {
      if (error) {
          console.log("Error en la consulta", error)
          res.status(500).send("Error en la consulta")
      } else {
          res.redirect('/pacientes')
      }
  });

})
//eliminar pacientes
router.get('/eliminar/:cedula_paciente', function (req, res, next) {
  const cedula_paciente = req.params.cedula_paciente
  connection.query(`DELETE FROM cita_medica WHERE id_paciente=${cedula_paciente}`, (error, results) => {
      if (error) {
          console.log("Error en la consulta", error)
          res.status(500).send("Error en la consulta")
      } else {
          connection.query(`DELETE FROM paciente WHERE cedula_paciente=${cedula_paciente}`, (error, results) => {
              if (error) {
                  console.log("Error en la consulta", error)
                  res.status(500).send("Error en la consulta")
              } else {
                  res.redirect('/pacientes')
              }
          });
      }
  });
})
//funcion actuaizar pacientes
router.post('/actualizar/:cedula_paciente', (req, res) => {
  const cedula_paciente= req.body.cedula_paciente
  const nombre = req.body.nombre
  const apellido = req.body.apellido
  const edad = req.body.edad
  const telefono = req.body.telefono
  connection.query(`UPDATE paciente SET nombre='${nombre}', apellido='${apellido}', edad=${edad}, telefono_duenio=${telefono} WHERE cedula_paciente=${cedula_paciente}`, (error, result) => {
      if (error) {
          console.log("Ocurrio un error en la ejecución", error)
          res.status(500).send("Error en la consulta");
      } else {
          res.redirect('/pacientes');
      }
  });
})
module.exports = router;
        