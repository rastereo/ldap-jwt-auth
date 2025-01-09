# LDAP JWT Authentication

This project provides a secure authentication system using LDAP for user verification and JWT (JSON Web Tokens) for session management. It is built with Express.js and includes various security features such as rate limiting, CORS, and helmet for HTTP headers.

## Features

- **LDAP Authentication**: Integrates with LDAP servers to authenticate users.
- **JWT Tokens**: Uses JSON Web Tokens for secure session management.
- **Rate Limiting**: Protects against brute-force attacks with rate limiting.
- **CORS**: Configurable Cross-Origin Resource Sharing (CORS) settings.
- **Helmet**: Secures HTTP headers using the Helmet middleware.
- **Environment Variables**: Uses `envalid` for environment variable validation.
- **Logging**: Utilizes `pino` for efficient logging.
- **Validation**: Implements request validation using `celebrate` and `joi`.