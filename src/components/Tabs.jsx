export default function Tabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'fcfs', label: 'FCFS' },
    { id: 'sjf-nonpreemptive', label: 'SJF (Non-Preemptive)' },
    { id: 'sjf-preemptive', label: 'SJF (Preemptive)' },
    { id: 'priority', label: 'Priority' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6 bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 border border-cyan-500/20">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]'
              : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700 hover:text-cyan-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

