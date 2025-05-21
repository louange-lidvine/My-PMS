import express from "express"
import { carEntry, carExit, getActiveCars, getCarHistory } from "../controllers/car.controller"

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the car
 *         plateNumber:
 *           type: string
 *           description: License plate number of the car
 *         parkingCode:
 *           type: string
 *           description: Code of the parking where the car is parked
 *         entryTime:
 *           type: string
 *           format: date-time
 *           description: Time when the car entered the parking
 *         exitTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Time when the car exited the parking (null if still parked)
 *         totalFee:
 *           type: number
 *           format: float
 *           description: Total fee charged for parking
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the record was last updated
 *     Ticket:
 *       type: object
 *       properties:
 *         ticketId:
 *           type: string
 *           description: ID of the ticket (same as car ID)
 *         plateNumber:
 *           type: string
 *           description: License plate number of the car
 *         parkingName:
 *           type: string
 *           description: Name of the parking
 *         parkingCode:
 *           type: string
 *           description: Code of the parking
 *         entryTime:
 *           type: string
 *           format: date-time
 *           description: Time when the car entered the parking
 *         feePerHour:
 *           type: number
 *           format: float
 *           description: Fee per hour for parking
 *     Bill:
 *       type: object
 *       properties:
 *         billId:
 *           type: string
 *           description: ID of the bill (same as car ID)
 *         plateNumber:
 *           type: string
 *           description: License plate number of the car
 *         parkingName:
 *           type: string
 *           description: Name of the parking
 *         entryTime:
 *           type: string
 *           format: date-time
 *           description: Time when the car entered the parking
 *         exitTime:
 *           type: string
 *           format: date-time
 *           description: Time when the car exited the parking
 *         hoursParked:
 *           type: number
 *           description: Number of hours the car was parked
 *         feePerHour:
 *           type: number
 *           format: float
 *           description: Fee per hour for parking
 *         totalFee:
 *           type: number
 *           format: float
 *           description: Total fee charged for parking
 */

/**
 * @swagger
 * /api/cars/entry:
 *   post:
 *     summary: Record a car entry
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plateNumber
 *               - parkingCode
 *             properties:
 *               plateNumber:
 *                 type: string
 *                 description: License plate number of the car
 *               parkingCode:
 *                 type: string
 *                 description: Code of the parking
 *     responses:
 *       201:
 *         description: Car entry recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 ticket:
 *                   $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: No available slots in this parking or car is already in the parking
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Server error while recording car entry
 */
router.post("/entry", carEntry)

/**
 * @swagger
 * /api/cars/exit/{id}:
 *   put:
 *     summary: Record a car exit
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the car
 *     responses:
 *       200:
 *         description: Car exit recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 bill:
 *                   $ref: '#/components/schemas/Bill'
 *       400:
 *         description: Car has already exited
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error while recording car exit
 */
router.put("/exit/:id", carExit)

/**
 * @swagger
 * /api/cars/active:
 *   get:
 *     summary: Get all active cars
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: parkingCode
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by parking code
 *     responses:
 *       200:
 *         description: List of active cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error while fetching active cars
 */
router.get("/active", getActiveCars)

/**
 * @swagger
 * /api/cars/history/{plateNumber}:
 *   get:
 *     summary: Get car history by plate number
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: plateNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: License plate number of the car
 *     responses:
 *       200:
 *         description: Car history
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       500:
 *         description: Server error while fetching car history
 */
router.get("/history/:plateNumber", getCarHistory)

export default router
