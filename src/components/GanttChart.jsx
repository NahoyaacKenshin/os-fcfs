export default function GanttChart({ gantt }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg text-cyan-300 mb-3">Gantt Chart</h3>
      <div className="pb-2">
        <div className="flex w-full">
          {gantt.map((item, index) => (
            <div
              key={index}
              className={`h-16 border flex items-center justify-center px-2 ${
                item.isIdle
                  ? "bg-gradient-to-r from-gray-600/30 to-gray-700/30 border-gray-500/50"
                  : "bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/50"
              }`}
              style={{ flex: item.duration }}
            >
              <span
                className={`font-mono font-semibold text-sm ${
                  item.isIdle ? "text-gray-400 italic" : "text-cyan-300"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex w-full">
          {gantt.map((item, index) => {
            const end = item.startTime + item.duration;
            return (
              <div
                key={index}
                className="relative text-xs text-gray-400"
                style={{ flex: item.duration }}
              >
                {index === 0 && <span className="absolute left-0">{item.startTime}</span>}
                <span className="absolute right-0">{end}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
