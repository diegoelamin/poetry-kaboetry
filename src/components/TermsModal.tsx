import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface TermsModalProps {
  onClose: () => void;
}

export function TermsModal({ onClose }: TermsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <GlassCard>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-100">
              Terms & Conditions
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-left">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using Kaboetry, you accept and agree to be bound by these
              Terms and Conditions and our Privacy Policy.
            </p>

            <h3>2. User Accounts</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities under your account.
            </p>

            <h3>3. Intellectual Property</h3>
            <p>
              All content on Kaboetry, including but not limited to poems, explanations,
              and educational materials, is protected by copyright and other intellectual
              property rights.
            </p>

            <h3>4. Acceptable Use</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Share account credentials with others</li>
              <li>Copy or distribute content without permission</li>
            </ul>

            <h3>5. Modifications to Service</h3>
            <p>
              We reserve the right to modify or discontinue any part of our service
              at any time without notice.
            </p>

            <h3>6. Limitation of Liability</h3>
            <p>
              Kaboetry is provided "as is" without warranties of any kind, either
              express or implied.
            </p>

            <h3>7. Contact Information</h3>
            <p>
              For any questions regarding these terms, please contact us at{' '}
              <a href="mailto:hello@diegoelamin.com">hello@diegoelamin.com</a>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}