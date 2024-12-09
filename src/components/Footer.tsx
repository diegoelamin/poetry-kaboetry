import React, { useState } from 'react';
import { Heart, Twitter, Facebook } from 'lucide-react';
import { icons } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { TermsModal } from './TermsModal';

const LinkedInIcon = icons.Linkedin;

export function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  
  const shareMessage = `Join me on Kaboetry - Where Poetry Explodes into Learning! 📚✨ #Kaboetry #LearningRevolution`;
  
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareMessage)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent('Kaboetry - Where Poetry Explodes into Learning')}&summary=${encodeURIComponent(shareMessage)}`
  };

  return (
    <footer className="mt-16 pb-8 px-4 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 space-y-4">
          <a
            href="https://ko-fi.com/diegoelamin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-coral dark:bg-sand text-white dark:text-ink rounded-full hover:bg-coral/90 dark:hover:bg-sand/90 transition-colors"
          >
            <Heart className="w-5 h-5 mr-2" />
            Support This Project
          </a>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href={shareUrls.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-sand dark:bg-ink text-coral dark:text-sand hover:bg-sand/80 dark:hover:bg-gray-800 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={shareUrls.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-sand dark:bg-ink text-coral dark:text-sand hover:bg-sand/80 dark:hover:bg-gray-800 transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={shareUrls.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-sand dark:bg-ink text-coral dark:text-sand hover:bg-sand/80 dark:hover:bg-gray-800 transition-colors"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>
            <a 
              href="https://www.diegoelamin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-coral dark:hover:text-sand transition-colors"
            >
              © {new Date().getFullYear()} Diego El-Amin Digital, LLC
            </a>
          </p>
          <div className="space-x-4">
            <a 
              onClick={() => setShowPrivacyPolicy(true)}
              className="hover:text-coral dark:hover:text-sand transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a 
              onClick={() => setShowTerms(true)}
              className="hover:text-coral dark:hover:text-sand transition-colors cursor-pointer"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
      
      {showPrivacyPolicy && (
        <PrivacyPolicyModal onClose={() => setShowPrivacyPolicy(false)} />
      )}
      
      {showTerms && (
        <TermsModal onClose={() => setShowTerms(false)} />
      )}
    </footer>
  );
}