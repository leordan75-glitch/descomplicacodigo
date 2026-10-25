# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*ListUsers*](#listusers)
  - [*ListMyAuthMethods*](#listmyauthmethods)
  - [*ListMySessions*](#listmysessions)
  - [*GetMyRoles*](#getmyroles)
  - [*ListMySecurityLogs*](#listmysecuritylogs)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*UpdateUser*](#updateuser)
  - [*DeleteUser*](#deleteuser)
  - [*CreateAuthMethod*](#createauthmethod)
  - [*DeleteAuthMethod*](#deleteauthmethod)
  - [*CreateSession*](#createsession)
  - [*UpdateSession*](#updatesession)
  - [*DeleteSession*](#deletesession)
  - [*AddUserRole*](#adduserrole)
  - [*RemoveUserRole*](#removeuserrole)
  - [*LogSecurityEvent*](#logsecurityevent)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCurrentUserData {
  user?: {
    email: string;
    displayName?: string | null;
    bio?: string | null;
  };
}
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@dataconnect/generated';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@dataconnect/generated';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    displayName?: string | null;
    avatarUrl?: string | null;
  })[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListMyAuthMethods
You can execute the `ListMyAuthMethods` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMyAuthMethods(options?: ExecuteQueryOptions): QueryPromise<ListMyAuthMethodsData, undefined>;

interface ListMyAuthMethodsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAuthMethodsData, undefined>;
}
export const listMyAuthMethodsRef: ListMyAuthMethodsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMyAuthMethods(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAuthMethodsData, undefined>;

interface ListMyAuthMethodsRef {
  ...
  (dc: DataConnect): QueryRef<ListMyAuthMethodsData, undefined>;
}
export const listMyAuthMethodsRef: ListMyAuthMethodsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMyAuthMethodsRef:
```typescript
const name = listMyAuthMethodsRef.operationName;
console.log(name);
```

### Variables
The `ListMyAuthMethods` query has no variables.
### Return Type
Recall that executing the `ListMyAuthMethods` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMyAuthMethodsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMyAuthMethodsData {
  authMethods: ({
    providerType: string;
    providerId: string;
  })[];
}
```
### Using `ListMyAuthMethods`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMyAuthMethods } from '@dataconnect/generated';


// Call the `listMyAuthMethods()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMyAuthMethods();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMyAuthMethods(dataConnect);

console.log(data.authMethods);

// Or, you can use the `Promise` API.
listMyAuthMethods().then((response) => {
  const data = response.data;
  console.log(data.authMethods);
});
```

### Using `ListMyAuthMethods`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMyAuthMethodsRef } from '@dataconnect/generated';


// Call the `listMyAuthMethodsRef()` function to get a reference to the query.
const ref = listMyAuthMethodsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMyAuthMethodsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.authMethods);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.authMethods);
});
```

## ListMySessions
You can execute the `ListMySessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySessions(options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;

interface ListMySessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySessionsData, undefined>;
}
export const listMySessionsRef: ListMySessionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;

interface ListMySessionsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySessionsData, undefined>;
}
export const listMySessionsRef: ListMySessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySessionsRef:
```typescript
const name = listMySessionsRef.operationName;
console.log(name);
```

### Variables
The `ListMySessions` query has no variables.
### Return Type
Recall that executing the `ListMySessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySessionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySessionsData {
  sessions: ({
    deviceName: string;
    lastUsedAt: TimestampString;
  })[];
}
```
### Using `ListMySessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySessions } from '@dataconnect/generated';


// Call the `listMySessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySessions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySessions(dataConnect);

console.log(data.sessions);

// Or, you can use the `Promise` API.
listMySessions().then((response) => {
  const data = response.data;
  console.log(data.sessions);
});
```

### Using `ListMySessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySessionsRef } from '@dataconnect/generated';


// Call the `listMySessionsRef()` function to get a reference to the query.
const ref = listMySessionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySessionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.sessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.sessions);
});
```

## GetMyRoles
You can execute the `GetMyRoles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyRoles(options?: ExecuteQueryOptions): QueryPromise<GetMyRolesData, undefined>;

interface GetMyRolesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRolesData, undefined>;
}
export const getMyRolesRef: GetMyRolesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyRoles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyRolesData, undefined>;

interface GetMyRolesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyRolesData, undefined>;
}
export const getMyRolesRef: GetMyRolesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyRolesRef:
```typescript
const name = getMyRolesRef.operationName;
console.log(name);
```

### Variables
The `GetMyRoles` query has no variables.
### Return Type
Recall that executing the `GetMyRoles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyRolesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyRolesData {
  userRoles: ({
    roleName: string;
  })[];
}
```
### Using `GetMyRoles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyRoles } from '@dataconnect/generated';


// Call the `getMyRoles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyRoles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyRoles(dataConnect);

console.log(data.userRoles);

// Or, you can use the `Promise` API.
getMyRoles().then((response) => {
  const data = response.data;
  console.log(data.userRoles);
});
```

### Using `GetMyRoles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyRolesRef } from '@dataconnect/generated';


// Call the `getMyRolesRef()` function to get a reference to the query.
const ref = getMyRolesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyRolesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userRoles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userRoles);
});
```

## ListMySecurityLogs
You can execute the `ListMySecurityLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listMySecurityLogs(options?: ExecuteQueryOptions): QueryPromise<ListMySecurityLogsData, undefined>;

