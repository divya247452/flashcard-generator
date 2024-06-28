import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './state/store/store';
import App from './App';

test('renders Create Flashcard header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headerElement = screen.getByText(/Create Flashcard/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders NavLinks component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const createNewLink = screen.getByText(/Create New/i);
  const myFlashCardLink = screen.getByText(/My FlashCard/i);
  expect(createNewLink).toBeInTheDocument();
  expect(myFlashCardLink).toBeInTheDocument();
});
