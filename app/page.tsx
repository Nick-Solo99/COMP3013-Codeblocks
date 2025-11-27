import { prisma } from "@/database";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const blocks = await prisma.block.findMany({
    where: {},
    include: {
      user: true,
    },
  });

  return (
    <div className="hero mt-4">
      {blocks.length === 0 ? (
        <p className="text-gray-500 italic text-center">
          No blocks yet. Create one to get started!
        </p>
      ) : (
        <ul className="flex flex-col gap-3 w-md">
          {blocks.map((block) => (
            <Link href={`/blocks/${block.id}`} key={block.id}>
              <li
                key={block.id}
                className="card p-4 bg-base-200 w-full hover:bg-base-300"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-primary font-semibold text-4xl text-center">
                    {block.title}
                  </h2>
                  <div className="flex gap-4 items-center justify-end">
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
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
