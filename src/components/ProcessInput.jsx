import { Plus, Trash2 } from "lucide-react";

export default function ProcessInput({ processes, addProcess, deleteProcess, updateProcess, calculate }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] border border-cyan-500/20 p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-cyan-400">Process Input</h2>
        <button
          onClick={addProcess}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
        >
          <Plus size={20} />
          Add Process
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-cyan-500/20">
              <th className="text-left text-cyan-400 py-3 px-2">Process</th>
              <th className="text-left text-cyan-400 py-3 px-2">Arrival Time</th>
              <th className="text-left text-cyan-400 py-3 px-2">Burst Time</th>
              <th className="text-left text-cyan-400 py-3 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(process => (
              <tr key={process.id} className="border-b border-slate-700/50">
                <td className="py-3 px-2">
                  <span className="text-gray-300 font-mono">{process.name}</span>
                </td>
                <td className="py-3 px-2">
                  <input
                    type="number"
                    min="0"
                    value={process.arrivalTime}
                    onChange={(e) => updateProcess(process.id, 'arrivalTime', e.target.value)}
                    className="w-24 px-3 py-1 bg-slate-700/50 border border-cyan-500/30 rounded text-gray-300"
                  />
                </td>
                <td className="py-3 px-2">
                  <input
                    type="number"
                    min="1"
                    value={process.burstTime}
                    onChange={(e) => updateProcess(process.id, 'burstTime', e.target.value)}
                    className="w-24 px-3 py-1 bg-slate-700/50 border border-cyan-500/30 rounded text-gray-300"
                  />
                </td>
                <td>
                  <button
                    onClick={() => deleteProcess(process.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={calculate}
        className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg"
      >
        Calculate Schedule
      </button>
    </div>
  );
}
