# Adition Job Ads API

## Overview

An API to create job ads.
Made with Nodejs and Express and MongoDB.

### Ad Model

```javascript

{
    title: { type: String, minlength: 3, required: true, unique: true },
    author: { type: String, minlength:3, required: true, },
    company: { type: String, minlength: 3, required: true },
    contact: { type: String, minlength: 3, required: true},
    salary: { type: Number, required: true },
    location: { type: String, required: true, uppercase: true },
    employmentType: { type: String, required: true, enum: ['FULL-TIME', 'PART-TIME', 'FREELANCE', 'INTERNSHIP'], uppercase: true },
    images: [String],
    currency: { type: String, default: 'EUR', enum: ['EUR', 'USD'], uppercase: true, required:true },
    postDate: { type: Date, default: Date.now },
    description: { type: String, minlength: 35, required: true},
    sponsored: { type: Boolean, default: false },
}
```

On title is also appended a unique code.

```javascript

(#${company.substring(0, 1).toUpperCase()}${company.substring(company.length - 1, company.length).toUpperCase()}${Date.now().toString().substring(5, 10)}-${Date.now().toString().substring(10, 12)})
```

### HTTP Requests

## POST /ads/add

Creates an ad.

```json
request body
    {
      "contact":"+305599499442",
      "author": "george",
      "description": "Praesent id dui at qffuam fringilla aliquam eu vel nunc. Donec porta erat ut pharetra feugiat. Integer iaculis augue ac mattis tempus. Nam scelerisque vffffulputate libffeaaraaao eget luctus. Sed sit amet cursus purdus.",
      "title" : "Head Hunter",
      "company": "Deep Miners Inc",
      "salary" : "5660",
      "location" : "Blackwell",
      "currency":"eur",
      "employmentType": "part-time",
      "images": ["1.png","2.jpg","4.png"]
    }

```

## GET /ads

Returns all adds, total pages and the current page. Default is 10 ads per page. You can pass query parameters {page,limit} to change those limitations.

```json
success (200)
    {
    "adsDto": [
        {
            "id": "5f57a91d6869322c68ecc8d9",
            "location": "SERRES",
            "employmentType": "PART-TIME",
            "contact": "+305599499442",
            "currency": "EUR",
            "images": [],
            "author": "george",
            "salary": 888,
            "company": "Netflix",
            "title": "Junior developer (#NX80445-72)",
            "description": "Praesent id dui at qffuam fringilla aliquam eu vel nunc. Donec porta erat ut pharetra feugiat. Integer iaculis augue ac mattis tempus. Nam scelerisque vffffulputate libffeaaraaao eget luctus. Sed sit amet cursus purdus.",
            "postDate": "2020-09-08T15:54:05.729Z",
            "sponsored": false
        }
    ],
    "totalPages": 1,
    "currentPage": 1
    }
```

```json
not found (404)
    {
    "success": false,
    "msg": "Page 4 doesn't exist"
    }
```

## GET /ads/latest

Returns the latest added Ad in the database.

```json
success (200)
    {
    "id": "5f580d159548f933dce8f071",
    "location": "BLACKWELL",
    "employmentType": "PART-TIME",
    "contact": "+305599499442",
    "currency": "EUR",
    "images": [],
    "author": "george",
    "salary": 5660,
    "company": "Deep Miners Inc",
    "title": "Head Hunter (#DC06037-42)",
    "description": "Praesent id dui at qffuam fringilla aliquam eu vel nunc. Donec porta erat ut pharetra feugiat. Integer iaculis augue ac mattis tempus. Nam scelerisque vffffulputate libffeaaraaao eget luctus. Sed sit amet cursus purdus.",
    "postDate": "2020-09-08T23:00:37.422Z",
    "sponsored": false
    }
```

## GET /ads/:id

Returns the ad with the given ID.

```json
success (200)
    {
    "id": "5f57a91d6869322c68ecc8d9",
    "location": "SERRES",
    "employmentType": "PART-TIME",
    "contact": "+305599499442",
    "currency": "EUR",
    "images": [],
    "author": "george",
    "salary": 888,
    "company": "Netflix",
    "title": "Junior developer (#NX80445-72)",
    "description": "Praesent id dui at qffuam fringilla aliquam eu vel nunc. Donec porta erat ut pharetra feugiat. Integer iaculis augue ac mattis tempus. Nam scelerisque vffffulputate libffeaaraaao eget luctus. Sed sit amet cursus purdus.",
    "postDate": "2020-09-08T15:54:05.729Z",
    "sponsored": false
    }
```

```json
not found (404)
    {
    "success": false,
    "msg": "No ads found"
    }
```

## DELETE /ads/:id

Removes an ad with the given ID.

```json
success (200)
    {
    "success": true,
    "msg": "Ad with ID ${id} deleted"
    }
```

```json
not found (404)
   {
    "success": false,
    "msg": "Ad not found"
    }
```

## PUT /ads/:id/

Updates **description, salary, currency, company or contact** info, for the ad with the given ID.

```json
request body
    {
        "description": String
    }
    OR
    {
        "salary": double
    }
    OR
    {
        "currency": enum['EUR','USD]
    }
    OR
    {
        "company": String
    }
    OR
    {
        "contact": String
    }
```
