# Base image
FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY money-map/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY money-map .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
