import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ["query"] });

async function main() {
  const serviciosGenerales = await prisma.serviciosGeneral.createMany({
    data: [
      { NombreServicio: 'Finanzas' },
      { NombreServicio: 'Informática' },
      { NombreServicio: 'Consultoría' }
    ]
  });

  const serviciosGeneralesIds = await prisma.serviciosGeneral.findMany();

  await prisma.serviciosEspecificos.createMany({
    data: [
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Asesoría Financiera', CostoServicioEspecifico: 500 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Planificación Financiera', CostoServicioEspecifico: 700 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Análisis de Inversiones', CostoServicioEspecifico: 800 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Gestión de Riesgos', CostoServicioEspecifico: 600 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Auditoría Financiera', CostoServicioEspecifico: 1000 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Contabilidad', CostoServicioEspecifico: 400 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Impuestos', CostoServicioEspecifico: 450 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Gestión de Tesorería', CostoServicioEspecifico: 550 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Control de Presupuestos', CostoServicioEspecifico: 650 },
      { IdServicio: serviciosGeneralesIds[0].IdServicio, NombreServicioEspecifico: 'Análisis Financiero', CostoServicioEspecifico: 750 },

      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Desarrollo Web', CostoServicioEspecifico: 1200 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Desarrollo Móvil', CostoServicioEspecifico: 1500 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Soporte Técnico', CostoServicioEspecifico: 400 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Seguridad Informática', CostoServicioEspecifico: 900 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Administración de Redes', CostoServicioEspecifico: 800 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Base de Datos', CostoServicioEspecifico: 700 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Desarrollo de Software', CostoServicioEspecifico: 1600 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Mantenimiento de Sistemas', CostoServicioEspecifico: 500 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Análisis de Sistemas', CostoServicioEspecifico: 600 },
      { IdServicio: serviciosGeneralesIds[1].IdServicio, NombreServicioEspecifico: 'Consultoría IT', CostoServicioEspecifico: 1300 },

      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría Empresarial', CostoServicioEspecifico: 1000 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría de Recursos Humanos', CostoServicioEspecifico: 800 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría Estratégica', CostoServicioEspecifico: 1200 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría de Marketing', CostoServicioEspecifico: 1100 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría Legal', CostoServicioEspecifico: 900 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría Ambiental', CostoServicioEspecifico: 700 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría de Calidad', CostoServicioEspecifico: 950 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría en Salud y Seguridad', CostoServicioEspecifico: 850 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría Tecnológica', CostoServicioEspecifico: 1300 },
      { IdServicio: serviciosGeneralesIds[2].IdServicio, NombreServicioEspecifico: 'Consultoría de Innovación', CostoServicioEspecifico: 1400 }
    ]
  });

  const serviciosEspecificosIds = await prisma.serviciosEspecificos.findMany();

  const usuarios = await prisma.usuario.createMany({
    data: [
      { NombreUsuario: 'john_doe', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'john.doe@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'jane_smith', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'jane.smith@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'miguel_gomez', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'miguel.gomez@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'lisa_rey', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'lisa.rey@example.com', Rol:"Nivel0", Token:'-' },
      { NombreUsuario: 'pablo_martinez', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'pablo.martinez@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'maria_garcia', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'maria.garcia@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'roberto_lopez', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'roberto.lopez@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'ana_ramirez', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'ana.ramirez@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'carlos_vega', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'carlos.vega@example.com', Rol:'Nivel0', Token:'-' },
      { NombreUsuario: 'laura_rivera', Contrasenna: '$2b$10$NTkgRw6yJk7h/fd5DC2DyuUXM5xbjmouqMymUrL6O4B3eEsarpPga', Email: 'laura.rivera@example.com', Rol:'Nivel0', Token:'-' }
    ]
  });

  const usuariosIds = await prisma.usuario.findMany();

  await prisma.historialSistema.createMany({
    data: [
      { NombreModelo: 'Cita', DescripcionAccion: 'Creó una nueva cita', IdUsuario: usuariosIds[0].IdUsuario },
      { NombreModelo: 'Usuario', DescripcionAccion: 'Actualizó la información del usuario', IdUsuario: usuariosIds[1].IdUsuario },
      { NombreModelo: 'Cita', DescripcionAccion: 'Canceló una cita', IdUsuario: usuariosIds[2].IdUsuario },
      { NombreModelo: 'Usuario', DescripcionAccion: 'Registró un nuevo usuario', IdUsuario: usuariosIds[3].IdUsuario },
      { NombreModelo: 'Cita', DescripcionAccion: 'Reprogramó una cita', IdUsuario: usuariosIds[4].IdUsuario },
      { NombreModelo: 'Usuario', DescripcionAccion: 'Eliminó un usuario', IdUsuario: usuariosIds[5].IdUsuario },
      { NombreModelo: 'Cita', DescripcionAccion: 'Confirmó una cita', IdUsuario: usuariosIds[6].IdUsuario },
      { NombreModelo: 'Usuario', DescripcionAccion: 'Restableció la contraseña del usuario', IdUsuario: usuariosIds[7].IdUsuario },
      { NombreModelo: 'Cita', DescripcionAccion: 'Modificó los detalles de una cita', IdUsuario: usuariosIds[8].IdUsuario },
      { NombreModelo: 'Usuario', DescripcionAccion: 'Cambió el rol del usuario', IdUsuario: usuariosIds[9].IdUsuario }
    ]
  });

  const solicitantes = await prisma.solicitante.createMany({
    data: [
      { Nombre_Solicitante: 'Juan Perez', Email: 'juan.perez@example.com', Contrasenna: '123456' },
      { Nombre_Solicitante: 'Maria Garcia', Email: 'maria.garcia@example.com', Contrasenna: '123456' },
      { Nombre_Solicitante: 'Ana Lopez', Email: 'ana.lopez@example.com', Contrasenna: '123456' },
      { Nombre_Solicitante: 'Carlos Ruiz', Email: 'carlos.ruiz@example.com', Contrasenna: '123456' },
      { Nombre_Solicitante: 'Pedro Martinez', Email: 'pedro.martinez@example.com', Contrasenna: '123456' }
    ]
  });

  const solicitantesIds = await prisma.solicitante.findMany();

  await prisma.cita.createMany({
    data: [
      { FechaCita: new Date('2024-06-01T10:00:00Z'), Nombre_Cliente: 'Carlos', Apellido_Cliente: 'Perez', Correo_Cliente: 'carlos.perez@example.com', IdServicioEspecifico: serviciosEspecificosIds[0].IdServicioEspecifico, IdSolicitante: solicitantesIds[0].IdSolicitante },
      { FechaCita: new Date('2024-06-02T11:00:00Z'), Nombre_Cliente: 'Ana', Apellido_Cliente: 'Lopez', Correo_Cliente: 'ana.lopez@example.com', IdServicioEspecifico: serviciosEspecificosIds[1].IdServicioEspecifico, IdSolicitante: solicitantesIds[1].IdSolicitante },
      { FechaCita: new Date('2024-06-03T12:00:00Z'), Nombre_Cliente: 'Luis', Apellido_Cliente: 'Garcia', Correo_Cliente: 'luis.garcia@example.com', IdServicioEspecifico: serviciosEspecificosIds[2].IdServicioEspecifico, IdSolicitante: solicitantesIds[2].IdSolicitante },
      { FechaCita: new Date('2024-06-04T13:00:00Z'), Nombre_Cliente: 'Maria', Apellido_Cliente: 'Fernandez', Correo_Cliente: 'maria.fernandez@example.com', IdServicioEspecifico: serviciosEspecificosIds[3].IdServicioEspecifico, IdSolicitante: solicitantesIds[3].IdSolicitante },
      { FechaCita: new Date('2024-06-05T14:00:00Z'), Nombre_Cliente: 'Jose', Apellido_Cliente: 'Martinez', Correo_Cliente: 'jose.martinez@example.com', IdServicioEspecifico: serviciosEspecificosIds[4].IdServicioEspecifico, IdSolicitante: solicitantesIds[4].IdSolicitante }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
