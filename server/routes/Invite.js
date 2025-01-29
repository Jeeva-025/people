import express from "express";
import { creatInvite, deleteInvite, getAllInvites } from "../controllers/Invite.js";

const router=express.Router();

router.get('/', getAllInvites);
router.post('/', creatInvite);
router.post('/:id', deleteInvite);

export default router;