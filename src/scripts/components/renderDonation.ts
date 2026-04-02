import { Donation, DonationsByUser } from '../../types/user';
import { modalDonateBtn, openDonationModal } from '../popup/donation-popup';
import {
  donationForm,
  inputSum,
  otherAmount,
  petSelect,
  petSelectBtn,
  updateBtnNextState,
} from '../popup/donation-popup-validation';
import { userMenu } from '../popup/popup-user';

export function renderDonations(donations: Donation[]) {
  const container = document.querySelector('.donation-item') as HTMLElement;

  container.innerHTML = '';

  if (!donations.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No donations yet.';
    container.appendChild(empty);
    return;
  }

  donations.forEach((donation) => {
    const item = document.createElement('div');
    item.classList.add('donation-card');

    item.innerHTML = `
      <p>Time: <span>${donation.date}</span></p>
      <p>Animal: <span>${donation.animal}</span></p>
      <p>Amount: <span>${donation.amount}</span></p>
      <p>Type: <span>${donation.recurring ? 'Monthly' : 'One-time'}</span></p>
      <button class="repeat-donation">Repeat donation</button>
    `;

    const btn = item.querySelector('.repeat-donation') as HTMLButtonElement;

    btn.addEventListener('click', () => {
      repeatDonation(donation.animal, donation.amount);
    });

    container.appendChild(item);
  });
}

export function repeatDonation(animal: string, amount: string) {
  userMenu?.classList.remove('active-modal');
  openDonationModal();

  const matchedButton = Array.from(modalDonateBtn).find((btn) => {
    const btnValue = btn.textContent;
    return btnValue === amount;
  });

  modalDonateBtn.forEach((btn) => btn.classList.remove('active'));
  otherAmount.classList.remove('active');

  if (matchedButton) {
    matchedButton.classList.add('active');
    inputSum.value = '';
  } else {
    otherAmount.classList.add('active');
    inputSum.value = amount;
  }

  donationForm.chooseBtnSum = amount;

  petSelect.value = animal;
  if (animal) {
    petSelectBtn.classList.add('active');
    donationForm.specialPet = animal;
  }
  updateBtnNextState();
}

export function getDonations(userEmail?: string): Donation[] {
  const raw = localStorage.getItem('donations');
  if (!raw) return [];

  const data: DonationsByUser = JSON.parse(raw);

  const key = userEmail || 'guest';

  return data[key] ?? [];
}
