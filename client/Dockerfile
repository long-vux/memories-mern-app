# frontend/Dockerfile

# Use an official Node runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install  --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expose port 3000
EXPOSE 3000