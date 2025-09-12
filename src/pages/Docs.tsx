import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ChartBarIcon, 
  BeakerIcon, 
  CpuChipIcon, 
  GlobeAltIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import DocItem from '@/components/DocItem';

interface ModelInfo {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  code: string;
  packageName: string;
  fileName: string;
}

const models: ModelInfo[] = [
  {
    id: 'regression',
    name: 'Regression Model',
    icon: <ChartBarIcon className="h-5 w-5" />,
    description: 'Build powerful regression models for predicting continuous values. This package includes linear regression, polynomial regression, and advanced regularization techniques with scikit-learn.',
    code: `# Regression Model Implementation
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd

class RegressionModel:
    def __init__(self, regularization=None):
        self.regularization = regularization
        self.model = LinearRegression()
        self.scaler = StandardScaler()
        
    def fit(self, X, y):
        """Train the regression model"""
        # Scale features for better performance
        X_scaled = self.scaler.fit_transform(X)
        
        # Train the model
        self.model.fit(X_scaled, y)
        return self
    
    def predict(self, X):
        """Make predictions on new data"""
        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)
    
    def score(self, X, y):
        """Calculate R² score"""
        X_scaled = self.scaler.transform(X)
        return self.model.score(X_scaled, y)

# Example usage
# Load your data
# X, y = load_your_data()

# Initialize and train model
regression = RegressionModel()
# regression.fit(X_train, y_train)

# Make predictions
# predictions = regression.predict(X_test)
print("Regression model ready for training!")`,
    packageName: 'Regression Tools',
    fileName: 'regression_tools-1.0.0-py3-none-any.whl'
  },
  {
    id: 'classification',
    name: 'Classification Model',
    icon: <BeakerIcon className="h-5 w-5" />,
    description: 'Implement robust classification algorithms for categorical prediction tasks. Includes support for binary and multi-class classification with feature selection and model evaluation.',
    code: `# Classification Model Implementation
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix
import numpy as np
import pandas as pd

class ClassificationModel:
    def __init__(self, n_estimators=100, random_state=42):
        self.model = RandomForestClassifier(
            n_estimators=n_estimators, 
            random_state=random_state
        )
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
        
    def fit(self, X, y):
        """Train the classification model"""
        # Scale features
        X_scaled = self.scaler.fit_transform(X)
        
        # Encode labels if they're strings
        if y.dtype == 'object':
            y_encoded = self.label_encoder.fit_transform(y)
        else:
            y_encoded = y
            
        # Train the model
        self.model.fit(X_scaled, y_encoded)
        return self
    
    def predict(self, X):
        """Make predictions"""
        X_scaled = self.scaler.transform(X)
        predictions = self.model.predict(X_scaled)
        
        # Decode predictions if labels were encoded
        if hasattr(self.label_encoder, 'classes_'):
            return self.label_encoder.inverse_transform(predictions)
        return predictions
    
    def predict_proba(self, X):
        """Get prediction probabilities"""
        X_scaled = self.scaler.transform(X)
        return self.model.predict_proba(X_scaled)

# Example usage
classifier = ClassificationModel()
# classifier.fit(X_train, y_train)
# predictions = classifier.predict(X_test)
print("Classification model initialized!")`,
    packageName: 'Classification Suite',
    fileName: 'classification_suite-1.2.1-py3-none-any.whl'
  },
  {
    id: 'neural-networks',
    name: 'Neural Networks',
    icon: <CpuChipIcon className="h-5 w-5" />,
    description: 'Deep learning made simple with TensorFlow and Keras. Build neural networks for complex pattern recognition, with support for CNNs, RNNs, and custom architectures.',
    code: `# Neural Network Implementation
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

class NeuralNetworkModel:
    def __init__(self, input_shape, num_classes=1):
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = None
        
    def build_model(self, hidden_layers=[128, 64, 32]):
        """Build a customizable neural network"""
        model = keras.Sequential()
        
        # Input layer
        model.add(layers.Dense(
            hidden_layers[0], 
            activation='relu', 
            input_shape=self.input_shape
        ))
        model.add(layers.Dropout(0.3))
        
        # Hidden layers
        for units in hidden_layers[1:]:
            model.add(layers.Dense(units, activation='relu'))
            model.add(layers.Dropout(0.3))
        
        # Output layer
        if self.num_classes == 1:
            # Regression or binary classification
            model.add(layers.Dense(1, activation='sigmoid'))
            model.compile(
                optimizer='adam',
                loss='binary_crossentropy',
                metrics=['accuracy']
            )
        else:
            # Multi-class classification
            model.add(layers.Dense(self.num_classes, activation='softmax'))
            model.compile(
                optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy']
            )
        
        self.model = model
        return self
    
    def train(self, X_train, y_train, epochs=100, validation_split=0.2):
        """Train the neural network"""
        if self.model is None:
            self.build_model()
            
        history = self.model.fit(
            X_train, y_train,
            epochs=epochs,
            validation_split=validation_split,
            verbose=1
        )
        return history
    
    def predict(self, X):
        """Make predictions"""
        return self.model.predict(X)

# Example usage
# nn = NeuralNetworkModel(input_shape=(784,), num_classes=10)
# nn.build_model([512, 256, 128])
# history = nn.train(X_train, y_train, epochs=50)
print("Neural network framework ready!")`,
    packageName: 'Deep Learning Kit',
    fileName: 'deep_learning_kit-2.0.0-py3-none-any.whl'
  },
  {
    id: 'web-scraping',
    name: 'Web Scraping',
    icon: <GlobeAltIcon className="h-5 w-5" />,
    description: 'Efficient web scraping tools with Beautiful Soup, Selenium, and requests. Extract data from websites with built-in rate limiting, proxy support, and data cleaning utilities.',
    code: `# Web Scraping Toolkit
import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
from urllib.parse import urljoin, urlparse
import random

class WebScraper:
    def __init__(self, delay_range=(1, 3), timeout=10):
        self.session = requests.Session()
        self.delay_range = delay_range
        self.timeout = timeout
        
        # Set user agent to avoid blocking
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def get_page(self, url, **kwargs):
        """Fetch a webpage with error handling"""
        try:
            # Random delay to be respectful
            time.sleep(random.uniform(*self.delay_range))
            
            response = self.session.get(
                url, 
                timeout=self.timeout,
                **kwargs
            )
            response.raise_for_status()
            return response
            
        except requests.RequestException as e:
            print(f"Error fetching {url}: {e}")
            return None
    
    def parse_html(self, response):
        """Parse HTML content with BeautifulSoup"""
        if response and response.content:
            return BeautifulSoup(response.content, 'html.parser')
        return None
    
    def extract_links(self, soup, base_url):
        """Extract all links from a page"""
        links = []
        if soup:
            for link in soup.find_all('a', href=True):
                absolute_url = urljoin(base_url, link['href'])
                links.append({
                    'url': absolute_url,
                    'text': link.get_text(strip=True),
                    'title': link.get('title', '')
                })
        return links
    
    def scrape_data(self, url, selectors):
        """Scrape specific data using CSS selectors"""
        response = self.get_page(url)
        soup = self.parse_html(response)
        
        data = {}
        if soup:
            for key, selector in selectors.items():
                elements = soup.select(selector)
                data[key] = [elem.get_text(strip=True) for elem in elements]
        
        return data

# Example usage
scraper = WebScraper(delay_range=(1, 2))

# Define what to scrape
selectors = {
    'titles': 'h2.title',
    'prices': '.price',
    'descriptions': '.description'
}

# Scrape data from a page
# data = scraper.scrape_data('https://example.com', selectors)
# df = pd.DataFrame(data)

print("Web scraping toolkit initialized!")`,
    packageName: 'Web Scraper Pro',
    fileName: 'web_scraper_pro-1.5.0-py3-none-any.whl'
  }
];

