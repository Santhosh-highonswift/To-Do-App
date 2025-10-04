'use client';

import { motion } from 'framer-motion';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';

interface Todo {
  id: string;
  task: string;
  is_completed: boolean;
  created_at: string;
}

interface DashboardClientProps {
  initialTodos: Todo[];
  userEmail: string | undefined;
  handleSignOut: () => void;
}

export default function DashboardClient({ initialTodos, userEmail, handleSignOut }: DashboardClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto py-10 px-4">
          {/* Header */}
          <motion.div
            className="flex justify-between items-center mb-12 bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <span className="text-white text-xl font-bold">✓</span>
              </motion.div>
              
              <div>
                <motion.h1 
                  className="text-2xl font-bold text-gray-800 tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  My Todo List
                </motion.h1>
                <motion.p 
                  className="text-gray-600 mt-1 flex items-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>Welcome back,</span>
                  <span className="font-semibold text-blue-600">
                    {userEmail}
                  </span>
                </motion.p>
              </div>
            </div>

            <motion.form 
              action={handleSignOut}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                type="submit"
                className="group relative bg-gray-600 text-white px-2 py-2 rounded-lg font-small shadow-md hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                }}
              >
                <span className="flex items-center space-x-2">
                  <span>Sign Out</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Add Todo Section */}
          <motion.div
            className="mb-12"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
            }}
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-black ">
              <AddTodo />
            </div>
          </motion.div>

          {/* Todo List Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.6,
            }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <motion.h2 
                  className="text-white font-bold text-lg flex items-center space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <span>Your Tasks</span>
                </motion.h2>
              </div>
              <div className="p-1">
                <TodoList initialTodos={initialTodos} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}