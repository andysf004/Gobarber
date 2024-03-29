import { Router } from "express";
import multer from "multer";
import UserController from "./app/controllers/UserController";
import FileController from "./app/controllers/FileController";
import SessionController from "./app/controllers/SessionController";
import ProviderController from "./app/controllers/ProviderController";
import AppointmentController from "./app/controllers/AppointmentController";
import ScheduleController from "./app/controllers/ScheduleController";
import NotificationController from "./app/controllers/NotificationController";
import authMiddleware from "./middleware/auth";
import multerConfig from "./config/multer";

const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.put("/users", UserController.update);
routes.get("/providers", ProviderController.index);
routes.post("/files", upload.single("file"), FileController.store);

routes.get("/appointments", AppointmentController.index);
routes.post("/appointments", AppointmentController.store);
routes.delete("/appointments/:id", AppointmentController.delete);

routes.get("/notifications", NotificationController.index);
routes.put("/notifications/:id", NotificationController.update);
routes.get("/schedule", ScheduleController.index);

module.exports = routes;
