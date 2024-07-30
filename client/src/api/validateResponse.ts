import { getErrorMessage } from './getErrorMessage';

export async function validateResponse(
  response: Response,
  isHandle: boolean = false,
): Promise<Response> {
  if (!response.ok) {
    throw new Error(await getErrorMessage(response, isHandle));
  }

  return response;
}
