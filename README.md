# Zplatform
Company Z provides essential online services for tens of thousands of users through their platform ZPlatform.

This repo contains the source code of the potential user account management on Zplatform with smooth onboarding process of new users while storing and managing user data with high security and scalability. This includes both the frontend and backend code.

### [Video Walkthrough : Demo (CLICK ME)](https://drive.google.com/file/d/1nVlv0fVQCONGSGWQWuK0pHfqa_OZ03CQ/view?usp=sharing)

## Prerequisites

1. `Node.js`: Ensure that Node.js is installed on your machine. You can download and install it from the official Node.js website.
2. `MongoDB`: Install MongoDB on your system. Visit the MongoDB website for instructions specific to your operating system. Make sure the MongoDB server is running before running the project.
3. `Package Manager`: Use a package manager like npm (Node Package Manager) or Yarn to manage dependencies and install project-specific packages. npm is bundled with Node.js, so it should already be available.
4. `Configuration`: Set up the configuration for connecting to the MongoDB database. This may involve providing the connection URL, database name, and any required authentication credentials. Refer to the project documentation or configuration files for specific details.

## Additional requirements

- `Cloudinary Account`: Sign up for a Cloudinary account at the Cloudinary website (cloudinary.com) if you haven't already. This account will provide you with the necessary credentials to integrate Cloudinary into the project.

- `Cloudinary SDK`: Install the Cloudinary SDK or package required by the project. You can typically install it by running the command npm install cloudinary or yarn add cloudinary.

- `Cloudinary Configuration`: Configure your Cloudinary account by providing the required credentials in the project. This typically includes the cloud name, API key, and API secret. Refer to the Cloudinary documentation for the specific steps and configuration details.

- `Mailtrap Account`: Create an account on Mailtrap (mailtrap.io) if you don't have one. Mailtrap is a service that allows testing and intercept emails sent from the application without actually sending them to real email addresses.

- `Mailtrap Configuration`: Set up your Mailtrap account by obtaining the SMTP settings provided by Mailtrap. These settings typically include the SMTP host, port, username, and password. Update the project's email configuration with the Mailtrap SMTP settings to enable email testing in a development environment.


## Run the application
1. Clone this repo by running `git clone https://github.com/Francoise02/Zplatform.git`
2. Install all needed dependencies by running `npm install` or `yarn install`
3. Create a `.env` file
4. Copy all of the fields from `.env.example`, paste them in `.env` file and provide values for them
5. Start Local server by running `npm run dev`

