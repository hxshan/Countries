import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import Region from '../../pages/Region';
import { countriesApi } from '../../features/countries/countriesApi';


vi.mock('../../components/CountryCard', () => ({
  default: vi.fn(({ country }) => {
    return <div data-testid="country-card">{country.name.common}</div>;
  })
}));


const mockRegions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
const mockCountries = {
  Africa: [
    { name: { common: 'Egypt' }, flags: { png: 'eg-flag.png' }, population: 102000000, capital: ['Cairo'] },
    { name: { common: 'Nigeria' }, flags: { png: 'ng-flag.png' }, population: 206000000, capital: ['Abuja'] }
  ],
  Europe: [
    { name: { common: 'France' }, flags: { png: 'fr-flag.png' }, population: 67390000, capital: ['Paris'] }
  ]
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      [countriesApi.reducerPath]: countriesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(countriesApi.middleware)
  });
};

const server = setupServer(
    http.get('https://restcountries.com/v3.1/all', () => {
      // Return mock countries data that will be transformed to regions
      const mockCountriesForRegions = mockRegions.map(region => ({
        region
      }));
      return HttpResponse.json(mockCountriesForRegions);
    }),
    http.get('https://restcountries.com/v3.1/region/:region', ({ params }) => {
      return HttpResponse.json(mockCountries[params.region] || []);
    })
  );

const renderWithProviders = (
    ui,
    {
      store = createTestStore(),
      initialEntries = ['/regions'],
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

describe('Region Component Intergration', () => {
 beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    vi.clearAllMocks();
  });
  afterAll(() => server.close());


  it('displays regions when loaded', async () => {
    renderWithProviders(<Region />);
    
    await waitFor(() => {
      expect(screen.getByText('Countries by Region')).toBeInTheDocument();
    });
    
    mockRegions.forEach(region => {
      expect(screen.getByText(region)).toBeInTheDocument();
    });
  });

  it('automatically selects first region', async () => {
    renderWithProviders(<Region />);
    
    await waitFor(() => {
      expect(screen.getByText(mockRegions[0])).toHaveClass('bg-[#4CAF50]', 'dark:bg-[#9EFF00]');
    });
  });

  it('loads countries when region is selected', async () => {
    renderWithProviders(<Region />);
    
    await waitFor(() => {
      expect(screen.getByText('Africa')).toBeInTheDocument();
    });
  
    await waitFor(() => {
      expect(screen.getByText('Africa')).toHaveClass('bg-[#4CAF50]');
    });

    await waitFor(() => {
      expect(screen.getByText('Countries in Africa (2)')).toBeInTheDocument();
      expect(screen.getByText('Egypt')).toBeInTheDocument();
      expect(screen.getByText('Nigeria')).toBeInTheDocument();
    });
  
    fireEvent.click(screen.getByText('Europe'));
  
    await waitFor(() => {
      expect(screen.getByText('Europe')).toHaveClass('bg-[#4CAF50]');
    });
  
    await waitFor(() => {
      expect(screen.getByText('Countries in Europe (1)')).toBeInTheDocument();
      expect(screen.getByText('France')).toBeInTheDocument();
    });
  });

  it('displays error message when no countries found', async () => {
    server.use(
      http.get('https://restcountries.com/v3.1/region/Asia', () => {
        return HttpResponse.json([]);
      })
    );
  
    renderWithProviders(<Region />);
    
    await waitFor(() => {
      expect(screen.getByText('Asia')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Asia'));

    await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(/no countries found for asia/i);
    }, { timeout: 3000 }); 
  });

  it('applies correct dark mode classes', async () => {
    renderWithProviders(<Region />);
    
    await waitFor(() => {
      const container = screen.getByTestId('region-container');
      expect(container).toHaveClass('dark:bg-[#18181C]');
      expect(container).toHaveClass('dark:shadow-[inset_0_0_30px_rgba(158,255,0,0.1)]');
    });
  });
});