// import { useState } from 'react';
// import { Plus, Trash2, Play } from 'lucide-react';

// export default function CPUSchedulingFCFS() {
//   const [processes, setProcesses] = useState([
//     { id: 1, name: 'P1', arrivalTime: 0, burstTime: 5 },
//     { id: 2, name: 'P2', arrivalTime: 1, burstTime: 3 },
//     { id: 3, name: 'P3', arrivalTime: 2, burstTime: 8 }
//   ]);
//   const [results, setResults] = useState(null);

//   const addProcess = () => {
//     const newId = processes.length > 0 ? Math.max(...processes.map(p => p.id)) + 1 : 1;
//     setProcesses([...processes, {
//       id: newId,
//       name: `P${newId}`,
//       arrivalTime: 0,
//       burstTime: 1
//     }]);
//   };

//   const deleteProcess = (id) => {
//     setProcesses(processes.filter(p => p.id !== id));
//   };

//   const updateProcess = (id, field, value) => {
//     setProcesses(processes.map(p => 
//       p.id === id ? { ...p, [field]: parseInt(value) || 0 } : p
//     ));
//   };

//   const calculateFCFS = () => {
//     if (processes.length === 0) return;

//     // Sort by arrival time
//     const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
    
//     let currentTime = 0;
//     const result = [];
//     const ganttChart = [];
    
//     sorted.forEach(process => {
//       // Check for idle time
//       if (currentTime < process.arrivalTime) {
//         ganttChart.push({
//           name: 'IDLE',
//           startTime: currentTime,
//           duration: process.arrivalTime - currentTime,
//           isIdle: true
//         });
//         currentTime = process.arrivalTime;
//       }
      
//       const startTime = currentTime;
//       const completionTime = startTime + process.burstTime;
//       const turnaroundTime = completionTime - process.arrivalTime;
//       const waitingTime = turnaroundTime - process.burstTime;
      
//       ganttChart.push({
//         name: process.name,
//         startTime,
//         duration: process.burstTime,
//         isIdle: false
//       });
      
//       result.push({
//         ...process,
//         startTime,
//         completionTime,
//         turnaroundTime,
//         waitingTime
//       });
      
//       currentTime = completionTime;
//     });

//     const avgWaitingTime = result.reduce((sum, p) => sum + p.waitingTime, 0) / result.length;
//     const avgTurnaroundTime = result.reduce((sum, p) => sum + p.turnaroundTime, 0) / result.length;

//     setResults({
//       processes: result,
//       ganttChart
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mb-3">
//             CPU Scheduling Algorithm
//           </h1>
//           <p className="text-cyan-400/70 font-mono text-lg">First Come First Serve (FCFS)</p>
//         </div>

//         {/* Input Section */}
//         <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] border border-cyan-500/20 p-6 mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-cyan-400">Process Input</h2>
//             <button
//               onClick={addProcess}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
//             >
//               <Plus size={20} />
//               Add Process
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-cyan-500/20">
//                   <th className="text-left text-cyan-400 py-3 px-2">Process</th>
//                   <th className="text-left text-cyan-400 py-3 px-2">Arrival Time</th>
//                   <th className="text-left text-cyan-400 py-3 px-2">Burst Time</th>
//                   <th className="text-left text-cyan-400 py-3 px-2">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {processes.map(process => (
//                   <tr key={process.id} className="border-b border-slate-700/50">
//                     <td className="py-3 px-2">
//                       <span className="text-gray-300 font-mono">{process.name}</span>
//                     </td>
//                     <td className="py-3 px-2">
//                       <input
//                         type="number"
//                         min="0"
//                         value={process.arrivalTime}
//                         onChange={(e) => updateProcess(process.id, 'arrivalTime', e.target.value)}
//                         className="w-24 px-3 py-1 bg-slate-700/50 border border-cyan-500/30 rounded text-gray-300 focus:outline-none focus:border-cyan-400"
//                       />
//                     </td>
//                     <td className="py-3 px-2">
//                       <input
//                         type="number"
//                         min="1"
//                         value={process.burstTime}
//                         onChange={(e) => updateProcess(process.id, 'burstTime', e.target.value)}
//                         className="w-24 px-3 py-1 bg-slate-700/50 border border-cyan-500/30 rounded text-gray-300 focus:outline-none focus:border-cyan-400"
//                       />
//                     </td>
//                     <td className="py-3 px-2">
//                       <button
//                         onClick={() => deleteProcess(process.id)}
//                         className="text-red-400 hover:text-red-300 transition-colors"
//                       >
//                         <Trash2 size={20} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button
//             onClick={calculateFCFS}
//             className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all font-semibold"
//           >
//             <Play size={20} />
//             Calculate Schedule
//           </button>
//         </div>

//         {/* Results Section */}
//         {results && (
//           <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.3)] border border-cyan-500/20 p-6">
//             <h2 className="text-xl font-bold text-cyan-400 mb-4">Results</h2>
            
