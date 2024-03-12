import PDFDocument from 'pdfkit-table';

export const buildPdfPet = (dataCallback, endCallback, pet) => {
  const doc = new PDFDocument();

  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  // header
  doc.fontSize(20).text('CERTIFICADO', { align: 'center' });
  doc.moveDown();

  // subtitle
  doc.fontSize(15).text('Por medio del presente se certifica que:', {
    align: 'center',
  });
  doc.moveDown();

  // mascota name
  doc.fontSize(15).text(`${pet?.nombre_mascota?.toUpperCase()}`, {
    align: 'center',
    bold: true,
  });
  doc.moveDown();

  doc.fontSize(15).text(`Se implanto en: ${pet?.lugar_implantacion}`, {
    align: 'center',
  });
  doc
    .fontSize(15)
    .text(
      `El microchip con código: ${
        pet?.codigo_chip
      } fue implantado el: ${new Date(
        pet?.fecha_implantacion
      ).toLocaleDateString('es-ES')}`,
      {
        align: 'center',
      }
    );
  doc.moveDown();

  // body
  const tableArr1 = {
    headers: ['Responsable', 'Identificación', 'Dirección', 'Teléfono'],
    rows: [
      [
        pet?.Responsable?.user?.nombre,
        pet?.Responsable?.user?.identificacion,
        pet?.Responsable?.user?.direccion,
        pet?.Responsable?.user?.telefono,
      ],
    ],
  };

  const tableArr2 = {
    headers: ['Tutor', 'Identificación', 'Dirección', 'Teléfono'],
    rows: [
      [
        pet?.Tutor?.user?.nombre,
        pet?.Tutor?.user?.identificacion,
        pet?.Tutor?.user?.direccion,
        pet?.Tutor?.user?.telefono,
      ],
    ],
  };

  const tableArr3 = {
    headers: [
      'Nombre',
      'Código de chip',
      'Lugar de implantación',
      'Fecha de implantación',
    ],
    rows: [
      [
        pet?.nombre_mascota,
        pet?.codigo_chip,
        pet?.lugar_implantacion,
        new Date(pet?.fecha_implantacion).toLocaleDateString('es-ES'),
      ],
    ],
  };

  const tableArr4 = {
    headers: ['Especie', 'Raza', 'Pedigree', 'Sexo'],
    rows: [[pet?.especie, pet?.raza, pet?.pedigree ? 'Sí' : 'No', pet?.sexo]],
  };

  doc.table(tableArr1, {
    prepareHeader: () => doc.font('Helvetica'),
    prepareRow: () => doc.font('Helvetica').fontSize(12),
  });
  doc.moveDown();

  doc.table(tableArr2, {
    prepareHeader: () => doc.font('Helvetica'),
    prepareRow: () => doc.font('Helvetica').fontSize(12),
  });
  doc.moveDown();

  doc.table(tableArr3, {
    prepareHeader: () => doc.font('Helvetica'),
    prepareRow: () => doc.font('Helvetica').fontSize(12),
  });
  doc.moveDown();

  doc.table(tableArr4, {
    prepareHeader: () => doc.font('Helvetica'),
    prepareRow: () => doc.font('Helvetica').fontSize(12),
  });
  doc.moveDown();

  // end
  doc.end();
};
