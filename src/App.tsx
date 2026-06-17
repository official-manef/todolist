import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    if (saved) return JSON.parse(saved)
    return []
  })
  const [input, setInput] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input.trim(),
      completed: false,
      createdAt: Date.now()
    }

    setTodos([newTodo, ...todos])
    setInput('')
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-md mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ListTodo className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold tracking-tight">TugasKu</h1>
          </div>
          <p className="text-slate-500">Kelola tugas harian Anda dengan mudah</p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
          <form onSubmit={addTodo} className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Apa yang ingin dikerjakan?"
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white transition-all"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors shadow-lg shadow-indigo-200"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </form>

          <div className="p-2">
            <div className="px-4 py-2 flex justify-between items-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Tugas</span>
              <span>{completedCount} / {todos.length} Selesai</span>
            </div>

            <ul className="space-y-1">
              <AnimatePresence initial={false}>
                {todos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={cn(
                        "transition-colors",
                        todo.completed ? "text-emerald-500" : "text-slate-300 hover:text-slate-400"
                      )}
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    <span className={cn(
                      "flex-1 text-slate-700 transition-all",
                      todo.completed && "line-through text-slate-400"
                    )}>
                      {todo.text}
                    </span>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>

              {todos.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center text-slate-400"
                >
                  <p>Belum ada tugas. Tambahkan satu!</p>
                </motion.div>
              )}
            </ul>
          </div>
        </main>

        <footer className="mt-8 text-center text-slate-400 text-sm">
          Built with React & Tailwind CSS
        </footer>
      </div>
    </div>
  )
}

export default App
