import { prisma } from "@/database";
import Link from "next/link";

export default async function Home() {
  const blocks = await prisma.block.findMany();

  return (
      <div className="hero mt-4">
        {blocks.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No blocks yet. Create one to get started!
          </p>
        ) : (
          <ul className="flex flex-col gap-3 min-w-64">
            {blocks.map((block) => (
                <Link href={`/blocks/${block.id}`} key={block.id}>
                    <li
                        key={block.id}
                        className="card p-4 bg-base-200 w-full hover:bg-base-300"
                    >
                        <span className="text-primary font-semibold card-title">{block.title}</span>
                    </li>
                </Link>
            ))}
          </ul>
        )}
      </div>
  );
}
