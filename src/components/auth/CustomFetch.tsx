import Router from 'next/router';

export const customFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // Token is invalid or expired
    Router.push('/auth/login'); // Replace with your sign-in route
  }

  return response;
};
