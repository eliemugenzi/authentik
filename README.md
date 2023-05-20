### Authentik app

Installation Steps

- Make sure the `Node.js` and `npm` application is installed in your device
- Cd into `server` backend folder
- Once you're into the `backend` folder
- Make sure you have `PostgreSQL` installed
- Take a file into `server/env.example`, copy it into `.env` and provide their values accordingly.
- Run `npm install` to have all the backend dependencies installed
- Run `npx prisma migrate dev` to run DB migrations
- Run `npm run start:dev` to run the backend server
- Go back and cd into `client` folder and do `npm install` to install the frontend dependencies
- - Take a file into `client/env.example`, copy it into `.env` and provide their values accordingly.
- Run `npm run dev` to run the frontend dev server