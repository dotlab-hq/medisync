import { Link, useLocation } from "@tanstack/react-router";
import {
    Home,
    FileText,
    QrCode,
    Bell,
    Calendar,
    Heart,
    MapPin,
    User,
    Settings,
    Key,
    HelpCircle,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";

interface NavItem {
    label: string;
    icon: LucideIcon;
    path: string;
}

function getMainNav(): NavItem[] {
    return [
        { label: m.sidebar_dashboard(), icon: Home, path: "/dashboard" },
        { label: m.sidebar_documents(), icon: FileText, path: "/dashboard/documents" },
        { label: m.sidebar_qr(), icon: QrCode, path: "/dashboard/qr-code" },
        { label: m.sidebar_reminders(), icon: Bell, path: "/dashboard/reminders" },
        { label: m.sidebar_appointments(), icon: Calendar, path: "/dashboard/appointments" },
        { label: m.sidebar_camps(), icon: Heart, path: "/camps" },
        { label: m.sidebar_geo(), icon: MapPin, path: "/geo-assistance" },
    ];
}

function getAccountNav(): NavItem[] {
    return [
        { label: m.sidebar_profile(), icon: User, path: "/dashboard/profile" },
        { label: m.sidebar_settings(), icon: Settings, path: "/dashboard/settings" },
        { label: m.sidebar_developer(), icon: Key, path: "/dashboard/developer" },
        { label: m.sidebar_help(), icon: HelpCircle, path: "/help" },
    ];
}

function NavItems( { onNavigate }: { onNavigate?: () => void } ) {
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <div className="flex flex-col gap-1 px-3">
            {getMainNav().map( ( { label, icon: Icon, path } ) => (
                <Link
                    key={path}
                    to={path}
                    onClick={onNavigate}
                    className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === path && "bg-accent text-accent-foreground",
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </Link>
            ) )}

            <Separator className="my-2" />
            <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
            </p>

            {getAccountNav().map( ( { label, icon: Icon, path } ) => (
                <Link
                    key={path}
                    to={path}
                    onClick={onNavigate}
                    className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        pathname === path && "bg-accent text-accent-foreground",
                    )}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </Link>
            ) )}
        </div>
    );
}

export default function DashboardSidebar() {
    const [mobileOpen, setMobileOpen] = useState( false );
    const [isMobile, setIsMobile] = useState( false );

    useEffect( () => {
        const check = () => setIsMobile( window.innerWidth < 1024 );
        check();
        window.addEventListener( "resize", check );
        return () => window.removeEventListener( "resize", check );
    }, [] );

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/";
    };

    const sidebarContent = (
        <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                    <Heart className="h-5 w-5 text-primary" />
                    MediSync
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <NavItems onNavigate={() => setMobileOpen( false )} />
            </nav>

            <div className="border-t p-3">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    {m.sidebar_logout()}
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile trigger */}
            {isMobile && (
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="fixed top-3 left-3 z-50 lg:hidden"
                        >
                            {mobileOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        {sidebarContent}
                    </SheetContent>
                </Sheet>
            )}

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 border-r sticky top-0 h-screen shrink-0">
                {sidebarContent}
            </aside>
        </>
    );
}
