import { Router } from "express";
import { createCarEntry, getAllCarEntries, updateCarExit } from "../controllers/car-entry.controller";
import { makeMiddleware } from "../middleware";

const { protect } = makeMiddleware()
const carEntryRouter = Router();

carEntryRouter.use(protect)

carEntryRouter.post("/", createCarEntry);
carEntryRouter.put("/:id/exit", updateCarExit);
carEntryRouter.get("/", getAllCarEntries);

export default carEntryRouter;