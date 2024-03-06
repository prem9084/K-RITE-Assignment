import express from "express";
import formidable from "express-formidable";
import {
  DNSPhotoController,
  createDNSController,
  deleteDNSController,
  getAllDNSController,
  getSingleRecord,
  updateDNSController,
} from "../controllers/DNSController.js";
import { isAuth } from "../middlesware/authMiddelware.js";

const router = express.Router();

router.post("/create-dns", isAuth, formidable(), createDNSController);
router.put("/update-dns/:uid", isAuth, formidable(), updateDNSController);
router.delete("/delete-dns/:id", isAuth, deleteDNSController);
router.get("/get-dns", isAuth, getAllDNSController);
router.get("/get-single-dns/:uid", isAuth, getSingleRecord);
router.get("/get-photo-dns/:id", DNSPhotoController);

export default router;
