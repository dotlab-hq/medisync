import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { BLOOD_GROUP_LABELS } from "@/types";

const schema = z.object( {
    bloodGroup: z.enum(
        ["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"],
        { error: "Select a blood group" },
    ),
    allergies: z.string(),
    chronicConditions: z.string(),
    currentMedications: z.string(),
} );

export type StepMedicalData = z.infer<typeof schema>;

interface Props {
    defaultValues: Partial<StepMedicalData>;
    onNext: ( data: StepMedicalData ) => void;
    onBack: () => void;
}

export function StepMedical( { defaultValues, onNext, onBack }: Props ) {
    const form = useForm<StepMedicalData>( {
        resolver: zodResolver( schema ),
        defaultValues: {
            bloodGroup: undefined,
            allergies: "",
            chronicConditions: "",
            currentMedications: "",
            ...defaultValues,
        },
    } );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit( onNext )} className="space-y-4">
                <FormField
                    control={form.control}
                    name="bloodGroup"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Blood Group</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Object.entries( BLOOD_GROUP_LABELS ).map( ( [key, label] ) => (
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
                    name="allergies"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Allergies</FormLabel>
                            <FormDescription>Leave blank if none</FormDescription>
                            <FormControl>
                                <Textarea
                                    rows={2}
                                    placeholder="e.g. Peanuts, Penicillin, Dust"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="chronicConditions"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Chronic Conditions</FormLabel>
                            <FormDescription>Leave blank if none</FormDescription>
                            <FormControl>
                                <Textarea
                                    rows={2}
                                    placeholder="e.g. Diabetes, Hypertension, Asthma"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currentMedications"
                    render={( { field } ) => (
                        <FormItem>
                            <FormLabel>Current Medications</FormLabel>
                            <FormDescription>Leave blank if none</FormDescription>
                            <FormControl>
                                <Textarea
                                    rows={2}
                                    placeholder="e.g. Metformin 500mg twice daily"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between pt-2">
                    <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                    <Button type="submit">Continue</Button>
                </div>
            </form>
        </Form>
    );
}
