# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, updateUser, deleteUser, getCurrentUser, listUsers, createAuthMethod, deleteAuthMethod, listMyAuthMethods, createSession, updateSession } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation UpdateUser:  For variables, look at type UpdateUserVars in ../index.d.ts
const { data } = await UpdateUser(dataConnect, updateUserVars);

// Operation DeleteUser: 
const { data } = await DeleteUser(dataConnect);

// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation CreateAuthMethod:  For variables, look at type CreateAuthMethodVars in ../index.d.ts
const { data } = await CreateAuthMethod(dataConnect, createAuthMethodVars);

// Operation DeleteAuthMethod:  For variables, look at type DeleteAuthMethodVars in ../index.d.ts
const { data } = await DeleteAuthMethod(dataConnect, deleteAuthMethodVars);

// Operation ListMyAuthMethods: 
const { data } = await ListMyAuthMethods(dataConnect);

// Operation CreateSession:  For variables, look at type CreateSessionVars in ../index.d.ts
const { data } = await CreateSession(dataConnect, createSessionVars);

// Operation UpdateSession:  For variables, look at type UpdateSessionVars in ../index.d.ts
const { data } = await UpdateSession(dataConnect, updateSessionVars);


```