import { RenderResult, act, renderHook } from '@testing-library/react-hooks';
import useCart from '../useCart'; // Adjust the import path as needed
import { Work } from '../../interfaces/OpenLibraryInterface';
import { RenderHookResult } from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
  }),
}));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

const mockWork: Work = {
  key: '123',
  title: 'Sample Title',
  authors: [
    { key: '1', name: 'Author 1' },
    { key: '2', name: 'Author 2' },
  ],
  edition_count: 1,
  first_publish_year: 2021,
  cover_id: 0,
  cover_edition_key: '',
  subject: [],
  ia_collection: [],
  lendinglibrary: false,
  printdisabled: false,
  lending_edition: '',
  lending_identifier: '',
  ia: '',
  public_scan: false,
  has_fulltext: false,
  availability: {
    status: '',
    available_to_browse: false,
    available_to_borrow: false,
    available_to_waitlist: false,
    is_printdisabled: false,
    is_readable: false,
    is_lendable: false,
    is_previewable: false,
    identifier: '',
    openlibrary_work: '',
    openlibrary_edition: '',
    is_restricted: false,
    is_browseable: false,
    __src__: '',
  },
};

describe('useCart', () => {
  let hook: RenderHookResult<ReturnType<typeof useCart>, unknown>;

  beforeAll(() => {
    hook = renderHook(() => useCart());
  });

  it('should update the cart', () => {
    act(() => {
      hook.result.current.addToCart(mockWork);
      hook.result.current.addToCart(mockWork);
    });

    expect(hook.result.current.cart).toHaveLength(2);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.removeToCart(mockWork);
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('should reset the cart', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      hook.result.current.addToCart(mockWork);
      result.current.handleCheckout();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
