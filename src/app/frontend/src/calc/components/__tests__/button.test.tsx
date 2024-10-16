import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '../Button'; // Adjust path as necessary

describe('Button Component', () => {
  it('should render the button with the correct text', () => {
    const { getByText } = render(<Button text="Press me" onPress={() => {}} />);
    expect(getByText('Press me')).toBeTruthy();
  });

  it('should call onPress when clicked', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button text="Press me" onPress={onPress} />);
    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalled();
  });
});

