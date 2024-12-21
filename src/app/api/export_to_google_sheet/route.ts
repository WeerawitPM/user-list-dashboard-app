'use server';
import { google } from "googleapis";

interface RowData {
  [key: string]: string | number | boolean | null;
}

export async function POST(request: Request) {
  try {
    const { data } = await request.json();
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("GOOGLE_PRIVATE_KEY is not set in the environment variables.");
    }

    const glAuth = await google.auth.getClient({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
      ],
    });

    const glSheets = google.sheets({ version: "v4", auth: glAuth });
    const drive = google.drive({ version: "v3", auth: glAuth });

    // Create a new Google Sheet
    const createSheetResponse = await glSheets.spreadsheets.create({
      requestBody: {
        properties: { title: "Exported Data" },
      },
    });

    const spreadsheetId = createSheetResponse.data.spreadsheetId;

    if (!spreadsheetId) {
      throw new Error("Failed to retrieve spreadsheet ID.");
    }

    // Prepare data for insertion
    const headers = Object.keys(data[0]);
    const values = [headers, ...data.map((row: RowData) => headers.map(header => row[header]))];

    // Append data to the new sheet
    await glSheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    // Set permissions to "Anyone with the link can edit"
    await drive.permissions.create({
      fileId: spreadsheetId,
      requestBody: {
        role: "writer",
        type: "anyone",
      },
    });

    const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
    return Response.json({ message: "Export successful", sheetUrl });
  } catch (error) {
    console.error("Error exporting data:", error);
    return new Response(JSON.stringify({ error: "Failed to export data" }), { status: 500 });
  }
}
