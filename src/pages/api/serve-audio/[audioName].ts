import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";
import { getCollection } from "astro:content";

const works = await getCollection("works");

export async function GET(context: {
  params: { audioName: string };
  props: { workId: string };
}) {
  const { audioName } = context.params;
  const { workId } = context.props;

  if (!workId || !audioName) {
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
    `${audioName}`,
  );

  try {
    const fileBuffer = await readFile(filePath);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `inline; filename="${audioName}.mp3"`,
      },
    });
  } catch (error) {
    console.error("Error serving audio:", error);
    return new Response("File not found", { status: 404 });
  }
}

export function getStaticPaths() {
  const worksWithAudio = works.filter((work) => work.data.audio);

  return worksWithAudio.map((work) => {
    let audioName = work.data.audio;

    if (audioName && !audioName.includes(".mp3")) {
      audioName = audioName + ".mp3";
    }

    return {
      params: { audioName: audioName },
      props: {
        workId: work.data.workNumber,
      },
    };
  });
}
