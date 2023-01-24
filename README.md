
<br />
<p align="center">

  <h3 align="center">Blanja App</h3>
  <p align="center">
    <image align="center" width="200" src='https://res.cloudinary.com/dnu5su7ft/image/upload/v1674602322/Group_1158_1_eodcpq.png' />
  </p>

  <p align="center">
    <br />
    <a href="https://github.com/helmipradita/be-blanja/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://api-blanja.helmipradita.dev">View Demo</a>
  </p>
</p>




# Blanja App - Backend

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Run Locally](https://github.com/helmipradita/be-blanja/edit/main/README.md#run-locally)
* [Demo](https://github.com/helmipradita/be-blanja/edit/main/README.md#demo)
  *  [x] [API Reference - Users](#api-reference---users)
  *  [ ] [API Reference - Categories](#api-reference---categories)
  *  [ ] [API Reference - Products](#api-reference---products)
  *  [ ] [API Reference - Carts](#api-reference---carts)
  *  [ ] [API Reference - Orders](#api-reference---orders)
* [Related Project](#related-project)
* [Contact](#contact)

## About The Project

Blanja is a website for looking for clothes, goods or tools. This website is of the e-commerce type, so the contents of this website are buying and selling products. There are 2 accounts on this website, a customer and a seller. On the customer side, you can choose products to checkout the product of their choice, on the seller side, you can add products to each store so that customers can buy them.

## Run Locally

Clone the project

```bash
  git clone https://github.com/helmipradita/be-blanja
```

Go to the project directory

```bash
  cd be-blanja
```

Install dependencies

```bash
  npm install
```

Setup .env copy from .env.example

```bash
  PORT=8000
  HOST=
  PG_CONNECT=

  JWT_KEY=
  REFRESH_TOKEN=

  CLOUD_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=

  MAIL_USERNAME=
  MAIL_PASSWORD=
  OAUTH_CLIENTID=
  OAUTH_CLIENT_SECRET=
  OAUTH_REFRESH_TOKEN=
```

Start the server

```bash
  npm run dev
```

## Demo

API deploy 

```bash
https://api-blanja.helmipradita.dev
```

## API Reference - Users

<details>
<summary>Show</summary>
<br>

#### Register

```
  POST /users/register:role
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `name` | `string` | **Required**. name          |
| `email`    | `string` | **Required**. with format email |
| `phone` | `string` | **Required**. phone          |
| `password` | `string` | **Required**. password          |
| `role` | `string` | **Required**. role, only customer or seller          |


Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "email": "helmipraditaa1234@gmail.com"
  },
  "message": "register success please check your email"
}
```

#### Login

```
  POST /users/verification
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `otp` | `string` | **Required**. otp          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": "helmipraditaa1234@gmail.com",
  "message": "verification account success"
}
```

#### Login

```
  POST /users/login
```

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `password` | `string` | **Required**. password          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "2246b620-6a90-4d66-9b0d-b489168935c2",
    "name": "Helmi Pradita",
    "email": "helmipraditaa@gmail.com",
    "phone": "0857",
    "address": null,
    "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png",
    "role": "customer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNDZiNjIwLTZhOTAtNGQ2Ni05YjBkLWI0ODkxNjg5MzVjMiIsImVtYWlsIjoiaGVsbWlwcmFkaXRhYUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzQ1NjQwMDYsImV4cCI6MTY3NDU2NzYwNn0.E64HQY4UY8CEUIF_P1S0ogLrS8l61e8D_RC10JjY6sA",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIyNDZiNjIwLTZhOTAtNGQ2Ni05YjBkLWI0ODkxNjg5MzVjMiIsImVtYWlsIjoiaGVsbWlwcmFkaXRhYUBnbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzQ1NjQwMDYsImV4cCI6MTY3NDY1MDQwNn0.OLyIlE7eNOHx5nQQaWdLj_7qoGAlso5Wa-_MEApfLQQ"
  },
  "message": "login success"
}
```

#### Get profile

```
  GET /users/profile
```

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "2246b620-6a90-4d66-9b0d-b489168935c2",
    "name": "Helmi Pradita",
    "email": "helmipraditaa@gmail.com",
    "phone": "0857",
    "address": null,
    "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png",
    "role": "customer"
  },
  "message": "get data users success"
}
```

#### Edit profile user

```
  PUT /user/profile
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Field body form

| Field      | Type     | Description            |
| :--------- | :------- | :--------------------- |
| `name` | `string` | **Required**. name |
| `email`     | `string` | **Required**. city     |
| `phone`    | `file`   | **Required**. phone    |
| `address`    | `file`   | **Required**. address    |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "2246b620-6a90-4d66-9b0d-b489168935c2",
    "name": "Helmi Pradita update",
    "email": "helmipraditaa@gmail.com",
    "phone": "05708572498",
    "address": "Mojokerto",
    "photo": "https://res.cloudinary.com/dnu5su7ft/image/upload/v1672552579/default_profile.png"
  },
  "message": "update data users success"
}
```

</details>

## API Reference - Categories

<details>
<summary>Show</summary>
<br>

#### get all recipes

```
  GET /recipes/all
```

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "825057b5-7f1a-495e-86a0-329e2e9ee94e",
      "title": "Nasi Goreng",
      "ingredients": "Nasi putih, Bawang putih, Minyak Goreng, Penyedap rasa",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673501227/foodrecipe/gxucm71tmnpsedjlhgcc.jpg",
      "videos": "youtube.com",
      "user_id": "3d3c5f0c-1733-491a-baa6-c5990d1b2eb2",
      "author": "Helmi Pradita pradita",
      "created_at": "tuesday  , 10 January   2023",
      "updated_at": "thursday , 12 January   2023"
    },
    {
      "id": "f3b5229f-2caa-45cd-aa8b-77ade69a7e46",
      "title": "Soto ayam",
      "ingredients": "Bumbu soto instant, ayam goreng di suwir kecil kecil, telur rebus",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673501269/foodrecipe/u6bi7xhbt7xixhethfcw.jpg",
      "videos": "youtube.com",
      "user_id": "3d3c5f0c-1733-491a-baa6-c5990d1b2eb2",
      "author": "Helmi Pradita pradita",
      "created_at": "tuesday  , 10 January   2023",
      "updated_at": "thursday , 12 January   2023"
    },
    {
      "id": "978dcc2b-f787-44d2-bce8-dd9b6e9ff4d4",
      "title": "Kare ayam",
      "ingredients": "Bumbu kare ayam, minyak goreng, ayam rebus",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673501316/foodrecipe/kb7awormojvfoasggepx.png",
      "videos": "youtube.com",
      "user_id": "3d3c5f0c-1733-491a-baa6-c5990d1b2eb2",
      "author": "Helmi Pradita pradita",
      "created_at": "tuesday  , 10 January   2023",
      "updated_at": "thursday , 12 January   2023"
    },
    {
      "id": "c79762f0-4dfb-46f3-bd3b-17c62f9ccfb1",
      "title": "Salad ",
      "ingredients": "Tomat, buncis, kentag bawang putih\r\nGula, Garam",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673501163/foodrecipe/vzdh9u3mixqpoozef08u.png",
      "videos": "youtube.com",
      "user_id": "3d3c5f0c-1733-491a-baa6-c5990d1b2eb2",
      "author": "Helmi Pradita pradita",
      "created_at": "wednesday, 11 January   2023",
      "updated_at": "thursday , 12 January   2023"
    }
  ],
  "message": "get recipes success",
  "pagination": {
    "currentPage": 1,
    "limit": 4,
    "totalData": 9,
    "totalPage": 3
  }
}
```

#### Add recipes

```
  POST /recipes
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body form

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `title` | `string` | **Required**. title        |
| `ingredients`   | `string` | **Required**. ingredients |
| `videos`   | `string` | **Required**. videos |
| `photo`   | `string` | **Required**. photo |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "dddfe2ee-3688-4e68-b73f-32bf66661732",
    "title": "Insert baru 7",
    "ingredients": "Tepung terigu",
    "videos": "youtube.com",
    "user_id": "34224357-1a26-4e09-8e97-898a4ad66af9",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673915955/foodrecipe/rt9fe46qkeqffqebxc0c.jpg"
  },
  "message": "insert recipe success"
}
```

#### Get my recipes

```
  GET /recipes
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "id": "dddfe2ee-3688-4e68-b73f-32bf66661732",
      "title": "Insert baru 7",
      "ingredients": "Tepung terigu",
      "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673915955/foodrecipe/rt9fe46qkeqffqebxc0c.jpg",
      "videos": "youtube.com",
      "user_id": "34224357-1a26-4e09-8e97-898a4ad66af9",
      "author": "Helmi Pradita update",
      "created_at": "tuesday  , 17 January   2023",
      "updated_at": "tuesday  , 17 January   2023"
    }
  ],
  "message": "get data recipes success"
}
```

#### Detail recipes by id

```
  GET /recipes/dddfe2ee-3688-4e68-b73f-32bf66661732
