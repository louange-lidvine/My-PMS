"use client";

import { useState } from "react";
import { useParkings } from "@/hooks/useParking";
import { DataTable } from "@/components/common/data-table";
import CreateParkingForm from "@/components/forms/CreateParkingForm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Define the columns for DataTable
const parkingColumns = [
    { key: "code", header: "Code" },
    { key: "name", header: "Name" },
    { key: "location", header: "Location" },
    { key: "totalSlots", header: "Total Slots" },
    { key: "feePerHour", header: "Fee/Hour (RWF)" },
];

const Parkings = () => {
    const [open, setOpen] = useState(false);
    const { data: parkingData = [], isLoading, isError } = useParkings();

    return (
        <div className="flex flex-col gap-4 w-full">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="bg-black text-white p-2 rounded-md flex items-center gap-2 w-fit hover:bg-gray-800">
                    <Plus />
                    <span>Create parking</span>
                </DialogTrigger>
                <DialogContent className="px-10">
                    <DialogTitle>Create Parking</DialogTitle>
                    <DialogDescription>
                        <CreateParkingForm onSuccess={() => setOpen(false)} />
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {/* Display loading or error state */}
            {isLoading ? (
                <p>Loading parkings...</p>
            ) : isError ? (
                <p>Failed to load parkings.</p>
            ) : (
                <DataTable columns={parkingColumns} data={parkingData} />
            )}
        </div>
    );
};

export default Parkings;