const Docs: React.FC = () => {
  const [activeModel, setActiveModel] = useState<string>('regression');
  const location = useLocation();
  const navigate = useNavigate();

  // Handle URL hash navigation
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove the #
    if (hash && models.some(model => model.id === hash)) {
      setActiveModel(hash);
    }
  }, [location.hash]);

  // Update URL when model changes
  const handleModelSelect = (modelId: string) => {
    setActiveModel(modelId);
    navigate(`/docs#${modelId}`, { replace: true });
  };

  const currentModel = models.find(model => model.id === activeModel) || models[0];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Navigation */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <div className="glass-card">
                <div className="flex items-center gap-2 mb-6">
                  <DocumentTextIcon className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">Documentation</h2>
                </div>
                
                <nav className="space-y-2">
                  {models.map((model) => (
                    <motion.button
                      key={model.id}
                      onClick={() => handleModelSelect(model.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 ${
                        activeModel === model.id
                          ? 'gradient-primary text-primary-foreground shadow-glow-primary'
                          : 'glass hover:bg-glass-light/30'
                      }`}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={activeModel === model.id ? 'text-primary-foreground' : 'text-primary'}>
                        {model.icon}
                      </span>
                      <span className="font-medium">{model.name}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <DocItem
                  title={currentModel.name}
                  description={currentModel.description}
                  code={currentModel.code}
                  packageName={currentModel.packageName}
                  fileName={currentModel.fileName}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;