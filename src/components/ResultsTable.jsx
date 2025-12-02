export default function ResultsTable({ results }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-cyan-500/20">
            <th className="py-3 px-2 text-cyan-400 border-r border-cyan-500/20">Process</th>
            <th className="py-3 px-2 text-cyan-400 border-r border-cyan-500/20">AT</th>
            <th className="py-3 px-2 text-cyan-400 border-r border-cyan-500/20">BT</th>
            <th className="py-3 px-2 text-cyan-400 border-r border-cyan-500/20">CT</th>
            <th className="py-3 px-2 text-cyan-400 border-r border-cyan-500/20">TAT</th>
            <th className="py-3 px-2 text-cyan-400">WT</th>
          </tr>
        </thead>

        <tbody>
          {results.map((p, i) => (
            <tr key={i} className="border-b border-slate-700/50">
              <td className="py-3 px-2 text-gray-300 border-r border-slate-700/50">{p.name}</td>
              <td className="py-3 px-2 text-gray-300 border-r border-slate-700/50">{p.arrivalTime}</td>
              <td className="py-3 px-2 text-gray-300 border-r border-slate-700/50">{p.burstTime}</td>
              <td className="py-3 px-2 text-gray-300 border-r border-slate-700/50">{p.completionTime}</td>
              <td className="py-3 px-2 text-gray-300 border-r border-slate-700/50">{p.turnaroundTime}</td>
              <td className="py-3 px-2 text-gray-300">{p.waitingTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
