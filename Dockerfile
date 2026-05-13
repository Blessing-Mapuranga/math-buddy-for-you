# Frontend React App Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* bun.lockb* ./

# Install dependencies
RUN npm install

# Copy application
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Install serve to run the app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5173

# Start application
CMD ["serve", "-s", "dist", "-l", "5173"]
