import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const reminderSchema = z.object( {
    title: z.string().min( 1, "Title is required" ),
    description: z.string().optional(),
    type: z.string().min( 1 ),
    date: z.string().min( 1, "Date is required" ),
    time: z.string().min( 1, "Time is required" ),
} );

export type ReminderFormValues = z.infer<typeof reminderSchema>;

interface ReminderFormProps {
    isPending: boolean;
    onSubmit: ( values: ReminderFormValues ) => void;
}

export function ReminderForm( { isPending, onSubmit }: ReminderFormProps ) {
    const form = useForm<ReminderFormValues>( {
        resolver: zodResolver( reminderSchema ),
        defaultValues: {
            title: "",
            description: "",
            type: "medication",
            date: "",
            time: "",
        },
    } );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit )} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Title *</FormLabel>
                            <FormControl>
                                <Input placeholder="Take Metformin 500mg" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Additional notes..." rows={2} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="type"
                        render={( { field } ) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="medication">Medication</SelectItem>
                                        <SelectItem value="appointment">Appointment</SelectItem>
                                        <SelectItem value="checkup">Checkup</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
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
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Saving…" : "Create Reminder"}
                </Button>
            </form>
        </Form>
    );
}
