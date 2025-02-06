# Blog Backend

<!-- Live URL: [https://blogs-phl-2-a3.vercel.app/](https://blogs-phl-2-a3.vercel.app/) -->

## User Roles

# Admin

- Can block any user by updating a property isBlocked.
- Cannot update any blog.

# User

- Cannot perform admin actions.

## Features

# Authentication

- User can register by providing name, email and password. By default the role will be user.
- User can login by providing email and password. After login user will get a token which needed to post or edit blogs for user role and for admin role to perform User and Blog manipulation

# Admin Actions

- Admin can block User by user ID

to perform admin actions you have to provide this credentials(admin account for test perpose) in the request body

```bash
{
    "email": "admin@gmail.com",
    "password": "admin123"
}
```

## Technology used

✔ Node.js

✔ Express.js

✔ Mongoose

✔ TypeScript

✔ JasonWebToken

## How to install

To run the project just clone and run this comand in the terminal

```bash
  npm run install
```

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`BYCRYPT_SALT_ROUNDS`

`NODE_ENV`

`JWT_LOGIN_TOKEN_SECRET`

## Shurjopay env file

```bash
{
  SP_ENDPOINT = https://sandbox.shurjopayment.com
  SP_USERNAME = sp_sandbox
  SP_PASSWORD = pyyk97hu&6u6
  SP_PREFIX = SP
  SP_RETURN_URL = https://sandbox.shurjopayment.com/response
}
```

Create Section Process: Interface > Validation > Model > Service > Controller > Route
