# FPFR


# Project Name

<br>

# Quick Compo

<br>

## Description

This is a app to sell or trade products. This products can be new or used.

## User Stories

-  **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
-  **Home Page** As a visitor I want to be able to see a home page that explains the website and guide me to the login
-  **Signup:** As an anonymous user I can sign up on the platform so that I can start creating and managing tournaments.
-  **Login:** As a user I can login to the platform so that I can access my profile and start creating and managing tournaments.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Profile Page**: As a logged in user I can visit my profile page so that I can access the edit page and see the list of tournaments I have created.
-  **Edit Profile:** As a logged in user I can access the edit profile page so that I can edit/delete the profile I created.
-  **Add new reviews :** As a logged in user I can access a reviews page so I can create a review about the seller/buyer and product.
-  **Review Details:** As a logged in user I can access the review details page so that I can edit/delete the review I created.
-  **Create products:** As a user I want to create a product to sell. 
-  **Edit products:** As a user I want to be able to edit/delete the product i wanted to sell. 
-  **View products list:** As a user I want to see the list of the selling products and have a link to see the details.
-  -  **View bought products list:** As a user I want to see the list of the products I bought.





## Backlog

- Firebase to signup and login
- 



<br>


# Client / Frontend

## React Router Routes (React App)

| Path                         | Component            | Permissions                | Behavior                                                  |
| ---------------------------- | -------------------- | -------------------------- | --------------------------------------------------------- |
| `/login`                     | Login         | anon only `<AnonRoute>`    | Login form, navigates to products list after login.           |
| `/signup`                    | Signup           | anon only  `<AnonRoute>`   | Signup form, navigates to home page after signup.         |
| `/`                          | HomePage             | public `<Route>`           | Home page.                                                |
| `/product-list`              | ProductList        | user only `<PrivateRoute>` | User and player profile for the current user. 
| `/bought-product-list`              | BoughtProductList        | user only `<PrivateRoute>` | User and player profile for the current user.             |
 `/bought-product/:boughtProductId             | BoughtProductDetails     | user only `<PrivateRoute>` | User and player profile for the current user.             |
| `/product/create`           | CreateProduct| user only `<PrivateRoute>` | Create new selling product.                               |
| `/product/edit`         | EditProduct      | user only `<PrivateRoute>` | Edit product form.                                   |
| `/product/:productId`    | ProductDetails   | user only `<PrivateRoute>` | products details.                                    |
 `/profile/:profileId`               | Profile   | user only `<PrivateRoute>` | To see other sellers profile                                          |
| `/profile/edit`               | ProfileEdit   | user only `<PrivateRoute>` | To edit/delete Profile page  
| `/reviews` | Reviews | user only `<PrivateRoute>` | Revies page. Shows reviews list and other details. |
| `/revies/edit`    | RewiesEdit        | user only `<PrivateRoute>` | To edit or delete created review.                                 |




## Components

Pages:

- Login

- Signup

- HomePage

- ProductList

- CreateProduct

- EditProduct  

- ProductDetails

- BoughtProducts

- BoughtProductDetails

-  Profile 

- CreateReviews
  
- Reviews

- ReviewsEdit 


  

Components:

- Navbar
- Footer
- Product card
- Reviews Card
- Profile Card
- BoughtProducts Card
- Search bar




## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.logout()`
    - `.validate()`

- **User Service**

  - `userService` :
    - `.updateUser(id, userData)`
    - `.getUser()`
    - `.getUserDetails(id)`

- **Product Service**

 - `ProductService` :
    - `.createProduct(id)`
    - `.updateProduct(id, userData)`
    -  `.getProductDetails(id)`
    -  `.getBoughtProductDetails(id)`
    -  `.getBoughtProduct()`
    - `.getProduct()`



- **Reviews Service**

  - `ReviewService` :
   - `.createReview(id)`
    - `.updateReview(id, userData)`
    -  `.getReviewDetails(id)`
    - `.getReview()`

  



<br>


# Server / Backend


## Models

**User model**

```javascript
{
    name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim:true },
    contact: { type: Number, required: true, unique:false },
    img: {type: String},
    soldProduct: [ { type: Schema.Types.ObjectId, ref:'Product' } ]
    boughtProduct: [ { type: Schema.Types.ObjectId, ref:'Product' } ]
    reviews: [ { type: Schema.Types.ObjectId, ref:'Review' } ]
}
```



**Product model**

```javascript
 {
   name: { type: String, required: true },
   description: { type: String, required: true },
   condition: { type: String, required: true },
   category: {enum: [, ], required:true},
   price: { type: Number, required: true },
   img: { type: String, default:"" },
   exchange: [ {type:Boolean, required:true } ]
   sold: [ { type:Boolean, required:true } ]
   seller: [ { type: Schema.Types.ObjectId, ref:'User' } ]
   buyer: [ { type: Schema.Types.ObjectId, ref:'User' } ]
   
   
 }
```



**Review model**

```javascript
{
  Creator: {enum: [Seller, Buyer], required:true},
  Comment: [ { type: String, required: true } ]
}
```




<br>


## API Endpoints (backend routes)

| HTTP Method | URL                    | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | ---------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |

| GET         | `/auth/profile    `    | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |

| POST        | `/auth/signup`         | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |

| POST        | `/auth/login`          | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |

| POST        | `/auth/logout`         |                              | 204            | 400          | Logs out the user                                            |

| GET         | `/`     |                              |                | 400          |                                     |

| GET         | `/api/profile/:id` |                              |                |              | Show specific profile                                     |

| POST        | `/api/profile/:id`     | { name, email, password, contacts, img }       | 201            | 400          | Edit Profile 

| DELETE      | `/api/profile/:id` |                              | 201            | 400          | delete profile

| GET         | `/api/products/:id` |                              |                |              | Show products list   

| GET         | `/api/products-details :id` |                              |                |              | Show product details                                   |

| POST        | `/api/product/:id`     | { name, description, condition, price }       | 201            | 400          | Edit Product

| DELETE      | `/api/product/:id` |                              | 201            | 400          | delete product

| GET         | `/api/bought-products-list :id` |                              |                |              | Show bought product list.

| GET         | `/api/bought-products-details :id` |                              |                |              | Show bought product details 


| GET         | `/api/reviews/:id` |                              |                |              | Show a list of reviews                               |

| POST        | `/api/reviews/:reviewsId`     | {  comment }       | 201            | 400          | Edit review

| DELETE      | `/api/review/:id` |                              | 201            | 400          | delete review







