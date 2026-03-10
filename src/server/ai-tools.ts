import { toolDefinition } from "@tanstack/ai";
import { db } from "@/db";
import { documentFile } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// -- S3 client (same pattern as documents.ts) --
function getS3Client() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    if ( !accessKeyId || !secretAccessKey ) {
        throw new Error( "S3 credentials not configured." );
    }
    return new S3Client( {
        region: process.env.AWS_REGION ?? "us-east-1",
        ...( process.env.AWS_S3_ENDPOINT
            ? { endpoint: process.env.AWS_S3_ENDPOINT, forcePathStyle: true }
            : {} ),
        credentials: { accessKeyId, secretAccessKey },
    } );
}

// -- Tool definition: get_user_file --
export const getUserFileDef = toolDefinition( {
    name: "get_user_file",
    description:
        "Retrieve a presigned URL for one of the user's uploaded documents. " +
        "Use this when the user mentions or asks about a specific file.",
    inputSchema: {
        type: "object",
        properties: {
            fileId: {
                type: "string",
                description: "The ID of the document file to retrieve",
            },
        },
        required: ["fileId"],
        additionalProperties: false,
    },
    outputSchema: {
        type: "object",
        properties: {
            fileName: { type: "string" },
            fileType: { type: "string" },
            url: { type: "string" },
            description: { type: ["string", "null"] },
        },
        required: ["fileName", "fileType", "url", "description"],
        additionalProperties: false,
    },
} );

/**
 * Server-side implementation of get_user_file.
 * Verifies ownership before generating presigned URL.
 */
export function createGetUserFileTool( userId: string ) {
    return getUserFileDef.server( async ( { fileId } ) => {
        // Ownership check: file must belong to the authenticated user
        const file = await db.query.documentFile.findFirst( {
            where: and(
                eq( documentFile.id, fileId ),
                eq( documentFile.userId, userId ),
            ),
        } );
        if ( !file ) {
            throw new Error( "File not found or access denied" );
        }

        const bucket = process.env.AWS_S3_BUCKET;
        if ( !bucket ) throw new Error( "S3 bucket not configured" );

        const s3 = getS3Client();
        const command = new GetObjectCommand( {
            Bucket: bucket,
            Key: file.s3Key,
        } );
        const url = await getSignedUrl( s3, command, { expiresIn: 3600 } );

        return {
            fileName: file.fileName,
            fileType: file.fileType,
            url,
            description: file.description,
        };
    } );
}

// -- Tool definition: list_user_files --
export const listUserFilesDef = toolDefinition( {
    name: "list_user_files",
    description:
        "List the user's uploaded document files so they can select one. " +
        "Use when the user says 'my files' or wants to browse documents.",
    inputSchema: {
        type: "object",
        properties: {},
        required: [],
        additionalProperties: false,
    },
    outputSchema: {
        type: "object",
        properties: {
            files: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        fileName: { type: "string" },
                        fileType: { type: "string" },
                        description: { type: ["string", "null"] },
                    },
                    required: ["id", "fileName", "fileType", "description"],
                    additionalProperties: false,
                },
            },
        },
        required: ["files"],
        additionalProperties: false,
    },
} );

export function createListUserFilesTool( userId: string ) {
    return listUserFilesDef.server( async () => {
        const files = await db.query.documentFile.findMany( {
            where: eq( documentFile.userId, userId ),
            columns: {
                id: true,
                fileName: true,
                fileType: true,
                description: true,
            },
        } );
        return { files };
    } );
}
