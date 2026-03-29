import { Donation, DonationsByUser } from '../../types/user';

export function renderDonations(donations: Donation[]) {
  const container = document.querySelector('.donation-item') as HTMLElement;

  container.innerHTML = '';

  if (!donations.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No donations yet.';
    container.appendChild(empty);
    return;
  }

  donations.forEach(donation => {
    const item = document.createElement('div');
    item.classList.add('donation-card');

    item.innerHTML = `
      <p>Time: <span>${donation.date}</span></p>
      <p>Animal: <span>${donation.animal}</span></p>
      <p>Amount: <span>${donation.amount}</span></p>
      <p>Type: <span>${donation.recurring ? 'Monthly' : 'One-time'}</span></p>
      <button class="repeat-donation">Repeat donation</button>
    `;

    container.appendChild(item);
  });
}


export function getDonations(userEmail?: string): Donation[] {
  const raw = localStorage.getItem('donations');
  if (!raw) return [];

  const data: DonationsByUser = JSON.parse(raw);

  const key = userEmail || 'guest';

  return data[key] ?? [];
}