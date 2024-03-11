export function errorHandler(err, req, res, next) {
  req.logger.error(err.message)
  next(err)
  console.error(err.stack);

    // Manejo de errores específicos
    if (err.status === 400) {
        return res.status(400).send('Solicitud incorrecta');
    }

    if (err.status === 401) {
        return res.status(401).send('No autorizado');
    }

    if (err.status === 404) {
        return res.status(404).send('Recurso no encontrado');
    }

    if (err.status === 403) {
        return res.status(403).send('Acceso denegado');
    }

    if (err.status === 422) {
        return res.status(422).send('Entidad no procesable');
    }

    if (err.status === 500) {
        return res.status(500).send('Error interno del servidor');
    }

    // Manejo de errores generales
    res.status(500).send('Algo salió mal en el servidor');
}


