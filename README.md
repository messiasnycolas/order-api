 # **Order API**

### The Order API build and serve `daily order summaries`. It links Pipedrive and Bling, fetching won deals and appending them as orders.

---    
## *Setup*
### In order to run the project, take the following steps:
- clone or download code
- create a `.env` file in project root, populate it following the `example.env` file and without quotes:
```
# Config
SERVER_PORT=3000
SERVER_TOKEN=BananaApplePineappleStrawberryGrape    
```
- choose one of the following:
    
    - local environment
    
        - pre-reqs: Node
    
        - run ```npm install``` in project root
    
        - run ```npm run dev``` 
    
    - docker container
    
        - pre-reqs: Docker
    
        - run ```docker build -t order-api .``` 
        in project root
        
        - run ```docker run -p 8080:3000 --env-file .env order-api``` 
            - Obs.: in this case, `3000` is the same as `.env` file `SERVER_PORT`, while `8080` is the port you are going to make requests.
    
---
 ## *Endpoints*

### **GET** `/order-summary/:pastDays`

- ```headers: { authorization: your-.env-file-SERVER_TOKEN }```

- *pastDays* is expected to be **0 or any natural number** and it represents which days will be searched for summaries.
    
    - e.g. `0` brings today results, if they exist;

    - `1` brings today and yesterday results, and so on.
    
    - default value: `0`.

- response example:
```
[
    {
        "wonDate": "2022-02-27",
        "totalValue": 899.25
    },
    {
        "wonDate": "2022-02-26",
        "totalValue": 150
    },
    {
        "wonDate": "2022-02-25",
        "totalValue": 0
    }
]
```

### **POST** `/order-summary/job` 
##### designed to be called by a cron job

- ```headers: { authorization: your-.env-file-SERVER_TOKEN }```

- body/json example:
``` 
{ 
    "pastDays": 1 
}
```

- *pastDays* is expected to be **0 or any natural number** and it represents which days will be used for building summaries. 
    
    - e.g. `0` fetch today's current won deals from Pipedrive, add them as orders on Bling and finally store the daily summary, containing the total value; 
    
    - `1` do the same for today and yesterday won deals, and so on.
    
    - default value: `0`.

- response example:
```
Job successfully created. Refreshing order summaries for the past 5 day(s).
```
---
## *Error Codes*

- **401** (Unauthorized)
- **400** (Bad Request) - Invalid params
- **500** (Internal Server Error) - Unexpected condition encountered