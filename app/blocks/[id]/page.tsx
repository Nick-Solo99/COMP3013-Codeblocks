import { prisma } from "@/database";
import { createHighlighter } from "shiki";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { redirect } from "next/navigation";
import Image from "next/image";
import { auth } from "@/app/utils/auth";
import { headers } from "next/headers";

type Params = { params: { id: string } };

export default async function ShowBlock({ params }: Params) {
  const { id } = await params;
  const block = await prisma.block.findUnique({
    where: { id: Number(id) },
    include: {
      user: true,
    },
  });
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  async function deleteBlock(blockId: number): Promise<void> {
    "use server";

    if (session?.user?.id !== block?.user?.id) {
      return redirect(`/blocks/${blockId}`);
    }

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
      <div className="card bg-base-200 w-xl p-5">
        <div className="card-actions justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="avatar ">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <Image
                  src={block.user.image!}
                  alt="Profile Picture"
                  width={400}
                  height={400}
                />
              </div>
            </div>
            <p className="text-secondary">{block.user.name}</p>
          </div>
          {session?.user?.id === block.user.id && (
            <div className="flex gap-1">
              <Link href={`/blocks/${id}/edit`}>
                <span className="btn btn-warning btn-outline btn-circle">
                  📝
                </span>
              </Link>
              <DeleteButton block={block} action={deleteBlock} />
            </div>
          )}
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
