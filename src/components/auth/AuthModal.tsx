import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-4"
      >
        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-100">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-sand/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-coral/20 dark:focus:ring-sand/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-sand/30 dark:border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-coral/20 dark:focus:ring-sand/20"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-coral dark:text-sand hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
}