import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
  time: {
    type: String,
  },
});

const Slot = mongoose.model("AppointmentOptions", slotSchema);

export default Slot;
