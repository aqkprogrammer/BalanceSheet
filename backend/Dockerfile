# Backend Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# Run the compiled JavaScript file
CMD ["node", "dist/server.js"]
