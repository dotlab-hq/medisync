import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    listAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from "@/server/appointments";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, Calendar, Clock, MapPin, Phone, Stethoscope, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { AppointmentForm } from "@/components/dashboard/AppointmentForm";
import type { AppointmentFormValues } from "@/components/dashboard/AppointmentForm";

export const Route = createFileRoute( "/_dashboard/dashboard/appointments" )( {
    component: AppointmentsPage,
} );

type StatusFilter = "all" | "upcoming" | "completed" | "cancelled";

const STATUS_CONFIG = {
    upcoming: { label: "Upcoming", classes: "border-l-blue-400 bg-blue-50/50 dark:bg-blue-950/20", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
    completed: { label: "Completed", classes: "border-l-green-500 bg-green-50/50 dark:bg-green-950/20", badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
    cancelled: { label: "Cancelled", classes: "border-l-red-400 bg-red-50/50 dark:bg-red-950/20", badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
} as const;

function AppointmentsPage() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState( false );
    const [filter, setFilter] = useState<StatusFilter>( "all" );

    const { data: appointments = [], isLoading } = useQuery( {
        queryKey: ["appointments"],
        queryFn: () => listAppointments(),
    } );

    const createMut = useMutation( {
        mutationFn: createAppointment,
        onSuccess: () => { queryClient.invalidateQueries( { queryKey: ["appointments"] } ); setOpen( false ); },
    } );
    const updateMut = useMutation( {
        mutationFn: updateAppointment,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: ["appointments"] } ),
    } );
    const deleteMut = useMutation( {
        mutationFn: deleteAppointment,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: ["appointments"] } ),
    } );

    const handleCreate = ( values: AppointmentFormValues ) => {
        createMut.mutate( {
            data: {
                ...values,
                specialty: values.specialty || undefined,
                hospital: values.hospital || undefined,
                notes: values.notes || undefined,
                contactNumber: values.contactNumber || undefined,
            },
        } );
    };

    const filtered = filter === "all" ? appointments : appointments.filter( ( a ) => a.status === filter );
    const counts = {
        all: appointments.length,
        upcoming: appointments.filter( a => a.status === "upcoming" ).length,
        completed: appointments.filter( a => a.status === "completed" ).length,
        cancelled: appointments.filter( a => a.status === "cancelled" ).length,
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Manage your doctor visits</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm"><Plus className="h-4 w-4 mr-1.5" /> New Appointment</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader><DialogTitle>Book Appointment</DialogTitle></DialogHeader>
                        <AppointmentForm isPending={createMut.isPending} onSubmit={handleCreate} />
                    </DialogContent>
                </Dialog>
            </div>

            <Tabs value={filter} onValueChange={( v ) => setFilter( v as StatusFilter )}>
                <TabsList className="h-9">
                    {( ["all", "upcoming", "completed", "cancelled"] as StatusFilter[] ).map( ( s ) => (
                        <TabsTrigger key={s} value={s} className="text-xs capitalize px-3">
                            {s === "all" ? "All" : STATUS_CONFIG[s].label}
                            <span className="ml-1 opacity-55">({counts[s]})</span>
                        </TabsTrigger>
                    ) )}
                </TabsList>
            </Tabs>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map( i => <div key={i} className="h-24 rounded-lg bg-muted animate-pulse" /> )}
                </div>
            ) : filtered.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16 gap-3">
                        <Calendar className="h-10 w-10 text-muted-foreground/40" />
                        <p className="text-muted-foreground text-sm">
                            No {filter !== "all" ? filter : ""} appointments yet
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {filtered.map( ( appt ) => {
                        const cfg = STATUS_CONFIG[appt.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.upcoming;
                        return (
                            <div key={appt.id} className={`rounded-xl border-l-4 border border-border/60 p-4 shadow-sm ${cfg.classes}`}>
                                <div className="flex items-start justify-between gap-3">
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Stethoscope className="h-4 w-4 text-muted-foreground shrink-0" />
                                            <span className="font-semibold text-sm">Dr. {appt.doctorName}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>{cfg.label}</span>
                                        </div>
                                        {( appt.specialty || appt.hospital ) && (
                                            <p className="text-xs text-muted-foreground pl-6">
                                                {[appt.specialty, appt.hospital].filter( Boolean ).join( " · " )}
                                            </p>
                                        )}
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 pl-6">
                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Calendar className="h-3 w-3" />{appt.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />{appt.time}
                                            </span>
                                            {appt.contactNumber && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Phone className="h-3 w-3" />{appt.contactNumber}
                                                </span>
                                            )}
                                            {appt.address && (
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />{appt.address}
                                                </span>
                                            )}
                                        </div>
                                        {appt.notes && (
                                            <p className="text-xs text-muted-foreground pl-6 pt-0.5 italic">"{appt.notes}"</p>
                                        )}
                                    </div>
                                    <div className="flex gap-1 shrink-0">
                                        {appt.status === "upcoming" && (
                                            <>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" title="Mark Completed"
                                                    onClick={() => updateMut.mutate( { data: { id: appt.id, status: "completed" } } )}>
                                                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" title="Cancel"
                                                    onClick={() => updateMut.mutate( { data: { id: appt.id, status: "cancelled" } } )}>
                                                    <XCircle className="h-4 w-4 text-amber-500" />
                                                </Button>
                                            </>
                                        )}
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete this appointment?</AlertDialogTitle>
                                                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteMut.mutate( { data: { id: appt.id } } )}>
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                            </div>
                        );
                    } )}
                </div>
            )}
        </div>
    );
}
