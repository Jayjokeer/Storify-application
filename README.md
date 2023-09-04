# Storify-application
Storify is a Node.js application built with Express and Mongoose, 
designed to provide a simple and efficient platform for creating and managing stories. 
This README file provides an overview of the application, installation instructions, and usage guidelines.

DEPENDACIES USED
.Express
.Mongoose
.Passport
.passport-google-oauth20
.Bcrypt
.Jsonwebtoken(JWT)
.Express-handlebars

FEATURES
User registration and authentication using Passport Users can create an account, log in, and manage their own stories.
Story creation and management: Users can create, edit, and delete their own stories.
Responsive design: The application is built with a responsive layout to provide a seamless experience across different devices.
ISTALLATION
To run Storify locally on your machine, follow these steps:

Clone the repository:
git clone https://github.com/your-username/storify-application.git
Navigate to the project directory:
cd storify-application
Install the dependencies:
npm install.
Set up the environment variables:
Create a .env file in the root of the project.
Define the following variables in the .env file:
MONGO_URI: Connection URI for your MongoDB database.
SESSION_SECRET: A secret key used to sign session cookies.
OAUTH_ID: Your passport id.
OAUTH_SECRET:Your passport secret.
PORT: Port number on which the application will run (default is 8000).

CONTRIBUTING
Contributions to Storify are welcome! 
If you find a bug or have an idea for an improvement, 
please open an issue or submit a pull request on the GitHub repository.

LICENSE
This project is licensed under the ISC License.
