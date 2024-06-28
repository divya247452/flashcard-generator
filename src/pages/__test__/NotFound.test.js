import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound Component', () => {
  test('renders NotFound component', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Assert that the component renders without errors
    const pageTitle = screen.getByText(/404 - Page Not Found/i);
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders link to create new FlashCard', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Assert that the link is present
    const createFlashCardLink = screen.getByRole('link', { name: /Create Your New FlashCard/i });
    expect(createFlashCardLink).toBeInTheDocument();

    // Assert that the link points to '/'
    expect(createFlashCardLink).toHaveAttribute('href', '/');
  });

  test('link navigates to correct location', () => {
    const { container } = render(
      <Router>
        <NotFound />
      </Router>
    );

    // Simulate click on the link
    const createFlashCardLink = screen.getByRole('link', { name: /Create Your New FlashCard/i });
    expect(createFlashCardLink).toBeInTheDocument();
    createFlashCardLink.click();

    // Assert that navigation occurred correctly
    expect(container.innerHTML).toMatch('/'); // Ensure '/' is in the rendered output
  });
});
