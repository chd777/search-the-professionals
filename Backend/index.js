// index.js
import app from './app.js';
import mongoose from 'mongoose';

const PORT = 3000;
const MONGODB_URI = "mongodb+srv://satish:Satish@professionals.lnetor5.mongodb.net/?retryWrites=true&w=majority";

// Middleware / test route (you can remove later)
app.get('/', (_req, res) => {
  res.send("This is the Homepage.");
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully!");

    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
