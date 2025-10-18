# 🎨 Chef İlhamə - Animations Documentation

## Overview
The Chef İlhamə website features comprehensive and attractive animations powered by **Framer Motion** to create an engaging and delightful user experience.

## 🎭 Animation Components

### 1. Page Transitions
**File:** `src/components/animations/PageTransition.tsx`
- Smooth page transitions between routes
- Fade and scale animations with stagger effects
- Enhanced user navigation experience

### 2. Animated Homepage
**File:** `src/components/home/AnimatedHomepage.tsx`
- **Hero Section:** Floating background elements, rotating chef hat, glowing text effects
- **Stats Section:** Counter animations with staggered reveals
- **Featured Recipes:** Progressive loading with scroll-triggered animations
- **Categories:** Interactive hover effects with gradient backgrounds
- **Call-to-Action:** Pulsing text shadow and button animations

### 3. Recipe Cards
**File:** `src/components/recipe/AnimatedRecipeCard.tsx`
- **Image Hover:** Scale effects with gradient overlays
- **Content Animation:** Staggered content reveals
- **Interactive Elements:** Hover states for stats and badges
- **Badge Animations:** Rotating featured stars and floating difficulty badges

### 4. Recipe Grid
**File:** `src/components/recipe/RecipeGrid.tsx`
- **Grid Animation:** Staggered card loading
- **Empty State:** Animated "no recipes found" message
- **Index-based Delays:** Each card animates with proper timing

### 5. Navigation Header
**File:** `src/components/layout/Header.tsx`
- **Logo Animation:** Rotating chef hat with text glow effects
- **Menu Items:** Hover effects with underline animations
- **Mobile Menu:** Slide animations with staggered item reveals
- **Search Bar:** Focus animations and icon movements

### 6. Interactive Buttons
**File:** `src/components/animations/AnimatedButton.tsx`
- **5 Animation Types:**
  - `pulse`: Scale on hover/tap
  - `bounce`: Vertical movement
  - `shake`: Horizontal wiggle
  - `glow`: Box-shadow effects
  - `ripple`: Smooth scale transitions

### 7. Loading Animations
**File:** `src/components/animations/LoadingSpinner.tsx`
- **5 Spinner Types:**
  - `spinner`: Rotating circle
  - `dots`: Pulsing dots
  - `pulse`: Single pulsing circle
  - `bounce`: Bouncing dots
  - `wave`: Wave pattern
- **Customizable:** Size, color, and type options

### 8. Floating Elements
**File:** `src/components/animations/FloatingElement.tsx`
- **Direction Options:** up, down, left, right, diagonal
- **Preset Components:**
  - `FloatingChef`: Animated chef emoji
  - `FloatingFood`: Diagonal food plate movement
  - `FloatingSpice`: Horizontal spice animation

### 9. Page Layout Animations
**File:** `src/components/layout/PageLayout.tsx`
- **Header:** Slide down from top
- **Content:** Fade in with delay
- **Footer:** Slide up from bottom
- **Coordinated Timing:** Orchestrated entrance sequence

## 🎯 Animation Features

### Scroll-Triggered Animations
- **useInView Hook:** Elements animate when they enter viewport
- **Progressive Reveals:** Content appears as user scrolls
- **Performance Optimized:** Only animate visible elements

### Micro-Interactions
- **Hover States:** Subtle feedback on all interactive elements
- **Click Animations:** Satisfying tap feedback
- **Focus Indicators:** Clear accessibility animations

### Responsive Design
- **Mobile Optimized:** Touch-friendly animation timings
- **Reduced Motion:** Respects user accessibility preferences
- **Cross-Device:** Consistent experience across devices

### Performance Features
- **Hardware Acceleration:** GPU-optimized transforms
- **Efficient Animations:** Minimal reflow/repaint
- **Smart Loading:** Staggered animations prevent overwhelming

## 🎨 Animation Patterns

### 1. Entrance Animations
```typescript
// Fade in from bottom
initial={{ opacity: 0, y: 60 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

### 2. Hover Effects
```typescript
// Scale with spring physics
whileHover={{ scale: 1.05 }}
transition={{ type: "spring", stiffness: 400 }}
```

### 3. Stagger Animations
```typescript
// Staggered children
variants={staggerContainer}
transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
```

### 4. Continuous Animations
```typescript
// Infinite rotation
animate={{ rotate: 360 }}
transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
```

## 🔧 Configuration

### Global Animation Settings
- **Duration:** 0.3-0.6s for UI interactions
- **Easing:** easeOut for entrances, easeIn for exits
- **Delays:** 0.1s increments for staggered effects

### Accessibility
- **Reduced Motion:** Animations respect user preferences
- **Focus Management:** Clear visual focus indicators
- **Screen Reader Friendly:** Animations don't interfere with assistive tech

## 🚀 Performance Optimizations

1. **will-change:** Applied to animating elements
2. **transform:** Hardware-accelerated properties
3. **lazy Loading:** Animations only load when needed
4. **Memory Management:** Proper cleanup of animation listeners

## 🎭 Animation Showcase

### Homepage Experience
1. **Hero loads** with floating background elements
2. **Chef hat rotates** with sparkle effects
3. **Text animates** with staggered entrance
4. **Buttons pulse** with interactive feedback
5. **Stats counters** reveal with scroll trigger
6. **Recipe cards** load in sequence
7. **Categories** show gradient hover effects

### Navigation Experience
1. **Header slides** down on page load
2. **Logo elements** have subtle continuous animation
3. **Menu items** highlight with underline effects
4. **Mobile menu** expands with smooth transitions
5. **Search bar** responds to focus states

### Content Experience
1. **Recipe cards** animate on hover
2. **Images scale** with overlay effects
3. **Badges pulse** and rotate
4. **Content reveals** progressively
5. **Interactive elements** provide clear feedback

This animation system creates a cohesive, engaging experience that enhances the Azerbaijani culinary journey while maintaining excellent performance and accessibility standards.