# Node-express-api
Production ready basic api with node, express, zod, cors, env, nodemon

###
Step 1:
npm init -y

###
Step 2: 
npm i express zod dotenv cors @libsql/client

###
Step 4: 
npm i mysql2 bcryptjs jsonwebtoken express-rate-limit

###
Step 4: 
npm i -D nodemon

###
Step 5: Generate new  JWT_SECRET (run in terminal)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

