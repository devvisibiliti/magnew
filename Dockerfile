# Use official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build (if frontend like React/Vue)
RUN npm run build

# Expose port (change if needed)
EXPOSE 3000

# Start app
CMD ["npm", "run", "dev"]