FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with a simple static server
FROM node:14-alpine

# Install `serve` to serve the build directory
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/build /app/build

# Set the working directory to the build output directory
WORKDIR /app/build

# Start the server
CMD ["serve", "-s", ".", "-l", "3000"]
