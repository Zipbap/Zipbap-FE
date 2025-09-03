import { StyleSheet } from 'react-native';

export const defualtShadow = StyleSheet.create({
  shadowContainer: {
    // iOS
    shadowColor: '#504b43',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Android
    elevation: 8,
  },

  roundedContainer: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },

  shadowWithRounded: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#504b43',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Android
    elevation: 8,
  },
});
