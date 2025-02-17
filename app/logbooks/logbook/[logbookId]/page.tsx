import { getLogbookById } from "@/actions/logbook";

export default async function LogbookPage({ params }: { params: { logbookId: string } }) {
  // Получаем данные логбука по ID
  const logbook = await getLogbookById(params.logbookId);

  if (!logbook) {
    return <p className="text-center text-red-500">Логбук не найден или доступ запрещён</p>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Логбук #{logbook.id}</h1>

      <div className="bg-white shadow-md rounded-lg p-4">
        <p><strong>Судно:</strong> {logbook.ship.name}</p>
        <p><strong>Дата:</strong> {new Date(logbook.date).toLocaleString()}</p>
        <p><strong>Местоположение:</strong> {logbook.location}</p>
        <p><strong>Тип операции:</strong> {logbook.operationType}</p>
        <p><strong>Описание:</strong> {logbook.eventDescription}</p>
        <p><strong>Погодные условия:</strong> {logbook.weatherConditions || "Нет данных"}</p>
        <p><strong>Состояние моря:</strong> {logbook.seaConditions || "Нет данных"}</p>
        <p><strong>Скорость:</strong> {logbook.speed ? `${logbook.speed} узлов` : "Нет данных"}</p>
        <p><strong>Потребление топлива:</strong> {logbook.fuelConsumption ? `${logbook.fuelConsumption} тонн` : "Нет данных"}</p>
        <p><strong>Количество экипажа:</strong> {logbook.crewCount || "Нет данных"}</p>
        <p><strong>Состояние двигателя:</strong> {logbook.engineStatus || "Нет данных"}</p>
        <p><strong>Ответственный:</strong> {logbook.responsible}</p>
        <p><strong>Примечания:</strong> {logbook.notes || "Нет данных"}</p>
      </div>
    </div>
  );
}
