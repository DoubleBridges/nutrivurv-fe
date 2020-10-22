# Nutrivurv

You can find the deployed project at [Nutrivurv](https://www.youtube.com/watch?v=fwnSyCY4jsE&feature=youtu.be&t=195).

## Contributors

|                                                [Dave Kane](https://github.com/DoubleBridges)                                                |                                             [Patrick Shushereba](https://github.com/pshushereba)                                              |                                                [Dominick Bruno](https://github.com/DomBruno)                                                |                                          [Benjamin T. Wilson](https://github.com/benjamin-t-wilson)                                           |     |
| :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-: |
| [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-male.png" width = "200" />](https://github.com/) | [<img src="https://www.dalesjewelers.com/wp-content/uploads/2018/10/placeholder-silhouette-female.png" width = "200" />](https://github.com/) |
|                                [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/)                                |                            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/honda0306)                             |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Mister-Corn)                           |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/NandoTheessen)                           |
|                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                 |                [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                |                 [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/)                 |

<br>
<br>

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Project Overview

[Trello Board](https://trello.com/b/Xix9XSlj/labspt7-nutrition-tracker)

[Product Canvas](https://www.notion.so/Nutrition-Tracker-c05986bd547e429f97d2e3a75e97b32d)

[UX Design files](https://www.figma.com/file/yqpTM7IYO90dVNPBsxaQrG/NutriJournal%2C-Ashes-%26-Tricia?node-id=122%3A2)

Learning how to eat healthy and making a lifestyle change is overwhelming and difficult. There is a lack of education and many new habits that need to be developed which deter people from meeting their health goals. Reading food labels to track calories and other nutritional factors is tedious and time-consuming.

Nutrivurv is an application that helps users take control of a healthier lifestyle. The application makes it easy to track critical health information; whether that is macros, calories, or any other food data that you use in working towards a healthier life.

### Key Features

- Utilizes world renowned Edamam Food databases
- Daiy Journal Logs food and generates complete nutritional data for each item
- Dynamic donut graph charts progress towards multiple goals at once
- Community forum leverages the power of GraphQL subscriptions to render seamless user interaction

## Tech Stack

### Front end built using:

#### NextJS

- Server Side Rendering
- Dynamic Routing
- React-based

#### Apollo Client

- Simplified integration of GraphQL with React
- Well documented
- Widely used solution

#### Tailwind.css

- Reduce time spent styling
- Lightweight yet robust
- Simple to implement

#### Front end deployed to Heroku.

#### [Back end](https://github.com/NutriJournal/nutrivurv-be) built using:

#### GraphQL

- Efficient
- Customizable
- Widely used alternative to traditional REST architecture

#### Prisma

- Simplified schema and query builder
- Well documented
- Widely used alternative to ORM service

# APIs

## Auth0

Auth0 is one of the most widely respected identity providers currently operating, despite some recent shifts towards Okta. Auth0 is much better supported by Next.js which is otherwise incompatible with Okta due to the fact that it has react-router as a dependency,
and Next.js uses it's own router to handle the isomorphic rendering.

You will need to make an Application and an API in your Auth0 account.

### Application

Application set up:

1. Make a Regular Web Application
2. Select NodeJS
3. Add Allowed Callback URL's in a comma separated list - http://localhost:3000/api/callback,
   https://staging.com/api/callback, https://production.com/api/callback, etc
4. Add Allowed Logout URL's in a comma separated list - http://localhost:3000, https://staging.com
   https://production.com, etc
5. Click continue and skip the depndencies and router config, skip the login test, until you can click done.

### API

API set up:

1. Name the API
2. Use your Backend endpoint for the identifier. YOU CAN NOT CHANGE THIS LATER
3. Make sure the algorithm is set to RS256

### Hooks

A Pre User Registration Hook needs to be set up in order for a user to be created on the backend properly.
This catches the registration mid-flight, creates a user on your backend and then attaches the return data in fields that get added to the user_metadata on the Auth0 user obj that is stored in your Auth0 DB.
Be sure to click the wrench on the top left and import `graphql-request` into node_modules.

```javascript
/**
@param {object} user - The user being created
@param {string} user.tenant - Auth0 tenant name
@param {string} user.username - user name
@param {string} user.password - user's password
@param {string} user.email - email
@param {boolean} user.emailVerified - is e-mail verified?
@param {string} user.phoneNumber - phone number
@param {boolean} user.phoneNumberVerified - is phone number verified?
@param {object} context - Auth0 connection and other context info
@param {string} context.requestLanguage - language of the client agent
@param {object} context.connection - information about the Auth0 connection
@param {object} context.connection.id - connection id
@param {object} context.connection.name - connection name
@param {object} context.connection.tenant - connection tenant
@param {object} context.webtask - webtask context
@param {function} cb - function (error, response)
*/
module.exports = function (user, context, cb) {
  var response = {};
  var { request } = require("graphql-request");
  var API = "https://change.this.to.your.endpoint.com/";
  var query = `mutation CREATE_USER($name: String!, $email: String!, $password: String!) {
      createUser(data: { name: $name, email: $email, password: $password }) {
        token
        user {
          id
          name
        }
      }
    }
      `;

  var variables = {
    email: user.email,
    password: user.password,
    name: user.user_metadata.full_name,
  };

  response.user = user;

  async function createOurUser() {
    let newUser;

    try {
      newUser = await request(API, query, variables);

      var {
        createUser: {
          token,
          user: { name },
        },
      } = newUser;

      response.user.user_metadata.api_token = token;
      response.user.user_metadata.api_password = user.password;
      response.user.user_metadata.registration = true;
      response.user.user_metadata.has_profile = false;

      cb(null, response);
    } catch (err) {
      console.log(err);
    }
  }

  createOurUser();
};
```

### Rules

Two Rules need to be created. They run in the order they placed on the dashboard, top to bottom, so put any rules that may take more time last.

ADD_ATTRIBUTES_TO_USER:

This rule pulls the users metadata and loads it into the IdToken. the namespace must follow the pattern of `https://*`.

```javascript
function (user, context, callback) {
  const namespace = 'https://full_user/';
  context.idToken[namespace + 'full_name'] = user.user_metadata.full_name;
  context.idToken[namespace + 'email'] = user.email;
  context.idToken[namespace + 'api_token'] = user.user_metadata.api_token;
  context.idToken[namespace + 'api_password' ] = user.user_metadata.api_password;
  context.idToken[namespace + 'has_profile' ] = user.user_metadata.has_profile;
  callback(null, user, context);
}
```

GET_FRESH_API_TOKEN_AND_CHECK_FOR_PROFILE:

Since we are storing our auth token for the backend on the static user profile in the Auth0 DB, it's best to get a fresh token every time a user logs in. _You do not need to specify node_mdules in Rules, only Hooks_

```javascript
function getFreshToken(user, context, cb) {
  var { request } = require("graphql-request");
  const namespace = "https://full_user/";
  const { registration } = user.user_metadata;
  const API = "https://labspt7-nutrition-stage.herokuapp.com/";
  const query = `mutation LogIn($email: String!, $password: String!) {
            login( data: { email: $email, password: $password }) {
                token
								user {
									profile {
										id
									}
								}
              }
            }
       	 `;

  var variables = {
    email: user.email,
    password: user.user_metadata.api_password,
  };

  async function getApiToken() {
    try {
      var ourUser = await request(API, query, variables);

      var {
        login: {
          token,
          user: { profile },
        },
      } = ourUser;

      context.idToken[namespace + "api_token"] = token;
      context.idToken[namespace + "has_profile"] =
        profile !== null ? true : false;
      cb(null, user, context);
    } catch (err) {
      console.log(err);
    }
  }

  function setRegistrationStatus() {
    user.user_metadata.registration = !registration;
    cb(null, user, context);
  }

  if (registration) {
    setRegistrationStatus();
  }

  getApiToken();
}
```

### Universal Login

In the universal login settings:

1. Choose New experience
2. Place your logo URL where it asks for compny logo link
3. Set your colors
4. Select the Login tab next to settings
5. Toggle Custom Login Page to `true`
6. Select `Lock` from the Default Templates dropdown
7. Add this code:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <title>Sign In with Auth0</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
    />
  </head>
  <body>
    <!--[if IE 8]>
      <script src="//cdnjs.cloudflare.com/ajax/libs/ie8/0.2.5/ie8.js"></script>
    <![endif]-->

    <!--[if lte IE 9]>
      <script src="https://cdn.auth0.com/js/base64.js"></script>
      <script src="https://cdn.auth0.com/js/es5-shim.min.js"></script>
    <![endif]-->

    <script src="https://cdn.auth0.com/js/lock/11.23/lock.min.js"></script>
    <script>
      // Decode utf8 characters properly
      var config = JSON.parse(
        decodeURIComponent(escape(window.atob("@@config@@")))
      );
      config.extraParams = config.extraParams || {};
      var connection = config.connection;
      var prompt = config.prompt;
      var languageDictionary;
      var language;

      if (config.dict && config.dict.signin && config.dict.signin.title) {
        languageDictionary = { title: config.dict.signin.title };
      } else if (typeof config.dict === "string") {
        language = config.dict;
      }
      var loginHint = config.extraParams.login_hint;
      var colors = config.colors || {};

      // Available Lock configuration options: https://auth0.com/docs/libraries/lock/v11/configuration
      var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
        auth: {
          redirectUrl: config.callbackURL,
          responseType:
            (config.internalOptions || {}).response_type ||
            (config.callbackOnLocationHash ? "token" : "code"),
          params: config.internalOptions,
        },
        additionalSignUpFields: [
          {
            name: "full_name",
            placeholder: "Enter your full name",
          },
        ],
        assetsUrl: config.assetsUrl,
        allowedConnections: connection ? [connection] : null,
        rememberLastLogin: !prompt,
        language: language,
        languageDictionary: languageDictionary,
        theme: {
          logo: "https://same.link.you.added.in.settings.png",
          primaryColor: colors.primary ? colors.primary : "green",
        },
        prefill: loginHint ? { email: loginHint, username: loginHint } : null,
        closable: false,
        defaultADUsernameFromEmailPrefix: false,
      });

      if (colors.page_background) {
        var css =
          ".auth0-lock.auth0-lock .auth0-lock-overlay { background: " +
          colors.page_background +
          " }";
        var style = document.createElement("style");

        style.appendChild(document.createTextNode(css));

        document.body.appendChild(style);
      }

      lock.show();
    </script>
  </body>
</html>
```

8. Save Changes

## Edamam Food Database API

At it's core, Nutrivurv is based around the globally recognized, industry-leading Edamam Food Database collection. Data from two of these comprehensive databases is then used to generate a wide variety of custom user-requested calculations.

Edamam Food Database endpoint: https://api.edamam.com/api/food-database

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. Fill out
.template.env with the apprpriate values, and rename the file to .env. You will also need to add these to every
deployment instance (staging, production). If you deploy to Zeit, add these to a now.config.js file.

     AUTH0_AUDIENCE=API audience name on the API app on your Auth0 client *In the API settings under 'Identifier'*
     AUTH0_CLIENT_ID=Your Auth0 Client ID *In the Application Settings under 'Client ID'*
     AUTH0_CLIENT_SECRET=Your Auth0 Client Secret *In the Application Settings under 'Client Secret'*
     AUTH0_DOMAIN=Your Auth0 Domain *This is your Auth0 "account number"*
     AUTH0_SCOPE="openid profile email"
     DEPLOYED_URI=https://url.where.app.is.deployed.com or http://localhost:3000
     FOOD_DB_KEY=Edamam API KEY
     GA_ID=Google Analytics API KEY
     GRAPHQL_ENDPOINT=https://uri.for.your.backend.api.com
     POST_LOGOUT_REDIRECT_URI=https://url.where.your.app.id.deployed.com or http://localhost:3000
     REDIRECT_URI=https://uri.where.your.app.is.deployed.com/api/callback or http://localhost:3000/api/callback
     SESSION_COOKIE_SECRET=longrandomstringthatsatleast32characterslong
     WEBSOCKET_ENDPOINT=wss://url.for.your.backend.api.com

# Content Licenses

All images and icons [Copyright 2020 Katerina Limpitsouni](https://undraw.co/license), used with permission.

# Installation Instructions

- Fork and Clone this Repository
- CD to your local copy of the repo
- In terminal type EITHER `npm install` or `yarn install`
- Reference "Other Scripts" below for instructions for your desired environment

## Other Scripts

    dev: `next dev` : starts the development environment
    build: `next build` : creates a build of the application
    start: `next start -p $PORT` : starts the production server after a build is created
    test: `jest --watch` : runs tests in _tests_ directory
    heroku-postbuild: `npm run build` : runs Heroku postbuild scripts

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/nutrition-tracker-be-pt7/blob/master/README.md) for details on the backend of our project.
