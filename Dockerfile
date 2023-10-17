FROM node:16.20.2-alpine3.18

WORKDIR /usr/src

COPY package*.json ./

#RUN npm ci --only=production
RUN npm install 
#--frozen-lockfile

#COPY tsconfig.json ./

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node","dist/app.js" ]


# FROM node:16.20.2-alpine3.18 as deps
# WORKDIR /app


# COPY package*.json ./
# RUN  npm install --frozen-lockfile


# FROM node:16.20.2-alpine3.18 as build
# WORKDIR /app

# COPY --from=deps /app/node_modules ./node_modules

# COPY . .
# RUN npm run build

# FROM node:16.20.2-alpine3.18 as runner

# WORKDIR /app

# COPY package*.json ./
# RUN npm install --prod
# COPY --from=build /app/dist ./dist

# EXPOSE 3000

# CMD [ "node","dist/app" ]