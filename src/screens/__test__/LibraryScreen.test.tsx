import React from 'react';
import LibraryScreen from '../LibraryScreen'; // Update the import path
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));

describe('LibraryScreen', () => {
  it('renders loading indicator initially', () => {
    render(<LibraryScreen />);
  });
});
