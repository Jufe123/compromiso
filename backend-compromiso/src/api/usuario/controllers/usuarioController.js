// @ts-nocheck
require('dotenv').config();
const Usuario = require('../models/usuarioModel');
const logger = require('../../../../config/logger.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const SECRET_KEY = process.env.SECRET_KEY;
const saltRounds = 10;

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Función para validar los datos del usuario
const validarDatosUsuario = (data) => {
  const { Nom_Usuario, Ape_Usuario, Cod_Usuario, Cor_Usuario, Fec_Usuario, estado, rol, password } = data;

  if (!Nom_Usuario || !Ape_Usuario || !Cod_Usuario || !Cor_Usuario || !Fec_Usuario || !estado || !rol || !password) {
    return { error: 'Todos los campos son obligatorios.' };
  }

  const nombreRegex = /^[A-Za-z\s]+$/;
  if (!nombreRegex.test(Nom_Usuario)) {
    return { error: 'El nombre solo puede contener letras.' };
  }
  if (!nombreRegex.test(Ape_Usuario)) {
    return { error: 'El apellido solo puede contener letras.' };
  }

  const codigoRegex = /^[0-9]+$/;
  if (!codigoRegex.test(Cod_Usuario)) {
    return { error: 'El código del usuario solo puede contener números.' };
  }

  const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!correoRegex.test(Cor_Usuario)) {
    return { error: 'El correo electrónico no es válido.' };
  }

  if (estado !== 'Sí' && estado !== 'No') {
    return { error: 'El estado debe ser "Sí" o "No".' };
  }

  if (rol !== 'Administrador') {
    return { error: 'El rol debe ser "Administrador".' };
  }

  return null;
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { Nom_Usuario, Ape_Usuario, Cod_Usuario, Cor_Usuario, Fec_Usuario, estado, rol, password } = req.body;

  const validacionError = validarDatosUsuario(req.body);
  if (validacionError) {
    return res.status(400).json(validacionError);
  }

  try {
    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Generar el token
    const token = jwt.sign({ Cod_Usuario }, SECRET_KEY, { expiresIn: '1h' });

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({
      Nom_Usuario,
      Ape_Usuario,
      Cod_Usuario,
      Cor_Usuario,
      Fec_Usuario,
      estado,
      rol,
      token,
      password: hashedPassword,
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
};

// Actualizar un usuario existente
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { Nom_Usuario, Ape_Usuario, Cod_Usuario, Cor_Usuario, Fec_Usuario, estado, rol, password } = req.body;

  const validacionError = validarDatosUsuario(req.body);
  if (validacionError) {
    return res.status(400).json(validacionError);
  }

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar y actualizar los campos
    usuario.Nom_Usuario = Nom_Usuario;
    usuario.Ape_Usuario = Ape_Usuario;
    usuario.Cod_Usuario = Cod_Usuario;
    usuario.Cor_Usuario = Cor_Usuario;
    usuario.Fec_Usuario = Fec_Usuario;
    usuario.estado = estado;
    usuario.rol = rol;

    // Actualizar la contraseña si se proporciona
    if (password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      usuario.password = hashedPassword;
    }

    await usuario.save();
    res.json(usuario);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    await usuario.destroy();
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
};

// Iniciar sesión
const loginUsuario = async (req, res) => {
  const { Cod_Usuario, password } = req.body;

  if (!Cod_Usuario || !password) {
    return res.status(400).json({ error: 'El código de usuario y la contraseña son obligatorios.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { Cod_Usuario } });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña
    const contrasenaValida = await bcrypt.compare(password, usuario.password);
    if (!contrasenaValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign({ id: usuario.id, Cod_Usuario: usuario.Cod_Usuario }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};

// Manejar la solicitud de olvido de contraseña
const olvidePassword = async (req, res) => {
  const { Cor_Usuario } = req.body;

  if (!Cor_Usuario) {
    return res.status(400).json({ error: 'El correo electrónico es obligatorio.' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { Cor_Usuario } });
    if (!usuario) {
      return res.status(404).json({ error: 'Correo electrónico no encontrado.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    usuario.resetPasswordToken = resetToken;
    usuario.resetPasswordExpires = Date.now() + 3600000; // 1 hora
    await usuario.save();

    const mailOptions = {
      to: Cor_Usuario,
      from: process.env.EMAIL_USER,
      subject: 'Restablecimiento de contraseña',
      text: `Recibimos una solicitud de restablecimiento de contraseña. Haga clic en el siguiente enlace para restablecer su contraseña: \n\n http://${req.headers.host}/reset/${resetToken} \n\n Si no solicitó este cambio, ignore este correo.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Correo de restablecimiento de contraseña enviado.' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al enviar el correo de restablecimiento de contraseña.' });
  }
};

// Restablecer la contraseña
const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'El token y la nueva contraseña son obligatorios.' });
  }

  try {
    const usuario = await Usuario.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!usuario) {
      return res.status(400).json({ error: 'Token inválido o expirado.' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    usuario.password = hashedPassword;
    usuario.resetPasswordToken = null;
    usuario.resetPasswordExpires = null;
    await usuario.save();

    res.json({ message: 'Contraseña restablecida correctamente.' });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: 'Error al restablecer la contraseña.' });
  }
};

// Exportar las funciones del controlador
module.exports = {
  crearUsuario,
  getUsuarios,
  getUsuarioById,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  olvidePassword,
  resetPassword,
};
