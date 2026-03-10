import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute( "/auth/signup" )( {
    component: SignupPage,
} );

function SignupPage() {
    const navigate = useNavigate();
    const [name, setName] = useState( "" );
    const [email, setEmail] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [confirmPassword, setConfirmPassword] = useState( "" );
    const [error, setError] = useState( "" );
    const [loading, setLoading] = useState( false );

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        setError( "" );

        if ( password !== confirmPassword ) {
            setError( "Passwords do not match" );
            return;
        }

        setLoading( true );
        try {
            const result = await authClient.signUp.email( {
                email,
                password,
                name,
            } );
            if ( result.error ) {
                setError( result.error.message ?? "Sign up failed" );
            } else {
                navigate( { to: "/auth/verify-email", search: { email } } );
            }
        } catch {
            setError( "An unexpected error occurred" );
        } finally {
            setLoading( false );
        }
    };

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Get started with MediSync — your emergency medical data, always on
                    hand
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={( e ) => setName( e.target.value )}
                            required
                        />
                    </div>
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
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={( e ) => setPassword( e.target.value )}
                            required
                            minLength={8}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={( e ) => setConfirmPassword( e.target.value )}
                            required
                            minLength={8}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating account…" : "Create account"}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
