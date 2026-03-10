import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute( "/_public/terms" )( {
    component: TermsPage,
} );

function TermsPage() {
    return (
        <main className="px-4 py-12 max-w-3xl mx-auto prose dark:prose-invert">
            <h1>Terms of Service</h1>
            <p>Last updated: January 2025</p>

            <h2>Acceptance of Terms</h2>
            <p>
                By accessing or using MediSync, you agree to be bound by these Terms of
                Service. If you do not agree, please do not use the service.
            </p>

            <h2>Description of Service</h2>
            <p>
                MediSync is a web application that allows users to store their medical
                information and share it via a QR code during emergencies. The service
                is provided as-is.
            </p>

            <h2>User Responsibilities</h2>
            <ul>
                <li>Provide accurate and up-to-date medical information.</li>
                <li>Keep your account credentials secure.</li>
                <li>Do not misuse the emergency QR code system.</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
                MediSync is not a substitute for professional medical advice, diagnosis,
                or treatment. Always seek the advice of qualified health providers.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                MediSync and its contributors are not liable for any damages arising
                from the use of this service, including in emergency situations.
            </p>

            <h2>Contact</h2>
            <p>
                Questions about these terms? Email us at{" "}
                <a href="mailto:support@medisync.app">support@medisync.app</a>.
            </p>
        </main>
    );
}
