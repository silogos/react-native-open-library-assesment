import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ModalCartComponent from '../ModalCartComponent';
import { Work } from '../../interfaces/OpenLibraryInterface';
import { Alert } from 'react-native';

const mockOnRequestClose = jest.fn();
const mockRemoveToCart = jest.fn();
const mockHandleCheckout = jest.fn();

const sampleCart: Work[] = [
  {
    key: '1',
    title: 'Sample Book 1',
    authors: [{ key: '1', name: 'Author 1' }],
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
  },
];

describe('ModalCartComponent', () => {
  it('should render the component with cart items and date picker', () => {
    const { getByText, getByTestId } = render(
      <ModalCartComponent
        visible={true}
        cart={sampleCart}
        onRequestClose={mockOnRequestClose}
        removeToCart={mockRemoveToCart}
        handleCheckout={mockHandleCheckout}
      />,
    );

    const closeButton = getByTestId('close');
    expect(closeButton).toBeTruthy();

    sampleCart.forEach(item => {
      const cartItem = getByText(item.title + ' - ' + item.authors[0].name);
      expect(cartItem).toBeTruthy();
    });

    const selectDateButton = getByText('Select date >');
    expect(selectDateButton).toBeTruthy();
  });

  it('should call onRequestClose when "X" button is pressed', () => {
    const { getByTestId } = render(
      <ModalCartComponent
        visible={true}
        cart={sampleCart}
        onRequestClose={mockOnRequestClose}
        removeToCart={mockRemoveToCart}
        handleCheckout={mockHandleCheckout}
      />,
    );

    const closeButton = getByTestId('close');
    fireEvent.press(closeButton);

    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
  });

  it('should call removeToCart when "Remove" button is pressed', () => {
    const { getAllByTestId } = render(
      <ModalCartComponent
        visible={true}
        cart={sampleCart}
        onRequestClose={mockOnRequestClose}
        removeToCart={mockRemoveToCart}
        handleCheckout={mockHandleCheckout}
      />,
    );

    const removeButtons = getAllByTestId('remove');
    removeButtons.forEach((removeButton, index) => {
      fireEvent.press(removeButton);
      expect(mockRemoveToCart).toHaveBeenCalledWith(sampleCart[index]);
    });
  });

  it('should call handleCheckout when "Check out" button is pressed with a selected date', () => {
    const { getByText, queryByTestId } = render(
      <ModalCartComponent
        visible={true}
        cart={sampleCart}
        onRequestClose={mockOnRequestClose}
        removeToCart={mockRemoveToCart}
        handleCheckout={mockHandleCheckout}
      />,
    );

    const someDate = new Date();
    const datePicker = queryByTestId('Date Picker');
    if (datePicker) {
      fireEvent(datePicker, 'onConfirm', someDate.getTime());
      const checkoutButton = getByText('Check out');
      fireEvent.press(checkoutButton);

      expect(mockHandleCheckout).toHaveBeenCalledTimes(1);
    }
  });

  it('should show an alert when "Check out" button is pressed without selecting a date', () => {
    const { getByText } = render(
      <ModalCartComponent
        visible={true}
        cart={sampleCart}
        onRequestClose={mockOnRequestClose}
        removeToCart={mockRemoveToCart}
        handleCheckout={mockHandleCheckout}
      />,
    );

    jest.spyOn(Alert, 'alert');
    const checkoutButton = getByText('Check out');
    fireEvent.press(checkoutButton);

    expect(Alert.alert).toHaveBeenCalledWith('Please select pickup date!');
  });
});
