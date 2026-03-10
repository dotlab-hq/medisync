import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getEmergencyProfile } from "@/server/qr-code";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Heart,
    Phone,
    AlertTriangle,
    Pill,
    User,
    Droplets,
    Mail,
    BellOff,
    Loader2,
} from "lucide-react";
import { BLOOD_GROUP_LABELS } from "@/types";
import type { BloodGroup } from "@/types";

export const Route = createFileRoute( "/emergency/$token" )( {
    component: EmergencyProfilePage,
} );

function EmergencyProfilePage() {
    const { token } = Route.useParams();

    const { data: profile, isLoading, error } = useQuery( {
        queryKey: ["emergencyProfile", token],
        queryFn: () => getEmergencyProfile( { data: { token } } ),
    } );

    if ( isLoading ) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if ( error || !profile ) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="py-12">
                        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                        <p className="text-lg font-medium">Profile not found</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            This emergency profile may have been removed or the link is
                            invalid.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-red-50 dark:bg-red-950/10 py-8 px-4">
            <div className="max-w-lg mx-auto space-y-4">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/30 px-4 py-2 text-red-700 dark:text-red-300">
                        <Heart className="h-5 w-5" />
                        <span className="font-bold text-lg">EMERGENCY MEDICAL INFO</span>
                    </div>
                </div>

                {/* Patient info */}
                <Card className="border-red-200 dark:border-red-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Patient Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {profile.image ? (
                            <div className="flex justify-center">
                                <img
                                    src={profile.image}
                                    alt={profile.name}
                                    className="h-20 w-20 rounded-full object-cover border-2 border-red-200"
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200">
                                    <User className="h-10 w-10 text-red-400" />
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Name</p>
                                <p className="font-medium">{profile.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Gender</p>
                                <p className="font-medium capitalize">
                                    {profile.gender ? profile.gender.toLowerCase() : "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Date of Birth</p>
                                <p className="font-medium">
                                    {profile.dateOfBirth
                                        ? new Date( profile.dateOfBirth ).toLocaleDateString()
                                        : "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Blood Group</p>
                                {profile.bloodGroup ? (
                                    <Badge variant="destructive" className="text-base px-3 py-1 font-bold">
                                        <Droplets className="h-4 w-4 mr-1" />
                                        {BLOOD_GROUP_LABELS[profile.bloodGroup as BloodGroup] ?? profile.bloodGroup}
                                    </Badge>
                                ) : (
                                    <p className="font-medium text-muted-foreground">Unknown</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Medical info — always shown */}
                <Card className="border-red-200 dark:border-red-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                            <Pill className="h-5 w-5" />
                            Medical Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {profile.medicalInformation ? (
                            <>
                                <div>
                                    <p className="text-xs text-muted-foreground">Allergies</p>
                                    <p className="font-medium">
                                        {profile.medicalInformation.allergies || "None reported"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Chronic Conditions</p>
                                    <p className="font-medium">
                                        {profile.medicalInformation.chronicConditions || "None reported"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Current Medications</p>
                                    <p className="font-medium">
                                        {profile.medicalInformation.currentMedications || "None reported"}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-muted-foreground">No medical information on file.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Emergency Contacts — always shown */}
                <Card className="border-red-200 dark:border-red-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Emergency Contacts
                        </CardTitle>
                        <CardDescription>Call the contacts below in case of emergency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {profile.emergencyContacts && profile.emergencyContacts.length > 0 ? (
                            profile.emergencyContacts.map( ( ec ) => (
                                <div key={ec.id} className="border rounded-lg p-3 space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <p className="font-medium">{ec.name}</p>
                                            {ec.relationship && (
                                                <p className="text-xs text-muted-foreground">{ec.relationship}</p>
                                            )}
                                            {!ec.isNotificationEnabled && (
                                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                    <BellOff className="h-3 w-3" />
                                                    Notifications off
                                                </span>
                                            )}
                                        </div>
                                        <a
                                            href={`tel:${ec.phone}`}
                                            className="inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 shrink-0"
                                        >
                                            <Phone className="h-4 w-4" />
                                            {ec.phone}
                                        </a>
                                    </div>
                                    {ec.email && (
                                        <a
                                            href={`mailto:${ec.email}`}
                                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                                        >
                                            <Mail className="h-3 w-3" />
                                            {ec.email}
                                        </a>
                                    )}
                                </div>
                            ) )
                        ) : (
                            <p className="text-sm text-muted-foreground">No emergency contacts on file.</p>
                        )}
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground pt-4">
                    Powered by MediSync — Emergency Medical Data on the Go
                </p>
            </div>
        </div>
    );
}
