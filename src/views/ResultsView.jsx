import React, { useState } from 'react'
import useExperimentStore from '../store/useExperimentStore'
import { Input, Textarea, Button } from '../components/ui'
import { Plus, Table2 } from 'lucide-react'

const ResultsView = () => {
    const { experiment, setExperiment } = useExperimentStore()

    const [newResult, setNewResult] = useState({ label: '', value: '', observation: '' })

    const addResult = () => {
        if (!newResult.label) return
        const updatedResults = [...experiment.results, { ...newResult, id: Date.now() }]
        setExperiment({ results: updatedResults })
        setNewResult({ label: '', value: '', observation: '' })
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-400">
                    Results & Observations
                </h2>
                <p className="text-slate-400 mt-2">Record quantitative data and qualitative observations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Input Form */}
                <div className="md:col-span-1 space-y-4 bg-slate-900/50 border border-slate-800 p-6 rounded-xl h-fit">
                    <h3 className="font-semibold text-slate-200">Add Data Point</h3>
                    <Input
                        label="Label / Timepoint"
                        placeholder="e.g. 10 mins"
                        value={newResult.label}
                        onChange={(e) => setNewResult({ ...newResult, label: e.target.value })}
                    />
                    <Input
                        label="Value / Measurement"
                        placeholder="e.g. 5.2 pH"
                        value={newResult.value}
                        onChange={(e) => setNewResult({ ...newResult, value: e.target.value })}
                    />
                    <Textarea
                        label="Observation"
                        placeholder="Color changed..."
                        className="min-h-[80px]"
                        value={newResult.observation}
                        onChange={(e) => setNewResult({ ...newResult, observation: e.target.value })}
                    />
                    <Button onClick={addResult} variant="primary" className="w-full">
                        <Plus size={18} /> Add Entry
                    </Button>
                </div>

                {/* Data Display */}
                <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/80">
                        <Table2 size={18} className="text-slate-400" />
                        <span className="font-medium text-slate-200">Data Log</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                                    <th className="p-4 font-medium">Label</th>
                                    <th className="p-4 font-medium">Value</th>
                                    <th className="p-4 font-medium">Observation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {experiment.results.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-slate-500 italic">
                                            No results recorded yet.
                                        </td>
                                    </tr>
                                )}
                                {experiment.results.map((res) => (
                                    <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 text-slate-200 font-medium">{res.label}</td>
                                        <td className="p-4 text-slate-300 font-mono">{res.value}</td>
                                        <td className="p-4 text-slate-400">{res.observation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultsView
