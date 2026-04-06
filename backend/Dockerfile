#Stage 1
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

#Stage 2
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app /app
RUN npm prune --production

# Bundle backend source files
COPY . /app

# Expose the API port
EXPOSE 5500

# Start the server
CMD ["node", "server.js"]
