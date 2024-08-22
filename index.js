import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db/db.js";
import userRoutes from "./routes/userRoutes.js";
import slotsRoutes from "./routes/slotsRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// CONFIG
dotenv.config();

// APPLICATION
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/slots', slotsRoutes)
app.use('/api/v1/appointment', appointmentRoutes)

// HOMEPAGE

app.get("/", (req, res) => {
  res.send("Welcome to my Doctor Appointment server");
});

// LISTEN SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB()
  console.log(`Server running on port ${PORT}`.cyan.bold);
});
