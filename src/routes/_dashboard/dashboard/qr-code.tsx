import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrCreateQrCode, regenerateQrCode } from "@/server/qr-code";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, RefreshCw, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export const Route = createFileRoute( "/_dashboard/dashboard/qr-code" )( {
    component: QrCodePage,
} );

function QrCodePage() {
    const queryClient = useQueryClient();

    const { data: qr, isLoading } = useQuery( {
        queryKey: ["qrCode"],
        queryFn: () => getOrCreateQrCode(),
    } );

    const regen = useMutation( {
        mutationFn: () => regenerateQrCode(),
        onSuccess: () => queryClient.invalidateQueries( { queryKey: ["qrCode"] } ),
    } );

    const shareUrl = qr
        ? `${typeof window !== "undefined" ? window.location.origin : ""}${qr.qrCodeData}`
        : "";

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Emergency QR Code</h1>
                <p className="text-muted-foreground">
                    Share your emergency medical profile via QR code
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5 text-primary" />
                            Your QR Code
                        </CardTitle>
                        <CardDescription>
                            Anyone scanning this code can see your emergency medical info
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-4">
                        {isLoading ? (
                            <div className="h-48 w-48 bg-muted animate-pulse rounded" />
                        ) : qr ? (
                            <>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <QRCodeSVG
                                        value={`${typeof window !== "undefined" ? window.location.origin : ""}${qr.qrCodeData}`}
                                        size={192}
                                        level="H"
                                        includeMargin={false}
                                    />
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    Created{" "}
                                    {new Date( qr.createdAt ).toLocaleDateString()}
                                </Badge>
                            </>
                        ) : null}

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => regen.mutate()}
                                disabled={regen.isPending}
                            >
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Regenerate
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    if ( navigator.share ) {
                                        navigator.share( { url: shareUrl } );
                                    } else {
                                        navigator.clipboard.writeText( shareUrl );
                                    }
                                }}
                            >
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How it works</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            1. Your QR code links to a public emergency profile page.
                        </p>
                        <p>
                            2. Emergency responders can scan the code to see your blood group,
                            allergies, conditions, and emergency contacts.
                        </p>
                        <p>
                            3. Only non-confidential medical data is shown on the emergency
                            page.
                        </p>
                        <p>
                            4. You can regenerate the code at any time to invalidate old
                            links.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