interface ListMySecurityLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySecurityLogsData, undefined>;
}
export const listMySecurityLogsRef: ListMySecurityLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listMySecurityLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySecurityLogsData, undefined>;

interface ListMySecurityLogsRef {
  ...
  (dc: DataConnect): QueryRef<ListMySecurityLogsData, undefined>;
}
export const listMySecurityLogsRef: ListMySecurityLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listMySecurityLogsRef:
```typescript
const name = listMySecurityLogsRef.operationName;
console.log(name);
```

### Variables
The `ListMySecurityLogs` query has no variables.
### Return Type
Recall that executing the `ListMySecurityLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListMySecurityLogsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListMySecurityLogsData {
  securityLogs: ({
    eventType: string;
    timestamp: TimestampString;
  })[];
}
```
### Using `ListMySecurityLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listMySecurityLogs } from '@dataconnect/generated';


// Call the `listMySecurityLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listMySecurityLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listMySecurityLogs(dataConnect);

console.log(data.securityLogs);

// Or, you can use the `Promise` API.
listMySecurityLogs().then((response) => {
  const data = response.data;
  console.log(data.securityLogs);
});
```

### Using `ListMySecurityLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listMySecurityLogsRef } from '@dataconnect/generated';


// Call the `listMySecurityLogsRef()` function to get a reference to the query.
const ref = listMySecurityLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listMySecurityLogsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.securityLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.securityLogs);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  displayName?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## UpdateUser
You can execute the `UpdateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface UpdateUserRef {
  ...
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
}
export const updateUserRef: UpdateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserRef:
```typescript
const name = updateUserRef.operationName;
console.log(name);
```

### Variables
The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserVariables {
  displayName?: string | null;
  bio?: string | null;
}
```
### Return Type
Recall that executing the `UpdateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUser, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  bio: ..., // optional
};

// Call the `updateUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUser(updateUserVars);
// Variables can be defined inline as well.
const { data } = await updateUser({ displayName: ..., bio: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const { data } = await updateUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUser(dataConnect, updateUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUser(updateUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserRef, UpdateUserVariables } from '@dataconnect/generated';

// The `UpdateUser` mutation has an optional argument of type `UpdateUserVariables`:
const updateUserVars: UpdateUserVariables = {
  displayName: ..., // optional
  bio: ..., // optional
};

// Call the `updateUserRef()` function to get a reference to the mutation.
const ref = updateUserRef(updateUserVars);
// Variables can be defined inline as well.
const ref = updateUserRef({ displayName: ..., bio: ..., });
// Since all variables are optional for this mutation, you can omit the `UpdateUserVariables` argument.
const ref = updateUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserRef(dataConnect, updateUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## DeleteUser
You can execute the `DeleteUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteUser(): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface DeleteUserRef {
  ...
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
}
export const deleteUserRef: DeleteUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteUserRef:
```typescript
const name = deleteUserRef.operationName;
console.log(name);
```

### Variables
The `DeleteUser` mutation has no variables.
### Return Type
Recall that executing the `DeleteUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteUserData {
  user_delete?: User_Key | null;
}
```
### Using `DeleteUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteUser } from '@dataconnect/generated';


// Call the `deleteUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteUser(dataConnect);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
deleteUser().then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

### Using `DeleteUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteUserRef } from '@dataconnect/generated';


// Call the `deleteUserRef()` function to get a reference to the mutation.
const ref = deleteUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_delete);
});
```

## CreateAuthMethod
You can execute the `CreateAuthMethod` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createAuthMethod(vars: CreateAuthMethodVariables): MutationPromise<CreateAuthMethodData, CreateAuthMethodVariables>;

interface CreateAuthMethodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuthMethodVariables): MutationRef<CreateAuthMethodData, CreateAuthMethodVariables>;
}
export const createAuthMethodRef: CreateAuthMethodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAuthMethod(dc: DataConnect, vars: CreateAuthMethodVariables): MutationPromise<CreateAuthMethodData, CreateAuthMethodVariables>;

interface CreateAuthMethodRef {
  ...
  (dc: DataConnect, vars: CreateAuthMethodVariables): MutationRef<CreateAuthMethodData, CreateAuthMethodVariables>;
}
export const createAuthMethodRef: CreateAuthMethodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAuthMethodRef:
```typescript
const name = createAuthMethodRef.operationName;
console.log(name);
```

### Variables
The `CreateAuthMethod` mutation requires an argument of type `CreateAuthMethodVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAuthMethodVariables {
  type: string;
  id: string;
}
```
### Return Type
Recall that executing the `CreateAuthMethod` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAuthMethodData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAuthMethodData {
  authMethod_insert: AuthMethod_Key;
}
```
### Using `CreateAuthMethod`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAuthMethod, CreateAuthMethodVariables } from '@dataconnect/generated';

