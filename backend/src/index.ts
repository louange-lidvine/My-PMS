import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import authRoutes from "./routes/auth.routes"
import parkingRoutes from "./routes/parking.routes"
import carRoutes from "./routes/car.routes"
import reportRoutes from "./routes/report.routes"
import { authenticateToken } from "./middleware/auth.middleware"
import { setupSwagger } from "./swagger"

dotenv.config()

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5050

// Middleware
app.use(cors())
app.use(express.json())

// Setup Swagger
setupSwagger(app)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/parking", authenticateToken, parkingRoutes)
app.use("/api/cars", authenticateToken, carRoutes)
app.use("/api/reports", authenticateToken, reportRoutes)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`)
})

// Handle shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect()
  process.exit(0)
})
