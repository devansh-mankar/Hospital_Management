import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { Appointment } from "../models/appointmentSchema.js";

export const postAppointment = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    dob,
    nic,
    gender,
    email,
    phone,
    appointment_date,
    department,
    hasVisited,
    address,
    doctor_firstName,
    doctor_lastName,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !dob ||
    !nic ||
    !gender ||
    !email ||
    !phone ||
    !appointment_date ||
    !department ||
    !address ||
    !doctor_firstName ||
    !doctor_lastName
  ) {
    next(new ErrorHandler("kindly fill the details!", 400));
  }

  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });

  if (isConflict.length === 0) {
    return next(new ErrorHandler("Doctor not found!", 404));
  }
  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "doctors conflict! please contact through email or phone!",
        404
      )
    );
  }

  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;

  const appointment = await Appointment.create({
    firstName,
    lastName,
    dob,
    nic,
    gender,
    email,
    phone,
    appointment_date,
    department,
    hasVisited,
    address,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    doctorId,
    patientId,
  });

  res.status(200).json({
    success: true,
    message: "Appointment sent successfully!",
    appointment,
  });
});

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const updateAppointmentStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);

    if (!appointment) {
      return next(new ErrorHandler("appointment not found!", 404));
    }

    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    res.status(200).json({
      success: true,
      message: "Appointment status updated!",
      appointment,
    });
  }
);

export const deleteAppointment = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);

  if (!appointment) {
    return next(new ErrorHandler("Appointment not found!", 404));
  }

  await Appointment.deleteOne();

  res.status(200).json({
    success: true,
    message: "Appointment deleted!",
  });
});