// The `CreateAuthMethod` mutation requires an argument of type `CreateAuthMethodVariables`:
const createAuthMethodVars: CreateAuthMethodVariables = {
  type: ..., 
  id: ..., 
};

// Call the `createAuthMethod()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAuthMethod(createAuthMethodVars);
// Variables can be defined inline as well.
const { data } = await createAuthMethod({ type: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAuthMethod(dataConnect, createAuthMethodVars);

console.log(data.authMethod_insert);

// Or, you can use the `Promise` API.
createAuthMethod(createAuthMethodVars).then((response) => {
  const data = response.data;
  console.log(data.authMethod_insert);
});
```

### Using `CreateAuthMethod`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAuthMethodRef, CreateAuthMethodVariables } from '@dataconnect/generated';

// The `CreateAuthMethod` mutation requires an argument of type `CreateAuthMethodVariables`:
const createAuthMethodVars: CreateAuthMethodVariables = {
  type: ..., 
  id: ..., 
};

// Call the `createAuthMethodRef()` function to get a reference to the mutation.
const ref = createAuthMethodRef(createAuthMethodVars);
// Variables can be defined inline as well.
const ref = createAuthMethodRef({ type: ..., id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAuthMethodRef(dataConnect, createAuthMethodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.authMethod_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.authMethod_insert);
});
```

## DeleteAuthMethod
You can execute the `DeleteAuthMethod` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteAuthMethod(vars: DeleteAuthMethodVariables): MutationPromise<DeleteAuthMethodData, DeleteAuthMethodVariables>;

interface DeleteAuthMethodRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAuthMethodVariables): MutationRef<DeleteAuthMethodData, DeleteAuthMethodVariables>;
}
export const deleteAuthMethodRef: DeleteAuthMethodRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAuthMethod(dc: DataConnect, vars: DeleteAuthMethodVariables): MutationPromise<DeleteAuthMethodData, DeleteAuthMethodVariables>;

