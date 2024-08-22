import express from "express";
import { getAllSlots, pushAData } from "../controllers/slotsController.js";

const slotsRoutes = express.Router();

slotsRoutes.post("/slots", pushAData);
slotsRoutes.get("/slots", getAllSlots);

export default slotsRoutes;
