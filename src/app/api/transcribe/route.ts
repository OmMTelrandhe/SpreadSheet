// import { OpenAI } from "openai";

// // export const runtime = "edge";

// const openai = new OpenAI();

// export async function POST(req: Request): Promise<Response> {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File;

//     if (!file) {
//       return new Response("File not provided", { status: 400 });
//     }

//     const transcription = await openai.audio.transcriptions.create({
//       file,
//       model: "whisper-1",
//     });

//     return new Response(JSON.stringify(transcription), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error: any) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }




import { OpenAI } from "openai";

// Azure OpenAI Configuration
const instance = "viresh"; // Replace with your Azure OpenAI instance name
const model = "whisper-1"; // Model name for audio transcription
const apiVersion = "2023-03-15-preview"; // Use the correct API version for Azure

const AZURE_OPENAI_API_KEY = process.env["AZURE_OPENAI_API_KEY"]; // Retrieve Azure OpenAI API key from environment variables

if (!AZURE_OPENAI_API_KEY) {
  throw new Error(
    "The AZURE_OPENAI_API_KEY environment variable is missing or empty."
  );
}

// Initialize the OpenAI client with Azure-specific configurations
const openai = new OpenAI({
  apiKey: AZURE_OPENAI_API_KEY, // Use the Azure OpenAI API key
  baseURL: `https://${instance}.openai.azure.com/openai/deployments/${model}`, // Azure-specific endpoint
  defaultQuery: { "api-version": apiVersion }, // Set the API version for Azure
  defaultHeaders: { "api-key": AZURE_OPENAI_API_KEY }, // Set the API key in headers
});

// export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("File not provided", { status: 400 });
    }

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
    });

    return new Response(JSON.stringify(transcription), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

