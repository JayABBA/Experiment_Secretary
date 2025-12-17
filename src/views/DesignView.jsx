import React from 'react'
import useExperimentStore from '../store/useExperimentStore'
import { Input, Textarea, Button } from '../components/ui'
import { Plus, Trash2, Save } from 'lucide-react'

const Section = ({ title, description, children }) => (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
            {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
        {children}
    </div>
)

const DesignView = () => {
    const { experiment, updateField } = useExperimentStore()

    const handleVariableChange = (index, field, value) => {
        const newVariables = [...experiment.variables]
        newVariables[index] = { ...newVariables[index], [field]: value }
        updateField('variables', newVariables)
    }

    const addVariable = () => {
        updateField('variables', [...experiment.variables, { name: '', type: 'Independent' }])
    }

    const removeVariable = (index) => {
        const newVariables = experiment.variables.filter((_, i) => i !== index)
        updateField('variables', newVariables)
    }

    const handleMaterialChange = (index, value) => {
        const newMaterials = [...experiment.materials]
        newMaterials[index] = value
        updateField('materials', newMaterials)
    }

    const addMaterial = () => {
        updateField('materials', [...experiment.materials, ''])
    }

    const removeMaterial = (index) => {
        const newMaterials = experiment.materials.filter((_, i) => i !== index)
        updateField('materials', newMaterials)
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                        Experiment Design
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Define the core parameters of your experiment.
                    </p>
                </div>
                <Button variant="primary">
                    <Save size={18} />
                    Save Design
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <Section title="Overview">
                        <Input
                            label="Experiment Title"
                            value={experiment.title}
                            onChange={(e) => updateField('title', e.target.value)}
                            placeholder="e.g. Effect of Temperature on Enzyme Activity"
                        />
                        <Textarea
                            label="Scientific Goal"
                            value={experiment.goal}
                            onChange={(e) => updateField('goal', e.target.value)}
                            placeholder="What are you trying to discover?"
                        />
                    </Section>

                    <Section title="Hypothesis" description="State your prediction clearly.">
                        <Textarea
                            className="h-32"
                            value={experiment.hypothesis}
                            onChange={(e) => updateField('hypothesis', e.target.value)}
                            placeholder="If [variable] is changed, then [result] will happen because..."
                        />
                    </Section>
                </div>

                <div className="space-y-6">
                    <Section title="Variables" description="Define independent, dependent, and controlled variables.">
                        <div className="space-y-3">
                            {experiment.variables.map((variable, index) => (
                                <div key={index} className="flex gap-2 items-start">
                                    <Input
                                        placeholder="Variable Name"
                                        value={variable.name}
                                        onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                                        className="flex-1"
                                    />
                                    <select
                                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 text-sm focus:ring-2 focus:ring-indigo-500 outline-none h-[42px]"
                                        value={variable.type}
                                        onChange={(e) => handleVariableChange(index, 'type', e.target.value)}
                                    >
                                        <option>Independent</option>
                                        <option>Dependent</option>
                                        <option>Controlled</option>
                                    </select>
                                    <Button variant="ghost" onClick={() => removeVariable(index)} className="px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="secondary" onClick={addVariable} className="w-full text-sm">
                                <Plus size={16} /> Add Variable
                            </Button>
                        </div>
                    </Section>

                    <Section title="Materials" description="List required equipment and substances.">
                        <div className="space-y-3">
                            {experiment.materials.map((material, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        placeholder="Item name"
                                        value={material}
                                        onChange={(e) => handleMaterialChange(index, e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button variant="ghost" onClick={() => removeMaterial(index)} className="px-2 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                                        <Trash2 size={18} />
                                    </Button>
                                </div>
                            ))}
                            <Button variant="secondary" onClick={addMaterial} className="w-full text-sm">
                                <Plus size={16} /> Add Material
                            </Button>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    )
}

export default DesignView
