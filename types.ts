/**
 * User model types
 */
export interface User {
  id: string;
  userId: string;
  email: string | null;
  name: string | null;
  password: string;
  company: string | null;
  ships: Ship[];
}

/**
 * Ship model types
 */
export interface Ship {
  id: string;
  name: string;
  type: string;
  flag: string;
  imoNumber: string;
  mmsi: string;
  callsign: string;
  deadweight: number;
  length: number;
  beam: number;
  width: number;
  yearBuilt: number;
  currentStatus: string;
  portOfRegistry: string;
  ecoStandard: string;
  // Делаем связанные массивы необязательными, добавляя ?
  fuelRecords?: ShipFuel[];
  routes?: ShipRoute[];
  certifications?: Certification[];
  inspections?: Inspection[];
  fixtures?: Fixture[];
  crew?: Crew[];
  logbooks?: Logbook[];
  userId: string | null;
  user?: User | null; // Также делаем user необязательным
}

/**
 * ShipFuel model types
 */
export interface ShipFuel {
  id: string;
  shipId: string;
  date: Date;
  refuelDate: Date | null;
  fuelType: string;
  amount: number;
  price: number;
  totalCost: number;
  ship: Ship;
}

/**
 * ShipRoute model types
 */
export interface ShipRoute {
  id: string;
  shipId: string;
  start: string;
  destination: string;
  date: Date;
  arrivalDate: Date;
  ship: Ship;
}

/**
 * Certification model types
 */
export interface Certification {
  id: string;
  shipId: string;
  type: string;
  issuedDate: Date;
  expiryDate: Date;
  issuingAuthority: string;
  standard: string;
  complianceLevel: string;
  verificationDate: Date;
  certificateNumber: string;
  inspectionRequirements: string | null;
  nextInspectionDate: Date | null;
  inspectorName: string | null;
  certificationCompany: string | null;
  remarks: string | null;
  ship: Ship;
}

/**
 * Inspection model types
 */
export interface Inspection {
  id: string;
  shipId: string;
  inspectionDate: Date;
  inspectorName: string;
  inspectionType: string;
  results: string;
  recommendations: string | null;
  nextInspectionDate: Date | null;
  inspectionReport: string | null;
  complianceStandards: string;
  deficienciesFound: string | null;
  correctiveActions: string | null;
  verificationStatus: string;
  duration: number | null;
  isEUCompliance: boolean;
  ship: Partial<Ship>;
}

/**
 * Fixture model types
 */
export interface Fixture {
  id: string;
  shipId: string;
  chartererName: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  currency: string | null;
  paymentTerms: string;
  cargoDescription: string | null;
  deliveryLocation: string | null;
  fixtureType: string;
  brokerName: string | null;
  status: string;
  cancellationTerms: string | null;
  isCompleted: boolean;
  notes: string | null;
  ship: Ship;
}

/**
 * Logbook model types
 */
export interface Logbook {
  id: string;
  shipId: string;
  date: Date;
  location: string;
  operationType: string;
  eventDescription: string;
  weatherConditions: string | null;
  seaConditions: string | null;
  speed: number | null;
  engineStatus: string | null;
  fuelConsumption: number | null;
  crewCount: number | null;
  inspectionCheck: boolean;
  responsible: string;
  notes: string | null;
  ship: Ship;
}

/**
 * Crew model types
 */
export interface Crew {
  id: string;
  shipId: string;
  name: string;
  role: string;
  rank: string | null;
  joinDate: Date;
  contractEndDate: Date | null;
  status: string;
  qualifications: string | null;
  certifications: string | null;
  leaveDate: Date | null;
  nationality: string | null;
  ship: Ship;
}

/**
 * Types without relations for API requests and responses
 */
export type UserCreateInput = Omit<User, "id" | "ships">;
export type UserUpdateInput = Partial<UserCreateInput>;

export type ShipCreateInput = Omit<
  Ship,
  | "id"
  | "fuelRecords"
  | "routes"
  | "certifications"
  | "inspections"
  | "fixtures"
  | "crew"
  | "logbooks"
  | "user"
>;
export type ShipUpdateInput = Partial<ShipCreateInput>;

export type ShipFuelCreateInput = Omit<ShipFuel, "id" | "ship">;
export type ShipFuelUpdateInput = Partial<ShipFuelCreateInput>;

export type ShipRouteCreateInput = Omit<ShipRoute, "id" | "ship">;
export type ShipRouteUpdateInput = Partial<ShipRouteCreateInput>;

export type CertificationCreateInput = Omit<Certification, "id" | "ship">;
export type CertificationUpdateInput = Partial<CertificationCreateInput>;

export type InspectionCreateInput = Omit<Inspection, "id" | "ship">;
export type InspectionUpdateInput = Partial<InspectionCreateInput>;

export type FixtureCreateInput = Omit<Fixture, "id" | "ship">;
export type FixtureUpdateInput = Partial<FixtureCreateInput>;

export type LogbookCreateInput = Omit<Logbook, "id" | "ship">;
export type LogbookUpdateInput = Partial<LogbookCreateInput>;

export type CrewCreateInput = Omit<Crew, "id" | "ship">;
export type CrewUpdateInput = Partial<CrewCreateInput>;

/**
 * Response types for API endpoints
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

/**
 * Enum types for select fields
 */
export enum ShipStatus {
  ACTIVE = "ACTIVE",
  MAINTENANCE = "MAINTENANCE",
  DOCKED = "DOCKED",
  TRANSIT = "TRANSIT",
  OUT_OF_SERVICE = "OUT_OF_SERVICE",
}

export enum InspectionVerificationStatus {
  PASSED = "passed",
  FAILED = "failed",
  REQUIRES_WORK = "requires-work",
  PENDING = "pending",
}

export enum FixtureStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  PENDING = "PENDING",
}

export enum CrewStatus {
  ACTIVE = "ACTIVE",
  ON_LEAVE = "ON_LEAVE",
  TERMINATED = "TERMINATED",
  SUSPENDED = "SUSPENDED",
}

/**
 * Filter and sorting types for queries
 */
export interface FilterOptions {
  field: string;
  operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "contains"
    | "startsWith"
    | "endsWith";
  value: string | number | boolean | Date;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

export interface QueryOptions {
  filters?: FilterOptions[];
  sort?: SortOptions;
  page?: number;
  pageSize?: number;
}
