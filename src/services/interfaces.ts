export interface ILoginRequest {
  userName: string;
  password: string;
  company: string;
}

export interface ILoginResponse {
  firstName: string;
  lastName: string;
  token: string;
  role: 'supervisor' | 'croupier';
  userId: number;
  companyId: string;
}

export interface IGetCroupierAvailableTablesResponse {
  tables: ITable[];
}

export interface ISubscribeCroupier {
  tableId: number;
}

export interface ISubscribeCroupierResponse {
  croupierSubscribed: boolean;
}

export interface IUnSubscribeCroupier {
  tableId: number;
}

export interface IIsCroupierSubscribedResponse {
  isSubscribed: boolean;
  tableId: number;
}

export interface IOrderRequestGenerator {
  tableId: number;
  croupierId: number;
  amount: number;
}

export interface IOrderRequestGeneratorResponse {
  orderRequestId: number;
  isAnySupervisorSubscribed: boolean;
}

export interface IGetSupervisorAvailableTablesResponse {
  supervisedTables: ITable[];
  unSupervisedTables: ITable[];
}

export interface ISubscribeSupervisor {
  tableId: number;
}

export interface ISubscribeSupervisorResponse {
  supervisedTables: ITable[];
  unSupervisedTables: ITable[];
}

export interface IUnSubscribeSupervisor {
  tableId: number;
}

export interface IUnSubscribeSupervisorResponse {
  supervisedTables: ITable[];
  unSupervisedTables: ITable[];
}

export interface IGetTablesRequestsResponse {
  orderRequests: IOrderRequest[];
}

export interface IEvaluateOrder {
  orderRequestId: number;
  pin: string;
  isAccepted: boolean;
  tableId: number;
}

export interface IEvaluateOrderResponse {
  orderEvaluated: boolean;
}

export interface ITable {
  tableId: number;
  name: string;
  croupiers?: string[];
  isAnySupervisorSubscribed?: boolean;
  isEnabled?: boolean;
  businessUnitId: number;
  amounts: number[];
}

export interface IOrderRequest {
  tableId: number;
  tableName: string;
  orderRequestId: number;
  amount: number;
  creationDate: string;
}

export interface IGetQROrder {
  orderId: number;
}

export interface IGetQROrderResponse {
  qrCode: string;
}

export interface ICancelRequestOrder {
  orderRequestId: number;
}

export interface ICancelRequestOrderResponse {
  orderRequestId: number;
  isCancelled: boolean;
}

export interface IisPendingOrderRequestResponse {
  orderRequest: number;
  tableId: number;
  amount: number;
}

export interface IChangeTableState {
  tableId: number;
  isEnable: boolean;
}

export interface IBusinessUnit {
  id: number;
  name: string;
  childUnits: IBusinessUnit[];
}

export interface ICreateTable {
  name: string;
  businessUnitId: number;
  amounts: number[];
  isEnable: boolean;
}

export type ICreateTableResponse = ICreateTable & { tableId: number };

export interface IUpdateTable {
  tableId: number;
  businessUnitId: number;
  amounts: number[];
}

export interface IUpdateTableResponse {
  tableId: number;
  isUpdated: boolean;
}

export interface IGetTableInfo {
  tableId: number;
}

export interface IGetTableInfoResponse {
  tableId: number;
  name: string;
  isAnySupervisorSubscribed: boolean;
  businessUnitId: number;
  amounts: number[];
}

export interface IGetQRStatusResponse {
  id: number;
  qrCode: string;
  expirationDate: Date | null;
  amount: number;
  concept: string;
  cashier: string;
  externalReference: string;
  isEnabled: boolean;
}

export interface IOperations {
  reference: string;
  totalAmount: number;
  operationDate: Date;
  senderFullName: string;
  senderIdentity: string;
  croupier: string;
  businessUnit: string;
}

export interface IOperationFilter {
  date: [moment.Moment, moment.Moment];
  businessUnitId: number;
}

export interface IOnForgotPassword {
  Company: string;
  UserName: string;
}

export interface Pagination {
  pageIndex: number;
  pageSize: number;
  count: number;
}

export type IOrderOperations = Pagination & {
  dateFrom: Date;
  dateTo: Date;
  businessUnitId: number;
};

export type IOrderOperationResponse = Pagination & {
  totalGrossAmount: number;
  totalNetAmount: number;
  items: IOperations[];
};
