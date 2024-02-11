import express from "express";
import { roleCountHandler } from "../controllers/utils.js";

const router = express.Router();

router.get('/roles_count', roleCountHandler);

export default router;