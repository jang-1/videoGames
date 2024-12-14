# Web Application for Master's Thesis

This web application was created as part of a master's thesis project. The application is divided into frontend and backend sections. The goal was to create a web application for video game enthusiasts, featuring a homepage with the latest news, a games page, a creators page, and more.

## Demo

You can watch demo video, to see how application looks like

## Getting Started

To run the application, follow these steps:
## Frontend

    Navigate to the frontend folder.
    Install the dependencies:

    npm install

Create and populate a .env file in the frontend folder with the following variables:

env

    VITE_API_KEY=your_api_key (You can generate key on https://rawg.io/)

    
    VITE_EMAIL_SERVICE=your_email_service (You can find service on https://www.emailjs.com/)
    VITE_EMAIL_TEMPLATE=your_email_template (You can find template on https://www.emailjs.com/)
    VITE_EMAIL_KEY=your_email_key (You can find email key on https://www.emailjs.com/)

Start frontend appliaction
    
    npm run dev

## Backend

    Navigate to the backend folder.
    Install the dependencies:

    npm install

Create and populate a .env file in the backend folder with the following variables:

env

    PORT=your_port
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASS=your_db_password
    DB_NAME=your_db_name
    SECRET_KEY=your_secret_key

Start server
    
    npm start

## Technologies Used

    Frontend: The frontend of the application is built using React.
    Backend: The backend is developed using Express.

Ensure that you correctly configure the .env files with the necessary keys and passwords for the application to function properly.