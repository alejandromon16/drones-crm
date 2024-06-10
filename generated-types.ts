import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      ...requestInit,
      headers: {
        'Content-Type': 'application/json',
        ...requestInit.headers,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Client = {
  __typename?: 'Client';
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateClientInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateDroneInput = {
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
  subtitle: Scalars['String'];
};

export type CreateOrderInput = {
  address: Scalars['String'];
  previousState: PreviousState;
  products: Array<Scalars['String']>;
  status: Scalars['String'];
  totalAmount: Scalars['Float'];
  user: Scalars['String'];
};

export type CreateSellerInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type Drone = {
  __typename?: 'Drone';
  description: Scalars['String'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  stock: Scalars['Float'];
  subtitle: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createClient: Client;
  createDrone: Drone;
  createOrder: Order;
  createSeller: Seller;
  createUser: UserType;
};


export type MutationCreateClientArgs = {
  createClientInput: CreateClientInput;
};


export type MutationCreateDroneArgs = {
  createDroneInput: CreateDroneInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateSellerArgs = {
  createSellerInput: CreateSellerInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};

export type Order = {
  __typename?: 'Order';
  address: Scalars['String'];
  deliveryDate: Scalars['DateTime'];
  id: Scalars['ID'];
  orderDate: Scalars['DateTime'];
  products: Array<Scalars['String']>;
  status: Scalars['String'];
  totalAmount: Scalars['Int'];
  user: Scalars['String'];
};

export type OrderAmount = {
  __typename?: 'OrderAmount';
  ordersAmount: Scalars['Int'];
};

export type OrdersCreditOrQrAmount = {
  __typename?: 'OrdersCreditOrQrAmount';
  creditAmount: Scalars['Int'];
  qrAmount: Scalars['Int'];
};

export type PreviousState =
  | 'NUEVO'
  | 'USADO';

export type Query = {
  __typename?: 'Query';
  getClient: Client;
  getClients: Array<Client>;
  getDrone: Drone;
  getDrones: Array<Drone>;
  getOrdersAmountType: OrderAmount;
  getOrdersCreditOrQrCodeAmount: OrdersCreditOrQrAmount;
  getSeller: Seller;
  getSellers: Array<Seller>;
  order: Order;
  orders: Array<Order>;
  user: UserType;
};


export type QueryGetClientArgs = {
  id: Scalars['String'];
};


export type QueryGetDroneArgs = {
  name: Scalars['String'];
};


export type QueryGetSellerArgs = {
  id: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Seller = {
  __typename?: 'Seller';
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type UserType = {
  __typename?: 'UserType';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'Query', getClients: Array<{ __typename?: 'Client', firstName: string, lastName: string, phoneNumber: string, email: string, gender: string }> };

export type GetDronesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDronesQuery = { __typename?: 'Query', getDrones: Array<{ __typename?: 'Drone', name: string, subtitle: string, description: string, price: number, stock: number, imageUrl: string }> };

export type GetDroneQueryVariables = Exact<{
  droneName: Scalars['String'];
}>;


export type GetDroneQuery = { __typename?: 'Query', getDrone: { __typename?: 'Drone', name: string, subtitle: string, description: string, price: number, stock: number, imageUrl: string } };

export type CreateDroneMutationVariables = Exact<{
  CreateDrone: CreateDroneInput;
}>;


export type CreateDroneMutation = { __typename?: 'Mutation', createDrone: { __typename?: 'Drone', name: string, description: string } };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { __typename?: 'Query', orders: Array<{ __typename?: 'Order', id: string, totalAmount: number, orderDate: any, deliveryDate: any, status: string, address: string }> };

export type GetOrderAmountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrderAmountQuery = { __typename?: 'Query', getOrdersAmountType: { __typename?: 'OrderAmount', ordersAmount: number } };

export type GetSellersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSellersQuery = { __typename?: 'Query', getSellers: Array<{ __typename?: 'Seller', id: string, firstName: string, lastName: string, phoneNumber: string, email: string, gender: string }> };


export const GetClientsDocument = `
    query GetClients {
  getClients {
    firstName
    lastName
    phoneNumber
    email
    gender
  }
}
    `;
export const useGetClientsQuery = <
      TData = GetClientsQuery,
      TError = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      variables?: GetClientsQueryVariables,
      options?: UseQueryOptions<GetClientsQuery, TError, TData>
    ) =>
    useQuery<GetClientsQuery, TError, TData>(
      variables === undefined ? ['GetClients'] : ['GetClients', variables],
      fetcher<GetClientsQuery, GetClientsQueryVariables>( dataSource.fetchParams || {}, GetClientsDocument, variables),
      options
    );

useGetClientsQuery.getKey = (variables?: GetClientsQueryVariables) => variables === undefined ? ['GetClients'] : ['GetClients', variables];
;

export const GetDronesDocument = `
    query GetDrones {
  getDrones {
    name
    subtitle
    description
    price
    stock
    imageUrl
  }
}
    `;
export const useGetDronesQuery = <
      TData = GetDronesQuery,
      TError = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      variables?: GetDronesQueryVariables,
      options?: UseQueryOptions<GetDronesQuery, TError, TData>
    ) =>
    useQuery<GetDronesQuery, TError, TData>(
      variables === undefined ? ['GetDrones'] : ['GetDrones', variables],
      fetcher<GetDronesQuery, GetDronesQueryVariables>( dataSource.fetchParams || {}, GetDronesDocument, variables),
      options
    );

useGetDronesQuery.getKey = (variables?: GetDronesQueryVariables) => variables === undefined ? ['GetDrones'] : ['GetDrones', variables];
;

export const GetDroneDocument = `
    query GetDrone($droneName: String!) {
  getDrone(name: $droneName) {
    name
    subtitle
    description
    price
    stock
    imageUrl
  }
}
    `;
export const useGetDroneQuery = <
      TData = GetDroneQuery,
      TError = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      variables: GetDroneQueryVariables,
      options?: UseQueryOptions<GetDroneQuery, TError, TData>
    ) =>
    useQuery<GetDroneQuery, TError, TData>(
      ['GetDrone', variables],
      fetcher<GetDroneQuery, GetDroneQueryVariables>( dataSource.fetchParams || {}, GetDroneDocument, variables),
      options
    );

useGetDroneQuery.getKey = (variables: GetDroneQueryVariables) => ['GetDrone', variables];
;

export const CreateDroneDocument = `
    mutation CreateDrone($CreateDrone: CreateDroneInput!) {
  createDrone(createDroneInput: $CreateDrone) {
    name
    description
  }
}
    `;
export const useCreateDroneMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      options?: UseMutationOptions<CreateDroneMutation, TError, CreateDroneMutationVariables, TContext>
    ) =>
    useMutation<CreateDroneMutation, TError, CreateDroneMutationVariables, TContext>(
      ['CreateDrone'],
      (variables?: CreateDroneMutationVariables) => fetcher<CreateDroneMutation, CreateDroneMutationVariables>( dataSource.fetchParams || {}, CreateDroneDocument, variables)(),
      options
    );
export const GetOrdersDocument = `
    query GetOrders {
  orders {
    id
    totalAmount
    orderDate
    deliveryDate
    status
    address
  }
}
    `;
export const useGetOrdersQuery = <
      TData = GetOrdersQuery,
      TError = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      variables?: GetOrdersQueryVariables,
      options?: UseQueryOptions<GetOrdersQuery, TError, TData>
    ) =>
    useQuery<GetOrdersQuery, TError, TData>(
      variables === undefined ? ['GetOrders'] : ['GetOrders', variables],
      fetcher<GetOrdersQuery, GetOrdersQueryVariables>( dataSource.fetchParams || {}, GetOrdersDocument, variables),
      options
    );

useGetOrdersQuery.getKey = (variables?: GetOrdersQueryVariables) => variables === undefined ? ['GetOrders'] : ['GetOrders', variables];
;

export const GetOrderAmountDocument = `
    query GetOrderAmount {
  getOrdersAmountType {
    ordersAmount
  }
}
    `;
export const useGetOrderAmountQuery = <
      TData = GetOrderAmountQuery,
      TError = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      variables?: GetOrderAmountQueryVariables,
      options?: UseQueryOptions<GetOrderAmountQuery, TError, TData>
    ) =>
    useQuery<GetOrderAmountQuery, TError, TData>(
      variables === undefined ? ['GetOrderAmount'] : ['GetOrderAmount', variables],
      fetcher<GetOrderAmountQuery, GetOrderAmountQueryVariables>( dataSource.fetchParams || {}, GetOrderAmountDocument, variables),
      options
    );

useGetOrderAmountQuery.getKey = (variables?: GetOrderAmountQueryVariables) => variables === undefined ? ['GetOrderAmount'] : ['GetOrderAmount', variables];
;

export const GetSellersDocument = `
    query GetSellers {
  getSellers {
    id
    firstName
    lastName
    phoneNumber
    email
    gender
  }
}
    `;
export const useGetSellersQuery = <
      TData = GetSellersQuery,
      TError = unknown
    >(
      dataSource: {  fetchParams?: RequestInit },
      variables?: GetSellersQueryVariables,
      options?: UseQueryOptions<GetSellersQuery, TError, TData>
    ) =>
    useQuery<GetSellersQuery, TError, TData>(
      variables === undefined ? ['GetSellers'] : ['GetSellers', variables],
      fetcher<GetSellersQuery, GetSellersQueryVariables>( dataSource.fetchParams || {}, GetSellersDocument, variables),
      options
    );

useGetSellersQuery.getKey = (variables?: GetSellersQueryVariables) => variables === undefined ? ['GetSellers'] : ['GetSellers', variables];
;
