"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useCreateParking } from "@/hooks/useParking";
import { useEffect } from "react";

type FormData = {
    code: string;
    name: string;
    location: string;
    totalSlots: string;
    feePerHour: string;
};

const CreateParkingForm = ({ onSuccess }: { onSuccess?: () => void }) => {
    const { register, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            code: "",
            name: "",
            location: "",
            totalSlots: "",
            feePerHour: "",
        },
    });
      
    const { mutate: createParking, isPending, isSuccess } = useCreateParking();

    const onSubmit = (data: FormData) => {
        console.log("Form submitted with:", data);
        const payload = {
            code: data.code,
            name: data.name,
            location: data.location,
            totalSlots: Number(data.totalSlots),
            feePerHour: Number(data.feePerHour),
        };

        createParking(payload);
    };
    
    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                reset();
                onSuccess?.();
            }, 100); 
        }
    }, [isSuccess, reset, onSuccess]);
    

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full pt-5"
        >
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="code">Code</Label>
                <Input id="code" {...register("code")} required/>
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} required/>
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} required/>
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="totalSlots">Total Slots</Label>
                <Input
                    type="number"
                    id="totalSlots"
                    {...register("totalSlots")}
                    required
                />
            </div>

            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="feePerHour">Fee per Hour</Label>
                <Input
                    type="number"
                    id="feePerHour"
                    {...register("feePerHour")}
                    required
                />
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
};

export default CreateParkingForm;
