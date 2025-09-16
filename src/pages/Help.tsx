import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, BookOpenIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  links?: { text: string; href: string }[];
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How do I set up the ML evaluation pipeline?",
    answer: "Start by installing the required packages and dependencies. The evaluation pipeline follows a specific order: environment snapshot, data preparation, model loading, preprocessing, inference, and comprehensive analysis. Check our documentation for the complete setup guide.",
    links: [
      { text: "Setup Guide", href: "/docs" },
      { text: "Documentation", href: "/docs" }
    ]
  },
  {
    id: 2,
    question: "What metrics are included in the evaluation report?",
    answer: "Our evaluation library generates comprehensive reports including primary metrics (accuracy, precision, recall), confusion matrices, ROC/PR curves, bootstrap confidence intervals, calibration analysis, robustness tests, and explainability visualizations.",
    links: [
      { text: "Metrics Documentation", href: "/docs" }
    ]
  },
  {
    id: 3,
    question: "How do I implement bootstrap confidence intervals?",
    answer: "The library includes built-in bootstrap functionality for computing 95% confidence intervals on your primary metrics. You can specify the number of bootstrap samples and random seed for reproducible results.",
    links: [
      { text: "Bootstrap Guide", href: "/docs" },
      { text: "Community Examples", href: "/community" }
    ]
  },
  {
    id: 4,
    question: "What robustness tests are supported?",
    answer: "The evaluation suite includes tests for Gaussian noise, Gaussian blur, JPEG compression, and occlusion (random box). Each test can be applied at multiple severity levels to measure performance degradation.",
    links: [
      { text: "Robustness Testing", href: "/docs" }
    ]
  },
  {
    id: 5,
    question: "How do I generate explainability visualizations?",
    answer: "The library supports multiple attribution methods including Grad-CAM and Integrated Gradients. You can generate attribution maps and compute overlap coefficients with ground-truth masks if available.",
    links: [
      { text: "Explainability Guide", href: "/docs" },
      { text: "Community Discussions", href: "/community" }
    ]
  },
  {
    id: 6,
    question: "Can I get help with implementation issues?",
    answer: "Yes! Join our community forum where researchers share solutions, discuss challenges, and help each other with implementation issues. You can also check our comprehensive documentation and code examples.",
    links: [
      { text: "Community Forum", href: "/community" },
      { text: "Documentation", href: "/docs" }
    ]
  }
];

const Help: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            ML Evaluation Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about ML model evaluation, implementation guidance, and troubleshooting tips.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Collapsible 
                open={openItems.includes(faq.id)}
                onOpenChange={() => toggleItem(faq.id)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="glass-card hover:glow-primary transition-all duration-300 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-left flex-1">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDownIcon className="h-5 w-5 text-muted-foreground ml-4" />
                      </motion.div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 ml-4"
                  >
                    <div className="glass border-l-2 border-primary/30 pl-6 py-4">
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {faq.answer}
                      </p>
                      
                      {faq.links && (
                        <div className="flex flex-wrap gap-2">
                          {faq.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              to={link.href}
                              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light transition-colors duration-200"
                            >
                              <BookOpenIcon className="h-4 w-4" />
                              {link.text}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.div 
            className="glass-card max-w-2xl mx-auto hover:glow-accent transition-all duration-500 cursor-pointer"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gradient mb-4">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Join our community forum to connect with other researchers and get personalized help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community"
                className="inline-flex items-center gap-2 glass-button gradient-primary text-primary-foreground font-medium"
              >
                <CodeBracketIcon className="h-5 w-5" />
                Join Community
              </Link>
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 glass-button"
              >
                <BookOpenIcon className="h-5 w-5" />
                View Documentation
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;