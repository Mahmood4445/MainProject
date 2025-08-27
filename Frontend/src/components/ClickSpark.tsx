import React, { useRef, useEffect, useCallback, ReactNode } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  children,
  className = '',
  style = {}
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number>();
  const isAnimatingRef = useRef(false);

  // Easing functions
  const getEasingValue = useCallback((t: number): number => {
    switch (easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      case 'ease-out':
      default:
        return t * (2 - t);
    }
  }, [easing]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let resizeTimeout: NodeJS.Timeout;

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 100);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);

    resizeCanvas();

    return () => {
      resizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Animation loop
  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;
    
    isAnimatingRef.current = true;
    
    const animate = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw sparks
      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        
        if (elapsed >= duration) {
          return false; // Remove expired sparks
        }

        const progress = elapsed / duration;
        const easedProgress = getEasingValue(progress);

        // Calculate spark position
        const distance = easedProgress * sparkRadius;
        const lineLength = sparkSize * (1 - easedProgress);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Draw spark line
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 1 - easedProgress; // Fade out effect
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true; // Keep this spark
      });

      // Continue animation if there are active sparks
      if (sparksRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // No more sparks, stop animation
        isAnimatingRef.current = false;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [sparkColor, sparkSize, sparkRadius, duration, getEasingValue]);

  // Handle click events
  const handleClick = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = performance.now();
    
    // Create new sparks
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }));

    // Add new sparks to the array
    sparksRef.current.push(...newSparks);

    // Start animation
    startAnimation();
  }, [sparkCount, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={className}
      style={{ position: 'relative', ...style }}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
};

export default ClickSpark;
