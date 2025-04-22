import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { getCollection } from "astro:content";
import path from "path";

const works = await getCollection("works");

export async function GET(context: {
  params: { workId: string };
  props: { pdf: string };
}) {
  const { workId } = context.params;
  const { pdf } = context.props;

  if (!workId || !pdf) {
    return new Response("Missing required parameters", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  const srcPath = fileURLToPath(new URL("../../../..", import.meta.url));
  const filePath = path.join(
    srcPath,
    "src",
    "works",
    workId,
    "pdf",
    `${pdf}.pdf`,
  );

  try {
    const fileBuffer = await readFile(filePath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdf}.pdf"; filename*=UTF-8''${encodeURIComponent(pdf)}.pdf`,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new Response("File not found", { status: 404 });
  }
}

export function getStaticPaths() {
  return works.map((work) => ({
    params: { workId: work.data.workNumber },
    props: {
      pdf: work.data.pdf,
    },
  }));
}