interface DeleteAuthMethodRef {
  ...
  (dc: DataConnect, vars: DeleteAuthMethodVariables): MutationRef<DeleteAuthMethodData, DeleteAuthMethodVariables>;
}
export const deleteAuthMethodRef: DeleteAuthMethodRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAuthMethodRef:
```typescript
const name = deleteAuthMethodRef.operationName;
console.log(name);
```

### Variables
The `DeleteAuthMethod` mutation requires an argument of type `DeleteAuthMethodVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAuthMethodVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteAuthMethod` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAuthMethodData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAuthMethodData {
  authMethod_delete?: AuthMethod_Key | null;
}
```
### Using `DeleteAuthMethod`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAuthMethod, DeleteAuthMethodVariables } from '@dataconnect/generated';

// The `DeleteAuthMethod` mutation requires an argument of type `DeleteAuthMethodVariables`:
const deleteAuthMethodVars: DeleteAuthMethodVariables = {
  id: ..., 
};

// Call the `deleteAuthMethod()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAuthMethod(deleteAuthMethodVars);
// Variables can be defined inline as well.
const { data } = await deleteAuthMethod({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAuthMethod(dataConnect, deleteAuthMethodVars);

console.log(data.authMethod_delete);

// Or, you can use the `Promise` API.
deleteAuthMethod(deleteAuthMethodVars).then((response) => {
  const data = response.data;
  console.log(data.authMethod_delete);
});
```

### Using `DeleteAuthMethod`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAuthMethodRef, DeleteAuthMethodVariables } from '@dataconnect/generated';

// The `DeleteAuthMethod` mutation requires an argument of type `DeleteAuthMethodVariables`:
const deleteAuthMethodVars: DeleteAuthMethodVariables = {
  id: ..., 
};

// Call the `deleteAuthMethodRef()` function to get a reference to the mutation.
const ref = deleteAuthMethodRef(deleteAuthMethodVars);
// Variables can be defined inline as well.
const ref = deleteAuthMethodRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAuthMethodRef(dataConnect, deleteAuthMethodVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.authMethod_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.authMethod_delete);
});
```

## CreateSession
You can execute the `CreateSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createSession(vars: CreateSessionVariables): MutationPromise<CreateSessionData, CreateSessionVariables>;

interface CreateSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSessionVariables): MutationRef<CreateSessionData, CreateSessionVariables>;
}
export const createSessionRef: CreateSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSession(dc: DataConnect, vars: CreateSessionVariables): MutationPromise<CreateSessionData, CreateSessionVariables>;

interface CreateSessionRef {
  ...
  (dc: DataConnect, vars: CreateSessionVariables): MutationRef<CreateSessionData, CreateSessionVariables>;
}
export const createSessionRef: CreateSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSessionRef:
```typescript
const name = createSessionRef.operationName;
console.log(name);
```

### Variables
The `CreateSession` mutation requires an argument of type `CreateSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSessionVariables {
  device: string;
  ip: string;
}
```
### Return Type
Recall that executing the `CreateSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSessionData {
  session_insert: Session_Key;
}
```
### Using `CreateSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSession, CreateSessionVariables } from '@dataconnect/generated';

// The `CreateSession` mutation requires an argument of type `CreateSessionVariables`:
const createSessionVars: CreateSessionVariables = {
  device: ..., 
  ip: ..., 
};

// Call the `createSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSession(createSessionVars);
// Variables can be defined inline as well.
const { data } = await createSession({ device: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSession(dataConnect, createSessionVars);

console.log(data.session_insert);

// Or, you can use the `Promise` API.
createSession(createSessionVars).then((response) => {
  const data = response.data;
  console.log(data.session_insert);
});
```

### Using `CreateSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSessionRef, CreateSessionVariables } from '@dataconnect/generated';

// The `CreateSession` mutation requires an argument of type `CreateSessionVariables`:
const createSessionVars: CreateSessionVariables = {
  device: ..., 
  ip: ..., 
};

// Call the `createSessionRef()` function to get a reference to the mutation.
const ref = createSessionRef(createSessionVars);
// Variables can be defined inline as well.
const ref = createSessionRef({ device: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSessionRef(dataConnect, createSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.session_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.session_insert);
});
```

## UpdateSession
You can execute the `UpdateSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSession(vars: UpdateSessionVariables): MutationPromise<UpdateSessionData, UpdateSessionVariables>;

interface UpdateSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSessionVariables): MutationRef<UpdateSessionData, UpdateSessionVariables>;
}
export const updateSessionRef: UpdateSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSession(dc: DataConnect, vars: UpdateSessionVariables): MutationPromise<UpdateSessionData, UpdateSessionVariables>;

