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
    question: "How do I get started with Python machine learning libraries?",
    answer: "Begin with our comprehensive documentation for popular ML libraries like scikit-learn, TensorFlow, and PyTorch. Start with our Regression Model guide for a solid foundation in predictive modeling.",
    links: [
      { text: "View Regression Model Documentation", href: "/docs#regression" },
      { text: "Explore All ML Models", href: "/docs" }
    ]
  },
  {
    id: 2,
    question: "What's included in the downloadable packages?",
    answer: "Each package includes pre-configured libraries, sample datasets, example notebooks, and comprehensive documentation. All packages are tested and ready for immediate use in your projects.",
  },
  {
    id: 3,
    question: "How do I install and use the downloaded packages?",
    answer: "After downloading, extract the package and follow the included README. Most packages can be installed with 'pip install package-name.whl' and include getting started examples in the docs folder.",
    links: [
      { text: "View Installation Guide", href: "/docs" }
    ]
  },
  {
    id: 4,
    question: "Can I contribute to the documentation?",
    answer: "Yes! We welcome contributions from the community. You can suggest improvements, report issues, or submit new documentation through our GitHub repository. Check our contribution guidelines for details.",
  },
  {
    id: 5,
    question: "Are there any prerequisites for using these libraries?",
    answer: "Basic Python knowledge is recommended. Some advanced machine learning models may require understanding of statistics and linear algebra. Each documentation page lists specific prerequisites and recommended background knowledge.",
    links: [
      { text: "Python Basics Guide", href: "/docs" },
      { text: "Classification Models", href: "/docs#classification" }
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
            How can we help?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about using our Python library documentation platform.
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
              Explore our comprehensive documentation or start with our most popular guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/docs"
                className="inline-flex items-center gap-2 glass-button gradient-primary text-primary-foreground font-medium"
              >
                <CodeBracketIcon className="h-5 w-5" />
                Browse Documentation
              </Link>
              <Link
                to="/docs#regression"
                className="inline-flex items-center gap-2 glass-button"
              >
                <BookOpenIcon className="h-5 w-5" />
                Regression Models Guide
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;