import { Router } from "express";
import { update_data, get_data, get_data_country, delete_data } from "../controller/controller.js";

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

router.get("/get_data", get_data, (req, res) => {
    res.json({message: "Get Data" });
});

router.post("/update_data", update_data, (req, res) => {
    res.json({message: "Update Data" });
});

router.post("/get_data_country", get_data_country, (req, res) => {
    res.json({message: "Get Data Country" });
});

router.post("/delete_data", delete_data, (req, res) => {
    res.json({message: "Delete Data" });
});

export default router;