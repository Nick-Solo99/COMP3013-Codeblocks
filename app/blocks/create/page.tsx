import {bundledLanguages} from "shiki";
import {block} from "sharp";

export default function CreateBlock() {
  return (
    <div className="hero mt-4">
        <div className="card bg-base-200 p-5">
            <h2 className="text-4xl text-primary font-semibold text-center">Create Block</h2>
            <form className="card-body" method="POST" action="#">
                <fieldset className="fieldset border-primary rounded-box w-xs border p-4">
                    <legend className="legend text-primary">Create Block</legend>
                    <label className="label">Block Title</label>
                    <input
                    className="input"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Block Title"/>

                    <label className="label">Language</label>
                    <select className="select" id="sel_lang" name="sel_lang" defaultValue="typescript">
                        {Object.keys(bundledLanguages).map((language) => (
                            <option key={language} value={language}>{language}</option>
                        ))}
                    </select>

                    <label className="label">Code</label>
                    <textarea className="textarea" placeholder="Your code goes here..."></textarea>

                    <button className="btn btn-accent mt-2">Create</button>
                </fieldset>
            </form>
        </div>
    </div>
  );
}
