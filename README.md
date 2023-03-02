
# Welcome to Auction Microservice!
**Description** The Auction service application

**Features**

- Swagger UI
- Docker Compose for building service


**Fuctionality**

- Authentication - [DONE]
- A user can register and use that to login. - [DONE]
- Guest  - [DONE]
- Only view the list of the completed bid (sort by latest or highest).  - [DONE]
- User - [DONE]
- Deposit money. - [DONE]
- Create a new item (name, started price and time window) in the draft state - [DONE]
    - An item need to be published to start an auction. - [DONE]
- Get the list of completed/ongoing bid items. - [DONE]
- Can bid each 5s and for published items. - [DONE]
- A new bid has to have a higher price than the current highest bid and started price. - [DONE]


**How to RUN**
1. **FAST and EASY WAY TO START API using docker-compose**

   ```docker-compose up -d```

2. Run without docker

   ```npm install```


      ```npm run start```

3. - `npm run migration:run` to run database migrations

**For DB Migration**

- `npm run schema:drop` to drop schema
- `npm run migration:run` to run database migrations
- `npm run migration:revert` to drop db tables

**Open browser**

http://localhost:3000

**Database Schema**
https://github.com/ahmadhp/auction/blob/main/schema.png


**Tests**

    ```npm run test:integration```

    ```npm run test:unit```

**Output Swagger Screenshot**
https://github.com/ahmadhp/auction/blob/main/swagger.png

**API Request Examples**

Register user
```
curl --location --request POST 'http://localhost:3000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
        "email": "ahmad@gmail.com",
        "username": "ahmad",
        "password": "pass"
    }
```

Login user

```
curl --location --request POST 'http://localhost:3000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "ahmad@gmail.com",
    "password": "pass"
}'
```

Deposit money

```
curl --location --request POST 'http://localhost:3000/account/deposit' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzcyIsImlhdCI6MTY2NTc0ODE0NywiZXhwIjoxNjY1Nzg0MTQ3fQ.cFazI6zMcDcw08XLU3PzYTUzBHLgbtG0St4eA5zhVkE' \
--header 'Content-Type: application/json' \
--data-raw '{
        "email": "ahmad@gmail.com",
        "deposit": "1"
    }'
```

Create Item

```
curl --location --request POST 'http://localhost:3000/account/item' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzcyIsImlhdCI6MTY2NTY1NjE1NiwiZXhwIjoxNjY1NjkyMTU2fQ.VR4U7CNa6DFmkpIbn6IEzSy7NNneUGigINuzrzXfSJI' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "shampoo",
        "price": "1000",
        "startTime": "2022-10-12 12:28:53",
        "endTime": "2022-10-12 12:28:53"
    }'
```

Publish Item

```
curl --location --request POST 'http://localhost:3000/account/publish' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzcyIsImlhdCI6MTY2NTc0ODE0NywiZXhwIjoxNjY1Nzg0MTQ3fQ.cFazI6zMcDcw08XLU3PzYTUzBHLgbtG0St4eA5zhVkE' \
--header 'Content-Type: application/json' \
--data-raw '{
        "name": "shampoo"
    }'
```

Place bid

```
curl --location --request POST 'http://localhost:3000/account/bid' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzcyIsImlhdCI6MTY2NTY1NjE1NiwiZXhwIjoxNjY1NjkyMTU2fQ.VR4U7CNa6DFmkpIbn6IEzSy7NNneUGigINuzrzXfSJI' \
--header 'Content-Type: application/json' \
--data-raw '{
        "item_name": "shampo",
        "bid_price": "1003"
    }'
```

Get User bids

```
curl --location --request GET 'http://localhost:3000/account/bids' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFobWFkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoicGFzcyIsImlhdCI6MTY2NTY1NjE1NiwiZXhwIjoxNjY1NjkyMTU2fQ.VR4U7CNa6DFmkpIbn6IEzSy7NNneUGigINuzrzXfSJI' \
--header 'Content-Type: application/json' \
--data-raw '{
        "item_name": "shampoo"
    }'
```

Get Guest items
```
curl --location --request GET 'http://localhost:3000/guest/bids' \
--header 'Content-Type: application/json' \
--data-raw '{
        "item_name": "shampo"
    }'
```

