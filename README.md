
# 📚 Book Review API

A RESTful API built with Node.js, Express, and MongoDB for managing books, user reviews, and authentication using JWT.

---

## 🚀 Project Setup Instructions


```bash
1. Clone the repository
git clone https://github.com/kulkarnimanas732/book-review-api.git
cd book-review-api

2. Install dependencies
npm install

3. Set up environment variables
Create a .env file in the root folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

❗ Never commit this file to GitHub!
4. Run the server
npm start


💻 How to Run Locally
Install Node.js


Install MongoDB


Clone this repo


Set up .env file


Run npm start


Test APIs using Postman or Curl



🧪 Example API Requests (Postman)
🔐 Authentication
Signup
POST /signup
Body:
{
  "username": "manas123",
  "email": "manas@email.com",
  "password": "123456"
}

Login
POST /login
Body:
{
  "email": "manas@email.com",
  "password": "123456"
}


📚 Books
Add Book (auth required)
POST /books
Headers:
Authorization: Bearer <token>
Body:
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-help"
}

Get All Books
GET /books?page=1&limit=10&author=James&genre=Self-help

Get Book by ID
GET /books/:id


🔍 Search
GET /search?q=atomic


✍️ Reviews
Add Review (auth required)
POST /books/:id/reviews
Headers:
Authorization: Bearer <token>
Body:
{
  "rating": 4,
  "comment": "Very helpful book!"
}

Update Review
PUT /reviews/:id
Headers:
Authorization: Bearer <token>
Body:
{
  "rating": 5,
  "comment": "Changed my mind, it's perfect!"
}

Delete Review
DELETE /reviews/:id
Headers:
Authorization: Bearer <token>


🧠 Design Decisions / Assumptions
Each user can only leave one review per book


Book and review actions are only allowed if authenticated


Search is case-insensitive and supports partial match


JWT token is used in the Authorization header



🗃️ Database Schema (MongoDB)
User
{
  username: String,
  email: String,
  password: String (hashed)
}

Book
{
  title: String,
  author: String,
  genre: String,
  createdBy: ObjectId (User),
  reviews: [Review]
}

Review
{
  bookId: ObjectId,
  userId: ObjectId,
  rating: Number (1–5),
  comment: String
}
