# Node.js Dockerfile

# Use the official Node.js image
FROM node:18

# Create and set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port (match this with your backend server port)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
