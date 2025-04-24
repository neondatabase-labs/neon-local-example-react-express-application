# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build only if NODE_ENV is 'prod'
RUN if [ "$NODE_ENV" = "prod" ]; then npm run build; fi

# Command to run the app
# In dev mode, just run `npm run dev`. In prod mode, first build, then run `npm run dev`.
CMD if [ "$NODE_ENV" = "prod" ]; then npm run build && npm run dev; else npm run dev; fi
