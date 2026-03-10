import { createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { NotificationSettings } from "@/components/dashboard/NotificationSettings";
import { getNotificationSettings } from "@/server/notification-settings";

export const Route = createFileRoute( "/_dashboard/dashboard/settings" )( {
    loader: () => getNotificationSettings(),
    component: SettingsPage,
} );

function SettingsPage() {
    const notifSettings = Route.useLoaderData();

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            <Tabs defaultValue="appearance">
                <TabsList>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="language">Language</TabsTrigger>
                </TabsList>

                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Manage your theme and display preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Theme</Label>
                                <ThemeToggle />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Configure how you receive reminder and appointment alerts
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <NotificationSettings
                                initialEmailEnabled={notifSettings.emailEnabled}
                                initialSmsEnabled={notifSettings.smsEnabled}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="language">
                    <Card>
                        <CardHeader>
                            <CardTitle>Language</CardTitle>
                            <CardDescription>Choose your preferred language</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Label>App Language</Label>
                                <LocaleSwitcher />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

