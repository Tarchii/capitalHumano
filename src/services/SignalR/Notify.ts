import {
  HubConnectionBuilder,
  HttpTransportType,
  HubConnectionState,
} from '@microsoft/signalr';
import endpoints from '../endpoints';

const conn = new HubConnectionBuilder()
  .withAutomaticReconnect()
  .withUrl(endpoints.SIGNALR, HttpTransportType.WebSockets)
  .build();

export const connect = () => {
  if (
    conn.state === HubConnectionState.Disconnected ||
    conn.state === HubConnectionState.Disconnecting
  ) {
    conn
      .start()
      .then(() => console.log('Hub connected!'))
      .catch((e: any) => console.log(e));
  }
};

export const disconnect = () => {
  if (
    conn.state === HubConnectionState.Connected ||
    conn.state === HubConnectionState.Connecting
  ) {
    conn.stop().catch((e: any) => console.log(e));
  }
};

export interface IPayloadBase {
  supervisorId: number;
  tableId: number;
  tableName: string;
  croupierId: number;
}

export type IOrderApprovedPayload = IPayloadBase & {
  orderId?: number;
};

export type IOrderCancelledPayload = {
  orderRequestId: number;
};

export type ITableActionPayload = {
  tableId: number;
  croupierId?: number;
  supervisorId?: number;
};

export type ItableUpdatedPayload = {
  isUpdated: boolean;
};

type OrderCreatedEvent = {
  channel: 'orderCreated';
  handle: (payload: IPayloadBase) => void;
};

type OrderApprovedEvent = {
  channel: 'orderApproved';
  handle: (payload: IOrderApprovedPayload) => void;
};

type OrderRejectedEvent = {
  channel: 'orderRejected';
  handle: (payload: IPayloadBase) => void;
};

type OrderCancelledEvent = {
  channel: 'orderCancelled';
  handle: (payload: IOrderCancelledPayload) => void;
};

type TableTakenEvent = {
  channel: 'tableTaken';
  handle: (payload: ITableActionPayload) => void;
};

type TableFreedEvent = {
  channel: 'tableFreed';
  handle: (payload: ITableActionPayload) => void;
};

type TableSubscriptionEvent = {
  channel: 'tableSubscription';
  handle: (payload: ITableActionPayload) => void;
};

type TableUnSubscriptionEvent = {
  channel: 'tableUnsubscription';
  handle: (payload: ITableActionPayload) => void;
};

type TableUpdatedEvent = {
  channel: 'tableUpdated';
  handle: (payload: ItableUpdatedPayload) => void;
};

type Event =
  | OrderCreatedEvent
  | OrderApprovedEvent
  | OrderRejectedEvent
  | OrderCancelledEvent
  | TableTakenEvent
  | TableFreedEvent
  | TableSubscriptionEvent
  | TableUnSubscriptionEvent
  | TableUpdatedEvent;

export const subscribe = (event: Event) => {
  connect();
  conn.on(event.channel, event.handle);
};

export const unSubscribe = (event: Event) => {
  conn.off(event.channel, event.handle);
};
