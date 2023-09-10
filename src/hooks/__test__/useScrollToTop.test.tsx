import { renderHook, act } from '@testing-library/react-hooks';
import useScrollToTop from '../useScrollToTop';

describe('useScrollToTop', () => {
  it('should scroll to top when selected changes', () => {
    const { result, rerender } = renderHook(
      props => useScrollToTop(props.selected),
      {
        initialProps: { selected: 'initialValue' }, // Replace with your initial selected value
      },
    );

    // Mock the scrollToOffset function
    const scrollToOffsetMock = jest.fn();
    (result.current.flatListRef.current as any) = {
      scrollToOffset: scrollToOffsetMock,
    };

    // Change the selected value
    rerender({ selected: 'newValue' });

    // Ensure that scrollToOffsetMock was called with the correct arguments
    expect(scrollToOffsetMock).toHaveBeenCalledWith({
      offset: 0,
      animated: true,
    });
  });
});
