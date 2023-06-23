# Project: Weather Journal App


## Table of Contents

* [Summary](#summary)
* [Project description](#project-description)
* [Screenshots](#screenshots)
* [Usage](#usage)
* [Demo](#demo)
* [Deployment](#deployment)
* [Technologies used](#technologies-used)
* [Author](#author)
* [Credits](#credits)
* [Dependencies](#dependencies)

## Summary


[Back to top](#table-of-contents)

## Project description



[Back to top](#table-of-contents)

## Screenshots

Here are two screenshots showcasing the project's user interface on both mobile and desktop devices:

### Mobile View

![Mobile](/images/mobile.png)

The mobile view provides a responsive and optimized layout for smaller screens, ensuring a seamless user experience on smartphones and tablets.

### Desktop View

![Desktop](/images/desktop.png)

The desktop view offers a wider screen layout, taking advantage of the additional space to display more content and provide enhanced functionality.

These screenshots provide a glimpse of how the project's user interface is designed and how it adapts to different screen sizes. Please note that these screenshots are for illustrative purposes and may not reflect the latest version or actual content of the project.


[Back to top](#table-of-contents)

## Usage

1. Clone the repository to your local machine.

   ```shell
   git clone https://github.com/kokou2kpadenou/weather-journal-app
   ```

2. Navigate to the project directory.

   ```shell
   cd weather-journal-app
   ```

3. Install the dependencies using a package manager.

   ```shell
   npm install
   ```

4. Run the application.

   ```shell
   npm run dev
   ```
   ```shell
   npm run build-dev
   ```

5. Open your web browser and visit http://localhost:5000 to access the application.

6. Follow the on-screen instructions or explore the available features of the application.

7. To stop the application, press `Ctrl + C` in the terminal.

[Back to top](#table-of-contents)

## Demo

You can see a live demo of this project at 

[Back to top](#table-of-contents)

## Deployment

This project can be easily deployed using the Render deployment service integrated with GitHub. Render provides a simple and streamlined process for hosting and deploying web applications. Here's a step-by-step guide to deploying this project using Render and GitHub:

1. Sign up for a Render account at [render.com](https://render.com) if you haven't already.

2. Fork this project repository on GitHub to your own GitHub account.

3. On the Render dashboard, click on "Add a New Service" and select "Web Service".

4. Choose GitHub as the repository provider and grant Render the necessary permissions to access your repositories.

5. Select the repository that contains your forked project from the list.

6. Configure the deployment settings:
   - Environment: node
   - Build Command: yarn or npm
   - Start Command: node server.js

7. Choose the desired instance type, region, and other options for your deployment.

8. Click on "Create Web Service" to initiate the deployment process.

9. Render will automatically build and deploy your application based on the specified settings. You can monitor the deployment progress on the Render dashboard.

10. Once the deployment is complete, Render will provide you with a unique URL where your application is accessible.

Congratulations! Your application is now deployed using the Render deployment service with GitHub integration. Any changes you push to your GitHub repository will trigger automatic redeployment on Render, ensuring your deployed application is always up to date.


[Back to top](#table-of-contents)

## Technologies used



[Back to top](#table-of-contents)

## Author

This project was created by Kokou Kpadenou as part of the Udacity Frontend Developer Nanodegree through the Bertelsmann Next Generation Tech Booster Scholarship Program.

You can find more about Kokou Kpadenou on his [GitHub profile](https://www.github.com/kokou2kpadenou).

[Back to top](#table-of-contents)

## Credits

- Starter code provided by Udacity: 
- Icones used in the project were obtained from icomoon: https://icomoon.io
- The project was completed by Kokou Kpadenou as part of the Udacity Frontend Developer Nanodegree through the Bertelsmann Next Generation Tech Booster Scholarship Program.

[Back to top](#table-of-contents)

## Dependencies

The project has the following dependencies, which are external libraries or modules required for the proper functioning of the application:

- **Express.js**: Express.js is a popular web application framework for Node.js. It simplifies the process of building robust and scalable web applications by providing a set of useful features and middleware. It is used in this project to handle routing, middleware integration, and server-side logic.

- **cors**: The `cors` module is a middleware for Express.js that enables Cross-Origin Resource Sharing (CORS). It allows the server to handle requests from different origins and helps in controlling access to server resources from client applications running on different domains.



These dependencies are essential for the project's functionality, enabling efficient server-side routing, handling of cross-origin requests, and parsing of request data. Make sure to include these dependencies in your project's `package.json` file and install them using a package manager such as npm or yarn.

[Back to top](#table-of-contents)
