# Blogs API Project

https://nbh-blog-api.herokuapp.com

## Key Features

1. Te Blog App has the functionality of Blog Creation and User Management.
2. The User is expected to Register with the system and subsequently login to the system for creating/editing Blogs. 
3. A valid login or registration is mandatory to access the Blogs.
4. Any authenticated user can Create blogs, While only the owner of Blog can Modify or Delete it.
5. The Blogs can be Created, Read , Updated or Deleted.
6. Users can be Registered , Viewed, Updated ,Deleted.
7. A Registered user can login to the system at any point of time.
 

## Blogs Schema

  * created_by: **_string, required_**
  * created_at: **_date, required  Default to current date_**
  * blog_title: **_string, required_**
  * blog_content: **_string, required_**
  * private: **_boolean, required_**
  * user : **_ObjectId, refrences User Schema, {id, email}_**


## User Schema
   * username: **_string, required_**
   * email: **_string, required_**
   * birthday: **_date, required_**
   * age: **_number_**
   * password: **_string, required_**

## User Validation

* UserName : Needs to be Alphanumeric
* Email : Should be a valid email type
* Password : Should be a minimum of 8 Characters
* Age : Should be greater than 13


## Environment Variables

* MONGO_DB_URI
* MY_SECRET_KEY 


## Technology

* This Project has been developed using NodeJS, Express and data is stored in MongoDB.
* We have used Postman to test the routes and the application is hosted on Heroku.
* User password is hashed using bcrypt
* User authentication is performed using jsonwebtoken
* Also, the following packages have been installed


* nodemon
* bcrypt
* dotenv
* express
* express-validator
* helmet
* jsonwebtoken
* mongoose
* morgan


## Routes - Functionality

### app.use('/blogs') - Blogs Router

1. router.get('/') - An authorized user can view all public and private Blogs
2. router.get('/public') - An authorized user can view all Non private Blogs
3. router.post('/') - An authorized user can create a new Blog
4. router.get('/:id') - An authorized user can view a specific Blog
5. router.put('/:id') - Only the user who created the Blog can Modify it
6. router.delete('/:id') - Only the user who created the Blog can Delete it

### app.use('/auth') -Authentication Router

1. router.post('/registration') - Create a new user after checking the Validation rules, Hash the password and  Provide a validation session token
2. router.post('/login') - Login an existing User and Provide a validation session token

### app.use('/users') -Users Router

1. router.get('/') - Get All users
2. router.put('/:id') - Modify an User's Details
3. router.delete('/:id') - Delete an User