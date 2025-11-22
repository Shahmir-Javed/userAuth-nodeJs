npm install

npm run dev

API endpoints:

POST /api/auth/register (body: firstname, lastname, username, email, password)

POST /api/auth/login (body: email, password)

POST /api/auth/logout

GET /api/users/ (protected)

GET /api/users/me (protected)
