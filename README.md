<h1 align="center">F-Drive With OAuth2.0 Implemented&nbsp; 
</h1><img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"> <img src="https://img.shields.io/badge/npm-%3E%3D6.14.5-blue.svg"> <img src="https://img.shields.io/badge/node-%3E%3D12.16.3-blue.svg"> <a href="https://github.com/ihimanshubhutani/f-drive#readme" target="_blank"><img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg"> </a> <a href="https://github.com/ihimanshubhutani/f-drive/graphs/commit-activity" target="_blank"><img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg"> </a> <a href="https://github.com/ihimanshubhutani/f-drive/blob/f-drive/LICENSE" target="_blank"><img alt="License: MIT" src="https://img.shields.io/badge/License%3F-MIT-green.svg"> </a> <a href="https://twitter.com/ihimmy" target="_blank"><img alt="Twitter: ihimmy" src="https://img.shields.io/twitter/follow/ihimmy.svg?style=social"> </a>

> Let you Upload your files on F-Drive Server and manage it through your personal account. Users can use their F-Drive Account to sign in to third-party sites and apps. They won't have to remember individual usernames and passwords for each account, and allows access to their file on third-party websites (if websites have used **F-Drive Sign in** integeration

## Prerequisites

- npm >=6.14.5
- node >=12.16.3

## Setup and Installation

```sh
        git clone https://github.com/ihimanshubhutani/f-drive.git

        cd f-drive

        npm install
```

## Usage

```sh
        npm run start
```

## Run tests

```sh
        npm run test
```

## How to use project

### For Users

1. Register your account by Signing-Up

2. An Confirmation email will be sent to your registered Email address, confirm your email address by that link.
3. Login to your F-Drive account
4. Upload and View files by clicking on <b>_Upload_</b> and <b>_Show Files_</b> link on your logged in page.
5. Uploaded files can be deleted by going to Show Files page and selecting files to delete and then click on <b>**Delete Selected Files**</b>
6. To <b>_Download_</b> particular file, Go to <b>**Show Files**</b> page and click on name of file to which you want to download.

### Obtain OAuth 2.0 credentials for Developers/Client.

> **NOTE**: This section is for those who want to use F-Drive to integerate **Sign-In with F-Drive** Functionality in their Website

Go to _/dev_ route or click on Developer option on homepage

