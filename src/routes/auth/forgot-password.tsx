import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const Route = createFileRoute( "/auth/forgot-password" )( {
    component: ForgotPasswordPage,
} );

function ForgotPasswordPage() {
    const [email, setEmail] = useState( "" );
    const [loading, setLoading] = useState( false );
    const [sent, setSent] = useState( false );

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        setLoading( true );
        try {
            await authClient.requestPasswordReset( {
                email,
                redirectTo: "/auth/reset-password",
            } );
            setSent( true );
            toast.success( "Reset link sent to your email" );
        } catch {
            toast.error( "Failed to send reset link" );
        } finally {
            setLoading( false );
        }
    };

    if ( sent ) {
        return (
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-2xl">Check your email</CardTitle>
                    <CardDescription>
                        We&apos;ve sent a password reset link to {email}
                    </CardDescription>
                </CardHeader>
                <CardFooter className="justify-center">
                    <Button variant="outline" asChild>
                        <Link to="/auth/login">Back to Sign In</Link>
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Forgot password?</CardTitle>
                <CardDescription>
                    Enter your email and we&apos;ll send you a reset link
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={( e ) => setEmail( e.target.value )}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending…" : "Send reset link"}
                    </Button>
                    <Link
                        to="/auth/login"
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Back to Sign In
                    </Link>
                </CardFooter>
            </form>
        </Card>
    );
}
