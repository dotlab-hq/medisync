import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { updateNotificationSettings } from "@/server/notification-settings";
import { toast } from "sonner";

interface NotificationSettingsProps {
    initialEmailEnabled: boolean;
    initialSmsEnabled: boolean;
}

export function NotificationSettings( { initialEmailEnabled, initialSmsEnabled }: NotificationSettingsProps ) {
    const [emailEnabled, setEmailEnabled] = useState( initialEmailEnabled );
    const [smsEnabled, setSmsEnabled] = useState( initialSmsEnabled );
    const [saving, setSaving] = useState( false );

    async function handleToggle( field: "emailEnabled" | "smsEnabled", value: boolean ) {
        // Optimistic update
        if ( field === "emailEnabled" ) setEmailEnabled( value );
        else setSmsEnabled( value );

        setSaving( true );
        try {
            await updateNotificationSettings( { data: { [field]: value } } );
            toast.success( "Notification settings saved" );
        } catch {
            // Revert on failure
            if ( field === "emailEnabled" ) setEmailEnabled( !value );
            else setSmsEnabled( !value );
            toast.error( "Failed to save notification settings" );
        } finally {
            setSaving( false );
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive reminders and appointment alerts via email
                    </p>
                </div>
                <Switch
                    checked={emailEnabled}
                    disabled={saving}
                    onCheckedChange={( v ) => handleToggle( "emailEnabled", v )}
                />
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                        Receive reminders and appointment alerts via SMS
                        {!smsEnabled && (
                            <span className="block text-xs text-muted-foreground/70">
                                Requires a verified phone number on your profile
                            </span>
                        )}
                    </p>
                </div>
                <Switch
                    checked={smsEnabled}
                    disabled={saving}
                    onCheckedChange={( v ) => handleToggle( "smsEnabled", v )}
                />
            </div>
        </div>
    );
}
