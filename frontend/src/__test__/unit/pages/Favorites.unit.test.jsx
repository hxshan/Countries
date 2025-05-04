
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Favorites from '../../../pages/Favorites';
import CountryCard from '../../../components/CountryCard';


vi.mock('../../../components/CountryCard', () => ({
  default: vi.fn(({ country }) => (
    <div data-testid="country-card">{country.name.common}</div>
  ))
}));

describe('Favorites Component Unit Tests', () => {
  const createTestStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        favorites: (state = [], action) => state 
      },
      preloadedState: {
        favorites: preloadedState.favorites || []
      }
    });
  };

  it('displays empty state when no favorites exist', () => {
    const store = createTestStore({ favorites: [] });
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    
    expect(screen.getByText(/LOOKS LIKE YOU HAVE NO FAVORITES YET/i)).toBeInTheDocument();
    expect(screen.queryByTestId('country-card')).not.toBeInTheDocument();
  });

  it('displays favorite countries when they exist', () => {
    const mockFavorites = [
      { name: { common: 'France' }, flags: { png: 'fr.png' } },
      { name: { common: 'Japan' }, flags: { png: 'jp.png' } }
    ];
    
    const store = createTestStore({ favorites: mockFavorites });
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    
    expect(screen.getAllByTestId('country-card')).toHaveLength(2);
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('limits displayed favorites to 12', () => {
    const manyFavorites = Array.from({ length: 15 }, (_, i) => ({
      name: { common: `Country ${i}` },
      flags: { png: `flag-${i}.png` }
    }));
    
    const store = createTestStore({ favorites: manyFavorites });
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    
    expect(screen.getAllByTestId('country-card')).toHaveLength(12);
  });

  it('applies correct dark mode classes', () => {
    const store = createTestStore();
    
    const { container } = render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
    
    expect(container.firstChild).toHaveClass('dark:bg-[#18181C]');
    expect(container.firstChild).toHaveClass('dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]');
  });
});