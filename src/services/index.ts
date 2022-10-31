// import { notification } from 'antd';
// import axios, { AxiosResponse } from 'axios';
// import endpoints from './endpoints';
// import {
//   IBusinessUnit,
//   ICancelRequestOrder,
//   ICancelRequestOrderResponse,
//   IChangeTableState,
//   ICreateTable,
//   ICreateTableResponse,
//   IEvaluateOrder,
//   IEvaluateOrderResponse,
//   IGetCroupierAvailableTablesResponse,
//   IGetQROrder,
//   IGetQROrderResponse,
//   IGetQRStatusResponse,
//   IGetSupervisorAvailableTablesResponse,
//   IGetTableInfo,
//   IGetTableInfoResponse,
//   IGetTablesRequestsResponse,
//   IIsCroupierSubscribedResponse,
//   IisPendingOrderRequestResponse,
//   ILoginRequest,
//   ILoginResponse,
//   IOnForgotPassword,
//   IOrderOperationResponse,
//   IOrderOperations,
//   IOrderRequestGenerator,
//   IOrderRequestGeneratorResponse,
//   ISubscribeCroupier,
//   ISubscribeCroupierResponse,
//   ISubscribeSupervisor,
//   ISubscribeSupervisorResponse,
//   IUnSubscribeCroupier,
//   IUnSubscribeSupervisor,
//   IUnSubscribeSupervisorResponse,
//   IUpdateTable,
//   IUpdateTableResponse,
// } from './interfaces';

// const addLeadingZeros = (n: number) => {
//   if (n <= 9) {
//     return '0' + n;
//   }
//   return n;
// };

// const formatDate = (date: Date) => {
//   return (
//     date.getFullYear() +
//     '-' +
//     addLeadingZeros(date.getMonth() + 1) +
//     '-' +
//     addLeadingZeros(date.getDate()) +
//     ' ' +
//     addLeadingZeros(date.getHours()) +
//     ':' +
//     addLeadingZeros(date.getMinutes()) +
//     ':' +
//     addLeadingZeros(date.getSeconds())
//   );

//   // return (
//   //   `${date.getFullYear()}-${
//   //     date.getMonth() + 1 <= 9 ? '0' + date.getMonth() + 1 : date.getMonth() + 1
//   //   }-${date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()}` +
//   //   'T' +
//   //   `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
//   // );
// };

// //LOGIN
// const login = (data: ILoginRequest) => {
//   return axios
//     .post(endpoints.LOGIN, data)
//     .then((res: AxiosResponse<ILoginResponse>) => res.data);
// };

// const forgotPassword = async (values: IOnForgotPassword) => {
//   const { Company, UserName } = values;
//   return axios
//     .post(
//       endpoints.PASSWORD_RESET + `?company=${Company}&userName=${UserName}`,
//       {},
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//     .then((res: AxiosResponse) => res);
// };

// //CROUPIER
// const getCroupierAvailableTables = (token: string) => {
//   return axios
//     .get(endpoints.CROUPIER + '/availabletables', {
//       headers: {
//         token: token,
//       },
//     })
//     .then(
//       (res: AxiosResponse<IGetCroupierAvailableTablesResponse>) => res.data
//     );
// };

// const subscribeCroupier = (data: ISubscribeCroupier, token: string) => {
//   return axios
//     .post(endpoints.CROUPIER + '/subscribe', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<ISubscribeCroupierResponse>) => res.data);
// };

// const unSubscribeCroupier = (data: IUnSubscribeCroupier, token: string) => {
//   return axios
//     .post(endpoints.CROUPIER + '/unsubscribe', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<ISubscribeCroupierResponse>) => res.data);
// };

// const isCroupierSubscribed = (token: string) => {
//   return axios
//     .get<IIsCroupierSubscribedResponse>(endpoints.CROUPIER + '/isSubscribed', {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IIsCroupierSubscribedResponse>) => res.data);
// };

// const orderRequest = (data: IOrderRequestGenerator, token: string) => {
//   return axios
//     .post(endpoints.CROUPIER + '/orderRequest', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IOrderRequestGeneratorResponse>) => res.data);
// };

// const getQROrder = (data: IGetQROrder, token: string) => {
//   return axios
//     .post(endpoints.CROUPIER + '/order', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IGetQROrderResponse>) => res.data);
// };

