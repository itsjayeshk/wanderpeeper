# 🌍 WanderPeeper

> A full-stack travel listing web application inspired by Airbnb — built to explore, list, and review stays around the world.

🔗 **Live Demo:** [wanderpeeper.onrender.com/listings](https://wanderpeeper.onrender.com/listings)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🏡 Listings | Create, edit, and delete property listings |
| 📸 Image Upload | Upload images for each stay |
| ⭐ Reviews | Leave ratings and reviews on listings |
| 🔐 Auth | Secure authentication & authorization |
| 📍 Location | Country and location-based listing support |
| 🎨 Responsive UI | Clean interface built with Bootstrap |
| ☁️ Cloud DB | MongoDB Atlas integration |
| 🚀 Deployment | Hosted on Render |

---

## 🛠️ Tech Stack

### Frontend
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat&logo=ejs&logoColor=black)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)

### Database
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-AA0000?style=flat&logo=mongoose&logoColor=white)

### Authentication & Utilities
- **Passport.js** — Authentication middleware
- **Joi** — Schema validation
- **Express Session** — Session management
- **Connect Flash** — Flash messages
- **Method Override** — RESTful HTTP methods

---

## 📂 Project Structure

```bash
wanderpeeper/
│
├── models/          # Mongoose models (Listing, Review, User)
├── routes/          # Express route handlers
├── views/           # EJS templates
├── public/          # Static assets (CSS, JS, images)
├── utils/           # Utility functions & error helpers
├── middleware.js    # Custom middleware (auth, validation)
├── app.js           # Main server entry point
└── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/itsjayeshk/wanderpeeper.git
cd wanderpeeper
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
```

### 4. Start the server

```bash
# Standard
node app.js

# With auto-reload (recommended for development)
nodemon app.js
```

The app will be running at `http://localhost:3000`.

---

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URL` | MongoDB Atlas connection string | ✅ Yes |
| `CLOUD_NAME` | Coudinary Name connection string | ✅ Yes |
| `CLOUD_API_KEY` | Cloudinary API Key connection string | ✅ Yes |
| `CLOUD_API_SECRET` | Cloudinary API Secret connection string | ✅ Yes |

---

## 📸 Screenshots

> Add screenshots of your project here to give visitors a visual preview.

```md
![Home Page](screenshots/home.png)
![Listing Detail](screenshots/listing.png)
![New Listing Form](screenshots/new-listing.png)
```

---

## 🧠 What I Learned

Building WanderPeeper strengthened my understanding of:

- ✅ **RESTful routing** — Clean, resource-based URL design
- ✅ **MVC architecture** — Separation of concerns across models, views, and controllers
- ✅ **Authentication & authorization** — Using Passport.js with sessions
- ✅ **MongoDB relationships** — Referencing and populating related documents
- ✅ **Backend validation** — Schema-level and request-level validation with Joi
- ✅ **Deployment workflow** — Pushing to production using Render + MongoDB Atlas

---

## 🤝 Contributing

Contributions are welcome and appreciated!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by **Jayesh Khandelwal**

[![GitHub](https://img.shields.io/badge/GitHub-itsjayeshk-181717?style=flat&logo=github&logoColor=white)](https://github.com/itsjayeshk)
