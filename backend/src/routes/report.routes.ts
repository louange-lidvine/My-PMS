import express from "express"
import { getOutgoingCarsReport, getEnteredCarsReport, getDashboardStats } from "../controllers/report.controller"
import { isAdmin } from "../middleware/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     OutgoingCarsReport:
 *       type: object
 *       properties:
 *         cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: Total amount collected from outgoing cars
 *         count:
 *           type: integer
 *           description: Number of outgoing cars
 *     EnteredCarsReport:
 *       type: object
 *       properties:
 *         cars:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Car'
 *         count:
 *           type: integer
 *           description: Number of entered cars
 *     DashboardStats:
 *       type: object
 *       properties:
 *         totalParkings:
 *           type: integer
 *           description: Total number of parkings
 *         totalActiveCars:
 *           type: integer
 *           description: Total number of active cars
 *         todayRevenue:
 *           type: number
 *           format: float
 *           description: Revenue collected today
 *         totalSlots:
 *           type: integer
 *           description: Total number of parking slots
 *         availableSlots:
 *           type: integer
 *           description: Number of available parking slots
 *         occupancyRate:
 *           type: number
 *           format: float
 *           description: Occupancy rate (percentage)
 */

/**
 * @swagger
 * /api/reports/outgoing:
 *   get:
 *     summary: Get outgoing cars report (Admin only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: parkingCode
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by parking code
 *     responses:
 *       200:
 *         description: Outgoing cars report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OutgoingCarsReport'
 *       400:
 *         description: Start date and end date are required
 *       403:
 *         description: Only admin can access reports
 *       500:
 *         description: Server error while generating report
 */
router.get("/outgoing", isAdmin, getOutgoingCarsReport)

/**
 * @swagger
 * /api/reports/entered:
 *   get:
 *     summary: Get entered cars report (Admin only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date for the report (YYYY-MM-DD)
 *       - in: query
 *         name: parkingCode
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by parking code
 *     responses:
 *       200:
 *         description: Entered cars report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnteredCarsReport'
 *       400:
 *         description: Start date and end date are required
 *       403:
 *         description: Only admin can access reports
 *       500:
 *         description: Server error while generating report
 */
router.get("/entered", isAdmin, getEnteredCarsReport)

/**
 * @swagger
 * /api/reports/dashboard:
 *   get:
 *     summary: Get dashboard statistics (Admin only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardStats'
 *       403:
 *         description: Only admin can access dashboard stats
 *       500:
 *         description: Server error while fetching dashboard stats
 */
router.get("/dashboard", isAdmin, getDashboardStats)

export default router
