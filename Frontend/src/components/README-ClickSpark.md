# ClickSpark Component

A reusable React component that adds beautiful spark animation effects when users click anywhere inside its area.

## Features

- ✨ **Click-triggered animations** - Sparks radiate from click position
- 🎨 **Fully customizable** - Colors, size, count, duration, and easing
- 🚀 **Performance optimized** - Uses requestAnimationFrame and automatic cleanup
- 📱 **Responsive** - Canvas automatically syncs with parent size using ResizeObserver
- 🎯 **TypeScript support** - Full type safety and IntelliSense
- 🧹 **Memory efficient** - Automatically removes expired sparks

## Installation

The component is already included in your project at `src/components/ClickSpark.tsx`.

## Basic Usage

```tsx
import ClickSpark from './components/ClickSpark';

function App() {
  return (
    <ClickSpark>
      <button className="px-4 py-2 bg-blue-500 text-white rounded">
        Click me for sparks!
      </button>
    </ClickSpark>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sparkColor` | `string` | `#fff` | Color of the spark lines |
| `sparkSize` | `number` | `10` | Length of each spark line |
| `sparkRadius` | `number` | `15` | Maximum distance sparks travel |
| `sparkCount` | `number` | `8` | Number of sparks created per click |
| `duration` | `number` | `400` | Animation duration in milliseconds |
| `easing` | `'linear' \| 'ease-in' \| 'ease-out' \| 'ease-in-out'` | `'ease-out'` | Animation easing function |
| `children` | `ReactNode` | **required** | Content to wrap with spark effects |
| `className` | `string` | `''` | Additional CSS classes |
| `style` | `CSSProperties` | `{}` | Additional inline styles |

## Examples

### Default Settings
```tsx
<ClickSpark>
  <div className="p-4 bg-gray-200 rounded">
    Click anywhere in this area
  </div>
</ClickSpark>
```

### Custom Neon Yellow Sparks
```tsx
<ClickSpark
  sparkColor="#fbbf24"
  sparkSize={12}
  sparkRadius={25}
  sparkCount={12}
  duration={600}
  easing="ease-out"
>
  <button className="px-6 py-3 bg-purple-600 text-white rounded">
    Bright Yellow Sparks!
  </button>
</ClickSpark>
```

### Button with Red Sparks
```tsx
<ClickSpark
  sparkColor="#ef4444"
  sparkSize={8}
  sparkRadius={20}
  sparkCount={6}
  duration={500}
  easing="ease-in-out"
>
  <button className="px-4 py-2 bg-red-500 text-white rounded">
    Red Sparks!
  </button>
</ClickSpark>
```

### Large Area with Many Sparks
```tsx
<ClickSpark
  sparkColor="#10b981"
  sparkSize={15}
  sparkRadius={30}
  sparkCount={16}
  duration={800}
  easing="ease-in"
>
  <div className="p-8 bg-green-500 text-white rounded text-center">
    <h3>Large Clickable Area</h3>
    <p>Click anywhere for green sparks!</p>
  </div>
</ClickSpark>
```

## Easing Functions

- **`linear`** - Constant speed animation
- **`ease-in`** - Slow start, fast end
- **`ease-out`** - Fast start, slow end (default)
- **`ease-in-out`** - Slow start and end, fast middle

## How It Works

1. **Click Detection**: Listens for click events on the wrapped element
2. **Spark Generation**: Creates multiple spark objects at the click position
3. **Animation Loop**: Uses requestAnimationFrame for smooth 60fps animation
4. **Canvas Rendering**: Draws spark lines on an overlaid canvas element
5. **Automatic Cleanup**: Removes expired sparks and stops animation when complete

## Technical Details

- **Canvas Positioning**: Absolutely positioned over children with `pointer-events: none`
- **Resize Handling**: Uses ResizeObserver to automatically sync canvas dimensions
- **Memory Management**: Automatically cleans up expired sparks and animation frames
- **Performance**: Only animates when there are active sparks

## Browser Support

- Modern browsers with ES6+ support
- Canvas API support required
- ResizeObserver support (polyfill available if needed)

## Demo

Check out `ClickSparkDemo.tsx` for interactive examples of all the different configurations and effects.

## Tips

- **Performance**: Higher spark counts and longer durations will use more CPU
- **Accessibility**: The canvas is non-interactive, so it won't interfere with screen readers
- **Responsive**: Works great with responsive layouts and dynamic content
- **Customization**: Experiment with different easing functions for unique effects

## Troubleshooting

- **Sparks not visible**: Check that the parent container has `position: relative`
- **Performance issues**: Reduce `sparkCount` or `duration` for better performance
- **Canvas sizing**: Ensure the parent element has defined dimensions