1. Register yourself as Developer by filling up signup form on **/dev/signup**, Your Username will be shown to user to identify you during [OAuth2](https://tools.ietf.org/html/rfc6749) Flow and will appear as your name during Consent Form

2. Once Developer Account created, Login with your details and Enter your Redirect URI (to which you want to redirect the Authorization Code after user allowed on consent form)
3. After entering correct redirect URI you will be provided with your **Client Secret** and **Client Id** use it to [Exchange Authorization Code with Access Token]()

{SERVER} = http://localhost:3000 || **YOUR_SERVER_PATH**

# Using OAuth2.0 to Access F-Drive APIs

> **NOTE**: Use of F-Drive's implementation of OAuth 2.0 is governed by the OAuth 2.0 Policies. and limited with only **Authorization Grant type** because of more security reasons.

F-Drive APIs use the OAuth 2.0 protocol for authorization. F-Drive supports common OAuth 2.0 scenarios for client-side Authorization

To begin, obtain OAuth 2.0 client credentials from the F-Drive API Developer Console. Then your client application requests an access token from the F-Drive Authorization Server, extracts a token from the response, and sends the token to the F-Drive API that you want to access.

# Basic steps

### 1. Obtain OAuth 2.0 credentials from the F-Drive API Console.

This step is alredy mentioned on how to obtain F-Drive API credentials

### 2. Identify access scopes

Identify requirement of scopes you want to request to F-Drive Authorization Server

Your first step is to create the authorization request. That request sets parameters that identify your application and define the permissions that the user will be asked to grant to your application.

Currently F-Drive supports only two scopes

1. **file** : To view and download files
2. **profile** : To view user's profile information

### 3. Create Authorization request

Your next step is to create the authorization request. That request sets parameters that identify your application and define the permissions that the user will be asked to grant to your application.

| Parameter       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |     |     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | --- |
| _client_id_     | **Required** The client ID for your application. You can find this value in the F-Drive API Console Credentials page by signing up as Developer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |     |     |
| _redirect_uri_  | **Required** Determines where the API server redirects the user after the user completes the authorization flow. The value must exactly match one of the authorized redirect URIs for the OAuth 2.0 client, which you configured in your client's API Console Credentials page . If this value doesn't match an authorized redirect URI for the provided client_id you will get a redirect_uri_mismatch error.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |     |     |
| _response_type_ | **Required** Determines whether the F-Drive OAuth 2.0 endpoint returns an authorization code. Set the parameter value to code                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |     |     |
| _scope_         | **Required** A space-delimited list of scopes that identify the resources that your application could access on the user's behalf. These values inform the consent screen that F-Drive displays to the user. F-Drive only support [profile,file] scope                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |     |     |
| _access_type_   | **Required** Indicates whether your application can refresh access tokens when the user is not present at the browser. Valid parameter values are online , which is the default value, and offline. Set the value to offline if your application needs to refresh access tokens when the user is not present at the browser. This is the method of refreshing access tokens described later in this document. This value instructs the F-Drive authorization server to return a refresh token and an access token the first time that your application exchanges an authorization code for tokens.                                                                                                                                                                                                                                                                                                                                                                                                                                        |     |     |
| _state_         | **Required** Specifies any string value that your application uses to maintain state between your authorization request and the authorization server's response. The server returns the exact value that you send as a name=value pair in the URL fragment identifier ( # ) of the redirect_uri after the user consents to or denies your application's access request. You can use this parameter for several purposes, such as directing the user to the correct resource in your application, sending nonces, and mitigating cross-site request forgery. Since your redirect_uri can be guessed, using a state value can increase your assurance that an incoming connection is the result of an authentication request. If you generate a random string or encode the hash of a cookie or another value that captures the client's state, you can validate the response to additionally ensure that the request and response originated in the same browser, providing protection against attacks such as cross-site request forgery. |     |     |

### 4. Redirect to F-Drive's OAuth 2.0 server

Redirect the user to F-Drive's OAuth 2.0 server to initiate the authentication and authorization process. Typically, this occurs when your application first needs to access the user's data.

### Example

```sh
{SERVER}/oauth?
 scope=profile file&
 access_type=offline&
 response_type=code&
 state={YOUR STATE PARAMETER}&
 redirect_uri={YOUR REDIRECT URI}&
 client_id={YOUR CLIENT ID}

After you create the request URL, redirect the user to it.

```

F-Drive's OAuth 2.0 server authenticates the user and obtains consent from the user for your application to access the requested scopes. The response is sent back to your application using the redirect URL you specified.

### 5. F-Drive prompts user for consent

In this step, the user decides whether to grant your application the requested access. At this stage, F-Drive displays a consent window that shows the name of your application and the F-Drive API services that it is requesting permission to access with the user's authorization credentials and a summary of the scopes of access to be granted. The user can then consent to grant access to one or more scopes requested by your application or refuse the request

### 6. Handle the OAuth 2.0 server response

The OAuth 2.0 server responds to your application's access request by using the URL specified in the request.

If the user approves the access request, then the response contains an authorization code. If the user does not approve the request, the response contains an error message. The authorization code or error message that is returned to the web server appears on the query string, as shown below:

An error response:

```sh

{YOUR_REDIRECT_URI}?error=access_denied

```
Success respons:

```sh

{YOUR_REDIRECT_URI}/oauth??code={REQUESTED_AUTHORIZATION_CODE}&state={STATE_YOU_ENTERED}


```

### 7. Exchange authorization code for refresh and access tokens

After the web server receives the authorization code, it can exchange the authorization code for an access token.

> To exchange an authorization code for an access token, call the {SERVER}/token endpoint and set the following parameters:

| **Fields**      |                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------- |
| _client_id_     | The client ID obtained from the F-Drive Developer API Credentials page.                           |
| _client_secret_ | The client secret obtained from the F-Drive Developer API Credentials page.                       |
| _code_          | The authorization code returned from the initial request.                                         |
| _grant_type_    | As defined in the OAuth 2.0 specification, this field must contain a value of authorization_code. |
| _access_type_   | this can be offline or online, if offline returns refresh_token with request                      |

```sh
POST /token HTTP/1.1
Host: {SERVER}
Content-Type: application/x-www-form-urlencoded

code={AUTHORIZATION_CODE_YOU_GET}&
client_id={CLIENT_ID}&
client_secret={CLIENT_SECRET}&
access_type={offline||online}
grant_type=authorization_code

```

F-Drive responds to this request by returning a JSON object that contains a short-lived access token and a refresh token. Note that the refresh token is only returned if your application set the access_type parameter to offline in the initial request to F-Drive's authorization server.

The response contains the following fields:

| **Fields**      |                                                                                                                                                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _access_token_  | The token that your application sends to authorize a F-Drive API request.                                                                                                                                                                                                   |
| _expires_in_    | The remaining lifetime of the access token in seconds.                                                                                                                                                                                                                      |
| _refresh_token_ | A token that you can use to obtain a new access token. Refresh tokens are valid until the user revokes access. Again, this field is only present in this response if you set the access_type parameter to offline in the initial request to F-Drive's authorization server. |
| _scope_         | The scopes of access granted by the access_token expressed as a list of space-delimited, case-sensitive strings.                                                                                                                                                            |
| _token_type_    | The type of token returned. At this time, this field's value is always set to Bearer.                                                                                                                                                                                       |



The following snippet shows a sample response:
``` sh
{
  "access_token": "u1FTz70Bzsdfe5fe65a6ef5a6e5fafe4gax4hT3Zg",
  "expires_in": 6000,
  "token_type": "Bearer",
  "scope": "[profile, file]",
  "refresh_token": "sdaffea5few5vvsa5d6f5asdf56xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
}

```

## Calling F-Drive APIs to fetch user's F-Drive Account data


After your application obtains an access token, you can use the token to make calls to a F-Drive API on behalf of a given user account if the scope(s) of access required by the API have been granted. To do this, include the access token in a request to the API by including an Authorization HTTP header Bearer value as its **__access_token__**. 

 ### HTTP GET examples

> USE **POSTMAN** TO TEST YOUR ACESS TOKEN GENERATED BY F-DRIVE SERVER ONCE TESTED YOU WILL BE ABLE TO EASILY INTEGERATE IT WITH YOUR WEBSITE.


 A call to the _file_ endpoint (the F-drive Files API) using the Authorization: Bearer HTTP header might look like the following. Note that you need to specify your own access token:

```sh

GET /fdrive/file HTTP/1.1
Host: {SERVER}
Authorization: Bearer {access_token}

```

The above API returns list of files 


To see details of particular file:

```sh

GET /fdrive/file/download/{file_id} HTTP/1.1
Host: {SERVER}
Authorization: Bearer {access_token}

```


Following request return file and downloads it on your side:

```sh

GET /fdrive/download/{file_id} HTTP/1.1
Host: {SERVER}
Authorization: Bearer {access_token}

```

To fetch **_profile_** info:

```sh

GET /fdrive/profile HTTP/1.1
Host: {SERVER}
Authorization: Bearer {access_token}

```

> NOTE: Your access token must be granted to use above API calls if requested scope of access token doesn't match with your API call 
**scope_mismatch_error** will return in JSON form.


## Author

👤 **Himanshu Bhutani**

- Twitter: [@ihimmy](https://twitter.com/ihimmy)
- Github: [@ihimanshubhutani](https://github.com/ihimanshubhutani)
- LinkedIn: [@himanshu-bhutani-173966140](https://linkedin.com/in/himanshu-bhutani-173966140)

## 📝 License

Copyright © 2020 [Himanshu Bhutani](https://github.com/ihimanshubhutani).
This project is [MIT](https://github.com/ihimanshubhutani/f-drive/blob/f-drive/LICENSE) licensed.