```
Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |


Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "c79762f0-4dfb-46f3-bd3b-17c62f9ccfb1",
    "title": "Salad ",
    "ingredients": "Tomat, buncis, kentag bawang putih\r\nGula, Garam",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673501163/foodrecipe/vzdh9u3mixqpoozef08u.png",
    "videos": "youtube.com",
    "user_id": "3d3c5f0c-1733-491a-baa6-c5990d1b2eb2",
    "author": "Helmi Pradita pradita",
    "created_at": "wednesday, 11 January   2023",
    "updated_at": "thursday , 12 January   2023"
  },
  "message": "get data recipes success"
}
```

#### Edit recipes

```
  PUT /recipes/dddfe2ee-3688-4e68-b73f-32bf66661732
```

Field auth

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `bearer` | `string` | **Required**. token from response login        |

Field body form

| Field   | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `title` | `string` | **Required**. title        |
| `ingredients`   | `string` | **Required**. ingredients |
| `videos`   | `string` | **Required**. videos |
| `photo`   | `string` | **Required**. photo |

Field body form

| Field      | Type     | Description                     |
| :--------- | :------- | :------------------------------ |
| `email`    | `string` | **Required**. with format email |
| `password` | `string` | **Required**. password          |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "id": "dddfe2ee-3688-4e68-b73f-32bf66661732",
    "title": "Insert baru 1 update1",
    "ingredients": "Tepung update",
    "videos": "youtube.com update",
    "photo": "http://res.cloudinary.com/dnu5su7ft/image/upload/v1673916081/foodrecipe/fyoqygiqegyye7t6stce.jpg"
  },
  "message": "Edit recipe success"
}
```

#### Delete recipes

```
  DELETE /recipes/0a93d647-4318-4c7f-bc00-08549aac80ba
```

Field auth

| Field    | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `bearer` | `string` | **Required**. token from response login |

Response 200

```json
{
  "success": true,
  "statusCode": 200,
  "message": "delete recipe success"
}
```

</details>

## Related Project
* [`Backend Project Telegram `](https://github.com/helmipradita/be-blanja)
* [`REST API Telegram`](https://api-blanja.helmipradita.dev)

## Contact

Contributors names and contact info Fullstack Developers

* Helmi Pradita [@helmipradita](https://github.com/helmipradita)
