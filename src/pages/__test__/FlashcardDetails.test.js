import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FlashcardDetails from '../FlashCardDetails';

jest.mock('jspdf', () => ({
  jsPDF: {
    ...jest.requireActual('jspdf').jsPDF,
    fromHTML: jest.fn(),
    save: jest.fn(),
  },
}));

// Mock data for testing
const mockCardDetail = {
  groupTitle: 'Sample Group',
  groupDescription: 'Sample Description',
  cardItems: [
    { term: 'Term 1', image: 'image1-url', definition: 'Definition 1' },
    { term: 'Term 2', image: 'image2-url', definition: 'Definition 2' },
    { term: 'Term 3', image: 'image3-url', definition: 'Definition 3' },
  ],
};

const mockStore = configureStore([]);

test('renders FlashcardDetails component with card details', () => {
  const store = mockStore({
    cards: { 0: mockCardDetail },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/0']}>
        <Routes>
          <Route path="/:index" element={<FlashcardDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Sample Group/i)).toBeInTheDocument();
  expect(screen.getByText(/Sample Description/i)).toBeInTheDocument();
  expect(screen.getByText(/Term 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Term 2/i)).toBeInTheDocument();
  expect(screen.getByText(/Term 3/i)).toBeInTheDocument();
});

test('displays message when no card details are found', () => {
  const store = mockStore({
    cards: {},
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/0']}>
        <Routes>
          <Route path="/:index" element={<FlashcardDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Oops! No card details found./i)).toBeInTheDocument();
  expect(screen.getByText(/Create Your New FlashCard/i)).toBeInTheDocument();
});



test('selects a term and updates the carousel current index', () => {
  const store = mockStore({
    cards: { 0: mockCardDetail },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/0']}>
        <Routes>
          <Route path="/:index" element={<FlashcardDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText(/Term 2/i));

  expect(screen.getByText(/Definition 2/i)).toBeInTheDocument();
});
