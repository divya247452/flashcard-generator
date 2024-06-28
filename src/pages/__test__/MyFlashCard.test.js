import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import MyFlashCard from '../MyFlashCard';

// Mock Redux store
const mockStore = configureStore([]);

describe('MyFlashCard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cards: [
        { groupTitle: 'Group 1', groupDescription: 'Description 1', cardItems: [] },
        { groupTitle: 'Group 2', groupDescription: 'Description 2', cardItems: [] },
      ],
    });
  });

  test('renders MyFlashCard component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router> {/* Wrap with Router */}
          <MyFlashCard />
        </Router>
      </Provider>
    );

    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Group 2')).toBeInTheDocument();
  });
});
