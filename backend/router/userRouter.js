import express from "express";
import {
  addNewAdmin,
  login,
  patientRegister,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  AddNewDoctor,
} from "../controllers/userController.js";

import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/doctors", getAllDoctors);
router.get("/Admin/me", isAdminAuthenticated, getUserDetails);
router.get("/Patient/me", isPatientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/doctor/addnew", isAdminAuthenticated, AddNewDoctor);

export default router;
