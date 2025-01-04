import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Plus, ChevronDown } from 'lucide-react';
import EmptySvg from './assets/empty.svg';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'Complete' | 'Incomplete'>('ALL');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    if (filter === 'Complete') return matchesSearch && todo.completed;
    if (filter === 'Incomplete') return matchesSearch && !todo.completed;
    return matchesSearch;
  });

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#1E1E1E]' : 'bg-white'}`}>
      <div className="max-w-lg mx-auto p-4">
        <h1 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          TODO LIST
        </h1>

        {/* Search and Filters */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-md border ${
                darkMode 
                  ? 'bg-[#2C2C2C] border-gray-600 text-white' 
                  : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <button
            onClick={() => setFilter(filter === 'ALL' ? 'Complete' : 'ALL')}
            className={`px-4 py-2 rounded-md border flex items-center ${
              darkMode 
                ? 'bg-[#2C2C2C] border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          >
            {filter}
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-md border ${
              darkMode 
                ? 'bg-[#2C2C2C] border-gray-600 text-white' 
                : 'bg-white border-gray-300'
            }`}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Todo List */}
        {filteredTodos.length === 0 ? (
          <div className="text-center py-10">
            <img 
              src={EmptySvg}
              alt="Empty state" 
              className="w-32 h-32 mx-auto mb-4"
            />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Empty...
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center gap-2 p-3 rounded border ${
                  darkMode 
                    ? 'bg-[#2C2C2C] border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => {
                    setTodos(todos.map(t =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className="w-4 h-4"
                />
                <span className={todo.completed ? 'line-through' : ''}>
                  {todo.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#7C5CFC] text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className={`w-full max-w-md p-6 rounded-lg ${
              darkMode ? 'bg-[#2C2C2C] text-white' : 'bg-white'
            }`}>
              <h2 className="text-lg font-semibold mb-4">NEW NOTE</h2>
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Input your note..."
                className={`w-full p-2 mb-4 rounded border ${
                  darkMode 
                    ? 'bg-[#1E1E1E] border-gray-600 text-white' 
                    : 'bg-white border-gray-300'
                }`}
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`px-4 py-2 rounded ${
                    darkMode 
                      ? 'bg-[#2C2C2C] text-white border border-gray-600' 
                      : 'bg-gray-100'
                  }`}
                >
                  CANCEL
                </button>
                <button
                  onClick={handleAddTodo}
                  className="px-4 py-2 bg-[#7C5CFC] text-white rounded"
                >
                  APPLY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;