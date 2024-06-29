FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
RUN npm install
RUN npm install -g next

# Copy the rest of the application code to the working directory
COPY . .
RUN npm run build
# Start the server
CMD ["npm", "start"]
