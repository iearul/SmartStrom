# Use an official Node.js runtime as a parent image
FROM node:lts-buster

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app's source code inside the container
COPY . .

# Copy startup script
COPY ./.docker/startup.sh /bin/startup.sh

# Make startup script executable
RUN chmod +x /bin/startup.sh

# Expose the port that your Node.js app will run on
EXPOSE 3000

# Define the command to run your Node.js app
CMD ["npm", "start"]
