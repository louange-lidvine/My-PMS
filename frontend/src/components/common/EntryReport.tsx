// EntryReport.tsx
import { useState } from "react";
import { useEnteredCarsReport } from "@/hooks/useReports";
import { DataTable } from "./data-table";

const EntryReport = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const { data, isPending } = useEnteredCarsReport(
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

    const exportToCSV = () => {
        if (!data?.cars?.length) return;

        const headers = ["Plate Number", "Entry Time", "Parking Code"];
        const rows = data.cars.map((car: any) => [
            car.plateNumber,
            car.entryTime,
            car.parkingCode,
        ]);

        let csvContent =
            "data:text/csv;charset=utf-8," +
            headers.join(",") +
            "\n" +
            rows.map((row) => row.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "entry_report.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const columns = [
        { key: "plateNumber", header: "Plate Number" },
        { key: "entryTime", header: "Entry Time" },
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

            {submitted &&
                !isPending &&
                (data?.cars?.length > 0 ? (
                    <>
                        <button
                            onClick={exportToCSV}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Download CSV
                        </button>
                        <DataTable columns={columns} data={data.cars} />
                    </>
                ) : (
                    <div>No cars in that range.</div>
                ))}
        </div>
    );
};

export default EntryReport;
