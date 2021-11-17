export const mockFetch = (response: unknown) => jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(response),
  })
) as jest.Mock;