import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const createParking = async (req: Request, res: Response) => {
  try {
    // Only admin can create parking
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can create parking" })
    }

    const { code, name, location, totalSlots, feePerHour } = req.body

    // Check if parking with code already exists
    const existingParking = await prisma.parking.findUnique({
      where: { code },
    })

    if (existingParking) {
      return res.status(400).json({ message: "Parking with this code already exists" })
    }

    // Create parking
    const parking = await prisma.parking.create({
      data: {
        code,
        name,
        location,
        totalSlots,
        availableSlots: totalSlots, // Initially all slots are available
        feePerHour,
      },
    })

    res.status(201).json({
      message: "Parking created successfully",
      parking,
    })
  } catch (error) {
    console.error("Create parking error:", error)
    res.status(500).json({ message: "Server error while creating parking" })
  }
}

export const getAllParkings = async (req: Request, res: Response) => {
  try {
    const parkings = await prisma.parking.findMany()
    res.status(200).json(parkings)
  } catch (error) {
    console.error("Get parkings error:", error)
    res.status(500).json({ message: "Server error while fetching parkings" })
  }
}

export const getParkingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const parking = await prisma.parking.findUnique({
      where: { id },
    })

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" })
    }

    res.status(200).json(parking)
  } catch (error) {
    console.error("Get parking error:", error)
    res.status(500).json({ message: "Server error while fetching parking" })
  }
}

export const updateParking = async (req: Request, res: Response) => {
  try {
    // Only admin can update parking
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can update parking" })
    }

    const { id } = req.params
    const { name, location, totalSlots, feePerHour } = req.body

    const parking = await prisma.parking.findUnique({
      where: { id },
    })

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" })
    }

    // Calculate new available slots
    const usedSlots = parking.totalSlots - parking.availableSlots
    const newAvailableSlots = totalSlots - usedSlots

    if (newAvailableSlots < 0) {
      return res.status(400).json({ message: "Cannot reduce total slots below currently used slots" })
    }

    const updatedParking = await prisma.parking.update({
      where: { id },
      data: {
        name,
        location,
        totalSlots,
        availableSlots: newAvailableSlots,
        feePerHour,
      },
    })

    res.status(200).json({
      message: "Parking updated successfully",
      parking: updatedParking,
    })
  } catch (error) {
    console.error("Update parking error:", error)
    res.status(500).json({ message: "Server error while updating parking" })
  }
}

export const deleteParking = async (req: Request, res: Response) => {
  try {
    // Only admin can delete parking
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can delete parking" })
    }

    const { id } = req.params

    // Check if parking exists
    const parking = await prisma.parking.findUnique({
      where: { id },
      include: { cars: true },
    })

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" })
    }

    // Check if there are active cars in the parking
    const activeCars = parking.cars.filter((car) => car.exitTime === null)
    if (activeCars.length > 0) {
      return res.status(400).json({ message: "Cannot delete parking with active cars" })
    }

    // Delete parking
    await prisma.parking.delete({
      where: { id },
    })

    res.status(200).json({ message: "Parking deleted successfully" })
  } catch (error) {
    console.error("Delete parking error:", error)
    res.status(500).json({ message: "Server error while deleting parking" })
  }
}
