import React from 'react';
import ClickSpark from './ClickSpark';

const ClickSparkDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">ClickSpark Demo</h1>
      
      {/* Basic usage with default settings */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Default Settings</h2>
        <ClickSpark>
          <div className="p-6 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
            Click me for default spark effect!
          </div>
        </ClickSpark>
      </div>

      {/* Customized spark effect */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Neon Yellow Sparks</h2>
        <ClickSpark
          sparkColor="#fbbf24"
          sparkSize={12}
          sparkRadius={25}
          sparkCount={12}
          duration={600}
          easing="ease-out"
        >
          <div className="p-6 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors">
            Click for bright yellow sparks!
          </div>
        </ClickSpark>
      </div>

      {/* Button with spark effect */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button with Spark Effect</h2>
        <ClickSpark
          sparkColor="#ef4444"
          sparkSize={8}
          sparkRadius={20}
          sparkCount={6}
          duration={500}
          easing="ease-in-out"
        >
          <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium">
            Click Button for Red Sparks!
          </button>
        </ClickSpark>
      </div>

      {/* Large area with many sparks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Large Area with Many Sparks</h2>
        <ClickSpark
          sparkColor="#10b981"
          sparkSize={15}
          sparkRadius={30}
          sparkCount={16}
          duration={800}
          easing="ease-in"
        >
          <div className="p-8 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition-colors text-center">
            <h3 className="text-lg font-semibold mb-2">Large Clickable Area</h3>
            <p>Click anywhere in this large area for green sparks!</p>
          </div>
        </ClickSpark>
      </div>

      {/* Different easing examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Different Easing Effects</h2>
        <div className="grid grid-cols-2 gap-4">
          <ClickSpark
            sparkColor="#3b82f6"
            easing="linear"
            duration={600}
          >
            <div className="p-4 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors text-center">
              Linear Easing
            </div>
          </ClickSpark>
          
          <ClickSpark
            sparkColor="#8b5cf6"
            easing="ease-in"
            duration={600}
          >
            <div className="p-4 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-colors text-center">
              Ease-in
            </div>
          </ClickSpark>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">How to Use ClickSpark</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Basic Usage:</strong> Wrap any element with &lt;ClickSpark&gt; to add spark effects on click.</p>
          <p><strong>Customization:</strong> Use props to customize colors, size, count, duration, and easing.</p>
          <p><strong>Performance:</strong> Uses requestAnimationFrame and automatically cleans up expired sparks.</p>
          <p><strong>Responsive:</strong> Canvas automatically resizes with parent element using ResizeObserver.</p>
        </div>
      </div>
    </div>
  );
};

export default ClickSparkDemo;
