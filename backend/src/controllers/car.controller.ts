import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const carEntry = async (req: Request, res: Response) => {
  try {
    const { plateNumber, parkingCode } = req.body

    // Check if parking exists
    const parking = await prisma.parking.findUnique({
      where: { code: parkingCode },
    })

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" })
    }

    // Check if there are available slots
    if (parking.availableSlots <= 0) {
      return res.status(400).json({ message: "No available slots in this parking" })
    }

    // Check if car is already in the parking
    const existingCar = await prisma.car.findFirst({
      where: {
        plateNumber,
        parkingCode,
        exitTime: null,
      },
    })

    if (existingCar) {
      return res.status(400).json({ message: "Car is already in the parking" })
    }

    // Create car entry
    const car = await prisma.car.create({
      data: {
        plateNumber,
        parkingCode,
      },
    })

    // Update available slots
    await prisma.parking.update({
      where: { code: parkingCode },
      data: {
        availableSlots: parking.availableSlots - 1,
      },
    })

    // Generate ticket
    const ticket = {
      ticketId: car.id,
      plateNumber: car.plateNumber,
      parkingName: parking.name,
      parkingCode: car.parkingCode,
      entryTime: car.entryTime,
      feePerHour: parking.feePerHour,
    }

    res.status(201).json({
      message: "Car entry recorded successfully",
      ticket,
    })
  } catch (error) {
    console.error("Car entry error:", error)
    res.status(500).json({ message: "Server error while recording car entry" })
  }
}

export const carExit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Find car
    const car = await prisma.car.findUnique({
      where: { id },
      include: { parking: true },
    })

    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    if (car.exitTime) {
      return res.status(400).json({ message: "Car has already exited" })
    }

    // Calculate total fee
    const exitTime = new Date()
    const entryTime = new Date(car.entryTime)
    const hoursParked = (exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60)
    const totalFee = Math.ceil(hoursParked) * car.parking.feePerHour

    // Update car record
    const updatedCar = await prisma.car.update({
      where: { id },
      data: {
        exitTime,
        totalFee,
      },
      include: { parking: true },
    })

    // Update available slots
    await prisma.parking.update({
      where: { code: car.parkingCode },
      data: {
        availableSlots: car.parking.availableSlots + 1,
      },
    })

    // Generate bill
    const bill = {
      billId: updatedCar.id,
      plateNumber: updatedCar.plateNumber,
      parkingName: updatedCar.parking.name,
      entryTime: updatedCar.entryTime,
      exitTime: updatedCar.exitTime,
      hoursParked: Math.ceil(hoursParked),
      feePerHour: updatedCar.parking.feePerHour,
      totalFee: updatedCar.totalFee,
    }

    res.status(200).json({
      message: "Car exit recorded successfully",
      bill,
    })
  } catch (error) {
    console.error("Car exit error:", error)
    res.status(500).json({ message: "Server error while recording car exit" })
  }
}

export const getActiveCars = async (req: Request, res: Response) => {
  try {
    const { parkingCode } = req.query

    const whereClause = parkingCode ? { parkingCode: parkingCode as string, exitTime: null } : { exitTime: null }

    const cars = await prisma.car.findMany({
      where: whereClause,
      include: { parking: true },
    })

    res.status(200).json(cars)
  } catch (error) {
    console.error("Get active cars error:", error)
    res.status(500).json({ message: "Server error while fetching active cars" })
  }
}

export const getCarHistory = async (req: Request, res: Response) => {
  try {
    const { plateNumber } = req.params

    const cars = await prisma.car.findMany({
      where: { plateNumber },
      include: { parking: true },
      orderBy: { entryTime: "desc" },
    })

    res.status(200).json(cars)
  } catch (error) {
    console.error("Get car history error:", error)
    res.status(500).json({ message: "Server error while fetching car history" })
  }
}
