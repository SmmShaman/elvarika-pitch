import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  RefreshCw, 
  Copy, 
  Download, 
  Palette,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface GradientColor {
  color: string;
  position: number;
}

interface GradientConfig {
  colors: GradientColor[];
  direction: number;
  type: 'linear' | 'radial';
  animationSpeed: number;
  animationDirection: 'forward' | 'reverse' | 'alternate';
}

const predefinedPalettes = [
  {
    name: "Elvarika Green",
    colors: ['#defff0', '#f0fff4', '#e6ffed']
  },
  {
    name: "Ocean Breeze",
    colors: ['#667eea', '#764ba2', '#f093fb']
  },
  {
    name: "Sunset Glow",
    colors: ['#ff7e5f', '#feb47b', '#ff6b6b']
  },
  {
    name: "Aurora Borealis",
    colors: ['#00c6ff', '#0072ff', '#74b9ff']
  },
  {
    name: "Forest Mist",
    colors: ['#134e5e', '#71b280', '#a8e6cf']
  },
  {
    name: "Purple Dream",
    colors: ['#667eea', '#764ba2', '#f093fb']
  },
  {
    name: "Golden Hour",
    colors: ['#f2994a', '#f2c94c', '#f9ca24']
  },
  {
    name: "Cool Blues",
    colors: ['#74b9ff', '#0984e3', '#00b894']
  }
];

export const DynamicGradientBackground: React.FC = () => {
  const [config, setConfig] = useState<GradientConfig>({
    colors: [
      { color: '#defff0', position: 0 },
      { color: '#f0fff4', position: 50 },
      { color: '#e6ffed', position: 100 }
    ],
    direction: 135,
    type: 'linear',
    animationSpeed: 3,
    animationDirection: 'alternate'
  });

  const [isAnimated, setIsAnimated] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Animation loop
  useEffect(() => {
    if (!isAnimated) return;

    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimated]);

  const generateRandomGradient = () => {
    const numColors = Math.floor(Math.random() * 3) + 2; // 2-4 colors
    const newColors: GradientColor[] = [];

    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 40) + 60; // 60-100%
      const lightness = Math.floor(Math.random() * 30) + 70;  // 70-100%
      
      newColors.push({
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        position: (100 / (numColors - 1)) * i
      });
    }

    setConfig(prev => ({
      ...prev,
      colors: newColors,
      direction: Math.floor(Math.random() * 360)
    }));
  };

  const applyPredefinedPalette = (palette: typeof predefinedPalettes[0]) => {
    const newColors = palette.colors.map((color, index) => ({
      color,
      position: (100 / (palette.colors.length - 1)) * index
    }));

    setConfig(prev => ({
      ...prev,
      colors: newColors
    }));
  };

  const updateColorPosition = (index: number, position: number) => {
    setConfig(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => 
        i === index ? { ...color, position } : color
      )
    }));
  };

  const updateColor = (index: number, newColor: string) => {
    setConfig(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => 
        i === index ? { ...color, color: newColor } : color
      )
    }));
  };

  const addColor = () => {
    if (config.colors.length >= 5) return;
    
    const newPosition = 50;
    const newColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;
    
    setConfig(prev => ({
      ...prev,
      colors: [...prev.colors, { color: newColor, position: newPosition }]
    }));
  };

  const removeColor = (index: number) => {
    if (config.colors.length <= 2) return;
    
    setConfig(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const generateGradientCSS = () => {
    const sortedColors = [...config.colors].sort((a, b) => a.position - b.position);
    const colorStops = sortedColors.map(color => `${color.color} ${color.position}%`).join(', ');
    
    if (config.type === 'radial') {
      return `radial-gradient(circle, ${colorStops})`;
    } else {
      const animatedDirection = config.direction + (isAnimated ? Math.sin(animationPhase * 0.1) * 10 : 0);
      return `linear-gradient(${animatedDirection}deg, ${colorStops})`;
    }
  };

  const copyCSS = () => {
    const css = `background: ${generateGradientCSS()};`;
    navigator.clipboard.writeText(css);
  };

  const exportGradient = () => {
    const gradientData = {
      ...config,
      css: generateGradientCSS(),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(gradientData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#022f36] mb-4">Dynamic Gradient Generator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Create beautiful animated gradients for backgrounds, headers, and UI elements. 
          Customize colors, directions, and animations to match your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="w-full h-64 rounded-lg border-2 border-gray-200 transition-all duration-300"
                style={{ 
                  background: generateGradientCSS(),
                  animation: isAnimated ? `gradientShift ${config.animationSpeed}s ease-in-out infinite ${config.animationDirection}` : 'none'
                }}
              >
                <div className="w-full h-full flex items-center justify-center bg-black/10 rounded-lg">
                  <div className="text-center text-white drop-shadow-lg">
                    <h3 className="text-2xl font-bold mb-2">Elvarika</h3>
                    <p className="text-sm opacity-90">Dynamic Background Preview</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsAnimated(!isAnimated)}
                    variant={isAnimated ? "default" : "outline"}
                  >
                    {isAnimated ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {isAnimated ? 'Pause' : 'Play'}
                  </Button>
                  <Button size="sm" onClick={generateRandomGradient} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Random
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={copyCSS} variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button size="sm" onClick={exportGradient} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Predefined Palettes */}
          <Card>
            <CardHeader>
              <CardTitle>Predefined Palettes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {predefinedPalettes.map((palette, index) => (
                  <button
                    key={index}
                    onClick={() => applyPredefinedPalette(palette)}
                    className="p-3 rounded-lg border-2 border-gray-200 hover:border-[#022f36] transition-all text-left"
                  >
                    <div 
                      className="w-full h-8 rounded mb-2"
                      style={{ 
                        background: `linear-gradient(90deg, ${palette.colors.join(', ')})` 
                      }}
                    ></div>
                    <div className="text-xs font-medium text-[#022f36]">{palette.name}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="space-y-4">
          {/* Gradient Type & Direction */}
          <Card>
            <CardHeader>
              <CardTitle>Gradient Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setConfig(prev => ({ ...prev, type: 'linear' }))}
                    variant={config.type === 'linear' ? "default" : "outline"}
                  >
                    Linear
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setConfig(prev => ({ ...prev, type: 'radial' }))}
                    variant={config.type === 'radial' ? "default" : "outline"}
                  >
                    Radial
                  </Button>
                </div>
              </div>

              {config.type === 'linear' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Direction: {config.direction}°
                  </label>
                  <Slider
                    value={[config.direction]}
                    onValueChange={([value]) => setConfig(prev => ({ ...prev, direction: value }))}
                    max={360}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Animation Speed: {config.animationSpeed}s
                </label>
                <Slider
                  value={[config.animationSpeed]}
                  onValueChange={([value]) => setConfig(prev => ({ ...prev, animationSpeed: value }))}
                  max={10}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Color Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Color Stops
                <Button size="sm" onClick={addColor} disabled={config.colors.length >= 5}>
                  + Add Color
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {config.colors.map((colorStop, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="color"
                      value={colorStop.color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">Position: {colorStop.position}%</span>
                        <Badge variant="outline" className="text-xs">
                          {colorStop.color}
                        </Badge>
                      </div>
                      <Slider
                        value={[colorStop.position]}
                        onValueChange={([value]) => updateColorPosition(index, value)}
                        max={100}
                        min={0}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    
                    {config.colors.length > 2 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeColor(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CSS Output */}
          <Card>
            <CardHeader>
              <CardTitle>Generated CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <code>
                  background: {generateGradientCSS()};
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  );
};