import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CloudArrowUpIcon, 
  PlayIcon, 
  ChartBarIcon,
  CpuChipIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const TryNow: React.FC = () => {
  const [datasetFile, setDatasetFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);

  const handleDatasetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDatasetFile(file);
    }
  };

  const handleModelUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setModelFile(file);
    }
  };

  const handleEvaluate = async () => {
    if (!datasetFile || !modelFile) {
      alert('Please upload both dataset and model files');
      return;
    }

    setIsEvaluating(true);
    setShowReport(false);
    setEvaluationProgress(0);

    // Simulate evaluation progress
    const progressInterval = setInterval(() => {
      setEvaluationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsEvaluating(false);
          setShowReport(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const kpiData = {
    accuracy: 94.2,
    precision: 92.8,
    recall: 91.5,
    f1Score: 92.1,
    loss: 0.156,
    trainingTime: '2h 34m',
    modelSize: '45.2 MB',
    inferenceTime: '12.3ms'
  };

  const chartData = [
    { label: 'Training', accuracy: 85, loss: 0.8 },
    { label: 'Validation', accuracy: 88, loss: 0.6 },
    { label: 'Test', accuracy: 94, loss: 0.16 }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gradient mb-4">
            AI Model Evaluation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your dataset and model to get comprehensive evaluation metrics and performance insights
          </p>
        </motion.div>

        {!showReport ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Dataset Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="glass h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudArrowUpIcon className="h-6 w-6 text-primary" />
                    Upload Dataset
                  </CardTitle>
                  <CardDescription>
                    Upload your training dataset (CSV, JSON, or image files)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="dataset-upload"
                      className="hidden"
                      accept=".csv,.json,.png,.jpg,.jpeg"
                      onChange={handleDatasetUpload}
                    />
                    <label
                      htmlFor="dataset-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <CloudArrowUpIcon className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">
                          {datasetFile ? datasetFile.name : 'Click to upload dataset'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          CSV, JSON, or image files supported
                        </p>
                      </div>
                    </label>
                  </div>
                  {datasetFile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span className="font-medium">Dataset uploaded successfully</span>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Model Upload */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CpuChipIcon className="h-6 w-6 text-primary" />
                    Upload Model
                  </CardTitle>
                  <CardDescription>
                    Upload your trained model (.h5, .pkl, or .pth files)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="model-upload"
                      className="hidden"
                      accept=".h5,.pkl,.pth,.onnx"
                      onChange={handleModelUpload}
                    />
                    <label
                      htmlFor="model-upload"
                      className="cursor-pointer flex flex-col items-center gap-4"
                    >
                      <CpuChipIcon className="h-12 w-12 text-muted-foreground" />
                      <div>
                        <p className="text-lg font-medium">
                          {modelFile ? modelFile.name : 'Click to upload model'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          .h5, .pkl, .pth, or .onnx files supported
                        </p>
                      </div>
                    </label>
                  </div>
                  {modelFile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <CheckCircleIcon className="h-5 w-5" />
                        <span className="font-medium">Model uploaded successfully</span>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ) : null}

        {/* Evaluate Button */}
        {!showReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <Button
              onClick={handleEvaluate}
              disabled={!datasetFile || !modelFile || isEvaluating}
              size="lg"
              className="gradient-primary text-primary-foreground font-medium px-8 py-3 text-lg hover:scale-105 transition-transform duration-300"
            >
              {isEvaluating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary-foreground border-t-transparent" />
                  Evaluating...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <PlayIcon className="h-5 w-5" />
                  Evaluate Model
                </div>
              )}
            </Button>
          </motion.div>
        )}

        {/* Loading Animation */}
        {isEvaluating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card className="glass">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="mb-4">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Evaluating Your Model</h3>
                    <p className="text-muted-foreground">
                      Running comprehensive tests and generating performance metrics...
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{evaluationProgress}%</span>
                    </div>
                    <Progress value={evaluationProgress} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* AI Evaluation Report */}
        {showReport && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Report Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gradient mb-2">AI Evaluation Report</h2>
              <p className="text-muted-foreground">Comprehensive performance analysis of your deep learning model</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(kpiData).slice(0, 4).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="glass text-center">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {typeof value === 'number' ? `${value}%` : value}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(kpiData).slice(4).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 4) * 0.1 }}
                >
                  <Card className="glass text-center">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-primary mb-1">
                        {value}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Accuracy Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChartBarIcon className="h-5 w-5" />
                      Model Accuracy
                    </CardTitle>
                    <CardDescription>
                      Training vs Validation vs Test accuracy
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {chartData.map((data, index) => (
                        <div key={data.label} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{data.label}</span>
                            <span className="text-primary font-bold">{data.accuracy}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${data.accuracy}%` }}
                              transition={{ duration: 1, delay: 1 + index * 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Loss Chart */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ChartBarIcon className="h-5 w-5" />
                      Model Loss
                    </CardTitle>
                    <CardDescription>
                      Training vs Validation vs Test loss
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {chartData.map((data, index) => (
                        <div key={data.label} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{data.label}</span>
                            <span className="text-primary font-bold">{data.loss}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${(1 - data.loss) * 100}%` }}
                              transition={{ duration: 1, delay: 1.2 + index * 0.2 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Evaluation Summary</CardTitle>
                  <CardDescription>
                    Overall performance assessment of your model
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-800 dark:text-green-200">
                            Excellent Performance
                          </p>
                          <p className="text-sm text-green-600 dark:text-green-300">
                            Your model shows outstanding accuracy and generalization
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        High Quality
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold text-blue-800 dark:text-blue-200">Fast Inference</p>
                        <p className="text-sm text-blue-600 dark:text-blue-300">12.3ms per prediction</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <CpuChipIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <p className="font-semibold text-purple-800 dark:text-purple-200">Efficient Model</p>
                        <p className="text-sm text-purple-600 dark:text-purple-300">45.2 MB size</p>
                      </div>
                      <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <ChartBarIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                        <p className="font-semibold text-orange-800 dark:text-orange-200">High Accuracy</p>
                        <p className="text-sm text-orange-600 dark:text-orange-300">94.2% overall</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reset Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center"
            >
              <Button
                onClick={() => {
                  setShowReport(false);
                  setDatasetFile(null);
                  setModelFile(null);
                  setEvaluationProgress(0);
                }}
                variant="outline"
                size="lg"
                className="glass-button"
              >
                Evaluate Another Model
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TryNow;
