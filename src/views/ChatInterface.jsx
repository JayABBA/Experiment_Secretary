import React, { useState, useRef, useEffect } from 'react'
import useExperimentStore from '../store/useExperimentStore'
import { Input, Button } from '../components/ui'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import clsx from 'clsx'

const ChatInterface = () => {
    const { experiment } = useExperimentStore()
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: "Hello! I'm your Experiment Assistant. I can help you analyze your experimental design and results. Ask me to 'analyze my experiment' when you're ready." }
    ])
    const [input, setInput] = useState('')
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const generateResponse = (userText) => {
        const text = userText.toLowerCase()

        if (text.includes('analyze') || text.includes('check') || text.includes('review') || text.includes('validate')) {
            const issues = []
            if (!experiment.title) issues.push("missing a title")
            if (!experiment.hypothesis) issues.push("missing a hypothesis")
            if (experiment.variables.length === 0) issues.push("no variables defined")
            if (experiment.materials.length === 0) issues.push("no materials listed")
            if (experiment.steps.length === 0) issues.push("no procedural steps logged")

            if (issues.length > 0) {
                return `I've reviewed your experiment and found a few missing items:
            
            ${issues.map(i => `• ${i}`).join('\n')}
            
            Please go back to the Design or Process tabs to complete your setup.`
            } else {
                return `Great job! Your experiment design appears complete.
            
            • Hypothesis: "${experiment.hypothesis}"
            • Variables: ${experiment.variables.length} defined (${experiment.variables.map(v => v.name).join(', ')})
            • Steps: ${experiment.steps.length} logged
            • Results: ${experiment.results.length} data points recorded
            
            Based on your ${experiment.results.length} results, do you observe a pattern that supports your hypothesis? (Note: Advanced statistical analysis requires an LLM API connection)`
            }
        }

        return "I am currently operating in offline mode with access to your experiment state. I can 'analyze' your experiment for completeness or consistency. Try asking me to 'check my experiment'."
    }

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg = { id: Date.now(), role: 'user', text: input }
        setMessages(prev => [...prev, userMsg])
        setInput('')

        setTimeout(() => {
            const responseText = generateResponse(userMsg.text)
            setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: responseText }])
        }, 600)
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col pb-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400">
                        Analysis Assistant
                    </h2>
                    <p className="text-slate-400">AI-powered checks for your experiment.</p>
                </div>
            </div>

            <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-6 overflow-y-auto space-y-4 shadow-inner">
                {messages.map((msg) => (
                    <div key={msg.id} className={clsx("flex gap-3", msg.role === 'user' ? "justify-end" : "justify-start")}>
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-1">
                                <Bot size={16} className="text-white" />
                            </div>
                        )}
                        <div className={clsx(
                            "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                            msg.role === 'user'
                                ? "bg-indigo-600 text-white rounded-br-none"
                                : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                        )}>
                            {msg.text}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0 mt-1">
                                <User size={16} className="text-slate-300" />
                            </div>
                        )}
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            <div className="flex gap-4">
                <Input
                    className="h-12 text-base"
                    placeholder="Ask a question or say 'analyze'..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} variant="primary" className="h-12 w-16">
                    <Send size={20} />
                </Button>
            </div>
        </div>
    )
}

export default ChatInterface
