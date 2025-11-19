import { prisma } from "@/database";
import { bundledLanguages } from "shiki";
import { redirect } from "next/navigation";

type Params = { params: { id: string } };

export default async function EditBlock({ params }: Params) {
  const { id } = await params;
  const block = await prisma.block.findUnique({
    where: { id: Number(id) },
  });

  async function updateBlock(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const lang = formData.get("sel_lang") as string;
    const code = formData.get("code") as string;
    const block = await prisma.block.update({
      where: { id: Number(id) },
      data: {
        title: title,
        lang: lang,
        code: code,
      },
    });
    redirect("/blocks/" + block.id);
  }

  return (
    <div className="hero mt-4">
      <div className="card bg-base-200 p-5">
        <h2 className="text-4xl text-primary font-semibold text-center">
          Edit Block
        </h2>
        <form className="card-body" action={updateBlock}>
          <fieldset className="fieldset border-primary rounded-box w-xs border p-4">
            <legend className="legend text-primary">Edit Block</legend>
            <label className="label">Block Title</label>
            <input
              className="input"
              id="title"
              name="title"
              type="text"
              placeholder="Block Title"
              defaultValue={block?.title}
            />

            <label className="label">Language</label>
            <select
              className="select"
              id="sel_lang"
              name="sel_lang"
              defaultValue={block?.lang}
            >
              {Object.keys(bundledLanguages).map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>

            <label className="label">Code</label>
            <textarea
              className="textarea"
              placeholder="Your code goes here..."
              name="code"
              id="code"
              defaultValue={block?.code}
            ></textarea>

            <button className="btn btn-accent mt-2">Edit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
