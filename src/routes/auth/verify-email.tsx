import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod/v4";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle, RefreshCw, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute( "/auth/verify-email" )( {
    validateSearch: z.object( {
        email: z.string().email().optional(),
    } ),
    component: VerifyEmailPage,
} );

const RESEND_COOLDOWN = 60; // seconds

function VerifyEmailPage() {
    const { email } = Route.useSearch();
    const navigate = useNavigate();

    const [countdown, setCountdown] = useState( 0 );
    const [resendStatus, setResendStatus] = useState<"idle" | "sending" | "sent" | "error">( "idle" );
    const [verifyStatus, setVerifyStatus] = useState<"idle" | "checking" | "error">( "idle" );
    const [errorMsg, setErrorMsg] = useState( "" );

    // Tick the countdown down each second
    useEffect( () => {
        if ( countdown <= 0 ) return;
        const id = setTimeout( () => setCountdown( ( c ) => c - 1 ), 1000 );
        return () => clearTimeout( id );
    }, [countdown] );

    // ── Resend verification email ────────────────────────────────────
    const handleResend = async () => {
        if ( !email || countdown > 0 ) return;
        setResendStatus( "sending" );
        setErrorMsg( "" );

        const { error } = await authClient.sendVerificationEmail( {
            email,
            callbackURL: "/dashboard",
        } );

        if ( error ) {
            setResendStatus( "error" );
            setErrorMsg( error.message ?? "Failed to resend email." );
        } else {
            setResendStatus( "sent" );
            setCountdown( RESEND_COOLDOWN );
            // Reset "sent" badge after 4 s so UI doesn't linger
            setTimeout( () => setResendStatus( ( s ) => ( s === "sent" ? "idle" : s ) ), 4000 );
        }
    };

    // ── "I've verified" — refresh session + redirect ─────────────────
    const handleVerified = async () => {
        setVerifyStatus( "checking" );
        setErrorMsg( "" );

        const { data } = await authClient.getSession();

        if ( data?.user?.emailVerified ) {
            navigate( { to: "/dashboard" } );
        } else {
            setVerifyStatus( "error" );
            setErrorMsg( m.verify_not_yet() );
        }
    };

    return (
        <Card className="text-center">
            <CardHeader>
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{m.verify_title()}</CardTitle>
                <CardDescription>
                    {email
                        ? m.verify_subtitle( { email } )
                        : m.verify_subtitle_noemail()}
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{m.verify_spam()}</p>

                {/* Success badge */}
                {resendStatus === "sent" && (
                    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-green-700 dark:text-green-300">
                            {m.verify_resent()}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error message */}
                {errorMsg && (
                    <Alert variant="destructive">
                        <AlertDescription>{errorMsg}</AlertDescription>
                    </Alert>
                )}

                {/* Resend button — only shown when email is available */}
                {email && (
                    <Button
                        variant="outline"
                        className="w-full"
                        disabled={countdown > 0 || resendStatus === "sending"}
                        onClick={handleResend}
                    >
                        {resendStatus === "sending" ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {m.verify_resend()}
                            </>
                        ) : countdown > 0 ? (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                {m.verify_resend_wait( { seconds: String( countdown ) } )}
                            </>
                        ) : (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                {m.verify_resend()}
                            </>
                        )}
                    </Button>
                )}

                {/* "I've verified" button */}
                <Button
                    className="w-full"
                    disabled={verifyStatus === "checking"}
                    onClick={handleVerified}
                >
                    {verifyStatus === "checking" ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {m.verify_done_checking()}
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            {m.verify_done()}
                        </>
                    )}
                </Button>
            </CardContent>

            <CardFooter className="justify-center">
                <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth/login">{m.verify_back()}</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

