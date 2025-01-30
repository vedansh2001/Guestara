import express from "express";
import cors from "cors";

import categoryRoutes from "./routes/CategoryRoutes.js";
import subCategoryRoutes from "./routes/SubCategoryRoutes.js";
import itemRoutes from "./routes/ItemRoutes.js";

const app = express();

//which origins should be able to acess your backend
app.use(cors({
  origin: ['http://localhost:5173', 'https://guestara-crud.vercel.app'], // Allow local & deployed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json({limit: "16kb"})) //limit of JSON data
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))


app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/items", itemRoutes);



export { app }