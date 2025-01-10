# LDAP JWT Authentication

This project provides a secure authentication system using LDAP for user verification and JWT (JSON Web Tokens) for session management. It is built with Express.js and includes various security features such as rate limiting, CORS, and helmet for HTTP headers. The JWT is securely transmitted in an HTTP-only cookie to enhance security and prevent access from client-side scripts.

## 📋Features

- **LDAP Authentication**: Integrates with LDAP servers to authenticate users.
- **JWT Tokens**: Uses JSON Web Tokens for secure session management.
- **Rate Limiting**: Protects against brute-force attacks with rate limiting.
- **CORS**: Configurable Cross-Origin Resource Sharing (CORS) settings.
- **Helmet**: Secures HTTP headers using the Helmet middleware.
- **Environment Variables**: Uses `envalid` for environment variable validation.
- **Logging**: Utilizes `pino` for efficient logging.
- **Validation**: Implements request validation using `celebrate` and `joi`.

## 🛠️Installation

1. Clone the repository:

```bash
git clone https://github.com/rastereo/ldap-jwt-auth.git
cd ldap-jwt-auth
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and configure the necessary environment variables. Refer to `utils/envalid.ts` for the required variables.

## 🚀Usage

### Running the Application

- **Production**: Build and start the application.

```bash
npm run build
npm run start
```

- **Development**: Use nodemon for hot-reloading during development.

```bash
npm run dev
```

### Generating Secret Key

Generate a JWT secret key:

```bash
npm run key
```

### Testing

```bash
npm run test
```

## 📑API Endpoints

- `POST /login`: Authenticate a user with LDAP and return a JWT token.

- `GET /verify`: Verify the JWT token and return the user's name.

- `GET /logout`: Invalidate the JWT token by deleting the cookie.

## ⚙️Configuration

This table outlines every configuration variable along with their types, default values, and brief descriptions of their purposes.

| Environment Variable     | Type   | Default Value        | Description                                                                  |
| ------------------------ | ------ | -------------------- | ---------------------------------------------------------------------------- |
| NODE_ENV                 | string | production           | Defines the environment for execution ['development', 'production', 'test']. |
| PORT                     | port   | 3000                 | Port for the application.                                                    |
| DEV_PORT                 | port   |                      | Development port for the application.                                        |
| TRUST_PROXY_LEVEL        | number | 0                    | Sets the level of trust for proxy servers in Express.                        |
| LOGIN_PATH               | string | /login               | URL path for login endpoint.                                                 |
| VERIFY_PATH              | string | /verify              | URL path for token verification.                                             |
| LOGOUT_PATH              | string | /logout              | URL path for logout endpoint.                                                |
| LDAP_URL                 | url    | ldap://localhost:389 | URL to the LDAP server.                                                      |
| LDAP_BIND_DN             | string |                      | DN for LDAP binding.                                                         |
| LDAP_BIND_CREDENTIAL     | string |                      | Credentials for LDAP binding.                                                |
| LDAP_SEARCH_BASE         | string |                      | Base search path in LDAP.                                                    |
| LDAP_SEARCH_FILTER_EMAIL | string |                      | Search filter for email in LDAP.                                             |
| LDAP_SEARCH_FILTER_UID   | string |                      | Search filter for UID in LDAP.                                               |
| JWT_SECRET               | string |                      | Secret key for signing JWT tokens.                                           |
| JWT_EXPIRES_IN           | string | 1d                   | Expiration for JWT tokens.                                                   |
| JWT_COOKIE_NAME          | string | jwt                  | Name of the cookie storing JWT token.                                        |
| MIN_USERNAME_LENGTH      | number | 3                    | Minimum username length allowed.                                             |
| MAX_USERNAME_LENGTH      | number | 50                   | Maximum username length allowed.                                             |
| MIN_PASSWORD_LENGTH      | number | 8                    | Minimum password length allowed.                                             |
| CORS_ALLOWED_ORIGIN      | string | \*                   | Allowed origin for CORS.                                                     |
| COOKIE_MAX_AGE           | number | 86400                | Max age for cookies in seconds.                                              |
| COOKIE_HTTP_ONLY         | bool   | true                 | If true, cookie is only accessible via HTTP(S), not JavaScript.              |
| COOKIE_SECURE            | bool   | false                | If true, cookie is only sent over HTTPS.                                     |
| COOKIE_PATH              | string | /                    | Path within the site for which the cookie is valid.                          |
| COOKIE_SAME_SITE         | string | none                 | SameSite attribute for cookies ['lax', 'strict', 'none'].                    |
| RATE_LIMIT               | number | 100                  | Maximum number of requests in the rate limit window.                         |
| RATE_LIMIT_WINDOW_MS     | number | 600000 (6e5)         | Duration of the rate limit window in milliseconds.                           |
| WRITE_LOGS               | bool   | true                 | If true, logs are written to the log store.                                  |
| LOGS_TO_CONSOLE          | bool   | true                 | If true, logs are output to the console.                                     |
| TEST_PORT                | port   | 4000                 | Port for running tests.                                                      |
| TEST_LDAP_UID            | string | user                 | Test user UID for LDAP.                                                      |
| TEST_LDAP_EMAIL          | email  | user@example.com     | Test user email for LDAP.                                                    |
| TEST_LDAP_PASSWORD       | string | password             | Test user password for LDAP.                                                 |

## 🧪 Testing with Online LDAP Test Server

You can test the LDAP authentication functionality using the Online LDAP Test Server provided by [Forumsys](https://www.forumsys.com/2022/05/10/online-ldap-test-server/). This server is a free, publicly available LDAP server designed for testing and development purposes.

### Steps to Test:

1. Update your `.env` file with the following credentials provided by the Forumsys LDAP Test Server:

```
LDAP_URL=ldap://ldap.forumsys.com:389
LDAP_BIND_DN=cn=read-only-admin,dc=example,dc=com
LDAP_BIND_CREDENTIAL=password
LDAP_SEARCH_BASE=dc=example,dc=com
LDAP_SEARCH_FILTER_EMAIL=(mail={{email}})
LDAP_SEARCH_FILTER_UID=(uid={{username}})
```

2. The Forumsys LDAP Test Server provides several test users. Here are some examples:

| Username | Password | Email                |
| -------- | -------- | -------------------- |
| einstein | password | einstein@example.com |
| newton   | password | newton@example.com   |
| galieleo | password | galieleo@example.com |

3. Start the application and use the /login endpoint to authenticate with the test users.

```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{"username": "einstein", "password": "password"}'
```

4. If the credentials are correct, the server will return a JWT token in an HTTP-only cookie. You can then use the /verify endpoint to validate the token and retrieve user information.
