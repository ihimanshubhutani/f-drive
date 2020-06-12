<h1 align="center">F-Drive With OAuth2.0 Implemented&nbsp;
</h1><img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"> <img src="https://img.shields.io/badge/npm-%3E%3D6.14.5-blue.svg"> <img src="https://img.shields.io/badge/node-%3E%3D12.16.3-blue.svg"> <a href="https://github.com/ihimanshubhutani/f-drive#readme" target="_blank"><img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg"> </a> <a href="https://github.com/ihimanshubhutani/f-drive/graphs/commit-activity" target="_blank"><img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"> </a> <a href="https://github.com/ihimanshubhutani/f-drive/blob/master/LICENSE" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/ihimanshubhutani/F-Drive With OAuth2.0 Implemented"> </a> <a href="https://twitter.com/ihimmy" target="_blank"><img alt="Twitter: ihimmy" src="https://img.shields.io/twitter/follow/ihimmy.svg?style=social"> </a>

> Let you Upload your files on F-Drive Server and manage it through your personal account. Users can use their F-Drive Account to sign in to third-party sites and apps. They won't have to remember individual usernames and passwords for each account, and allows access to their file on third-party websites (if websites have used **F-Drive Sign in** integeration

## Prerequisites

* npm >=6.14.5
* node >=12.16.3

<br>

## Setup and Installation

``` sh
        git clone 

        cd f-drive

        npm install
```

## Usage

``` sh
        npm run start
```

## Run tests

``` sh
        npm run test
```

## How to use project 

### For Users

1. Register your account by Signing-Up 

2. An Confirmation email will be sent to your registered Email address, confirm your email address by that link.
3. Login to your F-Drive account 
4. Upload and View files by clicking on **_Upload_** and **_Show Files_** link on your logged in page.
5. Uploaded files can be deleted by going to Show Files page and selecting files to delete and then click on **__Delete Selected Files__**
6. To **_Download_** particular file, Go to **__Show Files__** page and click on name of file to which you want to download.

### For Developers/Client

> **NOTE**: This section is for those who want to use F-Drive to integerate **Sign-In with F-Drive** Functionality in their Website

Go to _/dev_ route or click on Developer option on homepage 

1. Register yourself as Developer by filling up signup form on __/dev/signup__, Your Username will be shown to user to identify you during OAuth2 Flow and will appear as your name during Consent Form 

2. Once Developer Account created, Login with your details and Enter your Redirect URI (to which you want to redirect the Authorization Code after user allowed on consent form)

 

## Author

👤 **Himanshu Bhutani**

* Twitter: [@ihimmy](https://twitter.com/ihimmy)
* Github: [@ihimanshubhutani](https://github.com/ihimanshubhutani)
* LinkedIn: [@himanshu-bhutani-173966140](https://linkedin.com/in/himanshu-bhutani-173966140)

## 📝 License

Copyright © 2020 [Himanshu Bhutani](https://github.com/ihimanshubhutani).
This project is [MIT](https://github.com/ihimanshubhutani/f-drive/blob/master/LICENSE) licensed.

- - -

*This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)*