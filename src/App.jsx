import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProcessInput from './components/ProcessInput';
import GanttChart from './components/GanttChart';
import ResultsTable from './components/ResultsTable';
import ReadyQueue from './components/ReadyQueue';
import Tabs from './components/Tabs';


export default function CPUSchedulingFCFS() {
const [activeTab, setActiveTab] = useState('fcfs');
const [processes, setProcesses] = useState([
{ id: 1, name: 'P1', arrivalTime: 0, burstTime: 1, priority: 1 },
{ id: 2, name: 'P2', arrivalTime: 1, burstTime: 1, priority: 2 },
{ id: 3, name: 'P3', arrivalTime: 2, burstTime: 1, priority: 3 }
]);


const [results, setResults] = useState(null);
const [timeQuantum, setTimeQuantum] = useState(2);

useEffect(() => {
setResults(null);
}, [activeTab]);


const addProcess = () => {
const newId = processes.length > 0 ? Math.max(...processes.map(p => p.id)) + 1 : 1;
setProcesses([...processes, { id: newId, name: `P${newId}`, arrivalTime: 0, burstTime: 1, priority: 1 }]);
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

const calculateSJFNonPreemptive = () => {
if (processes.length === 0) return;
const sorted = [...processes].sort((a,b)=>a.arrivalTime-b.arrivalTime);
let currentTime = 0;
const result = [];
const ganttChart = [];
const completed = new Set();

while (completed.size < sorted.length) {
const available = sorted.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
if (available.length === 0) {
const nextProcess = sorted.find(p => !completed.has(p.id));
if (nextProcess) {
ganttChart.push({name:'IDLE', startTime:currentTime, duration:nextProcess.arrivalTime-currentTime, isIdle:true});
currentTime = nextProcess.arrivalTime;
continue;
}
}

if (available.length > 0) {
available.sort((a,b) => a.burstTime - b.burstTime);
const process = available[0];
const startTime = currentTime;
const completionTime = startTime + process.burstTime;
const turnaroundTime = completionTime - process.arrivalTime;
const waitingTime = turnaroundTime - process.burstTime;

ganttChart.push({name:process.name,startTime,duration:process.burstTime,isIdle:false});
result.push({...process,startTime,completionTime,turnaroundTime,waitingTime});
currentTime = completionTime;
completed.add(process.id);
}
}

setResults({ processes: result, ganttChart });
};

const calculateSJFPreemptive = () => {
if (processes.length === 0) return;
const processesCopy = processes.map(p => ({...p, remainingTime: p.burstTime}));
const ganttChart = [];
const result = [];
let currentTime = 0;
const completed = new Set();

while (completed.size < processesCopy.length) {
const available = processesCopy.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
if (available.length === 0) {
const nextProcess = processesCopy.find(p => !completed.has(p.id));
if (nextProcess) {
ganttChart.push({name:'IDLE', startTime:currentTime, duration:nextProcess.arrivalTime-currentTime, isIdle:true});
currentTime = nextProcess.arrivalTime;
continue;
}
}

if (available.length > 0) {
available.sort((a,b) => a.remainingTime - b.remainingTime);
const process = available[0];
const startTime = currentTime;
let duration = 1;
const nextArrival = processesCopy
.filter(p => !completed.has(p.id) && p.arrivalTime > currentTime)
.sort((a,b) => a.arrivalTime - b.arrivalTime)[0];

if (nextArrival && process.remainingTime > (nextArrival.arrivalTime - currentTime)) {
duration = nextArrival.arrivalTime - currentTime;
process.remainingTime -= duration;
currentTime += duration;
} else {
duration = process.remainingTime;
process.remainingTime = 0;
completed.add(process.id);
currentTime += duration;

const completionTime = currentTime;
const turnaroundTime = completionTime - process.arrivalTime;
const waitingTime = turnaroundTime - process.burstTime;
const existingResult = result.find(r => r.id === process.id);
if (existingResult) {
existingResult.completionTime = completionTime;
existingResult.turnaroundTime = turnaroundTime;
existingResult.waitingTime = waitingTime;
} else {
result.push({...process, startTime, completionTime, turnaroundTime, waitingTime});
}
}

if (ganttChart.length > 0 && ganttChart[ganttChart.length - 1].name === process.name && !ganttChart[ganttChart.length - 1].isIdle) {
ganttChart[ganttChart.length - 1].duration += duration;
} else {
ganttChart.push({name:process.name, startTime, duration, isIdle:false});
}
}
}

setResults({ processes: result, ganttChart });
};

const calculatePriority = () => {
if (processes.length === 0) return;
const sorted = [...processes].sort((a,b)=>a.arrivalTime-b.arrivalTime);
let currentTime = 0;
const result = [];
const ganttChart = [];
const completed = new Set();

while (completed.size < sorted.length) {
const available = sorted.filter(p => !completed.has(p.id) && p.arrivalTime <= currentTime);
if (available.length === 0) {
const nextProcess = sorted.find(p => !completed.has(p.id));
if (nextProcess) {
ganttChart.push({name:'IDLE', startTime:currentTime, duration:nextProcess.arrivalTime-currentTime, isIdle:true});
currentTime = nextProcess.arrivalTime;
continue;
}
}

if (available.length > 0) {
available.sort((a,b) => (a.priority || 0) - (b.priority || 0));
const process = available[0];
const startTime = currentTime;
const completionTime = startTime + process.burstTime;
const turnaroundTime = completionTime - process.arrivalTime;
const waitingTime = turnaroundTime - process.burstTime;

ganttChart.push({name:process.name,startTime,duration:process.burstTime,isIdle:false});
result.push({...process,startTime,completionTime,turnaroundTime,waitingTime});
currentTime = completionTime;
completed.add(process.id);
}
}

setResults({ processes: result, ganttChart });
};

const calculateRoundRobin = () => {
if (processes.length === 0 || timeQuantum <= 0) return;
const processesCopy = processes.map(p => ({...p, remainingTime: p.burstTime}));
const ganttChart = [];
const result = [];
const readyQueueStates = [];
let currentTime = 0;
const readyQueue = [];
const completed = new Set();
let processIndex = 0;

const sortedByArrival = [...processesCopy].sort((a,b) => a.arrivalTime - b.arrivalTime);

const addReadyQueueState = (time, queue) => {
readyQueueStates.push({
time: time,
queue: queue.map(p => ({ name: p.name }))
});
};

while (completed.size < processesCopy.length) {
while (processIndex < sortedByArrival.length && sortedByArrival[processIndex].arrivalTime <= currentTime) {
readyQueue.push(sortedByArrival[processIndex]);
processIndex++;
}

if (readyQueue.length === 0) {
if (processIndex < sortedByArrival.length) {
const nextProcess = sortedByArrival[processIndex];
addReadyQueueState(currentTime, []);
ganttChart.push({name:'IDLE', startTime:currentTime, duration:nextProcess.arrivalTime-currentTime, isIdle:true});
currentTime = nextProcess.arrivalTime;
readyQueue.push(nextProcess);
processIndex++;
} else {
break;
}
}

if (readyQueue.length > 0) {
addReadyQueueState(currentTime, [...readyQueue]);
const process = readyQueue.shift();
const startTime = currentTime;
const executionTime = Math.min(process.remainingTime, timeQuantum);
process.remainingTime -= executionTime;
currentTime += executionTime;

if (ganttChart.length > 0 && ganttChart[ganttChart.length - 1].name === process.name && !ganttChart[ganttChart.length - 1].isIdle) {
ganttChart[ganttChart.length - 1].duration += executionTime;
} else {
ganttChart.push({name:process.name, startTime, duration:executionTime, isIdle:false});
}

while (processIndex < sortedByArrival.length && sortedByArrival[processIndex].arrivalTime <= currentTime) {
readyQueue.push(sortedByArrival[processIndex]);
processIndex++;
}

if (process.remainingTime > 0) {
readyQueue.push(process);
} else {
completed.add(process.id);
const completionTime = currentTime;
const turnaroundTime = completionTime - process.arrivalTime;
const waitingTime = turnaroundTime - process.burstTime;
result.push({...process, startTime, completionTime, turnaroundTime, waitingTime});
}
addReadyQueueState(currentTime, [...readyQueue]);
}
}

setResults({ processes: result, ganttChart, readyQueueStates });
};

const getCalculateFunction = () => {
switch(activeTab) {
case 'fcfs': return calculateFCFS;
case 'sjf-nonpreemptive': return calculateSJFNonPreemptive;
case 'sjf-preemptive': return calculateSJFPreemptive;
case 'priority': return calculatePriority;
case 'roundrobin': return calculateRoundRobin;
default: return calculateFCFS;
}
};


return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
<div className="max-w-7xl mx-auto">
<Header activeTab={activeTab} />
<Tabs activeTab={activeTab} onTabChange={setActiveTab} />
<ProcessInput processes={processes} addProcess={addProcess} deleteProcess={deleteProcess} updateProcess={updateProcess} calculate={getCalculateFunction()} activeTab={activeTab} timeQuantum={timeQuantum} setTimeQuantum={setTimeQuantum} />
{results && (
<div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow border border-cyan-500/20 p-6">
<h2 className="text-xl font-bold text-cyan-400 mb-4">Results</h2>
<GanttChart gantt={results.ganttChart} />
{activeTab === 'roundrobin' && results.readyQueueStates && (
<ReadyQueue readyQueueStates={results.readyQueueStates} />
)}
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