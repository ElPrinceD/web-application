// Wrapper to provide AsyncStorage and other react-native exports for react-navigation
import * as ReactNativeWeb from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Try to import MaskedViewIOS if available (for react-navigation-stack)
let MaskedViewIOS = null;
try {
  // @react-native-community/masked-view provides MaskedViewIOS for web
  const MaskedView = require('@react-native-community/masked-view');
  MaskedViewIOS = MaskedView.default || MaskedView;
} catch (e) {
  // If not available, use View as a fallback (works for web)
  MaskedViewIOS = ReactNativeWeb.View;
}

// Export everything from react-native-web
export * from 'react-native-web';

// Export AsyncStorage specifically for react-navigation
export { AsyncStorage };

// Export MaskedViewIOS for react-navigation-stack
export { MaskedViewIOS };

// Also export as default for compatibility
export default {
  ...ReactNativeWeb,
  AsyncStorage,
  MaskedViewIOS,
};

