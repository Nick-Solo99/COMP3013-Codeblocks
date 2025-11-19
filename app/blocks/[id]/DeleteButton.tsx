"use client";

import type { Block } from "@/app/generated/prisma";

type Props = {
  block: Block;
  action: (id: number) => void;
};

export default function DeleteButton({ block, action }: Props) {
  return (
    <div>
      <button
        className="btn btn-error btn-outline btn-circle"
        onClick={() => {
          const modal = document.getElementById(
            `delete_modal_${block.id}`,
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        🗑️
      </button>
      <dialog className="modal" id={`delete_modal_${block.id}`}>
        <div className="modal-box">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-2xl text-primary font-semibold">
                Delete Block
              </h3>
            </div>
            <div className="modal-body">
              <p className="label mb-2">
                Are you sure you want to delete the following block?
              </p>
              <p className="text-2xl text-primary font-semibold text-center">
                {block.title}
              </p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-warning btn-outline">Cancel</button>
              </form>
              <button
                className="btn btn-error btn-outline"
                onClick={() => {
                  action(block.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
