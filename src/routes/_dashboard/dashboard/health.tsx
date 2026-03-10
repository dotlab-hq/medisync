import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
    listHealthMetrics,
    createHealthMetric,
    deleteHealthMetric,
} from "@/server/health-metrics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Activity, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute( "/_dashboard/dashboard/health" )( {
    component: HealthMetricsPage,
} );

const METRIC_TYPES = [
    { value: "blood_pressure", label: "Blood Pressure", unit: "mmHg" },
    { value: "heart_rate", label: "Heart Rate", unit: "bpm" },
    { value: "blood_sugar", label: "Blood Sugar", unit: "mg/dL" },
    { value: "weight", label: "Weight", unit: "kg" },
    { value: "temperature", label: "Temperature", unit: "°C" },
    { value: "oxygen_level", label: "Oxygen Level", unit: "%" },
];

function HealthMetricsPage() {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState( false );

    const { data: metrics = [], isLoading } = useQuery( {
        queryKey: ["healthMetrics"],
        queryFn: () => listHealthMetrics(),
    } );

    const createMut = useMutation( {
        mutationFn: createHealthMetric,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["healthMetrics"] } );
            setOpen( false );
        },
    } );

    const deleteMut = useMutation( {
        mutationFn: deleteHealthMetric,
        onSuccess: () =>
            queryClient.invalidateQueries( { queryKey: ["healthMetrics"] } ),
    } );

    const handleCreate = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const fd = new FormData( e.currentTarget );
        const metricType = fd.get( "metricType" ) as string;
        const mt = METRIC_TYPES.find( ( m ) => m.value === metricType );
        createMut.mutate( {
            data: {
                metricType,
                value: fd.get( "value" ) as string,
                unit: mt?.unit ?? ( fd.get( "unit" ) as string ) ?? undefined,
                notes: ( fd.get( "notes" ) as string ) || undefined,
            },
        } );
    };

    return (
        <div className="space-y-6">
            <div className="animate-fade-in-up flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Health Metrics</h1>
                    <p className="text-muted-foreground">
                        Track your vital signs over time
                    </p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" /> Record Metric
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Record Health Metric</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="metricType">Metric Type</Label>
                                <Select name="metricType" defaultValue="blood_pressure">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {METRIC_TYPES.map( ( mt ) => (
                                            <SelectItem key={mt.value} value={mt.value}>
                                                {mt.label}
                                            </SelectItem>
                                        ) )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="value">Value</Label>
                                <Input id="value" name="value" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Input id="notes" name="notes" />
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={createMut.isPending}
                            >
                                {createMut.isPending ? "Saving…" : "Save Metric"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-48 w-full rounded-xl" />
                </div>
            ) : metrics.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Activity className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No metrics recorded yet</p>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Measurements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Value</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Notes</TableHead>
                                    <TableHead className="w-10" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {metrics.map( ( m ) => (
                                    <TableRow key={m.id}>
                                        <TableCell className="font-medium">
                                            {METRIC_TYPES.find( ( t ) => t.value === m.metricType )
                                                ?.label ?? m.metricType}
                                        </TableCell>
                                        <TableCell>
                                            {m.value} {m.unit ?? ""}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date( m.measuredAt ).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {m.notes ?? "—"}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    deleteMut.mutate( { data: { id: m.id } } )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ) )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
