import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const BASE_URL='https://restcountries.com/v3.1'

export const countriesApi = createApi({
    reducerPath: 'countriesApi',
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    endpoints: (builder) => ({
        getAllCountries: builder.query({
          query: () => '/all',
        }),
        getCountryByName: builder.query({
            query: (name) => `/name/${name}`,
        }),
        getCountriesByCodes: builder.query({
            query: (codes) => `/alpha?codes=${codes.join(',')}`,
        }),
        getCountriesByRegion: builder.query({
          query: (region) => `/region/${region}`,
        }),
        getRegions: builder.query({
          query: () => '/all',
          transformResponse: (response) => {
              const uniqueRegions = [...new Set(response.map((country) => country.region))].filter(Boolean).sort(); 
              return uniqueRegions;
          },
      }),
    })
})

export const {
    useGetAllCountriesQuery,
    useGetCountryByNameQuery,
    useGetCountriesByCodesQuery,
    useGetCountriesByRegionQuery,
    useGetRegionsQuery
  } = countriesApi;