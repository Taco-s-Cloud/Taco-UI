# Step 1: Build the React app
FROM node:18 as build

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Use nginx to serve the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the nginx server
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
