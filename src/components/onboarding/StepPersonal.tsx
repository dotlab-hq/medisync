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
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { GENDER_LABELS } from "@/types";

const schema = z.object( {
    name: z.string().min( 1, "Name is required" ),
    phone: z
        .string()
        .min( 10, "Enter a valid phone number" )
        .regex( /^\+?[\d\s\-()]{10,15}$/, "Invalid phone format" ),
    gender: z.enum( ["MALE", "FEMALE", "OTHER"], { error: "Select a gender" } ),
    dateOfBirth: z.string().min( 1, "Date of birth is required" ),
} );

export type StepPersonalData = z.infer<typeof schema>;

interface Props {
    defaultValues: Partial<StepPersonalData>;
    onNext: ( data: StepPersonalData ) => void;
    onBack?: () => void;
}

export function StepPersonal( { defaultValues, onNext, onBack }: Props ) {
    const form = useForm<StepPersonalData>( {
        resolver: zodResolver( schema ),
        defaultValues: { name: "", phone: "", gender: undefined, dateOfBirth: "", ...defaultValues },
    } );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onNext )} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="+91 XXXXXXXXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gender"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries( GENDER_LABELS ).map( ( [key, label] ) => (
                                        <SelectItem key={key} value={key}>{label}</SelectItem>
                                    ) )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between pt-2">
                    <Button type="button" variant="outline" onClick={onBack} disabled={!onBack}>Back</Button>
                    <Button type="submit">Continue</Button>
                </div>
            </form>
        </Form>
    );
}
