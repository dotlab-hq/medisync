/**
 * Notification log helpers — insert sent / failed records with body.
 */
import { db } from "@/db";
import { notificationLog } from "@/db/schema";

type EntityType = "reminder" | "appointment";
type Channel = "email" | "sms";
type Status = "sent" | "failed";

export async function logNotification(
    entityType: EntityType,
    entityId: string,
    userId: string,
    channel: Channel,
    status: Status,
    body: string | null,
): Promise<void> {
    await db.insert( notificationLog ).values( {
        entityType,
        entityId,
        userId,
        channel,
        status,
        body,
    } );
}
