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

export const Route = createFileRoute( "/auth/login" )( {
    component: LoginPage,
} );

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState( "" );
    const [password, setPassword] = useState( "" );
    const [error, setError] = useState( "" );
    const [loading, setLoading] = useState( false );

    const handleSubmit = async ( e: React.FormEvent ) => {
        e.preventDefault();
        setError( "" );
        setLoading( true );

        try {
            const result = await authClient.signIn.email( { email, password } );
            if ( result.error ) {
                setError( result.error.message ?? "Login failed" );
            } else {
                navigate( { to: "/dashboard" } );
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
                <CardTitle className="text-2xl">Welcome back</CardTitle>
                <CardDescription>Sign in to your MediSync account</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                to="/auth/forgot-password"
                                className="text-xs text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={( e ) => setPassword( e.target.value )}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/auth/signup" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </form>
        </Card>
    );
}
