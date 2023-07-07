# Blog-api
This is a REST API for managing blog posts and users.
## Method 1
1. Clone the repository:
   
   ```
   git clone https://github.com/anandhu657/Blog-api.git
   ```
2. Navigate to the project directory:

   ```
   cd Blog-api
   ```
3. Install the dependencies:

   ```
   npm install
   ```
4. Create a **.env** file in the root directory by renaming the provided **.env.example** file:
5. Open the **.env** file in a text editor and modify the following variables based on the conditions given in the **.env** file:

   ```
   PORT = 3000
   MONGO_URI = mongodb://127.0.0.1:27017/Blogger
   ACCESS_TOKEN = your_secret_token
   ```
6. Start the server

   ```
   npm start
   ```
## Method 2
1. Start the MongoDB container using Docker:

   ```
   docker-compose up --build
   ```
## API Endpoints
Access the application in your browser at http://localhost:3000
## Users
1. **POST /user/register** : User signup

   ```
   {
     "username":"Arjun",
     "email":"arjun@gmail.com",
     "password":"1234"
   }
   ```
2. **POST /user/login** : User login

   ```
   {
     "email":"arjun@gmail.com",
     "password":"1234"
   }
   ```
## Posts
1. **POST /blog** : Create a new blog post.

   ```
   {
     "title":"hai",
     "description":"about hai"
   }
   ```
2. **GET /blog** : List all blog posts.
3. **PUT /blog** : Update an existing blog post.

   ```
   {
    "id":"64a677e6880bbaec0d5b9381",
    "title":"sfsdf",
    "description":"nice"
   }
   ```
4. **DELETE /blog/:id** : Delete a blog post.
5. **GET /blog/:id** : Retrieve a specific blog post by ID
## Comments
1. **POST /blog/comment** : Add a comment to a blog post.

   ```
   {
     "text":"hello",
     "post":"64a677e6880bbaec0d5b9381"
   }
   ```
2. **GET /blog/comment/:id** : List comments for a specific blog post.

   
