import express from "express";
import { upload } from "../middleware/handleFile.js";
import { createPeople, getAllPeoples, getPeople } from "../controllers/people.js";

const router=express.Router();

router.post('/', upload.single("attachement"), createPeople );
router.get('/', getAllPeoples)
router.get('/:id', getPeople);


export default router;