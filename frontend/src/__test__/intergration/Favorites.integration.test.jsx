import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import Favorites from '../../pages/Favorites';
import favoriteReducer from '../../features/countries/favoritesSlice';


const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      favorites: favoriteReducer
    },
    preloadedState
  });
};


const mockFavorites = [
  {
    name: { common: 'France' },
    flags: { png: 'fr-flag.png' },
    population: 67390000,
    region: 'Europe',
    capital: ['Paris'],
  },
  {
    name: { common: 'Japan' },
    flags: { png: 'jp-flag.png' },
    population: 125800000,
    region: 'Asia',
    capital: ['Tokyo'],
  }
];

vi.mock('../../components/CountryCard', () => ({
  default: vi.fn(({ country }) => {
    return <div data-testid="country-card">{country.name.common}</div>;
  })
}));

const renderWithProviders = (
  ui,
  {
    store = createTestStore({ favorites: mockFavorites }),
    initialEntries = ['/favorites'],
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

describe('Favorites Component Intergration', () => {
  it('displays empty state when no favorites exist', () => {
    const emptyStore = createTestStore({ favorites: [] });
    renderWithProviders(<Favorites />, { store: emptyStore });
    
    expect(screen.getByText(/LOOKS LIKE YOU HAVE NO FAVORITES YET/i)).toBeInTheDocument();
    expect(screen.queryByTestId('country-card')).toBeNull();
  });

  it('displays favorite countries when they exist', () => {
    renderWithProviders(<Favorites />);
    
    const countryCards = screen.getAllByTestId('country-card');
    expect(countryCards).toHaveLength(2);
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('limits displayed favorites to 12', () => {
    const manyFavorites = Array.from({ length: 15 }, (_, i) => ({
      name: { common: `Country ${i}` },
      flags: { png: `flag-${i}.png` },
      population: 1000000 + i,
      region: 'Region',
      capital: ['Capital'],
    }));
    
    const store = createTestStore({ favorites: manyFavorites });
    renderWithProviders(<Favorites />, { store });
    
    expect(screen.getAllByTestId('country-card')).toHaveLength(12);
  });

  it('applies correct dark mode classes', () => {
    const { container } = renderWithProviders(<Favorites />);
    
    // Check for dark mode classes on the main container
    expect(container.firstChild).toHaveClass('dark:bg-[#18181C]');
    expect(container.firstChild).toHaveClass('dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]');
  });
});