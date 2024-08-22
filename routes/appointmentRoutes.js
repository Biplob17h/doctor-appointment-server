import express from "express";
import { createAnAppointment } from "../controllers/appointmentController.js";

const appointmentRoutes = express.Router();


// ALL POSTS
appointmentRoutes.post('/create', createAnAppointment)

export default appointmentRoutes;
