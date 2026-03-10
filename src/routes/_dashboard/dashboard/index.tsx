import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    FileText,
    QrCode,
    Bell,
    Calendar,
    Shield,
    MoreHorizontal,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getUserProfile } from "@/server/user";
import { listAllDocuments } from "@/server/documents";
import { listReminders } from "@/server/reminders";
import { listAppointments } from "@/server/appointments";
import { BLOOD_GROUP_LABELS } from "@/types";
import type { BloodGroup } from "@/types";
import { useState } from "react";

export const Route = createFileRoute( "/_dashboard/dashboard/" )( {
    component: DashboardHomePage,
} );

const EMPTY_VALUES = ["na", "n/a", "none", "nil", ""];

function isEffectivelyEmpty( val: string | null | undefined ) {
    return !val || EMPTY_VALUES.includes( val.trim().toLowerCase() );
}

function MedicalField( { label, value }: { label: string; value: string | null | undefined } ) {
    const [open, setOpen] = useState( false );
    const empty = isEffectivelyEmpty( value );
    const trimmed = value?.trim() ?? "";
    const isLong = trimmed.length > 30;

    if ( empty ) {
        return (
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium mt-1 text-muted-foreground">NA</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <div className="flex items-center gap-1 mt-1">
                <p className="text-sm font-medium truncate max-w-30">
                    {isLong ? trimmed.slice( 0, 28 ) + "…" : trimmed}
                </p>
                {isLong && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 shrink-0"
                                    onClick={() => setOpen( true )}
                                >
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-50 whitespace-pre-line">
                                {trimmed}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{trimmed}</p>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function DashboardHomePage() {
    const { data: profile, isLoading } = useQuery( {
        queryKey: ["userProfile"],
        queryFn: () => getUserProfile(),
    } );

    const { data: documents } = useQuery( {
        queryKey: ["documents"],
        queryFn: () => listAllDocuments(),
    } );

    const { data: reminders } = useQuery( {
        queryKey: ["reminders"],
        queryFn: () => listReminders(),
    } );

    const { data: appointments } = useQuery( {
        queryKey: ["appointments"],
        queryFn: () => listAppointments(),
    } );

    if ( isLoading ) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-muted-foreground">Loading dashboard…</p>
            </div>
        );
    }

    const quickLinks = [
        {
            label: "Documents",
            icon: FileText,
            path: "/dashboard/documents",
            count: documents?.length ?? 0,
        },
        {
            label: "QR Code",
            icon: QrCode,
            path: "/dashboard/qr-code",
            count: profile?.qrCode ? 1 : 0,
        },
        {
            label: "Reminders",
            icon: Bell,
            path: "/dashboard/reminders",
            count: reminders?.length ?? 0,
        },
        {
            label: "Appointments",
            icon: Calendar,
            path: "/dashboard/appointments",
            count: appointments?.length ?? 0,
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Welcome back, {profile?.name ?? "User"}
                </h1>
                <p className="text-muted-foreground mt-1">
                    Here&apos;s your health overview
                </p>
            </div>

            {/* Profile summary */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-primary" />
                        Medical Profile
                    </CardTitle>
                    <CardDescription>Your key medical information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground">Blood Group</p>
                            <Badge variant="secondary" className="mt-1">
                                {profile?.bloodGroup
                                    ? BLOOD_GROUP_LABELS[profile.bloodGroup as BloodGroup] ??
                                    profile.bloodGroup
                                    : "Not set"}
                            </Badge>
                        </div>
                        <MedicalField
                            label="Allergies"
                            value={profile?.medicalInformation?.allergies}
                        />
                        <MedicalField
                            label="Chronic Conditions"
                            value={profile?.medicalInformation?.chronicConditions}
                        />
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Emergency Contacts
                            </p>
                            <p className="text-sm font-medium mt-1">
                                {profile?.emergencyContacts?.length ?? 0} contact(s)
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickLinks.map( ( { label, icon: Icon, path, count } ) => (
                    <Link key={path} to={path}>
                        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                            <CardContent className="flex flex-col items-center justify-center py-6">
                                <Icon className="h-8 w-8 text-primary mb-2" />
                                <p className="text-sm font-medium">{label}</p>
                                <Badge
                                    variant={count > 0 ? "secondary" : "outline"}
                                    className="mt-1 text-xs"
                                >
                                    {count}
                                </Badge>
                            </CardContent>
                        </Card>
                    </Link>
                ) )}
            </div>
        </div>
    );
}
