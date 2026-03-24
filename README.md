# nexus-mobile-kit

📱 Mobile-optimized React components with touch optimization, PWA detection, and responsive utilities.

## Features

- ✅ **Feature Detection**: Device type, touch, PWA capabilities
- ✅ **Mobile Components**: Drawer, BottomSheet, BottomNav
- ✅ **Touch Optimized**: SwipeableCard, TouchListItem, ButtonBar
- ✅ **Gestures**: Pull-to-refresh, swipe actions
- ✅ **Hooks**: useResponsive for device detection
- ✅ **Utilities**: Haptic feedback, responsive helpers

## Installation

```bash
npm install nexus-mobile-kit
# or
yarn add nexus-mobile-kit
```

## Usage

```javascript
import { 
  useResponsive, 
  MobileDrawer, 
  BottomSheet, 
  ButtonBar,
  detectFeatures 
} from 'nexus-mobile-kit';

// Detect device features
const features = useResponsive();
console.log(features.isMobile); // true/false
console.log(features.hasTouch); // true/false

// Mobile drawer
<MobileDrawer isOpen={true} onClose={handleClose}>
  Navigation content
</MobileDrawer>

// Bottom sheet (mobile modal)
<BottomSheet isOpen={true} title="Options">
  Content here
</BottomSheet>

// Touch-optimized button bar
<ButtonBar buttons={[
  { label: 'Cancel', onClick: handleCancel },
  { label: 'Confirm', onClick: handleConfirm, primary: true }
]} />
```

## License

MIT © Mattlk13