interface UpdateSessionRef {
  ...
  (dc: DataConnect, vars: UpdateSessionVariables): MutationRef<UpdateSessionData, UpdateSessionVariables>;
}
export const updateSessionRef: UpdateSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSessionRef:
```typescript
const name = updateSessionRef.operationName;
console.log(name);
```

### Variables
The `UpdateSession` mutation requires an argument of type `UpdateSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSessionVariables {
  id: UUIDString;
  device: string;
}
```
### Return Type
Recall that executing the `UpdateSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSessionData {
  session_update?: Session_Key | null;
}
```
### Using `UpdateSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSession, UpdateSessionVariables } from '@dataconnect/generated';

// The `UpdateSession` mutation requires an argument of type `UpdateSessionVariables`:
const updateSessionVars: UpdateSessionVariables = {
  id: ..., 
  device: ..., 
};

// Call the `updateSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSession(updateSessionVars);
// Variables can be defined inline as well.
const { data } = await updateSession({ id: ..., device: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSession(dataConnect, updateSessionVars);

console.log(data.session_update);

// Or, you can use the `Promise` API.
updateSession(updateSessionVars).then((response) => {
  const data = response.data;
  console.log(data.session_update);
});
```

### Using `UpdateSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSessionRef, UpdateSessionVariables } from '@dataconnect/generated';

// The `UpdateSession` mutation requires an argument of type `UpdateSessionVariables`:
const updateSessionVars: UpdateSessionVariables = {
  id: ..., 
  device: ..., 
};

// Call the `updateSessionRef()` function to get a reference to the mutation.
const ref = updateSessionRef(updateSessionVars);
// Variables can be defined inline as well.
const ref = updateSessionRef({ id: ..., device: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSessionRef(dataConnect, updateSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.session_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.session_update);
});
```

## DeleteSession
You can execute the `DeleteSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteSession(vars: DeleteSessionVariables): MutationPromise<DeleteSessionData, DeleteSessionVariables>;

interface DeleteSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSessionVariables): MutationRef<DeleteSessionData, DeleteSessionVariables>;
}
export const deleteSessionRef: DeleteSessionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteSession(dc: DataConnect, vars: DeleteSessionVariables): MutationPromise<DeleteSessionData, DeleteSessionVariables>;

interface DeleteSessionRef {
  ...
  (dc: DataConnect, vars: DeleteSessionVariables): MutationRef<DeleteSessionData, DeleteSessionVariables>;
}
export const deleteSessionRef: DeleteSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteSessionRef:
```typescript
const name = deleteSessionRef.operationName;
console.log(name);
```

### Variables
The `DeleteSession` mutation requires an argument of type `DeleteSessionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteSessionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteSessionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteSessionData {
  session_delete?: Session_Key | null;
}
```
### Using `DeleteSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteSession, DeleteSessionVariables } from '@dataconnect/generated';

// The `DeleteSession` mutation requires an argument of type `DeleteSessionVariables`:
const deleteSessionVars: DeleteSessionVariables = {
  id: ..., 
};