//             {/* Gantt Chart */}
//             <div className="mb-6">
//               <h3 className="text-lg text-cyan-300 mb-3">Gantt Chart</h3>
//               <div className="pb-2">
//                 <div className="flex w-full">
//                   {results.ganttChart.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`h-16 border flex items-center justify-center px-2 ${
//                         item.isIdle 
//                           ? 'bg-gradient-to-r from-gray-600/30 to-gray-700/30 border-gray-500/50' 
//                           : 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/50'
//                       }`}
//                       style={{ flex: item.duration }}
//                     >
//                       <span className={`font-mono font-semibold text-sm ${
//                         item.isIdle ? 'text-gray-400 italic' : 'text-cyan-300'
//                       }`}>
//                         {item.name}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex w-full">
//                   {results.ganttChart.map((item, index) => {
//                     const endTime = item.startTime + item.duration;
//                     return (
//                       <div
//                         key={index}
//                         className="relative text-xs text-gray-400"
//                         style={{ flex: item.duration }}
//                       >
//                         {index === 0 && <span className="absolute left-0">{item.startTime}</span>}
//                         <span className="absolute right-0">{endTime}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* Results Table */}
//             <div className="overflow-x-auto mb-6">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-cyan-500/20">
//                     <th className="text-left text-cyan-400 py-3 px-2">Process</th>
//                     <th className="text-left text-cyan-400 py-3 px-2">AT</th>
//                     <th className="text-left text-cyan-400 py-3 px-2">BT</th>
//                     <th className="text-left text-cyan-400 py-3 px-2">CT</th>
//                     <th className="text-left text-cyan-400 py-3 px-2">TAT</th>
//                     <th className="text-left text-cyan-400 py-3 px-2">WT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {results.processes.map((process, index) => (
//                     <tr key={index} className="border-b border-slate-700/50">
//                       <td className="py-3 px-2 text-gray-300 font-mono">{process.name}</td>
//                       <td className="py-3 px-2 text-gray-300">{process.arrivalTime}</td>
//                       <td className="py-3 px-2 text-gray-300">{process.burstTime}</td>
//                       <td className="py-3 px-2 text-gray-300">{process.completionTime}</td>
//                       <td className="py-3 px-2 text-gray-300">{process.turnaroundTime}</td>
//                       <td className="py-3 px-2 text-gray-300">{process.waitingTime}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Tech grid background */}
//       <div className="fixed inset-0 pointer-events-none opacity-10 -z-10">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
//                            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
//           backgroundSize: '50px 50px'
//         }}></div>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import Header from './components/Header';
import ProcessInput from './components/ProcessInput';
import GanttChart from './components/GanttChart';
import ResultsTable from './components/ResultsTable';


export default function CPUSchedulingFCFS() {
const [processes, setProcesses] = useState([
{ id: 1, name: 'P1', arrivalTime: 0, burstTime: 5 },
{ id: 2, name: 'P2', arrivalTime: 1, burstTime: 3 },
{ id: 3, name: 'P3', arrivalTime: 2, burstTime: 8 }
]);


const [results, setResults] = useState(null);


const addProcess = () => {
const newId = processes.length > 0 ? Math.max(...processes.map(p => p.id)) + 1 : 1;
setProcesses([...processes, { id: newId, name: `P${newId}`, arrivalTime: 0, burstTime: 1 }]);
};


const deleteProcess = (id) => setProcesses(processes.filter(p => p.id !== id));
const updateProcess = (id, field, value) => setProcesses(processes.map(p => p.id === id ? {...p, [field]: parseInt(value) || 0} : p));


const calculateFCFS = () => {
if (processes.length === 0) return;
const sorted = [...processes].sort((a,b)=>a.arrivalTime-b.arrivalTime);
let currentTime = 0;
const result = [];
const ganttChart = [];


sorted.forEach(process => {
if(currentTime < process.arrivalTime){
ganttChart.push({name:'IDLE', startTime:currentTime, duration:process.arrivalTime-currentTime, isIdle:true});
currentTime = process.arrivalTime;
}
const startTime = currentTime;
const completionTime = startTime + process.burstTime;
const turnaroundTime = completionTime - process.arrivalTime;
const waitingTime = turnaroundTime - process.burstTime;


ganttChart.push({name:process.name,startTime,duration:process.burstTime,isIdle:false});
result.push({...process,startTime,completionTime,turnaroundTime,waitingTime});
currentTime = completionTime;
});


setResults({ processes: result, ganttChart });
};


return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
<div className="max-w-7xl mx-auto">
<Header />
<ProcessInput processes={processes} addProcess={addProcess} deleteProcess={deleteProcess} updateProcess={updateProcess} calculate={calculateFCFS} />
{results && (
<div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow border border-cyan-500/20 p-6">
<h2 className="text-xl font-bold text-cyan-400 mb-4">Results</h2>
<GanttChart gantt={results.ganttChart} />
<ResultsTable results={results.processes} />
</div>
)}
</div>


<div className="fixed inset-0 pointer-events-none opacity-10 -z-10">
<div className="absolute inset-0" style={{backgroundImage:`linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`, backgroundSize:'50px 50px'}}></div>
</div>
</div>
);
}