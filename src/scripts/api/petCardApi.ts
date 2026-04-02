import { Cards, PetsDetail } from '../../types/pet-cards';
import { API_URL } from './auth';

if (!API_URL) {
  throw new Error('API_URL is not defined');
}

export async function petCardsApi(): Promise<Cards[]> {
  const response = await fetch(`${API_URL}/pets`, {
    method: 'GET',
  });

  if (response.status === 200) {
    const dataCards: { data: Cards[] } = await response.json();
    return dataCards.data;
  }

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  throw new Error(`Unexpected error: ${response.status}`);
}

export async function petDetailApi(id: number): Promise<PetsDetail[]> {
  const response = await fetch(`${API_URL}/pets/${id}`, {
    method: 'GET',
  });

  if (response.status === 200) {
    const json: { data: PetsDetail[] } = await response.json();
    return json.data;
  }

  if (response.status === 404) {
    throw new Error('Pet not found');
  }

  if (response.status === 500) {
    throw new Error('Internal server error');
  }

  throw new Error(`Unexpected error: ${response.status}`);
}
