import Appointment from "../models/appointmentModel.js";
import Slot from "../models/slotModel.js";

const pushAData = async (req, res) => {
  try {
    const { time } = req.body;

    const slot = new Slot({ time });
    const result = await slot.save();
    res.json({ success: "success", data: result });
  } catch (error) {
    res.json({
      success: "fail",
      message: error.message,
    });
  }
};

const getAllSlots = async (req, res) => {
  try {
    // Get selected date from the query parameter
    const date = req.query.date;

    // Get all slots
    const slots = await Slot.find({});

    // Get all appointments for the selected date
    const appointments = await Appointment.find({ date });

    // Extract appointment times
    const bookedTimes = appointments.map((appointment) => appointment.time);

    // Filter out the slots that are already booked
    const availableSlots = slots.filter(
      (slot) => !bookedTimes.includes(slot.time)
    );

    // Respond with available slots
    res.status(200).json({ status: "success", data: availableSlots });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

export { getAllSlots, pushAData };
