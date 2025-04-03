import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { getCollection } from "astro:content";

const works = await getCollection("works");

export async function GET(context: {
  params: { workId: string };
  props: { audio: string };
}) {
  const { workId } = context.params;
  const { audio } = context.props;

  if (!workId || !audio) {
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
    "works",
    workId,
    "audio",
    `${audio}.mp3`,
  );

  try {
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `inline; filename="${audio}.mp3"`,
      },
    });
  } catch (error) {
    console.error("Error serving audio:", error);
    return new Response("File not found", { status: 404 });
  }
}

export function getStaticPaths() {
  return works.map((work) => ({
    params: { workId: work.data.workNumber },
    props: {
      audio: work.data.audio,
    },
  }));
}
