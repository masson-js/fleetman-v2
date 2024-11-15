datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id       Int     @id @default(autoincrement())
  userId   String? @unique
  email    String? @unique
  name     String?
  password String
  company  String? // Добавлено поле для компании
  ships    Ship[] // Связь с кораблями
}

model Ship {
  id             Int             @id @default(autoincrement())
  name           String
  type           String
  flag           String
  imoNumber      String          @unique
  deadweight     Int
  length         Float
  width          Float
  yearBuilt      Int
  currentStatus  String
  portOfRegistry String
  ecoStandard    String
  fuelRecords    ShipFuel[] // Связь с топливными записями
  routes         ShipRoute[] // Связь с маршрутами
  certifications Certification[] // Связь с сертификациями
  inspections    Inspection[] // Связь с проверками
  fixtures       Fixture[] // Связь с фрахтами
  crew           Crew[] // Связь с экипажем
  logbooks       Logbook[] // Связь с логбуками
  User           User?           @relation(fields: [userId], references: [id])
  userId         Int?
}

model ShipFuel {
  id        Int      @id @default(autoincrement())
  shipId    Int // Идентификатор судна
  date      DateTime // Дата записи
  fuelType  String // Тип топлива
  amount    Float // Количество топлива
  price     Float // Цена за единицу топлива
  totalCost Float // Общая стоимость топлива
  ship      Ship     @relation(fields: [shipId], references: [id]) // Связь с моделью Ship
}

model ShipRoute {
  id          Int      @id @default(autoincrement())
  shipId      Int
  start       String // Начальная точка маршрута
  destination String // Конечная точка маршрута
  date        DateTime @default(now())
  ship        Ship     @relation(fields: [shipId], references: [id])
}

model Certification {
  id               Int      @id @default(autoincrement())
  shipId           Int // Идентификатор судна
  type             String // Тип сертификата (напр., безопасности, экологии и т.д.)
  issuedDate       DateTime // Дата выдачи сертификата
  expiryDate       DateTime // Дата истечения срока действия сертификата
  issuingAuthority String // Орган, выдавший сертификат
  remarks          String? // Дополнительные замечания
  ship             Ship     @relation(fields: [shipId], references: [id]) // Связь с моделью Ship
}

model Inspection {
  id                 Int       @id @default(autoincrement())
  shipId             Int // Идентификатор судна
  inspectionDate     DateTime // Дата проверки
  inspectorName      String // Имя проверяющего
  inspectionType     String // Тип проверки (напр., регулярная, внеплановая)
  results            String // Результаты проверки
  recommendations    String? // Рекомендации после проверки
  nextInspectionDate DateTime? // Дата следующей проверки (если применимо)
  inspectionReport   String? // Ссылка на отчет о проверке (например, PDF-файл или URL)  
  ship               Ship      @relation(fields: [shipId], references: [id]) // Связь с моделью Ship
}

model Fixture {
  id               Int      @id @default(autoincrement())
  shipId           Int // Идентификатор судна
  chartererName    String // Имя фрахтователя
  startDate        DateTime // Дата начала фрахта
  endDate          DateTime // Дата окончания фрахта
  totalCost        Float // Общая стоимость фрахта
  paymentTerms     String // Условия оплаты
  cargoDescription String? // Описание груза (если применимо)
  deliveryLocation String? // Место доставки груза
  fixtureType      String // Тип фрахта (напр., время, тонны и т.д.)
  notes            String? // Дополнительные примечания
  ship             Ship     @relation(fields: [shipId], references: [id]) // Связь с моделью Ship
}

model Logbook {
  id               Int      @id @default(autoincrement())
  shipId           Int // Идентификатор судна
  date             DateTime // Дата и время записи
  location         String // Местоположение судна
  operationType    String // Тип операции (напр., заход в порт, выход из порта и т.д.)
  eventDescription String // Описание события
  responsible      String // Подпись ответственного лица
  ship             Ship     @relation(fields: [shipId], references: [id]) // Связь с моделью Ship
}

model Crew {
  id       Int      @id @default(autoincrement())
  shipId   Int
  name     String
  role     String // Роль в экипаже
  joinDate DateTime
  ship     Ship     @relation(fields: [shipId], references: [id])
}
