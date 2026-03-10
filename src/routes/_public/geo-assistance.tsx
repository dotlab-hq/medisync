import { createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Hospital } from "lucide-react";
import { m } from "@/paraglide/messages";
import { NearbyMapEmbed } from "@/components/NearbyMapEmbed";

export const Route = createFileRoute( "/_public/geo-assistance" )( {
    component: GeoAssistancePage,
} );

function GeoAssistancePage() {
    return (
        <main className="px-4 py-12 max-w-4xl mx-auto space-y-8">
            <section className="text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">{m.geo_title()}</h1>
                <p className="text-lg text-muted-foreground">
                    {m.geo_subtitle()}
                </p>
            </section>

            <Card>
                <CardHeader>
                    <CardTitle>Emergency Numbers</CardTitle>
                    <CardDescription>
                        Important numbers you should always have handy
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        { label: "Ambulance", number: "102" },
                        { label: "Emergency (India)", number: "112" },
                        { label: "Police", number: "100" },
                        { label: "Fire", number: "101" },
                    ].map( ( { label, number } ) => (
                        <div
                            key={number}
                            className="flex items-center justify-between border rounded-lg p-3"
                        >
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span className="font-medium">{label}</span>
                            </div>
                            <a
                                href={`tel:${number}`}
                                className="font-bold text-primary hover:underline"
                            >
                                {number}
                            </a>
                        </div>
                    ) )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Hospital className="h-5 w-5" />
                        Hospitals Near You
                    </CardTitle>
                    <CardDescription>
                        Live map showing hospitals based on your current location.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <NearbyMapEmbed
                        query="hospital near me"
                        title="Hospitals near me"
                        heightClass="h-[420px]"
                    />
                    <a
                        href="https://www.google.com/maps/search/hospital+near+me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-primary hover:underline text-sm"
                    >
                        Open full map in Google Maps ↗
                    </a>
                </CardContent>
            </Card>
        </main>
    );
}
