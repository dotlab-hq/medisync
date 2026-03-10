import { createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { HelpCircle, Mail, MessageSquare, FileText } from "lucide-react";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute( "/_public/help" )( {
    component: HelpPage,
} );

function HelpPage() {
    return (
        <main className="px-4 py-12 max-w-4xl mx-auto space-y-8">
            <section className="text-center">
                <h1 className="text-4xl font-bold mb-4">{m.help_title()}</h1>
                <p className="text-lg text-muted-foreground">
                    {m.help_subtitle()}
                </p>
            </section>

            <div className="grid gap-6 sm:grid-cols-2">
                <Card>
                    <CardHeader>
                        <HelpCircle className="h-6 w-6 text-primary mb-2" />
                        <CardTitle>How do I generate a QR code?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                        After completing your profile, go to Dashboard → QR Code. Your
                        emergency QR code is generated automatically and can be shared or
                        printed.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <FileText className="h-6 w-6 text-primary mb-2" />
                        <CardTitle>Are my documents secure?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                        Yes. Documents marked as confidential are never shown on the
                        public emergency page. Only you can access them from your
                        dashboard.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <MessageSquare className="h-6 w-6 text-primary mb-2" />
                        <CardTitle>How do emergency contacts work?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                        Your emergency contacts are displayed on your public QR page with
                        a click-to-call button so responders can reach them immediately.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Mail className="h-6 w-6 text-primary mb-2" />
                        <CardTitle>Need more help?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm">
                        Reach out to us at{" "}
                        <a
                            href="mailto:support@medisync.app"
                            className="text-primary hover:underline"
                        >
                            support@medisync.app
                        </a>
                        . We respond within 24 hours.
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
