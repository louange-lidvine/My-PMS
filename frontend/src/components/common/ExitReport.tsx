// ExitReport.tsx
import { useState } from "react";
import { useOutgoingCarsReport } from "@/hooks/useReports";
import { DataTable } from "./data-table";

const ExitReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { data, isPending } = useOutgoingCarsReport(
        {
            startDate: `${startDate}T${startTime}`,
            endDate: `${endDate}T${endTime}`,
        },
        submitted
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (startDate && endDate && startTime && endTime) {
            setSubmitted(true);
        }
    };

    const handleExportCSV = () => {
        if (!data?.cars?.length) return;

        const csvHeaders = ["Plate Number", "Exit Time", "Parking Code"];
        const csvRows = data.cars.map((car: any) =>
            [car.plateNumber, car.exitTime, car.parkingCode].join(",")
        );

        const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "outgoing_cars_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const columns = [
        { key: "plateNumber", header: "Plate Number" },
        { key: "exitTime", header: "Exit Time" },
        { key: "parkingCode", header: "Parking Code" },
    ];

    return (
        <div className="p-6 space-y-6">
            <form
                onSubmit={handleSubmit}
                className="flex flex-wrap gap-4 items-end"
            >
                <div>
                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label>Start Time</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label>End Time</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>

            {submitted && !isPending && (
                <>
                    {data?.cars?.length > 0 ? (
                        <>
                            <button
                                onClick={handleExportCSV}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
                            >
                                Export as CSV
                            </button>
                            <DataTable columns={columns} data={data.cars} />
                        </>
                    ) : (
                        <div>No cars in that range.</div>
                    )}
                </>
            )}
        </div>
    );
};

export default ExitReport;
