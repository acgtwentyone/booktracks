## Thank for taking the time to check out the repo and be willing to contribute!

If you have found an issue or would like to request a new feature, simply create a new issue. Be sure to fill out as much information as possible.

If this is your first open source contribution, please take a look at this [guide](https://github.com/freeCodeCamp/how-to-contribute-to-open-source).

Reporting Bugs & Feature Requests If you would like to submit a feature request or report a bug, we encourage you to first look through the [issues](https://github.com/acgtwentyone/booktracks/issues) and [pull requests](https://github.com/acgtwentyone/booktracks/pulls) before filing a new issue.

Submitting a Pull Request If you wish to submit a pull request for a new feature or issue, you should start by forking this repository first. This should get you setup on your local machine:

Make sure you have [Node.js](https://nodejs.org/en/) installed in your machine. (We suggest you to use node v16.x.x). 

## Fork and work localy

```
git clone https://github.com/acgtwentyone/booktracks.git
``` 

Then navigate to the project by running the following command 

```
cd booktracks 
```

And then type

```
npm install
```

## Setup Firebase

1. Since we are using [React Native Firebase](https://rnfirebase.io/), we encourage you to check it's documentation.
2. Once you have firebase ready to go, you have to create a file named ```.env``` on your project's root directory, and paste the following content 

```javascript 
FIREBASE_BOOKS_PATH=books
FIREBASE_NOTES_PATH=notes
FIREBASE_USERS_PATH=users
```

Note: Since those are the firebase collections name it must match books, notes and users, otherwise, you probabily will have problem when trying list them.

## Run the application

Run your project by running the following command: ```npx react-native run-android```. You should be all setup. Note that we assume that you have setup up the development environment for react native and ready to go. If not please check [here](https://reactnative.dev/docs/environment-setup).

Any throuble, please contact [acgtwentyone@gmail.com](mailto:acgtwentyone@gmail.com) or use our [discord](https://discord.gg/DJBcw7YTnB) channel.

## Make your changes

Once you have done this, create a new branch with a name that loosely describes the issue (Ex: replace-sign-in-text) on which you will be working, otherwise pick one if it already exists and of course is linked to an issue. Please check this [issues](https://github.com/acgtwentyone/booktracks/issues) here.

Once you think you have addressed the issue in question, submit a pull request to the main branch.
