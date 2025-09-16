import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsDown, 
  Eye, 
  Calendar, 
  User,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Code
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  author: string;
  avatar?: string;
  content: string;
  type: 'error' | 'question' | 'discussion' | 'solved';
  tags: string[];
  likes: number;
  replies: number;
  views: number;
  createdAt: string;
  lastActivity: string;
}

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'Bootstrap confidence intervals giving inconsistent results',
    author: 'alex_ml',
    content: 'I\'m getting different CI values every time I run my evaluation pipeline. My bootstrap implementation seems correct but the results vary significantly. Has anyone faced this issue?',
    type: 'error',
    tags: ['bootstrap', 'confidence-intervals', 'statistics'],
    likes: 12,
    replies: 8,
    views: 234,
    createdAt: '2024-03-15',
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    title: 'ROC curves for multiclass classification - best practices?',
    author: 'data_scientist_pro',
    content: 'Working on the evaluation challenge and need guidance on plotting ROC curves for multiclass problems. Should I use one-vs-rest or one-vs-one approach for the hackathon requirements?',
    type: 'question',
    tags: ['roc-curves', 'multiclass', 'evaluation'],
    likes: 18,
    replies: 15,
    views: 456,
    createdAt: '2024-03-14',
    lastActivity: '5 hours ago'
  },
  {
    id: '3',
    title: 'Model calibration plot implementation - ECE calculation',
    author: 'ml_researcher',
    content: 'Successfully implemented calibration analysis! For those struggling with ECE (Expected Calibration Error), here\'s my approach using reliability diagrams.',
    type: 'solved',
    tags: ['calibration', 'ece', 'reliability-diagram'],
    likes: 25,
    replies: 12,
    views: 678,
    createdAt: '2024-03-13',
    lastActivity: '1 day ago'
  },
  {
    id: '4',
    title: 'Grad-CAM vs Integrated Gradients for explainability',
    author: 'vision_expert',
    content: 'Comparing attribution methods for the hackathon. Which method gives better results for computer vision tasks? Looking for experiences with both approaches.',
    type: 'discussion',
    tags: ['grad-cam', 'integrated-gradients', 'explainability'],
    likes: 9,
    replies: 6,
    views: 189,
    createdAt: '2024-03-12',
    lastActivity: '3 hours ago'
  },
  {
    id: '5',
    title: 'Keras model loading error - model.h5 compatibility issues',
    author: 'beginner_coder',
    content: 'Getting "ValueError: Unknown layer" when loading the provided model.h5 file. I\'m using TensorFlow 2.8. Anyone else encountered this?',
    type: 'error',
    tags: ['keras', 'model-loading', 'tensorflow'],
    likes: 7,
    replies: 4,
    views: 123,
    createdAt: '2024-03-11',
    lastActivity: '6 hours ago'
  },
  {
    id: '6',
    title: 'Robustness testing - Gaussian noise implementation',
    author: 'robust_ai',
    content: 'Share your implementations for robustness tests! Here\'s my approach for adding Gaussian noise and measuring performance degradation.',
    type: 'discussion',
    tags: ['robustness', 'gaussian-noise', 'corruption'],
    likes: 14,
    replies: 9,
    views: 345,
    createdAt: '2024-03-10',
    lastActivity: '4 hours ago'
  }
];

const typeIcons = {
  error: <AlertTriangle className="h-4 w-4 text-red-500" />,
  question: <HelpCircle className="h-4 w-4 text-blue-500" />,
  discussion: <MessageCircle className="h-4 w-4 text-purple-500" />,
  solved: <CheckCircle className="h-4 w-4 text-green-500" />
};

const typeColors = {
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
  question: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  discussion: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  solved: 'bg-green-500/10 text-green-500 border-green-500/20'
};

const Community = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  const filteredDiscussions = discussions.filter(discussion => 
    selectedFilter === 'all' || discussion.type === selectedFilter
  );

  const sortedDiscussions = [...filteredDiscussions].sort((a, b) => {
    if (sortBy === 'popular') return b.likes - a.likes;
    if (sortBy === 'replies') return b.replies - a.replies;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            ML Evaluation Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow researchers, share your challenges, and discuss ML model evaluation techniques
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">342</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">89</div>
              <div className="text-sm text-muted-foreground">Solved</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-500">156</div>
              <div className="text-sm text-muted-foreground">Active Today</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 justify-between items-center mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Posts' },
              { key: 'error', label: 'Errors' },
              { key: 'question', label: 'Questions' },
              { key: 'discussion', label: 'Discussions' },
              { key: 'solved', label: 'Solved' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter.key)}
                className="glass-button"
              >
                {filter.label}
              </Button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background/50 border border-border rounded-lg px-3 py-2 text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="replies">Most Replies</option>
          </select>
        </motion.div>

        {/* Discussion List */}
        <div className="space-y-4">
          <AnimatePresence>
            {sortedDiscussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card hover:glow-primary transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={discussion.avatar} />
                        <AvatarFallback>
                          {discussion.author.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {typeIcons[discussion.type]}
                          <Badge className={`${typeColors[discussion.type]} text-xs`}>
                            {discussion.type}
                          </Badge>
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {discussion.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {discussion.content}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {discussion.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {discussion.createdAt}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {discussion.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {discussion.views}
                            </span>
                            <span className="text-primary">
                              Last activity: {discussion.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="glass-card max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join the Discussion</h3>
              <p className="text-muted-foreground mb-6">
                Have a question about ML evaluation? Encountered an error in your pipeline? 
                Share your experience and help the community grow!
              </p>
              <Button className="gradient-primary text-primary-foreground font-medium">
                <Code className="h-4 w-4 mr-2" />
                Start New Discussion
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;