export async function getErrorMessage(
  response: Response,
  isHandle: boolean,
): Promise<string> {
  let errorMessage: string = '';

  if (isHandle) {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } else if (contentType && contentType.includes('text/html')) {
      const text = await response.text();
      const match = text.match(/<pre>(.*?)<\/pre>/);
      errorMessage = `Что-то пошло не так: ${
        match ? match[1] : 'An error occurred'
      }`;
    }
  }

  if (!errorMessage) {
    errorMessage = await response.text();
  }

  return errorMessage;
}
