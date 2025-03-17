import { Router } from "express";
import { update_data } from "../controller/controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({message: "Hello World" });
});

router.post("/login", (req, res) => {
    res.json({message: "Login" });
});

router.post("/register", (req, res) => {
    res.json({message: "Register" });
});

router.post("/get_data", (req, res) => {
    res.json({message: "Get Data" });
});

router.post("/update_data", update_data, (req, res) => {
    res.json({message: "Update Data" });
});

router.get("/get_data_country", (req, res) => {
    res.json({message: "Get Data Country" });
});

export default router;