// Call the `deleteSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteSession(deleteSessionVars);
// Variables can be defined inline as well.
const { data } = await deleteSession({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteSession(dataConnect, deleteSessionVars);

console.log(data.session_delete);

// Or, you can use the `Promise` API.
deleteSession(deleteSessionVars).then((response) => {
  const data = response.data;
  console.log(data.session_delete);
});
```

### Using `DeleteSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteSessionRef, DeleteSessionVariables } from '@dataconnect/generated';

// The `DeleteSession` mutation requires an argument of type `DeleteSessionVariables`:
const deleteSessionVars: DeleteSessionVariables = {
  id: ..., 
};

// Call the `deleteSessionRef()` function to get a reference to the mutation.
const ref = deleteSessionRef(deleteSessionVars);
// Variables can be defined inline as well.
const ref = deleteSessionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteSessionRef(dataConnect, deleteSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.session_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.session_delete);
});
```

## AddUserRole
You can execute the `AddUserRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addUserRole(vars: AddUserRoleVariables): MutationPromise<AddUserRoleData, AddUserRoleVariables>;

interface AddUserRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddUserRoleVariables): MutationRef<AddUserRoleData, AddUserRoleVariables>;
}
export const addUserRoleRef: AddUserRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addUserRole(dc: DataConnect, vars: AddUserRoleVariables): MutationPromise<AddUserRoleData, AddUserRoleVariables>;

interface AddUserRoleRef {
  ...
  (dc: DataConnect, vars: AddUserRoleVariables): MutationRef<AddUserRoleData, AddUserRoleVariables>;
}
export const addUserRoleRef: AddUserRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addUserRoleRef:
```typescript
const name = addUserRoleRef.operationName;
console.log(name);
```

### Variables
The `AddUserRole` mutation requires an argument of type `AddUserRoleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddUserRoleVariables {
  role: string;
}
```
### Return Type
Recall that executing the `AddUserRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddUserRoleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddUserRoleData {
  userRole_insert: UserRole_Key;
}
```
### Using `AddUserRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addUserRole, AddUserRoleVariables } from '@dataconnect/generated';

// The `AddUserRole` mutation requires an argument of type `AddUserRoleVariables`:
const addUserRoleVars: AddUserRoleVariables = {
  role: ..., 
};

// Call the `addUserRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addUserRole(addUserRoleVars);
// Variables can be defined inline as well.
const { data } = await addUserRole({ role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addUserRole(dataConnect, addUserRoleVars);

console.log(data.userRole_insert);

// Or, you can use the `Promise` API.
addUserRole(addUserRoleVars).then((response) => {
  const data = response.data;
  console.log(data.userRole_insert);
});
```

### Using `AddUserRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addUserRoleRef, AddUserRoleVariables } from '@dataconnect/generated';

// The `AddUserRole` mutation requires an argument of type `AddUserRoleVariables`:
const addUserRoleVars: AddUserRoleVariables = {
  role: ..., 
};

// Call the `addUserRoleRef()` function to get a reference to the mutation.
const ref = addUserRoleRef(addUserRoleVars);
// Variables can be defined inline as well.
const ref = addUserRoleRef({ role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addUserRoleRef(dataConnect, addUserRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userRole_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userRole_insert);
});
```

## RemoveUserRole
You can execute the `RemoveUserRole` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
removeUserRole(vars: RemoveUserRoleVariables): MutationPromise<RemoveUserRoleData, RemoveUserRoleVariables>;

interface RemoveUserRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveUserRoleVariables): MutationRef<RemoveUserRoleData, RemoveUserRoleVariables>;
}
export const removeUserRoleRef: RemoveUserRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
removeUserRole(dc: DataConnect, vars: RemoveUserRoleVariables): MutationPromise<RemoveUserRoleData, RemoveUserRoleVariables>;

interface RemoveUserRoleRef {
  ...
  (dc: DataConnect, vars: RemoveUserRoleVariables): MutationRef<RemoveUserRoleData, RemoveUserRoleVariables>;
}
export const removeUserRoleRef: RemoveUserRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the removeUserRoleRef:
```typescript
const name = removeUserRoleRef.operationName;
console.log(name);
```

### Variables
The `RemoveUserRole` mutation requires an argument of type `RemoveUserRoleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RemoveUserRoleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `RemoveUserRole` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RemoveUserRoleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RemoveUserRoleData {
  userRole_delete?: UserRole_Key | null;
}
```
### Using `RemoveUserRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, removeUserRole, RemoveUserRoleVariables } from '@dataconnect/generated';

