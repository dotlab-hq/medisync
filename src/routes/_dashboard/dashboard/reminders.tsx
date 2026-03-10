import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    listReminders,
    createReminder,
    toggleReminder,
    deleteReminder,
} from "@/server/reminders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Bell, Trash2, Pill, Calendar, Stethoscope, CheckCheck } from "lucide-react";
import { ReminderForm } from "@/components/dashboard/ReminderForm";
import type { ReminderFormValues } from "@/components/dashboard/ReminderForm";

export const Route = createFileRoute( "/_dashboard/dashboard/reminders" )( {
    component: RemindersPage,
} );

const TYPE_CONFIG = {
    medication: { icon: Pill, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
    appointment: { icon: Calendar, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30", badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
    checkup: { icon: Stethoscope, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30", badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
    other: { icon: CheckCheck, color: "text-gray-500", bg: "bg-gray-50 dark:bg-gray-950/30", badge: "bg-gray-100 text-gray-700 dark:bg-gray-800/40 dark:text-gray-300" },
} as const;

function RemindersPage() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState( false );

    const { data: reminders = [], isLoading } = useQuery( {
        queryKey: ["reminders"],
        queryFn: () => listReminders(),
    } );

    const createMut = useMutation( {
        mutationFn: createReminder,
        onSuccess: () => { queryClient.invalidateQueries( { queryKey: ["reminders"] } ); setOpen( false ); },
    } );
    const toggleMut = useMutation( {
        mutationFn: toggleReminder,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: ["reminders"] } ),
    } );
    const deleteMut = useMutation( {
        mutationFn: deleteReminder,
        onSuccess: () => queryClient.invalidateQueries( { queryKey: ["reminders"] } ),
    } );

    const handleCreate = ( values: ReminderFormValues ) => {
        createMut.mutate( {
            data: {
                ...values,
                description: values.description || undefined,
            },
        } );
    };

    const pending = reminders.filter( r => !r.isCompleted );
    const done = reminders.filter( r => r.isCompleted );

    const ReminderRow = ( { r }: { r: typeof reminders[0] } ) => {
        const typeKey = ( r.type in TYPE_CONFIG ? r.type : "other" ) as keyof typeof TYPE_CONFIG;
        const cfg = TYPE_CONFIG[typeKey];
        const TypeIcon = cfg.icon;
        return (
            <div className={`flex items-start gap-3 rounded-xl border border-border/60 p-3.5 shadow-sm transition-all ${r.isCompleted ? "opacity-50" : ""}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cfg.bg}`}>
                    <TypeIcon className={`h-4 w-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap">
                        <Checkbox
                            className="mt-0.5"
                            checked={r.isCompleted}
                            onCheckedChange={( checked ) =>
                                toggleMut.mutate( { data: { id: r.id, isCompleted: checked as boolean } } )
                            }
                        />
                        <span className={`text-sm font-medium flex-1 ${r.isCompleted ? "line-through text-muted-foreground" : ""}`}>
                            {r.title}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${cfg.badge}`}>{r.type}</span>
                    </div>
                    {r.description && <p className="text-xs text-muted-foreground mt-1 ml-6">{r.description}</p>}
                    <p className="text-xs text-muted-foreground mt-0.5 ml-6">
                        {r.date} · {r.time}{r.timezone && r.timezone !== "UTC" ? ` (${r.timezone})` : ""}
                    </p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"
                    onClick={() => deleteMut.mutate( { data: { id: r.id } } )}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Reminders</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Medications, appointments & checkups</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm"><Plus className="h-4 w-4 mr-1.5" /> Add Reminder</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader><DialogTitle>New Reminder</DialogTitle></DialogHeader>
                        <ReminderForm isPending={createMut.isPending} onSubmit={handleCreate} />
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="space-y-3">{[1, 2, 3].map( i => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" /> )}</div>
            ) : reminders.length === 0 ? (
                <Card><CardContent className="flex flex-col items-center justify-center py-16 gap-3">
                    <Bell className="h-10 w-10 text-muted-foreground/40" />
                    <p className="text-muted-foreground text-sm">No reminders yet</p>
                </CardContent></Card>
            ) : (
                <div className="space-y-6">
                    {pending.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                                Pending ({pending.length})
                            </p>
                            <div className="space-y-2">
                                {pending.map( r => <ReminderRow key={r.id} r={r} /> )}
                            </div>
                        </div>
                    )}
                    {done.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                                Completed ({done.length})
                            </p>
                            <div className="space-y-2">
                                {done.map( r => <ReminderRow key={r.id} r={r} /> )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
