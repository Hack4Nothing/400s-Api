import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router.js"; // Import router

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the router
app.use("/api/v1", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
