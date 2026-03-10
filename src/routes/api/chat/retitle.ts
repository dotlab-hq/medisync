import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth";

export const Route = createFileRoute( "/api/chat/retitle" )( {
    server: {
        handlers: {
            POST: async ( { request } ) => {
                const session = await auth.api.getSession( {
                    headers: request.headers,
                } );
                if ( !session || !session.user.id ) {
                    return new Response(
                        JSON.stringify( { error: "Unauthorized" } ),
                        { status: 401, headers: { "Content-Type": "application/json" } },
                    );
                }

                try {
                    const { messages } = await request.json();
                    if ( !messages || !Array.isArray( messages ) || messages.length === 0 ) {
                        return new Response(
                            JSON.stringify( { title: "New Chat" } ),
                            { status: 200, headers: { "Content-Type": "application/json" } },
                        );
                    }

                    // Take the first few messages for context
                    const context = messages
                        .slice( 0, 4 )
                        .map( ( m: { role: string; content: string } ) =>
                            `${m.role}: ${m.content.slice( 0, 200 )}`,
                        )
                        .join( "\n" );

                    const apiKey = process.env.GROQ_API_KEY;
                    if ( !apiKey ) {
                        return new Response(
                            JSON.stringify( { title: "New Chat" } ),
                            { status: 200, headers: { "Content-Type": "application/json" } },
                        );
                    }

                    const groqRes = await fetch(
                        "https://api.groq.com/openai/v1/chat/completions",
                        {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${apiKey}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify( {
                                model: "llama-3.1-8b-instant",
                                messages: [
                                    {
                                        role: "system",
                                        content:
                                            "Generate a very short title (3-6 words, no quotes) summarizing this conversation. Reply with ONLY the title.",
                                    },
                                    { role: "user", content: context },
                                ],
                                max_tokens: 30,
                            } ),
                        },
                    );

                    const json = await groqRes.json();
                    const title =
                        ( json?.choices?.[0]?.message?.content ?? "" )
                            .trim()
                            .slice( 0, 100 ) || "New Chat";

                    return new Response(
                        JSON.stringify( { title } ),
                        { status: 200, headers: { "Content-Type": "application/json" } },
                    );
                } catch ( error ) {
                    console.error( "Retitle error:", error );
                    return new Response(
                        JSON.stringify( { title: "New Chat" } ),
                        { status: 200, headers: { "Content-Type": "application/json" } },
                    );
                }
            },
        },
    },
} );
