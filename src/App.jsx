import { useState } from 'react';
import Header from './components/Header';
import ProcessInput from './components/ProcessInput';
import GanttChart from './components/GanttChart';
import ResultsTable from './components/ResultsTable';


export default function CPUSchedulingFCFS() {
const [processes, setProcesses] = useState([
{ id: 1, name: 'P1', arrivalTime: 0, burstTime: 1 },
{ id: 2, name: 'P2', arrivalTime: 1, burstTime: 1 },
{ id: 3, name: 'P3', arrivalTime: 2, burstTime: 1 }
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