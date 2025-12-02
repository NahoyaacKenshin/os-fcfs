export default function ReadyQueue({ readyQueueStates }) {
  if (!readyQueueStates || readyQueueStates.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg text-cyan-300 mb-3">Ready Queue</h3>
      <div className="overflow-x-auto">
        <div className="space-y-3">
          {readyQueueStates.map((state, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20"
            >
              <div className="text-cyan-400 font-mono font-semibold min-w-[50px] text-sm">
                t={state.time}
              </div>
              <div className="flex items-center gap-2 flex-1">
                {state.queue.length === 0 ? (
                  <span className="text-gray-500 italic text-sm">[Empty]</span>
                ) : (
                  <>
                    <span className="text-gray-400 text-sm">[</span>
                    {state.queue.map((process, idx) => (
                      <span key={idx} className="flex items-center">
                        <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-400/50 rounded text-cyan-300 font-mono text-sm">
                          {process.name}
                        </span>
                        {idx < state.queue.length - 1 && (
                          <span className="text-cyan-400 mx-1">→</span>
                        )}
                      </span>
                    ))}
                    <span className="text-gray-400 text-sm">]</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

