'use server';
import { google } from "googleapis";

export async function getSheetData(): Promise<User[]> {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("GOOGLE_PRIVATE_KEY is not set in the environment variables.");
    }

    const glAuth = await google.auth.getClient({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: privateKey.replace(/\\n/g, '\n'),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });

    const response = await glSheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'user_mock_data!A:Z',
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
        return [];
    }

    // First row as headers
    const headers = rows[0];

    // Transform remaining rows into User objects
    const data: User[] = rows.slice(1).map((row) => {
        const obj: Partial<User> = {}; // Use Partial<User> to allow for incremental assignment
        headers.forEach((header, index) => {
            obj[header as keyof User] = row[index] || null;
        });
        return obj as User; // Type assertion to ensure obj matches User type
    });

    return data;
}
