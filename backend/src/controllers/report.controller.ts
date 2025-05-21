import type { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getOutgoingCarsReport = async (req: Request, res: Response) => {
  try {
    // Only admin can access reports
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can access reports" })
    }

    const { startDate, endDate, parkingCode } = req.query

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" })
    }

    const start = new Date(startDate as string)
    const end = new Date(endDate as string)

    // Set end date to end of day
    end.setHours(23, 59, 59, 999)

    const whereClause: any = {
      exitTime: {
        gte: start,
        lte: end,
      },
    }

    if (parkingCode) {
      whereClause.parkingCode = parkingCode as string
    }

    const cars = await prisma.car.findMany({
      where: whereClause,
      include: { parking: true },
      orderBy: { exitTime: "desc" },
    })

    const totalAmount = cars.reduce((sum, car) => sum + car.totalFee, 0)

    res.status(200).json({
      cars,
      totalAmount,
      count: cars.length,
    })
  } catch (error) {
    console.error("Get outgoing cars report error:", error)
    res.status(500).json({ message: "Server error while generating report" })
  }
}

export const getEnteredCarsReport = async (req: Request, res: Response) => {
  try {
    // Only admin can access reports
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can access reports" })
    }

    const { startDate, endDate, parkingCode } = req.query

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" })
    }

    const start = new Date(startDate as string)
    const end = new Date(endDate as string)

    // Set end date to end of day
    end.setHours(23, 59, 59, 999)

    const whereClause: any = {
      entryTime: {
        gte: start,
        lte: end,
      },
    }

    if (parkingCode) {
      whereClause.parkingCode = parkingCode as string
    }

    const cars = await prisma.car.findMany({
      where: whereClause,
      include: { parking: true },
      orderBy: { entryTime: "desc" },
    })

    res.status(200).json({
      cars,
      count: cars.length,
    })
  } catch (error) {
    console.error("Get entered cars report error:", error)
    res.status(500).json({ message: "Server error while generating report" })
  }
}

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // Only admin can access dashboard stats
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Only admin can access dashboard stats" })
    }

    // Get total parkings
    const totalParkings = await prisma.parking.count()

    // Get total active cars
    const totalActiveCars = await prisma.car.count({
      where: { exitTime: null },
    })

    // Get today's revenue
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayRevenue = await prisma.car.aggregate({
      where: {
        exitTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      _sum: {
        totalFee: true,
      },
    })

    // Get available slots
    const parkings = await prisma.parking.findMany({
      select: {
        availableSlots: true,
        totalSlots: true,
      },
    })

    const totalSlots = parkings.reduce((sum, parking) => sum + parking.totalSlots, 0)
    const availableSlots = parkings.reduce((sum, parking) => sum + parking.availableSlots, 0)

    res.status(200).json({
      totalParkings,
      totalActiveCars,
      todayRevenue: todayRevenue._sum.totalFee || 0,
      totalSlots,
      availableSlots,
      occupancyRate: totalSlots > 0 ? ((totalSlots - availableSlots) / totalSlots) * 100 : 0,
    })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({ message: "Server error while fetching dashboard stats" })
  }
}
