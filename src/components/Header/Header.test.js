import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store/store';
import Header from './Header';

test('renders logo in Header', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  );
  const logoImage = screen.getByAltText(/Logo/i);
  expect(logoImage).toBeInTheDocument();
});
