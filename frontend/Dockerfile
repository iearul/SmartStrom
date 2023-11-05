# Use an official Node.js runtime as a parent image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build

# Use a smaller, production-ready base image for serving the app
FROM nginx:alpine

# Copy the built Angular app from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port that Nginx will run on (usually 80)
EXPOSE 80

# The Nginx process is run by default
CMD ["nginx", "-g", "daemon off;"]
