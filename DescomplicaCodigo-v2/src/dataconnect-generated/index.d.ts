import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddUserRoleData {
  userRole_insert: UserRole_Key;
}

export interface AddUserRoleVariables {
  role: string;
}

export interface AuthMethod_Key {
  id: UUIDString;
  __typename?: 'AuthMethod_Key';
}

export interface CreateAuthMethodData {
  authMethod_insert: AuthMethod_Key;
}

export interface CreateAuthMethodVariables {
  type: string;
  id: string;
}

export interface CreateSessionData {
  session_insert: Session_Key;
}

export interface CreateSessionVariables {
  device: string;
  ip: string;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  displayName?: string | null;
}

export interface DeleteAuthMethodData {
  authMethod_delete?: AuthMethod_Key | null;
}

export interface DeleteAuthMethodVariables {
  id: UUIDString;
}

export interface DeleteSessionData {
  session_delete?: Session_Key | null;
}

export interface DeleteSessionVariables {
  id: UUIDString;
}

export interface DeleteUserData {
  user_delete?: User_Key | null;
}

export interface GetCurrentUserData {
  user?: {
    email: string;
    displayName?: string | null;
    bio?: string | null;
  };
}

export interface GetMyRolesData {
  userRoles: ({
    roleName: string;
  })[];
}

export interface ListMyAuthMethodsData {
  authMethods: ({
    providerType: string;
    providerId: string;
  })[];
}

export interface ListMySecurityLogsData {
  securityLogs: ({
    eventType: string;
    timestamp: TimestampString;
  })[];
}

export interface ListMySessionsData {
  sessions: ({
    deviceName: string;
    lastUsedAt: TimestampString;
  })[];
}

export interface ListUsersData {
  users: ({
    displayName?: string | null;
    avatarUrl?: string | null;
  })[];
}

export interface LogSecurityEventData {
  securityLog_insert: SecurityLog_Key;
}

export interface LogSecurityEventVariables {
  event: string;
  ip?: string | null;
}

export interface RemoveUserRoleData {
  userRole_delete?: UserRole_Key | null;
}

export interface RemoveUserRoleVariables {
  id: UUIDString;
}

export interface SecurityLog_Key {
  id: UUIDString;
  __typename?: 'SecurityLog_Key';
}

export interface Session_Key {
  id: UUIDString;
  __typename?: 'Session_Key';
}

export interface UpdateSessionData {
  session_update?: Session_Key | null;
}

export interface UpdateSessionVariables {
  id: UUIDString;
  device: string;
}

export interface UpdateUserData {
  user_update?: User_Key | null;
}

export interface UpdateUserVariables {
  displayName?: string | null;
  bio?: string | null;
}

export interface UserRole_Key {
  id: UUIDString;
  __typename?: 'UserRole_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface UpdateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserVariables): MutationRef<UpdateUserData, UpdateUserVariables>;
  operationName: string;
}
export const updateUserRef: UpdateUserRef;

export function updateUser(vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;
export function updateUser(dc: DataConnect, vars?: UpdateUserVariables): MutationPromise<UpdateUserData, UpdateUserVariables>;

interface DeleteUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteUserData, undefined>;
  operationName: string;
}
export const deleteUserRef: DeleteUserRef;

export function deleteUser(): MutationPromise<DeleteUserData, undefined>;
export function deleteUser(dc: DataConnect): MutationPromise<DeleteUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface CreateAuthMethodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuthMethodVariables): MutationRef<CreateAuthMethodData, CreateAuthMethodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAuthMethodVariables): MutationRef<CreateAuthMethodData, CreateAuthMethodVariables>;
  operationName: string;
}
export const createAuthMethodRef: CreateAuthMethodRef;

export function createAuthMethod(vars: CreateAuthMethodVariables): MutationPromise<CreateAuthMethodData, CreateAuthMethodVariables>;
export function createAuthMethod(dc: DataConnect, vars: CreateAuthMethodVariables): MutationPromise<CreateAuthMethodData, CreateAuthMethodVariables>;

interface DeleteAuthMethodRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAuthMethodVariables): MutationRef<DeleteAuthMethodData, DeleteAuthMethodVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAuthMethodVariables): MutationRef<DeleteAuthMethodData, DeleteAuthMethodVariables>;
  operationName: string;
}
export const deleteAuthMethodRef: DeleteAuthMethodRef;

export function deleteAuthMethod(vars: DeleteAuthMethodVariables): MutationPromise<DeleteAuthMethodData, DeleteAuthMethodVariables>;
export function deleteAuthMethod(dc: DataConnect, vars: DeleteAuthMethodVariables): MutationPromise<DeleteAuthMethodData, DeleteAuthMethodVariables>;