// The `RemoveUserRole` mutation requires an argument of type `RemoveUserRoleVariables`:
const removeUserRoleVars: RemoveUserRoleVariables = {
  id: ..., 
};

// Call the `removeUserRole()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await removeUserRole(removeUserRoleVars);
// Variables can be defined inline as well.
const { data } = await removeUserRole({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await removeUserRole(dataConnect, removeUserRoleVars);

console.log(data.userRole_delete);

// Or, you can use the `Promise` API.
removeUserRole(removeUserRoleVars).then((response) => {
  const data = response.data;
  console.log(data.userRole_delete);
});
```

### Using `RemoveUserRole`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, removeUserRoleRef, RemoveUserRoleVariables } from '@dataconnect/generated';

// The `RemoveUserRole` mutation requires an argument of type `RemoveUserRoleVariables`:
const removeUserRoleVars: RemoveUserRoleVariables = {
  id: ..., 
};

// Call the `removeUserRoleRef()` function to get a reference to the mutation.
const ref = removeUserRoleRef(removeUserRoleVars);
// Variables can be defined inline as well.
const ref = removeUserRoleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = removeUserRoleRef(dataConnect, removeUserRoleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.userRole_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.userRole_delete);
});
```

## LogSecurityEvent
You can execute the `LogSecurityEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logSecurityEvent(vars: LogSecurityEventVariables): MutationPromise<LogSecurityEventData, LogSecurityEventVariables>;

interface LogSecurityEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogSecurityEventVariables): MutationRef<LogSecurityEventData, LogSecurityEventVariables>;
}
export const logSecurityEventRef: LogSecurityEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logSecurityEvent(dc: DataConnect, vars: LogSecurityEventVariables): MutationPromise<LogSecurityEventData, LogSecurityEventVariables>;

interface LogSecurityEventRef {
  ...
  (dc: DataConnect, vars: LogSecurityEventVariables): MutationRef<LogSecurityEventData, LogSecurityEventVariables>;
}
export const logSecurityEventRef: LogSecurityEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logSecurityEventRef:
```typescript
const name = logSecurityEventRef.operationName;
console.log(name);
```

### Variables
The `LogSecurityEvent` mutation requires an argument of type `LogSecurityEventVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogSecurityEventVariables {
  event: string;
  ip?: string | null;
}
```
### Return Type
Recall that executing the `LogSecurityEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogSecurityEventData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogSecurityEventData {
  securityLog_insert: SecurityLog_Key;
}
```
### Using `LogSecurityEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logSecurityEvent, LogSecurityEventVariables } from '@dataconnect/generated';

// The `LogSecurityEvent` mutation requires an argument of type `LogSecurityEventVariables`:
const logSecurityEventVars: LogSecurityEventVariables = {
  event: ..., 
  ip: ..., // optional
};

// Call the `logSecurityEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logSecurityEvent(logSecurityEventVars);
// Variables can be defined inline as well.
const { data } = await logSecurityEvent({ event: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logSecurityEvent(dataConnect, logSecurityEventVars);

console.log(data.securityLog_insert);

// Or, you can use the `Promise` API.
logSecurityEvent(logSecurityEventVars).then((response) => {
  const data = response.data;
  console.log(data.securityLog_insert);
});
```

### Using `LogSecurityEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logSecurityEventRef, LogSecurityEventVariables } from '@dataconnect/generated';

// The `LogSecurityEvent` mutation requires an argument of type `LogSecurityEventVariables`:
const logSecurityEventVars: LogSecurityEventVariables = {
  event: ..., 
  ip: ..., // optional
};

// Call the `logSecurityEventRef()` function to get a reference to the mutation.
const ref = logSecurityEventRef(logSecurityEventVars);
// Variables can be defined inline as well.
const ref = logSecurityEventRef({ event: ..., ip: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logSecurityEventRef(dataConnect, logSecurityEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.securityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.securityLog_insert);
});
```

