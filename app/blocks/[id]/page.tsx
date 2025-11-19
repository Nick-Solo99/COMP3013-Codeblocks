import { prisma } from "@/database";
import { createHighlighter } from "shiki";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { redirect } from "next/navigation";

type Params = { params: { id: string } };

export default async function ShowBlock({ params }: Params) {
  const { id } = await params;
  const block = await prisma.block.findUnique({
    where: { id: Number(id) },
  });

  async function deleteBlock(blockId: number): Promise<void> {
    "use server";
    await prisma.block.delete({
      where: { id: blockId },
    });
    redirect("/");
  }

  if (!block) {
    return (
      <div className="hero p-5">
        <div className="card bg-base-200 p-5">
          <h2 className="text-error text-center text-4xl text-semibold">
            Block {id} Not Found...
          </h2>
        </div>
      </div>
    );
  }
  const highlighter = await createHighlighter({
    themes: ["tokyo-night"],
    langs: [block.lang ?? "typescript"],
  });
  const code = highlighter.codeToHtml(block.code, {
    lang: block.lang ?? "typescript",
    theme: "tokyo-night",
  });
  return (
    <div className="hero p-5">
      <div className="card bg-base-200 min-w-72 p-5">
        <div className="card-actions justify-end">
          <Link href={`/blocks/${id}/edit`}>
            <span className="btn btn-warning btn-outline btn-circle">📝</span>
          </Link>
          <DeleteButton block={block} action={deleteBlock} />
        </div>
        <h2 className="text-4xl text-center text-primary font-semibold">
          {block.title}
        </h2>
        <div className="card-body">
          <div
            className="mockup-code"
            dangerouslySetInnerHTML={{ __html: code }}
          ></div>
        </div>
      </div>
    </div>
  );
}
