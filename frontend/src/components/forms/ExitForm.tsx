import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCarExit } from "@/hooks/useCar";

const ExitForm = () => {
    const [plateNumber, setPlateNumber] = useState("");

    const { mutate, isPending } = useCarExit();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!plateNumber) {
            return;
        }

        mutate(plateNumber);

        // Optional: Reset form after submit
        setPlateNumber("");
    };

    return (
        <div className="flex flex-col gap-4 bg-white border p-3 rounded-xl shadow">
            <div>
                <h1 className="text-4xl pb-1">Exit</h1>
                <p className="text-gray-600">Exit a car</p>
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

                <Button
                    type="submit"
                    className="w-full mt-2"
                    disabled={isPending}
                >
                    {isPending ? "Processing..." : "Car Exit"}
                </Button>
            </form>
        </div>
    );
};

export default ExitForm;
