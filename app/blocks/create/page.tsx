import { bundledLanguages } from "shiki";
import { prisma } from "@/database";
import { redirect } from "next/navigation";

export default function CreateBlock() {
  async function addBlock(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const lang = formData.get("sel_lang") as string;
    const code = formData.get("code") as string;

    const block = await prisma.block.create({
      data: {
        title,
        lang,
        code,
      },
    });

    console.log(block);
    redirect("/blocks/" + block.id);
  }

  return (
    <div className="hero mt-4">
      <div className="card bg-base-200 p-5">
        <h2 className="text-4xl text-primary font-semibold text-center">
          Create Block
        </h2>
        <form className="card-body" action={addBlock}>
          <fieldset className="fieldset border-primary rounded-box w-xs border p-4">
            <legend className="legend text-primary">Create Block</legend>
            <label className="label">Block Title</label>
            <input
              className="input"
              id="title"
              name="title"
              type="text"
              placeholder="Block Title"
              required
            />

            <label className="label">Language</label>
            <select
              className="select"
              id="sel_lang"
              name="sel_lang"
              defaultValue="typescript"
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
              required
            ></textarea>

            <button className="btn btn-accent mt-2">Create</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
