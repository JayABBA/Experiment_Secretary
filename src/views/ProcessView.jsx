import React, { useState } from 'react'
import useExperimentStore from '../store/useExperimentStore'
import { Input, Button } from '../components/ui'
import { Plus, Clock, CheckCircle2 } from 'lucide-react'

const ProcessView = () => {
  const { experiment, addStep } = useExperimentStore()
  const [newStep, setNewStep] = useState('')

  const handleAddStep = () => {
    if (!newStep.trim()) return
    const step = {
      id: Date.now().toString(),
      description: newStep,
      timestamp: new Date().toLocaleTimeString(),
      status: 'completed'
    }
    addStep(step)
    setNewStep('')
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-20">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
          Experiment Process
        </h2>
        <p className="text-slate-400 mt-2">Log your experimental steps in real-time.</p>
      </div>

      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl flex gap-4 items-end shadow-lg sticky top-0 z-10 backdrop-blur-xl bg-slate-900/80">
        <div className="flex-1">
          <Input
            label="Current Action"
            placeholder="e.g. Added 5ml of solution A to test tube 1..."
            value={newStep}
            onChange={(e) => setNewStep(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddStep()}
          />
        </div>
        <Button onClick={handleAddStep} variant="primary" className="h-[42px] mb-[1px]">
          <Plus size={20} /> Log Step
        </Button>
      </div>

      <div className="relative pl-8 border-l border-slate-700 space-y-8 py-4 ml-4">
        {experiment.steps.length === 0 && (
          <div className="text-slate-500 italic pl-2">No steps recorded yet. Start your experiment!</div>
        )}
        {[...experiment.steps].reverse().map((step) => (
          <div key={step.id} className="relative group animate-in slide-in-from-left-4 duration-300">
            <div className="absolute -left-[43px] bg-slate-800 border-4 border-slate-900 rounded-full p-2 text-emerald-400 shadow-lg shadow-emerald-900/20">
              <CheckCircle2 size={16} />
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-lg hover:bg-slate-800 transition-colors">
              <div className="flex justify-between items-start">
                <span className="font-medium text-slate-200 text-lg">{step.description}</span>
                <span className="flex items-center text-xs text-slate-400 bg-slate-900 px-2 py-1 rounded-full border border-slate-800">
                  <Clock size={12} className="mr-1" /> {step.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessView
