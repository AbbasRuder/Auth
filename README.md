# Auth
This is a basic MERN project that focuses on user authentication. The Backend consist of an Express api to authenticate users using JWT and HTTP-Only cookie and the Frontend includes the login and signup page, and once users are authenticated they can change their profile details.


## Tech Stack

  - **Frontend:** React, Redux Toolkit, TailwindCSS, React-Router-DOM
  - **Backend:** Node, Express, MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AbbasRuder/Auth.git
    ```

2. Navigate to the root and frontend directories and install the dependencies:

    ```bash
    npm install

    cd frontend
    npm install
    ```

3. Configure the backend:

    - Create a `.env` file in the root directory and add the following:

        ```makefile
        NODE_ENV=development
        PORT=5000
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        ```

        Replace `your_mongodb_uri` with the connection URI for your MongoDB instance and `your_jwt_secret` with a secret key for JWT.

4. Start the application:

    - To  start both the server concurrently, run the following from the root directory
        ```bash
        npm run dev
        ```

    - Only the Frontend:
        ```bash
        npm run client
        ```

    - Only the Backend:
        ```bash
        npm run server
        ```

5. The Frontend will run at [http://localhost:3000](http://localhost:3000) and the Backend will run at [http://localhost:5000](http://localhost:5000)


