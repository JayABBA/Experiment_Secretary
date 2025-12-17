import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import DesignView from './views/DesignView'
import ProcessView from './views/ProcessView'
import ResultsView from './views/ResultsView'
import ChatInterface from './views/ChatInterface'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DesignView />} />
        <Route path="process" element={<ProcessView />} />
        <Route path="results" element={<ResultsView />} />
        <Route path="chat" element={<ChatInterface />} />
      </Route>
    </Routes>
  )
}

export default App
