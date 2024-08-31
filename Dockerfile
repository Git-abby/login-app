# 1. Use an official Node.js runtime as a parent image
FROM node:18-alpine

# 2. Set the working directory in the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application files
COPY . .

# 6. Build the React app for production
RUN npm run build

# 7. Install a simple HTTP server to serve the build
RUN npm install -g serve

# 8. Set the environment variable to be used in the container
ENV NODE_ENV=production

# 9. Expose the port that your application will run on
EXPOSE 3000

# 10. Command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
