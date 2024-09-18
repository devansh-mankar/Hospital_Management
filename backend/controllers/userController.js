import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncError(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    dob,
    nic,
    gender,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !dob ||
    !gender ||
    !role ||
    !nic ||
    !password
  ) {
    return next(new ErrorHandler("kindly fill the details", 400));
  }

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("user already registered!", 400));
  }

  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    dob,
    nic,
    gender,
    role,
  });
  generateToken(user, "user registered!", 200, res);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("kindly fill the details", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password don't match", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid password or email", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid password or email", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("user with this role was not found", 400));
  }
  generateToken(user, "user Logged in successfully!", 200, res);
});

export const addNewAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, dob, nic, gender } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !dob ||
    !gender ||
    !nic ||
    !password
  ) {
    return next(new ErrorHandler("kindly fill the details!", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler("Admin with this email is already registered!")
    );
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    dob,
    nic,
    gender,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "new Admin registered!",
  });
});

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("AdminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out successfully!",
    });
});

export const logoutPatient = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out successfully!",
    });
});

export const AddNewDoctor = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar required!", 400));
  }

  const { docAvatar } = req.files;

  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/HEIC",
  ];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("file format not supported!", 400));
  }

  const {
    firstName,
    lastName,
    gender,
    dob,
    nic,
    email,
    phone,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !gender ||
    !dob ||
    !nic ||
    !email ||
    !phone ||
    !password ||
    !doctorDepartment
  ) {
    return next(new ErrorHandler("kindly fill the details!", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(
        `${isRegistered.role} already registered with this email!`,
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
  }

  const doctor = await User.create({
    firstName,
    lastName,
    gender,
    dob,
    nic,
    email,
    phone,
    password,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    messgae: "new doctor registered!",
    doctor,
  });
});
