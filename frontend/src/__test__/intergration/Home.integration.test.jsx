import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import Home from '../../pages/Home';
import themeReducer from '../../features/theme/themeSlice';
import favoriteReducer from '../../features/countries/favoritesSlice';
import { countriesApi } from '../../features/countries/CountriesApi';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      favorites: favoriteReducer,
      [countriesApi.reducerPath]: countriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countriesApi.middleware),
    preloadedState
  });
};

const mockCountries = [
  {
    name: { common: 'United States' },
    flags: { png: 'us-flag.png' },
    population: 331000000,
    region: 'Americas',
    capital: ['Washington D.C.'],
  },
  {
    name: { common: 'Canada' },
    flags: { png: 'ca-flag.png' },
    population: 38000000,
    region: 'Americas',
    capital: ['Ottawa'],
  },
];

const server = setupServer(
  http.get('https://restcountries.com/v3.1/all', () => {
    return HttpResponse.json(mockCountries, { delay: 150 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = (
  ui,
  {
    store = createTestStore(),
    initialEntries = ['/'],
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

describe('Home Component Intergration', () => {
  it('displays loading spinner when data is loading', () => {
    renderWithProviders(<Home />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays countries when data is loaded', async () => {
    renderWithProviders(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
      expect(screen.getByText('Canada')).toBeInTheDocument();
    });
  });

  it('displays error message when request fails', async () => {
    server.use(
      http.get('https://restcountries.com/v3.1/all', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    renderWithProviders(<Home />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading countries/i)).toBeInTheDocument();
    });
  });

  it('renders correct number of country cards', async () => {
    renderWithProviders(<Home />);
    
    await waitFor(() => {
      const cards = screen.getAllByTestId('country-card');
      expect(cards.length).toBeGreaterThan(0);
      expect(cards.length).toBeLessThanOrEqual(12);
    });
  });
});