// const cancelRequestOrder = (data: ICancelRequestOrder, token: string) => {
//   return axios
//     .post(endpoints.CROUPIER + '/cancelRequestOrder', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<ICancelRequestOrderResponse>) => res.data);
// };

// const isPendingOrderRequest = (token: string) => {
//   return axios
//     .get(endpoints.CROUPIER + '/pendingOrderRequest', {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IisPendingOrderRequestResponse>) => res.data);
// };

// //SUPERVISOR
// const getSupervisorAvailableTables = (token: string) => {
//   return axios
//     .get(endpoints.SUPERVISOR + '/availableTables', {
//       headers: {
//         token: token,
//       },
//     })
//     .then(
//       (res: AxiosResponse<IGetSupervisorAvailableTablesResponse>) => res.data
//     );
// };

// const subscribeSupervisor = (data: ISubscribeSupervisor, token: string) => {
//   return axios
//     .post(endpoints.SUPERVISOR + '/subscribe', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<ISubscribeSupervisorResponse>) => res.data);
// };

// const unSubscribeSupervisor = (data: IUnSubscribeSupervisor, token: string) => {
//   return axios
//     .post(endpoints.SUPERVISOR + '/unsubscribe', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IUnSubscribeSupervisorResponse>) => res.data);
// };

// const getTablesRequests = (token: string) => {
//   return axios
//     .get(endpoints.SUPERVISOR + '/tablesRequests', {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IGetTablesRequestsResponse>) => res.data);
// };

// const evaluateOrder = (data: IEvaluateOrder, token: string) => {
//   return axios
//     .post(endpoints.SUPERVISOR + '/evaluateOrder', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IEvaluateOrderResponse>) => {
//       if (res.status === 400) {
//         notification.error({ message: 'Error', description: 'PIN incorrecto' });
//       }
//       return res.data;
//     });
// };

// const orderOperations = (data: IOrderOperations, token: string) => {
//   return axios
//     .get(
//       endpoints.SUPERVISOR +
//         `/orderOperations?from=${formatDate(data.dateFrom)}&to=${formatDate(
//           data.dateTo
//         )}&businessUnitId=${data.businessUnitId}&pageIndex=${
//           data.pageIndex
//         }&pageSize=${data.pageSize}`,
//       {
//         headers: {
//           token: token,
//         },
//       }
//     )
//     .then((res: AxiosResponse<IOrderOperationResponse>) => res.data);
// };

// //TABLE
// const changeTableState = (data: IChangeTableState, token: string) => {
//   return axios
//     .post(endpoints.TABLE + '/changeTableState', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IChangeTableState>) => res.data);
// };

// const getBusinessUnits = (token: string) => {
//   return axios
//     .get(endpoints.BUSINESS_UNIT, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((res: AxiosResponse<IBusinessUnit>) => res.data);
// };

// const createNewTable = (data: ICreateTable, token: string) => {
//   return axios
//     .post(endpoints.TABLE + '/createNewTable', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<ICreateTableResponse>) => res.data);
// };

// const updateTable = (data: IUpdateTable, token: string) => {
//   return axios
//     .post(endpoints.TABLE + '/updateTable', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IUpdateTableResponse>) => res.data);
// };

// const getTableInfo = (data: IGetTableInfo, token: string) => {
//   return axios
//     .post(endpoints.CROUPIER + '/getTableInfo', data, {
//       headers: {
//         token: token,
//       },
//     })
//     .then((res: AxiosResponse<IGetTableInfoResponse>) => res.data);
// };

// //QR
// const getQRStatus = (id: number, userId: string) => {
//   return axios
//     .get(endpoints.QR + '/orders/' + id, {
//       headers: {
//         userId: userId,
//       },
//     })
//     .then((res: AxiosResponse<IGetQRStatusResponse>) => res.data);
// };

// export default {
//   login,
//   forgotPassword,
//   getCroupierAvailableTables,
//   subscribeCroupier,
//   unSubscribeCroupier,
//   getSupervisorAvailableTables,
//   subscribeSupervisor,
//   unSubscribeSupervisor,
//   isCroupierSubscribed,
//   getTablesRequests,
//   evaluateOrder,
//   orderRequest,
//   getQROrder,
//   cancelRequestOrder,
//   isPendingOrderRequest,
//   changeTableState,
//   getBusinessUnits,
//   createNewTable,
//   updateTable,
//   getTableInfo,
//   getQRStatus,
//   orderOperations,
// };
export {};
