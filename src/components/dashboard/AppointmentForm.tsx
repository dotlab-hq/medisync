import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const appointmentSchema = z.object( {
    doctorName: z.string().min( 1, "Doctor name is required" ),
    specialty: z.string().optional(),
    hospital: z.string().optional(),
    address: z.string().optional(),
    date: z.string().min( 1, "Date is required" ),
    time: z.string().min( 1, "Time is required" ),
    contactNumber: z.string().optional(),
    notes: z.string().optional(),
    timezone: z.string().min( 1 ),
} );

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
    isPending: boolean;
    onSubmit: ( values: AppointmentFormValues ) => void;
}

export function AppointmentForm( { isPending, onSubmit }: AppointmentFormProps ) {
    const form = useForm<AppointmentFormValues>( {
        resolver: zodResolver( appointmentSchema ),
        defaultValues: {
            doctorName: "",
            specialty: "",
            hospital: "",
            address: "",
            date: "",
            time: "",
            contactNumber: "",
            notes: "",
            timezone: "UTC",
        },
    } );

    // Auto-detect the user's browser timezone so stored appointments fire correctly
    useEffect( () => {
        form.setValue( "timezone", Intl.DateTimeFormat().resolvedOptions().timeZone );
    }, [] );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="space-y-4">
                <FormField
                    control={form.control}
                    name="doctorName"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Doctor Name *</FormLabel>
                            <FormControl>
                                <Input placeholder="Dr. Sharma" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="specialty"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Specialty</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cardiologist" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="hospital"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Hospital / Clinic</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apollo Hospital" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="date"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Date *</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Time *</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="contactNumber"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Contact Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="notes"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add any notes or instructions..."
                                    rows={3}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Saving…" : "Book Appointment"}
                </Button>
            </form>
        </Form>
    );
}
