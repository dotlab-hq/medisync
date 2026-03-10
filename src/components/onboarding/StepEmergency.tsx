import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";

const schema = z.object( {
    emergencyContactName: z.string().min( 1, "Contact name is required" ),
    emergencyContactPhone: z
        .string()
        .min( 10, "Enter a valid phone number" )
        .regex( /^\+?[\d\s\-()]{10,15}$/, "Invalid phone format" ),
    emergencyContactRelationship: z.string(),
    emergencyContactEmail: z
        .string()
        .refine( ( v ) => !v || z.email().safeParse( v ).success, "Invalid email" ),
} );

export type StepEmergencyData = z.infer<typeof schema>;

interface Props {
    defaultValues: Partial<StepEmergencyData>;
    onNext: ( data: StepEmergencyData ) => void;
    onBack: () => void;
    loading?: boolean;
}

export function StepEmergency( { defaultValues, onNext, onBack, loading }: Props ) {
    const form = useForm<StepEmergencyData>( {
        resolver: zodResolver( schema ),
        defaultValues: {
            emergencyContactName: "",
            emergencyContactPhone: "",
            emergencyContactRelationship: "",
            emergencyContactEmail: "",
            ...defaultValues,
        },
    } );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onNext )} className="space-y-4">
                <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emergencyContactPhone"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Contact Phone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="+91 XXXXXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emergencyContactRelationship"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <FormDescription>Optional</FormDescription>
                            <FormControl>
                                <Input placeholder="e.g. Spouse, Parent, Sibling" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emergencyContactEmail"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Contact Email</FormLabel>
                            <FormDescription>Optional</FormDescription>
                            <FormControl>
                                <Input type="email" placeholder="jane@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between pt-2">
                    <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving…" : "Complete Setup"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
