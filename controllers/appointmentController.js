import Appointment from "../models/appointmentModel.js";

const createAnAppointment = async (req, res) => {
  try {
    const {
      patientName,
      patientEmail,
      email,
      date,
      time,
      patientPhone,
      patientAge,
      patientGender,
      patientSymptoms,
    } = req.body;

    // Check if the user has already booked an appointment on the same date
    const existingAppointments = await Appointment.find({
      email,
      date,
    });

    if (existingAppointments.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: "You have already booked an appointment at this date",
      });
    }

    // create a new appointment
    const appointment = new Appointment({
      patientName,
      patientEmail,
      email,
      date,
      time,
      patientPhone,
      patientAge,
      patientGender,
      patientSymptoms,
    });
    const result = await appointment.save();

    res.json({
      status: "success",
      result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

export { createAnAppointment };
