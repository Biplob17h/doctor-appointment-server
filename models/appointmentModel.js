import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  patientEmail: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  patientAge: {
    type: String,
    required: true,
  },
  patientGender: {
    type: String,
    required: true,
  },
  patientPhone: {
    type: String,
    required: true,
  },
  patientSymptoms: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointments", appointmentSchema);

export default Appointment;
