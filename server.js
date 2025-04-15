require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes")
const reportRoutes = require ("./src/routes/reportRoutes")
const setupSwagger = require('./src/config/swagger'); // Swagger aqui
const path = require("path");


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api", reportRoutes);
setupSwagger(app); // Ativa o Swagger
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});