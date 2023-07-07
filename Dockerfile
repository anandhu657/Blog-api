FROM node:18-alpine

# Create the application directory
WORKDIR /app

# Copy the application files
COPY . .

# Install the application dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]
    