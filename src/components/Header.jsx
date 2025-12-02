export default function Header({ activeTab }) {
  const getAlgorithmName = () => {
    switch(activeTab) {
      case 'fcfs': return 'First Come First Serve (FCFS)';
      case 'sjf-nonpreemptive': return 'Shortest Job First (Non-Preemptive)';
      case 'sjf-preemptive': return 'Shortest Job First (Preemptive)';
      case 'priority': return 'Priority Scheduling';
      case 'roundrobin': return 'Round Robin Scheduling';
      default: return 'First Come First Serve (FCFS)';
    }
  };

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
        CPU Scheduling Algorithm
      </h1>
      <p className="text-cyan-400/70 font-mono text-lg">{getAlgorithmName()}</p>
    </div>
  );
}
