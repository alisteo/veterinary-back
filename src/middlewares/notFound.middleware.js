export default (_req, res) =>
  res.status(404).send({ status: 404, message: 'Recurso no encontrado' });
