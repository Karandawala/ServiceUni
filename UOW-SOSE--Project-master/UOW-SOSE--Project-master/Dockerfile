# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files into the container
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the Nuxt.js application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Define the command to start the application
CMD ["yarn", "start"]
