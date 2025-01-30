import express from "express";
import cors from "cors";

import categoryRoutes from "./routes/CategoryRoutes.js";
import subCategoryRoutes from "./routes/SubCategoryRoutes.js";
import itemRoutes from "./routes/ItemRoutes.js";

const app = express();

//which origins should be able to acess your backend
app.use(cors({
    origin: ['http://localhost:5173'], // Specific frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

app.use(express.json({limit: "16kb"})) //limit of JSON data
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))


app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subCategoryRoutes);
app.use("/api/items", itemRoutes);



export { app }