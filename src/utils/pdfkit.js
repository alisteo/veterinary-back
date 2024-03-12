import PDFDocument from 'pdfkit-table';

export const buildPdfPet = (dataCallback, endCallback, pet) => {
  const doc = new PDFDocument();

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // body
  const tableArrayPet = {
    headers: [
      'Responsable',
      'Tutor',
      'Nombre mascota',
      'Especie',
      'Raza',
      'Código chip',
    ],
    rows: [
      [
        pet.Responsable.user.nombre,
        pet.Tutor.user.nombre,

        pet.nombre_mascota,
        pet.especie,
        pet.raza,
        pet.codigo_chip,
      ],
    ],
  };

  doc.table(tableArrayPet, {
    // prepareRow: (row, i) => doc.font('Helvetica').fontSize(12),
  });

  // end
  doc.end();
};