interface ListMyAuthMethodsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMyAuthMethodsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMyAuthMethodsData, undefined>;
  operationName: string;
}
export const listMyAuthMethodsRef: ListMyAuthMethodsRef;

export function listMyAuthMethods(options?: ExecuteQueryOptions): QueryPromise<ListMyAuthMethodsData, undefined>;
export function listMyAuthMethods(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMyAuthMethodsData, undefined>;

interface CreateSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSessionVariables): MutationRef<CreateSessionData, CreateSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSessionVariables): MutationRef<CreateSessionData, CreateSessionVariables>;
  operationName: string;
}
export const createSessionRef: CreateSessionRef;

export function createSession(vars: CreateSessionVariables): MutationPromise<CreateSessionData, CreateSessionVariables>;
export function createSession(dc: DataConnect, vars: CreateSessionVariables): MutationPromise<CreateSessionData, CreateSessionVariables>;

interface UpdateSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSessionVariables): MutationRef<UpdateSessionData, UpdateSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSessionVariables): MutationRef<UpdateSessionData, UpdateSessionVariables>;
  operationName: string;
}
export const updateSessionRef: UpdateSessionRef;

export function updateSession(vars: UpdateSessionVariables): MutationPromise<UpdateSessionData, UpdateSessionVariables>;
export function updateSession(dc: DataConnect, vars: UpdateSessionVariables): MutationPromise<UpdateSessionData, UpdateSessionVariables>;

interface DeleteSessionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteSessionVariables): MutationRef<DeleteSessionData, DeleteSessionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteSessionVariables): MutationRef<DeleteSessionData, DeleteSessionVariables>;
  operationName: string;
}
export const deleteSessionRef: DeleteSessionRef;

export function deleteSession(vars: DeleteSessionVariables): MutationPromise<DeleteSessionData, DeleteSessionVariables>;
export function deleteSession(dc: DataConnect, vars: DeleteSessionVariables): MutationPromise<DeleteSessionData, DeleteSessionVariables>;

interface ListMySessionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySessionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySessionsData, undefined>;
  operationName: string;
}
export const listMySessionsRef: ListMySessionsRef;

export function listMySessions(options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;
export function listMySessions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySessionsData, undefined>;

interface AddUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddUserRoleVariables): MutationRef<AddUserRoleData, AddUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddUserRoleVariables): MutationRef<AddUserRoleData, AddUserRoleVariables>;
  operationName: string;
}
export const addUserRoleRef: AddUserRoleRef;

export function addUserRole(vars: AddUserRoleVariables): MutationPromise<AddUserRoleData, AddUserRoleVariables>;
export function addUserRole(dc: DataConnect, vars: AddUserRoleVariables): MutationPromise<AddUserRoleData, AddUserRoleVariables>;

interface RemoveUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RemoveUserRoleVariables): MutationRef<RemoveUserRoleData, RemoveUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RemoveUserRoleVariables): MutationRef<RemoveUserRoleData, RemoveUserRoleVariables>;
  operationName: string;
}
export const removeUserRoleRef: RemoveUserRoleRef;

export function removeUserRole(vars: RemoveUserRoleVariables): MutationPromise<RemoveUserRoleData, RemoveUserRoleVariables>;
export function removeUserRole(dc: DataConnect, vars: RemoveUserRoleVariables): MutationPromise<RemoveUserRoleData, RemoveUserRoleVariables>;

interface GetMyRolesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRolesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyRolesData, undefined>;
  operationName: string;
}
export const getMyRolesRef: GetMyRolesRef;

export function getMyRoles(options?: ExecuteQueryOptions): QueryPromise<GetMyRolesData, undefined>;
export function getMyRoles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetMyRolesData, undefined>;

interface LogSecurityEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogSecurityEventVariables): MutationRef<LogSecurityEventData, LogSecurityEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogSecurityEventVariables): MutationRef<LogSecurityEventData, LogSecurityEventVariables>;
  operationName: string;
}
export const logSecurityEventRef: LogSecurityEventRef;

export function logSecurityEvent(vars: LogSecurityEventVariables): MutationPromise<LogSecurityEventData, LogSecurityEventVariables>;
export function logSecurityEvent(dc: DataConnect, vars: LogSecurityEventVariables): MutationPromise<LogSecurityEventData, LogSecurityEventVariables>;

interface ListMySecurityLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMySecurityLogsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMySecurityLogsData, undefined>;
  operationName: string;
}
export const listMySecurityLogsRef: ListMySecurityLogsRef;

export function listMySecurityLogs(options?: ExecuteQueryOptions): QueryPromise<ListMySecurityLogsData, undefined>;
export function listMySecurityLogs(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListMySecurityLogsData, undefined>;

