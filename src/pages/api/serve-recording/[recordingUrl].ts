import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { getCollection } from "astro:content";

const recordings = await getCollection("recordings");

export async function GET(context: { params: { recordingUrl: string } }) {
  const { recordingUrl } = context.params;

  if (!recordingUrl) {
    return new Response("Missing required parameters", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // Construct path relative to src directory
  const srcPath = fileURLToPath(new URL("../../../..", import.meta.url));
  const filePath = path.join(
    srcPath,
    "src",
    "recordings",
    "audio",
    `${recordingUrl}.mp3`,
  );

  try {
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `inline; filename="${recordingUrl}.mp3"`,
      },
    });
  } catch (error) {
    console.error("Error serving audio:", error);
    return new Response("File not found", { status: 404 });
  }
}

export function getStaticPaths() {
  const recordingAudio: { params: { recordingUrl: string } }[] = [];

  recordings.forEach((recording) => {
    recording.data.records?.forEach((record) => {
      if (record.url) {
        recordingAudio.push({
          params: { recordingUrl: record.url },
        });
      }
    });
  });

  return recordingAudio;
}
