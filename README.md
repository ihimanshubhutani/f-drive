<h1 align="center">F-Drive With OAuth2.0 Implemented&nbsp; 
</h1><img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"> <img src="https://img.shields.io/badge/npm-%3E%3D6.14.5-blue.svg"> <img src="https://img.shields.io/badge/node-%3E%3D12.16.3-blue.svg"> <a href="https://github.com/ihimanshubhutani/f-drive#readme" target="_blank"><img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg"> </a> <a href="https://github.com/ihimanshubhutani/f-drive/graphs/commit-activity" target="_blank"><img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"> </a> <a href="https://github.com/ihimanshubhutani/f-drive/blob/master/LICENSE" target="_blank"><img alt="License: MIT" src="https://img.shields.io/github/license/ihimanshubhutani/F-Drive With OAuth2.0 Implemented"> </a> <a href="https://twitter.com/ihimmy" target="_blank"><img alt="Twitter: ihimmy" src="https://img.shields.io/twitter/follow/ihimmy.svg?style=social"> </a>

> Let you Upload your files on F-Drive Server and manage it through your personal account. Users can use their F-Drive Account to sign in to third-party sites and apps. They won't have to remember individual usernames and passwords for each account, and allows access to their file on third-party websites (if websites have used **F-Drive Sign in** integeration

## Prerequisites

* npm >=6.14.5
* node >=12.16.3

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

3. An Confirmation email will be sent to your registered Email address, confirm your email address by that link.
4. Login to your F-Drive account
5. Upload and View files by clicking on <b>*Upload*</b> and <b>*Show Files*</b> link on your logged in page.
6. Uploaded files can be deleted by going to Show Files page and selecting files to delete and then click on <b>**Delete Selected Files**</b>
7. To <b>*Download*</b> particular file, Go to <b>**Show Files**</b> page and click on name of file to which you want to download.

### Obtain OAuth 2.0 credentials for Developers/Client.

> **NOTE**: This section is for those who want to use F-Drive to integerate **Sign-In with F-Drive** Functionality in their Website

Go to */dev* route or click on Developer option on homepage

1. Register yourself as Developer by filling up signup form on **/dev/signup**, Your Username will be shown to user to identify you during [OAuth2](https://tools.ietf.org/html/rfc6749) Flow and will appear as your name during Consent Form

2. Once Developer Account created, Login with your details and Enter your Redirect URI (to which you want to redirect the Authorization Code after user allowed on consent form)
3. After entering correct redirect URI you will be provided with your **Client Secret** and **Client Id** use it to [Exchange Authorization Code with Access Token](https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/#:~:text=The%20authorization%20code%20is%20a, approve%20or%20deny%20the%20request.)

{SERVER} = http://localhost:3000 || __YOUR_SERVER_PATH__

# Using OAuth2.0 to Access F-Drive APIs

> **NOTE**: Use of F-Drive's implementation of OAuth 2.0 is governed by the OAuth 2.0 Policies. and limited with only **Authorization Grant type** because of more security reasons.

F-Drive APIs use the OAuth 2.0 protocol for authorization. F-Drive supports common OAuth 2.0 scenarios for client-side Authorization

To begin, obtain OAuth 2.0 client credentials from the F-Drive API Developer Console. Then your client application requests an access token from the F-Drive Authorization Server, extracts a token from the response, and sends the token to the F-Drive API that you want to access.

# Basic steps

### 1. Obtain OAuth 2.0 credentials from the F-Drive API Console.

This step is alredy mentioned on how to obtain F-Drive API credentials 

### 2. Identify access scopes

Identify requirement of scopes you want to request to F-Drive Authorization Server

Currently F-Drive supports only two scopes 

1. __file__ : To view and download files
2. __profile__ : To view user's profile information 

METHOD
Request URI
Response
Request Body
GET
/login?scope=:scope&response_type=code&redirect_uri=:redirectUri&access_type=:accessType&client_id=:clientId&state=:state
Show OAuth login page with Client Name

POST
/login?scope=:scope&response_type=code&redirect_uri=:redirectUri&access_type=:accessType&client_id=:clientId&state=:state
Creates Session and Redirect to Consent Screen after verification
username=:username&
password=:password

[
encrypt
scope, 
redirect_uri, 
client_id, 
access_type, 
state

from query parameter and 
redirects with unique code {authUser} to consent screen]
GET 
/consent?auth_user=:authUser
Shows Consent screen to allow or cancel with requested scope and client name using :authUser

POST 
/consent
Fetch info from  :authUser and redirects with :code & :state to :redirect_uri
auth_user=:authUser

POST
/token
Exchange Authorization code with access token 
code=:code&
redirect_uri=:redirectUri&
client_id=:clientId&
client_secret=:clientSecret&
grant_type=authorization_code

POST
/token
Referesh expired access token 
With refresh token
client_id=:clientId&
client_secret=:clientSecret&
grant_type=refresh_token&
referesh_token=:refereshToken

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
