FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Bundle app source files (server.js, frontend folder)
COPY . .

# Expose the API port
EXPOSE 5500

# Start the server
CMD ["node", "server.js"]
