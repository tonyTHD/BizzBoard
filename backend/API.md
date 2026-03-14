# BizzBoard API Documentation

Base URL: `http://localhost:5001`

## Users
- **Method:** POST
- **URL:** `/api/users`
- **Body:**
```json
{
    "name": "string",
    "email": "string",
    "password": "string"
}
```
- **Response:** `201` - Returns the created user object

### Get All Users
- **Method:** GET
- **URL:** `/api/users`
- **Body:** None
- **Response:** `200` - Returns array of all users

### Get User By ID
- **Method:** GET
- **URL:** `/api/users/:id`
- **Body:** None
- **Response:** `200` - Returns single user object, `404` if not found