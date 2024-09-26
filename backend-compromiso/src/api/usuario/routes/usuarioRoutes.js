const express = require('express');
const {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  olvidePassword,
  resetPassword,
  getUsuarios,
  getUsuarioById,
} = require('../controllers/usuarioController');

const router = express.Router();

// Rutas de usuario
router.post('/login', loginUsuario);
router.post('/olvide-password', olvidePassword);
router.post('/reset-password', resetPassword);
router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

module.exports = router;
