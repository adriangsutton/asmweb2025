import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { getCollection } from "astro:content";
import path from "path";

const works = await getCollection("works");

export async function GET(context: {
  params: { pdfName: string };
  props: { workId: string };
}) {
  const { pdfName } = context.params;
  const { workId } = context.props;

  if (!workId || !pdfName) {
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
    `${pdfName}`,
  );

  try {
    const fileBuffer = await readFile(filePath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfName}"; filename*=UTF-8''${encodeURIComponent(pdfName)}`,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return new Response("File not found", { status: 404 });
  }
}

export function getStaticPaths() {
  const worksWithPdf = works.filter((work) => work.data.pdf);

  return worksWithPdf.map((work) => ({
    params: { pdfName: work.data.pdf + ".pdf" },
    props: {
      workId: work.data.workNumber,
    },
  }));
}
