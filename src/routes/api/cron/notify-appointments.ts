import { createFileRoute } from "@tanstack/react-router";
import { getMediSyncPrivateKey } from "@/lib/env";
import { processDueAppointments } from "@/server/notify";

export const Route = createFileRoute( "/api/cron/notify-appointments" )( {
    server: {
        handlers: {
            POST: async ( { request } ) => {
                // Validate the secret key — throws if env var is not configured
                let privateKey: string;
                try {
                    privateKey = getMediSyncPrivateKey();
                } catch ( err ) {
                    const msg = err instanceof Error ? err.message : "Server misconfiguration";
                    return new Response( msg, { status: 500 } );
                }

                const incomingKey = request.headers.get( "x-medisync-key" );
                if ( !incomingKey || incomingKey !== privateKey ) {
                    return new Response( "Unauthorized", { status: 401 } );
                }

                try {
                    const result = await processDueAppointments();
                    console.log( `[cron/notify-appointments] sent=${result.sent} failed=${result.failed}` );
                    return Response.json( { ok: true, ...result } );
                } catch ( err ) {
                    const message = err instanceof Error ? err.message : "Unknown error";
                    console.error( "[cron/notify-appointments] Error:", message );
                    return Response.json( { ok: false, error: message }, { status: 500 } );
                }
            },
        },
    },
} );
