import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartItemComponent from '../CartItemComponent';
import { Work } from '../../interfaces/OpenLibraryInterface';

const mockOnRemove = jest.fn();

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

describe('CartItemComponent', () => {
  it('should render the component with the correct item data', () => {
    const { getByText, getByTestId } = render(
      <CartItemComponent item={mockWork} onRemove={mockOnRemove} />,
    );

    const titleElement = getByText(
      mockWork.title + ' - ' + mockWork.authors[0].name,
    );
    expect(titleElement).toBeTruthy();

    const removeButton = getByTestId('remove');
    expect(removeButton).toBeTruthy();
  });

  it('should call the onRemove function when Remove button is pressed', () => {
    const { getByTestId } = render(
      <CartItemComponent item={mockWork} onRemove={mockOnRemove} />,
    );

    const removeButton = getByTestId('remove');
    fireEvent.press(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith(mockWork);
  });
});
