import { render, screen } from '@testing-library/react';
import App from '../App';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

describe('App component', () => {
  it('renders welcome message', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Welcome to Start Page.')).toBeInTheDocument();
  });
});
