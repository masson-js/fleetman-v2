"use server";
import { PrismaClient } from "@prisma/client";

export const creatFuelRecord = async (
  prevState: { error?: string },
  formData: FormData
) => {
  const prisma = new PrismaClient();

  // Получаем значения из формы
  const shipName = formData.get("shipName") as string;
  const fuelType = formData.get("fuelType") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const price = parseFloat(formData.get("price") as string);
  const totalCost = parseFloat(formData.get("totalCost") as string); // можно вычислить или оставить как есть

  try {
    // Находим корабль по имени
    const ship = await prisma.ship.findFirst({
      where: { name: shipName },
    });

    if (!ship) {
      return { success: false, error: "Ship not found" };
    }

    // Создаем запись о топливе для указанного корабля
    const fuelRecord = await prisma.shipFuel.create({
      data: {
        shipId: ship.id, // Связываем запись с кораблем
        fuelType, // Тип топлива
        amount, // Количество топлива
        price, // Цена за единицу
        totalCost: 0, // Общая стоимость
        date: new Date(), // Дата записи (можно использовать текущую дату)
      },
    });

    return {
      success: true,
      redirect: "/client/status", // Перенаправляем на страницу с успешным статусом
    };
  } catch (error) {
    console.error("Error creating fuel record:", error);
    return {
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  } finally {
    await prisma.$disconnect(); // Отключаемся от базы данных после операции
  }
};
