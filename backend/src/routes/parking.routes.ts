import express from "express"
import {
  createParking,
  getAllParkings,
  getParkingById,
  updateParking,
  deleteParking,
} from "../controllers/parking.controller"
import { isAdmin } from "../middleware/auth.middleware"

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Parking:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - location
 *         - totalSlots
 *         - feePerHour
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the parking
 *         code:
 *           type: string
 *           description: Unique code for the parking
 *         name:
 *           type: string
 *           description: Name of the parking
 *         location:
 *           type: string
 *           description: Location of the parking
 *         totalSlots:
 *           type: integer
 *           description: Total number of parking slots
 *         availableSlots:
 *           type: integer
 *           description: Number of available parking slots
 *         feePerHour:
 *           type: number
 *           format: float
 *           description: Fee per hour for parking
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the parking was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the parking was last updated
 */

/**
 * @swagger
 * /api/parking:
 *   post:
 *     summary: Create a new parking (Admin only)
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *               - location
 *               - totalSlots
 *               - feePerHour
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               totalSlots:
 *                 type: integer
 *               feePerHour:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Parking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 parking:
 *                   $ref: '#/components/schemas/Parking'
 *       400:
 *         description: Parking with this code already exists
 *       403:
 *         description: Only admin can create parking
 *       500:
 *         description: Server error while creating parking
 */
router.post("/", isAdmin, createParking)

/**
 * @swagger
 * /api/parking:
 *   get:
 *     summary: Get all parkings
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all parkings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parking'
 *       500:
 *         description: Server error while fetching parkings
 */
router.get("/", getAllParkings)

/**
 * @swagger
 * /api/parking/{id}:
 *   get:
 *     summary: Get a specific parking by ID
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the parking
 *     responses:
 *       200:
 *         description: Parking details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parking'
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Server error while fetching parking
 */
router.get("/:id", getParkingById)

/**
 * @swagger
 * /api/parking/{id}:
 *   put:
 *     summary: Update a parking (Admin only)
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the parking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               totalSlots:
 *                 type: integer
 *               feePerHour:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Parking updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 parking:
 *                   $ref: '#/components/schemas/Parking'
 *       400:
 *         description: Cannot reduce total slots below currently used slots
 *       403:
 *         description: Only admin can update parking
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Server error while updating parking
 */
router.put("/:id", isAdmin, updateParking)

/**
 * @swagger
 * /api/parking/{id}:
 *   delete:
 *     summary: Delete a parking (Admin only)
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the parking
 *     responses:
 *       200:
 *         description: Parking deleted successfully
 *       400:
 *         description: Cannot delete parking with active cars
 *       403:
 *         description: Only admin can delete parking
 *       404:
 *         description: Parking not found
 *       500:
 *         description: Server error while deleting parking
 */
router.delete("/:id", isAdmin, deleteParking)

export default router
