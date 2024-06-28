import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store/store';
import NavLinks from './Navlinks';

test('renders Create New and My FlashCard links', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavLinks />
      </MemoryRouter>
    </Provider>
  );
  const createNewLink = screen.getByText(/Create New/i);
  const myFlashCardLink = screen.getByText(/My FlashCard/i);
  expect(createNewLink).toBeInTheDocument();
  expect(myFlashCardLink).toBeInTheDocument();
});
