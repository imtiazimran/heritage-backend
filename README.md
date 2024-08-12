
# Heritage Backend

This is the backend for the Heritage project, developed using Node.js, Express, TypeScript, Mongoose, and Zod for schema validation.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Property Routes](#property-routes)
  - [Bid Routes](#bid-routes)
- [QueryBuilder Class](#querybuilder-class)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/heritage-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd heritage-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the server:

   ```bash
   npm run start:dev
   ```

## Configuration

Create a `.env` file in the root of the project and add your environment variables:

```bash
MONGO_URI=<Your MongoDB URI>
PORT=5000
```

## Routes

### User Routes

- **POST** `/users/create`
  - Create a new user.
  - **Body**: 
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "role": "Admin | Bidder | PropertyOwner",
      "firstName": "string",
      "lastName": "string",
      "contactNumber": "string",
      "profilePicture": "string",
      "address": "string"
    }
    ```

- **GET** `/users`
  - Get all users.

- **GET** `/users/:id`
  - Get a user by ID.

- **PUT** `/users/:id`
  - Update a user by ID.
  - **Body**: 
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "role": "Admin | Bidder | PropertyOwner",
      "firstName": "string",
      "lastName": "string",
      "contactNumber": "string",
      "profilePicture": "string",
      "address": "string"
    }
    ```

- **DELETE** `/users/:id`
  - Delete a user by ID.

### Property Routes

- **POST** `/properties/create`
  - Create a new property.
  - **Body**: 
    ```json
    {
      "title": "string",
      "description": "string",
      "images": ["string"],
      "location": "string",
      "price": "number",
      "bedrooms": "number",
      "bathrooms": "number",
      "currentBid": "number",
      "highestBidder": "string",
      "owner": "string"
    }
    ```

- **GET** `/properties`
  - Get all properties.

- **GET** `/properties/:id`
  - Get a property by ID.

- **PUT** `/properties/:id`
  - Update a property by ID.
  - **Body**: 
    ```json
    {
      "title": "string",
      "description": "string",
      "images": ["string"],
      "location": "string",
      "price": "number",
      "bedrooms": "number",
      "bathrooms": "number",
      "currentBid": "number",
      "highestBidder": "string",
      "owner": "string"
    }
    ```

- **DELETE** `/properties/:id`
  - Delete a property by ID.

### Bid Routes

- **POST** `/bids/create`
  - Place a new bid on a property.
  - **Body**: 
    ```json
    {
      "property": "string",
      "amount": "number",
      "bidder": "string"
    }
    ```

- **GET** `/bids/properties/:propertyId`
  - Get all bids for a specific property.

- **GET** `/bids/:id`
  - Get a bid by ID.

- **DELETE** `/bids/:id`
  - Delete a bid by ID.

## QueryBuilder Class

The `QueryBuilder` class is a utility designed to simplify and streamline complex MongoDB query operations such as searching, filtering, sorting, pagination, and field selection.

### How It Works

The `QueryBuilder` class operates on a Mongoose query and allows chaining of various query operations. It provides methods for searching, filtering, sorting, pagination, and field selection, along with a method to count the total number of documents.

### Query Parameters

To use the `QueryBuilder`, users can pass query parameters in the request URL. Below is a description of the available parameters and how to use them:

#### 1. **searchTerm** (Optional)

- **Description**: Searches for a term across specified fields.
- **Usage**: `?searchTerm=value`
- **Example**: `?searchTerm=apartment`

#### 2. **filter** (Optional)

- **Description**: Filters the results based on specific fields.
- **Usage**: Pass any key-value pairs you want to filter by in the query string.
- **Example**: `?location=New York&price=100000`

#### 3. **sort** (Optional)

- **Description**: Sorts the results by the specified fields.
- **Usage**: `?sort=field1,-field2` (Use a minus sign `-` for descending order)
- **Default**: `-createdAt`
- **Example**: `?sort=price,-title`

#### 4. **page** (Optional)

- **Description**: Paginates the results by specifying the page number.
- **Usage**: `?page=number`
- **Default**: `1`
- **Example**: `?page=2`

#### 5. **limit** (Optional)

- **Description**: Limits the number of results returned per page.
- **Usage**: `?limit=number`
- **Default**: `10`
- **Example**: `?limit=20`

#### 6. **fields** (Optional)

- **Description**: Specifies which fields to include in the response.
- **Usage**: `?fields=field1,field2`
- **Default**: All fields except `__v`
- **Example**: `?fields=title,price,location`


### Example Request

Given the following query string:

```bash
GET /properties?searchTerm=apartment&location=New York&sort=price,-title&page=2&limit=20&fields=title,price,location
```

The `QueryBuilder` would:

1. Search for the term "apartment" in the `title`, `description`, and `location` fields.
2. Filter results by `location=New York`.
3. Sort the results by `price` in ascending order and `title` in descending order.
4. Return the results on the second page, with 20 results per page.
5. Only include the `title`, `price`, and `location` fields in the response.

## Technologies Used

- **Node.js**
- **Express**
- **TypeScript**
- **Mongoose**
- **Zod**
- **bcryptjs** (for password hashing)
