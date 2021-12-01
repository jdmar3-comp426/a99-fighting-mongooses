[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6431709&assignment_repo_type=AssignmentRepo)

# Sorting Hat: Fighting Mongooses Edition

An animal sorting hat quiz inspired by Harry Potter. The quiz will ask 15 simple questions and sort you into one of four categories: Lion, Snake, Eagle, or Badger.
You can save your results by creating an account and view those results later by logging back in.

## Prerequisites

No prerequisites are needed for this project!

## Main Dependencies

- [npm](https://www.npmjs.com/)
- [browser-sync](https://browsersync.io/)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [express](https://expressjs.com/)
- [md5](https://www.npmjs.com/package/md5)

A full list of dependencies can be found in [the docs folder](docs/doc.txt).

## Setup

To setup the project, clone the repository and open a Git Bash terminal targeting the a99-fighting-mongooses folder.

In the console, run the command `npm install`. All dependencies will be installed upon running this command.

More detail about cloning and installing dependencies can be found in [the docs folder](docs/doc.txt).

## Deployment

To run the project, open a Git Bash terminal targeting the a99-fighting-mongooses folder.

In the console, run the command `npm run dev`. The project will launch your browser using nodemon and browser-sync.
The project can be interacted with in real time.

To close the project, close your browser and press `ctrl+c` in the Git Bash terminal.

## API

A basic API has been implemented with [Express](https://expressjs.com/).

The API employs basic functionality: creating, reading, modifying, replacing, and deleting. It employs these functions onto endpoints:
- /app/
- /app/users/
- /app/login/
- /app/results/

All API implementation can be found in [the webserver folder](./webserver). Further information regarding the API can be found in [the docs folder](docs/doc.txt).

## Contributors

There are 5 contributors on this project! These contributors - as well as their roles - can be found in [the docs folder](docs/doc.txt).
