import { useRef, useEffect } from 'react';

function useScrollToTop(selected: string) {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [flatListRef, selected]);

  return { flatListRef };
}

export default useScrollToTop;
