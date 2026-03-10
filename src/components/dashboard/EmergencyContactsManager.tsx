import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getUserProfile, addEmergencyContact, deleteEmergencyContact } from "@/server/user";
import { Phone, UserPlus, Trash2, Users } from "lucide-react";

const contactSchema = z.object( {
    name: z.string().min( 1, "Name is required" ),
    relationship: z.string().optional(),
    phone: z.string().min( 1, "Phone is required" ),
    email: z.string().email().optional().or( z.literal( "" ) ),
} );

type ContactFormValues = z.infer<typeof contactSchema>;

export function EmergencyContactsManager() {
    const queryClient = useQueryClient();

    const { data: profile } = useQuery( {
        queryKey: ["userProfile"],
        queryFn: () => getUserProfile(),
    } );

    const form = useForm<ContactFormValues>( {
        resolver: zodResolver( contactSchema ),
        defaultValues: { name: "", relationship: "", phone: "", email: "" },
    } );

    const addMut = useMutation( {
        mutationFn: addEmergencyContact,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["userProfile"] } );
            form.reset();
        },
    } );

    const deleteMut = useMutation( {
        mutationFn: deleteEmergencyContact,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: ["userProfile"] } ),
    } );

    const onSubmit = ( values: ContactFormValues ) => {
        addMut.mutate( {
            data: {
                name: values.name,
                relationship: values.relationship || undefined,
                phone: values.phone,
                email: values.email || undefined,
            },
        } );
    };

    const contacts = profile?.emergencyContacts ?? [];

    return (
        <div className="space-y-6">
            {contacts.length > 0 ? (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Users className="h-4 w-4 text-primary" /> Emergency Contacts ({contacts.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {contacts.map( ( c ) => (
                            <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                    <Phone className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{c.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {[c.relationship, c.phone].filter( Boolean ).join( " · " )}
                                    </p>
                                    {c.email && <p className="text-xs text-muted-foreground">{c.email}</p>}
                                </div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Remove contact?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Remove {c.name} from your emergency contacts?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteMut.mutate( { data: { id: c.id } } )}>
                                                Remove
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        ) )}
                    </CardContent>
                </Card>
            ) : (
                <div className="rounded-lg border border-dashed border-border p-8 text-center">
                    <Users className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No emergency contacts added yet</p>
                </div>
            )}

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <UserPlus className="h-4 w-4 text-primary" /> Add New Contact
                    </CardTitle>
                    <CardDescription>Add someone who can be reached in an emergency</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit( onSubmit )} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <FormField control={form.control} name="name" render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Full Name *</FormLabel>
                                        <FormControl><Input placeholder="Ravi Kumar" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="relationship" render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Relationship</FormLabel>
                                        <FormControl><Input placeholder="Father, Spouse..." {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <FormField control={form.control} name="phone" render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Phone *</FormLabel>
                                        <FormControl><Input placeholder="+91 98765 43210" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={( { field } ) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl><Input type="email" placeholder="ravi@email.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <Button type="submit" disabled={addMut.isPending} size="sm">
                                <UserPlus className="h-4 w-4 mr-1.5" />
                                {addMut.isPending ? "Adding…" : "Add Contact"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
