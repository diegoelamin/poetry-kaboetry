import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

export function PrivacyPolicyModal({ onClose }: PrivacyPolicyModalProps) {
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
              Privacy Policy
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-coral dark:hover:text-sand transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="prose dark:prose-invert max-w-none text-left">
            <h3>1. Information We Collect</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Account information (email, password)</li>
              <li>Learning progress and quiz results</li>
              <li>Usage data and interactions with our service</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide and improve our educational services</li>
              <li>Track your learning progress</li>
              <li>Personalize your learning experience</li>
              <li>Send important updates about our service</li>
            </ul>

            <h3>3. Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h3>4. Third-Party Services</h3>
            <p>
              We use third-party services for various aspects of our platform. These services
              have their own privacy policies and may collect information as specified in their
              respective privacy policies.
            </p>

            <h3>5. Updates to Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page.
            </p>

            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:hello@diegoelamin.com">hello@diegoelamin.com</a>
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}