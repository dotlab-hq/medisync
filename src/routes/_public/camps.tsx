import { createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, Map } from "lucide-react";
import { m } from "@/paraglide/messages";
import { NearbyMapEmbed } from "@/components/NearbyMapEmbed";

export const Route = createFileRoute( "/_public/camps" )( {
    component: CampsPage,
} );

// Placeholder data — in production, fetch from DB
const CAMPS = [
    {
        id: "1",
        name: "Free Blood Donation Camp",
        location: "Community Hall, Sector 15, Noida",
        date: "2025-02-15",
        organiser: "Red Cross India",
        type: "Blood Donation",
    },
    {
        id: "2",
        name: "Eye Checkup Drive",
        location: "Government Hospital, MG Road, Pune",
        date: "2025-03-01",
        organiser: "Lions Club",
        type: "Eye Care",
    },
    {
        id: "3",
        name: "Diabetes Awareness Workshop",
        location: "Town Hall, T. Nagar, Chennai",
        date: "2025-03-10",
        organiser: "Apollo Foundation",
        type: "Awareness",
    },
];

function CampsPage() {
    return (
        <main className="px-4 py-12 max-w-4xl mx-auto space-y-8">
            <section className="text-center">
                <Heart className="h-10 w-10 text-primary mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">{m.camps_title()}</h1>
                <p className="text-lg text-muted-foreground">
                    {m.camps_subtitle()}
                </p>
            </section>

            {/* Map: Health Camps Near Me */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        Health Camps Near You
                    </CardTitle>
                    <CardDescription>
                        Live map of health camps and medical drives based on your location.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <NearbyMapEmbed
                        query="health camp medical camp near me"
                        title="Health camps near me"
                        heightClass="h-[400px]"
                    />
                    <a
                        href="https://www.google.com/maps/search/health+camp+near+me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-primary hover:underline text-sm"
                    >
                        Open full map in Google Maps ↗
                    </a>
                </CardContent>
            </Card>

            {/* Map: Hospitals Near Me */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Hospitals Near You
                    </CardTitle>
                    <CardDescription>
                        Find nearby hospitals and clinics for immediate care.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <NearbyMapEmbed
                        query="hospital clinic near me"
                        title="Hospitals near me"
                        heightClass="h-[400px]"
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

            {/* Upcoming Camps */}
            <div className="space-y-4 hidden">
                <h2 className="text-2xl font-semibold">Upcoming Camps</h2>
                {CAMPS.map( ( camp ) => (
                    <Card key={camp.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{camp.name}</CardTitle>
                                    <CardDescription>by {camp.organiser}</CardDescription>
                                </div>
                                <Badge variant="secondary">{camp.type}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {camp.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {camp.date}
                            </span>
                        </CardContent>
                    </Card>
                ) )}
            </div>
        </main>
    );
}
