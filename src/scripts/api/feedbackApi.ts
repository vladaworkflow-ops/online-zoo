import { Feedback } from '../../types/testimonials';
import { API_URL } from './auth';

if (!API_URL) {
  throw new Error('API_URL is not defined');
}

export async function feedbackApi(): Promise<Feedback[]> {
  const response = await fetch(`${API_URL}/feedback`, {
    method: 'GET',
  });

  if (response.status === 200) {
    const dataCards: { data: Feedback[] } = await response.json();
    return dataCards.data;
  }

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  throw new Error(`Unexpected error: ${response.status}`);
}
