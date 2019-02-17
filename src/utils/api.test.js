import { fetchData, createOptions } from './api';

const mockOptions = {
  method: 'DELETE',
  body: JSON.stringify('eid'),
  headers: {
    'Content-Type': 'application/json'
  }
};

describe('api', () => {
  const mockUrl = 'www.someurl.com';

  beforeEach(() => {
    window.fetch = jest.fn(() => Promise.resolve({
      status: 201,
      ok: true
    }));
  });

  it('should call fetch with the correct params', async () => {
    await fetchData(mockUrl, mockOptions);
    expect(window.fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
  });

  it('should call fetch with the default second param', async () => {
    await fetchData(mockUrl);
    expect(window.fetch).toHaveBeenCalledWith(mockUrl, {});
  });

  it('should return response if everything is okay', async () => {
    const result = await fetchData(mockUrl, mockOptions);
    expect(result).toEqual({ status: 201, ok: true });
  });

  it('should throw an error if everything is not okay', async () => {
    window.fetch = jest.fn(() => Promise.resolve({
      status: 404,
      ok: false,
      json: jest.fn(() => Promise.resolve('Note not found'))
    }));
    const expected = new Error('Note not found');
    await expect(fetchData(mockUrl, mockOptions)).rejects.toEqual(expected);
  });
});

describe('createOptions', () => {
  it('should return an object with the correct properties', () => {
    expect(createOptions('DELETE', 'eid')).toEqual(mockOptions);
  });
});