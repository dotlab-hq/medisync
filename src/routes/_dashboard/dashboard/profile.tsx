import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getUserProfile, updateUser, upsertAddress } from "@/server/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GENDER_LABELS, BLOOD_GROUP_LABELS } from "@/types";
import { MedicalInfoForm } from "@/components/dashboard/MedicalInfoForm";
import { EmergencyContactsManager } from "@/components/dashboard/EmergencyContactsManager";
import { ChangePhoneDialog } from "@/components/dashboard/ChangePhoneDialog";
import { getTimezoneOptions } from "@/lib/timezones";
import { Pencil } from "lucide-react";

export const Route = createFileRoute( "/_dashboard/dashboard/profile" )( {
    component: ProfilePage,
} );

function ProfilePage() {
    const queryClient = useQueryClient();
    const { data: profile, isLoading } = useQuery( {
        queryKey: ["userProfile"],
        queryFn: () => getUserProfile(),
    } );

    const [success, setSuccess] = useState( "" );
    const [phoneDialogOpen, setPhoneDialogOpen] = useState( false );

    const updateMut = useMutation( {
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["userProfile"] } );
            setSuccess( "Profile updated" );
            setTimeout( () => setSuccess( "" ), 3000 );
        },
    } );

    const addressMut = useMutation( {
        mutationFn: upsertAddress,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["userProfile"] } );
            setSuccess( "Address updated" );
            setTimeout( () => setSuccess( "" ), 3000 );
        },
    } );

    if ( isLoading ) return <p className="py-8 text-center text-muted-foreground">Loading…</p>;

    const handlePersonal = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const fd = new FormData( e.currentTarget );
        updateMut.mutate( {
            data: {
                name: fd.get( "name" ) as string,
                // phone is intentionally omitted — use the Change Phone dialog
                gender: ( fd.get( "gender" ) as string ) || undefined,
                dateOfBirth: ( fd.get( "dateOfBirth" ) as string ) || undefined,
                bloodGroup: ( fd.get( "bloodGroup" ) as string ) || undefined,
                timezone: ( fd.get( "timezone" ) as string ) || undefined,
            },
        } );
    };

    const handleAddress = ( e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        const fd = new FormData( e.currentTarget );
        addressMut.mutate( {
            data: {
                address: fd.get( "address" ) as string,
                city: fd.get( "city" ) as string,
                state: fd.get( "state" ) as string,
                pinCode: fd.get( "pinCode" ) as string,
            },
        } );
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Profile</h1>

            {success && (
                <Alert>
                    <AlertDescription>{success}</AlertDescription>
                </Alert>
            )}

            <Tabs defaultValue="personal">
                <TabsList>
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="address">Address</TabsTrigger>
                    <TabsTrigger value="medical">Medical Info</TabsTrigger>
                    <TabsTrigger value="emergency">Emergency Contacts</TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your basic details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handlePersonal} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" name="name" defaultValue={profile?.name ?? ""} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                value={profile?.phone ?? "Not set"}
                                                disabled
                                                className="flex-1 bg-muted text-muted-foreground cursor-not-allowed"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setPhoneDialogOpen( true )}
                                            >
                                                <Pencil className="h-4 w-4 mr-1" />
                                                Change
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Phone number requires OTP verification to change.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <Select name="gender" defaultValue={profile?.gender ?? ""}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>
                                                {Object.entries( GENDER_LABELS ).map( ( [k, v] ) => (
                                                    <SelectItem key={k} value={k}>{v}</SelectItem>
                                                ) )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                        <Input
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            type="date"
                                            defaultValue={
                                                profile?.dateOfBirth
                                                    ? new Date( profile.dateOfBirth ).toISOString().split( "T" )[0]
                                                    : ""
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Blood Group</Label>
                                        <Select name="bloodGroup" defaultValue={profile?.bloodGroup ?? ""}>
                                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                                            <SelectContent>
                                                {Object.entries( BLOOD_GROUP_LABELS ).map( ( [k, v] ) => (
                                                    <SelectItem key={k} value={k}>{v}</SelectItem>
                                                ) )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Timezone</Label>
                                    <Select name="timezone" defaultValue={profile?.timezone ?? "UTC"}>
                                        <SelectTrigger><SelectValue placeholder="Select timezone" /></SelectTrigger>
                                        <SelectContent className="max-h-60">
                                            {getTimezoneOptions().map( ( tz ) => (
                                                <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                                            ) )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" disabled={updateMut.isPending}>
                                    {updateMut.isPending ? "Saving…" : "Save Changes"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="address">
                    <Card>
                        <CardHeader>
                            <CardTitle>Address</CardTitle>
                            <CardDescription>Your residential details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddress} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        defaultValue={profile?.addressDetails?.address ?? ""}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            defaultValue={profile?.addressDetails?.city ?? ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            defaultValue={profile?.addressDetails?.state ?? ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pinCode">PIN Code</Label>
                                        <Input
                                            id="pinCode"
                                            name="pinCode"
                                            defaultValue={profile?.addressDetails?.pinCode ?? ""}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" disabled={addressMut.isPending}>
                                    {addressMut.isPending ? "Saving…" : "Save Address"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="medical">
                    <MedicalInfoForm />
                </TabsContent>

                <TabsContent value="emergency">
                    <EmergencyContactsManager />
                </TabsContent>
            </Tabs>

            <ChangePhoneDialog
                open={phoneDialogOpen}
                currentPhone={profile?.phone ?? ""}
                onOpenChange={setPhoneDialogOpen}
                onSuccess={() => {
                    queryClient.invalidateQueries( { queryKey: ["userProfile"] } );
                    setSuccess( "Phone number updated" );
                    setTimeout( () => setSuccess( "" ), 3000 );
                }}
            />
        </div>
    );
}
