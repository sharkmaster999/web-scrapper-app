FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm install -g nodemon
EXPOSE 3000
CMD ["npm", "run", "dev"]
