import { useState } from "react";
import { User } from "@acme/shared-models";

const CreateTicketModal = ({
  assignees,
  onCreate,
  onClose,
}: {
  assignees: User[];
  onCreate: (data: {
    title: string;
    description: string;
    assigneeId: string;
  }) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleClickCreate = () => {
    if (!title.trim() || !desc.trim()) {
      return;
    }
    onCreate({ title, description: desc, assigneeId: assignee });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create New Ticket</h2>
        <div className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-2 rounded"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <label>Assignee: </label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            >
              {assignees.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded border" onClick={onClose}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleClickCreate}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketModal;
