import { AsambleasView } from "./asambleas-view";

export default function AsambleasWrapper() {
  const asambleas = [
    {
      id: 1,
      nombre: "Asamblea General",
      estado: "activa",
      fecha: "2025-08-01",
      hora: "10:00 AM",
      lugar: "Auditorio Central",
      asistentes: 35,
      totalUsuarios: 50,
    },
    {
      id: 2,
      nombre: "Reunión de Comité",
      estado: "inactiva",
      fecha: "2025-08-05",
      hora: "3:00 PM",
      lugar: "Sala de reuniones 2",
      asistentes: 20,
      totalUsuarios: 40,
    },
  ];

  const handleSelect = (id) => {
    alert(`Seleccionaste asamblea con ID: ${id}`);
  };

  return <AsambleasView asambleas={asambleas} onSelectAsamblea={handleSelect} />;
}
