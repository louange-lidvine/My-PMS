import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCarEntry } from "@/hooks/useCar";

const EntryForm = () => {
    const [plateNumber, setPlateNumber] = useState("");
    const [parkingCode, setParkingCode] = useState("");

    const { mutate, isPending } = useCarEntry();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!plateNumber || !parkingCode) {
            return;
        }

        mutate({ plateNumber, parkingCode });

        // Optional: Reset form after submit
        setPlateNumber("");
        setParkingCode("");
    };

    return (
        <div className="flex flex-col gap-4 bg-white border p-3 rounded-xl shadow">
            <div>
                <h1 className="text-4xl pb-1">Entry</h1>
                <p className="text-gray-600">Create a car entry</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="plateNumber">Plate number</Label>
                    <Input
                        id="plateNumber"
                        name="plateNumber"
                        required
                        maxLength={7}
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value)}
                    />
                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="parkingCode">Parking code</Label>
                    <Input
                        id="parkingCode"
                        name="parkingCode"
                        required
                        maxLength={4}
                        value={parkingCode}
                        onChange={(e) => setParkingCode(e.target.value)}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isPending}
                >
                    {isPending ? "Processing..." : "Car Entry"}
                </Button>
            </form>
        </div>
    );
};

export default EntryForm;
