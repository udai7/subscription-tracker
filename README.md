# Subscription Tracker

A robust subscription management system that helps users track and manage their recurring subscriptions with automated email reminders.

## Features

- 🔐 User Authentication (Sign Up, Sign In)
- 📝 Subscription Management
  - Create new subscriptions
  - View all subscriptions
  - Track subscription details
- ⏰ Automated Email Reminders
  - 7 days before renewal
  - 5 days before renewal
  - 2 days before renewal
  - 1 day before renewal
- 💰 Subscription Details
  - Name, price, currency
  - Payment method
  - Renewal date
  - Subscription category
  - Status tracking

## Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication
  - Nodemailer
  - Upstash Workflow
  - Arcjet Security

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Gmail account (for email notifications)
- Upstash account (for workflow management)
- Arcjet account (for security)

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/subscription-tracker.git
cd subscription-tracker
```

2. Install dependencies
```bash
npm install
```

3. Create environment files
Create `.env.development.local` for development:
```env
PORT=5500
NODE_ENV=development
DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
EMAIL_PASSWORD=your_gmail_app_password
QSTASH_URL=your_upstash_qstash_url
QSTASH_TOKEN=your_upstash_qstash_token
ARCJET_KEY=your_arcjet_key
```

4. Start the development server
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/sign-up` - Register a new user
- `POST /api/v1/auth/sign-in` - Login user
- `POST /api/v1/auth/sign-out` - Logout user

### Subscriptions
- `POST /api/v1/subscriptions` - Create a new subscription
- `GET /api/v1/subscriptions/user/:id` - Get user's subscriptions
- `GET /api/v1/subscriptions/:id` - Get subscription details
- `PUT /api/v1/subscriptions/:id/cancel` - Cancel a subscription

## Email Notifications

The system sends automated email reminders for upcoming subscription renewals:
- 7 days before renewal
- 5 days before renewal
- 2 days before renewal
- 1 day before renewal

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting with Arcjet
- Bot detection
- Input validation
- Error handling middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Upstash](https://upstash.com/)
- [Arcjet](https://arcjet.com/)
- [Nodemailer](https://nodemailer.com/)
