import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, StarIcon } from '@heroicons/react/24/outline';

interface Sponsor {
  id: number;
  name: string;
  description: string;
  tier: 'platinum' | 'gold' | 'silver';
  logo: string;
  website: string;
}

const sponsors: Sponsor[] = [
  {
    id: 1,
    name: 'TechCorp Solutions',
    description: 'Leading provider of enterprise Python solutions and cloud infrastructure.',
    tier: 'platinum',
    logo: '🏢',
    website: 'https://techcorp.example.com'
  },
  {
    id: 2,
    name: 'DataVerse AI',
    description: 'Pioneering artificial intelligence and machine learning research company.',
    tier: 'platinum',
    logo: '🤖',
    website: 'https://dataverse.example.com'
  },
  {
    id: 3,
    name: 'CloudFlow Systems',
    description: 'Next-generation cloud computing and distributed systems solutions.',
    tier: 'gold',
    logo: '☁️',
    website: 'https://cloudflow.example.com'
  },
  {
    id: 4,
    name: 'CodeCraft Studio',
    description: 'Premium software development tools and IDE solutions for Python developers.',
    tier: 'gold',
    logo: '⚡',
    website: 'https://codecraft.example.com'
  },
  {
    id: 5,
    name: 'PyTech Labs',
    description: 'Open-source Python library maintainers and community supporters.',
    tier: 'silver',
    logo: '🐍',
    website: 'https://pytech.example.com'
  },
  {
    id: 6,
    name: 'DevTools Pro',
    description: 'Professional development tools and productivity software for teams.',
    tier: 'silver',
    logo: '🔧',
    website: 'https://devtools.example.com'
  }
];

const tierColors = {
  platinum: 'from-slate-400 to-slate-600',
  gold: 'from-yellow-400 to-yellow-600',
  silver: 'from-gray-300 to-gray-500'
};

const tierLabels = {
  platinum: 'Platinum Sponsor',
  gold: 'Gold Sponsor',
  silver: 'Silver Sponsor'
};

const Sponsors: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HeartIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl">❤️</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Our Amazing Sponsors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're grateful to the organizations that support our mission to make Python documentation 
            accessible and beautiful. Their contributions help us maintain and improve PyLibHub for the entire community.
          </p>
        </motion.div>

        {/* Sponsor Tiers */}
        <div className="max-w-6xl mx-auto">
          
          {/* Platinum Sponsors */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <StarIcon className="h-6 w-6 text-yellow-400" />
              Platinum Sponsors
              <StarIcon className="h-6 w-6 text-yellow-400" />
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sponsors.filter(s => s.tier === 'platinum').map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass-card hover:glow-primary transition-all duration-300 group cursor-pointer"
                  onClick={() => window.open(sponsor.website, '_blank')}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl p-3 flex items-center justify-center">
                      {sponsor.logo}
                    </div>
                    <div className="flex-1">
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 bg-gradient-to-r ${tierColors[sponsor.tier]} text-white`}>
                        {tierLabels[sponsor.tier]}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Gold Sponsors */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-xl font-bold text-center mb-8">Gold Sponsors</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {sponsors.filter(s => s.tier === 'gold').map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass-card hover:glow-secondary transition-all duration-300 group cursor-pointer"
                  onClick={() => window.open(sponsor.website, '_blank')}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-2 flex items-center justify-center">
                      {sponsor.logo}
                    </div>
                    <div className="flex-1">
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 bg-gradient-to-r ${tierColors[sponsor.tier]} text-white`}>
                        {tierLabels[sponsor.tier]}
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
                        {sponsor.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {sponsor.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Silver Sponsors */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-xl font-bold text-center mb-8">Silver Sponsors</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sponsors.filter(s => s.tier === 'silver').map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="glass-card hover:glow-accent transition-all duration-300 group cursor-pointer"
                  onClick={() => window.open(sponsor.website, '_blank')}
                >
                  <div className="text-center">
                    <div className="text-2xl bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg p-2 inline-flex items-center justify-center mb-3">
                      {sponsor.logo}
                    </div>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 bg-gradient-to-r ${tierColors[sponsor.tier]} text-white`}>
                      {tierLabels[sponsor.tier]}
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-accent transition-colors">
                      {sponsor.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {sponsor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="glass-card max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gradient mb-4">
              Become a Sponsor
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Support the Python community and get your organization featured here. 
              Sponsorship helps us maintain our documentation platform and develop new features.
            </p>
            <motion.a
              href="mailto:sponsors@pylibhub.dev"
              className="inline-block gradient-primary text-primary-foreground px-8 py-3 rounded-xl font-medium glass-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📧 Contact Us About Sponsorship
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sponsors;