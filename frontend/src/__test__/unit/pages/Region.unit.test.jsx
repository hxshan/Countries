
import { render, screen, waitFor } from '@testing-library/react';
import Region from '../../../pages/Region';

vi.mock('../../../features/countries/CountriesApi', () => ({
  useGetRegionsQuery: vi.fn(),
  useGetCountriesByRegionQuery: vi.fn()
}));

vi.mock('../../../components/CountryCard', () => ({
  default: vi.fn(({ country }) => (
    <div data-testid="country-card">{country.name.common}</div>
  ))
}));

describe('Region Component Unit Tests', () => {
  let useGetRegionsQuery, useGetCountriesByRegionQuery;
  
  beforeEach(async () => {
    
    const api = await import('../../../features/countries/CountriesApi');
    useGetRegionsQuery = api.useGetRegionsQuery;
    useGetCountriesByRegionQuery = api.useGetCountriesByRegionQuery;
    
    vi.clearAllMocks();
    
    useGetRegionsQuery.mockReturnValue({
      data: [],
      isLoading: true
    });
    useGetCountriesByRegionQuery.mockReturnValue({
      data: [],
      isLoading: false
    });
  });

  it('renders region buttons when loaded', () => {

    useGetRegionsQuery.mockReturnValue({
      data: ['Africa', 'Asia', 'Europe'],
      isLoading: false
    });

    render(<Region />);
    
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
  });


  it('shows countries when region selected', async () => {

    useGetRegionsQuery.mockReturnValue({
      data: ['Africa'],
      isLoading: false
    });

    useGetCountriesByRegionQuery.mockReturnValue({
      data: [
        { name: { common: 'Egypt' }, flags: { png: 'eg.png' } }
      ],
      isLoading: false
    });

    render(<Region />);
    
    await waitFor(() => {
      expect(screen.getByText('Egypt')).toBeInTheDocument();
    });
  });
});