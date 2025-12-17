import { create } from 'zustand'

const useExperimentStore = create((set) => ({
    experiment: {
        id: 'exp-1',
        title: 'Untitled Experiment',
        goal: '',
        hypothesis: '',
        variables: [],
        materials: [],
        steps: [],
        results: [],
    },
    setExperiment: (data) => set((state) => ({ experiment: { ...state.experiment, ...data } })),
    updateField: (field, value) => set((state) => ({
        experiment: { ...state.experiment, [field]: value }
    })),
    addStep: (step) => set((state) => ({
        experiment: { ...state.experiment, steps: [...state.experiment.steps, step] }
    })),
}))

export default useExperimentStore
