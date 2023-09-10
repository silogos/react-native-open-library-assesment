import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BookComponent from '../BookComponent';
import { Work } from '../../interfaces/OpenLibraryInterface';

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
  availability: undefined,
};

describe('BookComponent', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <BookComponent
        work={mockWork}
        isAdded={false}
        onAddToCart={() => {}}
        onRemoveToCart={() => {}}
      />,
    );

    const titleText = getByText('Sample Title');
    expect(titleText).toBeTruthy();

    const authorText = getByText('Author:\nAuthor 1, Author 2');
    expect(authorText).toBeTruthy();

    const editionText = getByText('Edition: 1');
    expect(editionText).toBeTruthy();

    const yearText = getByText('Publication Year: 2021');
    expect(yearText).toBeTruthy();

    const addButton = getByText('Add to cart');
    expect(addButton).toBeTruthy();
  });

  it('calls the "onAddToCart" function when "Add to cart" button is pressed', () => {
    const onAddToCartMock = jest.fn();
    const { getByText } = render(
      <BookComponent
        work={mockWork}
        isAdded={false}
        onAddToCart={onAddToCartMock}
        onRemoveToCart={() => {}}
      />,
    );

    const addButton = getByText('Add to cart');
    fireEvent.press(addButton);

    expect(onAddToCartMock).toHaveBeenCalledWith(mockWork);
  });

  it('calls the "onRemoveToCart" function when "Remove from cart" button is pressed', () => {
    const onRemoveToCartMock = jest.fn();
    const { getByText } = render(
      <BookComponent
        work={mockWork}
        isAdded={true}
        onAddToCart={() => {}}
        onRemoveToCart={onRemoveToCartMock}
      />,
    );

    const removeButton = getByText('Remove from cart');
    fireEvent.press(removeButton);

    expect(onRemoveToCartMock).toHaveBeenCalledWith(mockWork);
  });
});
