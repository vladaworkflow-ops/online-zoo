import {
  donationForm,
  donationThirdStep,
  donationFirstStep,
} from './donation-popup-validation';
import { modalDonation, overlay } from './donation-popup';
import { saveDonation } from '../utils/saveDonation';
import { authState } from '../api/auth';
import { getDonations, renderDonations } from '../components/renderDonation';
import { updateUserMenu } from '../utils/user-menu';
export const form = document.getElementById('donation-form') as HTMLFormElement;
const cardNumber = document.getElementById('credit-card') as HTMLInputElement;
const cvv = document.getElementById('cvv') as HTMLInputElement;
const month = document.getElementById('month-select') as HTMLSelectElement;
const year = document.getElementById('year-select') as HTMLSelectElement;
const errorText = document.querySelector(
  '.errors-donation-form',
) as HTMLElement;

cardNumber.addEventListener('input', () => {
  let value = cardNumber.value.replace(/\D/g, '');

  value = value.substring(0, 16);

  cardNumber.value = value;
  donationForm.card = value;
});

cvv.addEventListener('input', () => {
  let value = cvv.value.replace(/\D/g, '');

  value = value.substring(0, 3);

  cvv.value = value;
  donationForm.cvv = value;
});

month.addEventListener('change', () => {
  let monthSelected: string = month.value;

  if (monthSelected !== '') {
    donationForm.month = monthSelected;
  }
});

year.addEventListener('change', () => {
  let yearSelected: string = year.value;

  if (yearSelected !== '') {
    donationForm.year = yearSelected;
  }
});

function validateForm() {
  const errors: string[] = [];

  if (
    !donationForm.donationName ||
    !/^[A-Za-z\s]+$/.test(donationForm.donationName)
  ) {
    errors.push('Name must contain only letters and spaces');
  }

  if (
    !donationForm.donationEmail ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donationForm.donationEmail)
  ) {
    errors.push('Email is not valid');
  }

  if (!donationForm.card || !/^\d{16}$/.test(donationForm.card)) {
    errors.push('Card must be 16 digits');
  }

  if (!donationForm.cvv || !/^\d{3}$/.test(donationForm.cvv)) {
    errors.push('CVV must be 3 digits');
  }

  if (!donationForm.month) {
    errors.push('Month is required');
  }

  if (!donationForm.year) {
    errors.push('Year is required');
  }

  return errors;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const errors = validateForm();

  if (errors.length > 0) {
    console.log('VALIDATION ERRORS:', errors);
    errorText.textContent = errors.join();
    return;
  }

  const email = authState.isLogged ? authState.user.email : 'guest';

  saveDonation(email);
  let userDonations = getDonations(email);
  renderDonations(userDonations);
  updateUserMenu(authState);

  errorText.textContent = 'Form successfully submitted!';

  donationForm.chooseBtnSum = '';
  donationForm.specialPet = '';
  donationForm.setMonthly = false;
  donationForm.donationName = '';
  donationForm.donationEmail = '';
  donationForm.card = '';
  donationForm.cvv = '';
  donationForm.month = '';
  donationForm.year = '';

  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.value = '';
  });

  const selects = form.querySelectorAll('select');
  selects.forEach((select) => {
    select.value = '';
  });

  setTimeout(() => {
    donationThirdStep.style.display = 'none';
    donationFirstStep.style.display = 'block';
    modalDonation.classList.remove('active-modal');
    overlay.classList.remove('active-modal');

    errorText.textContent = '';
  }, 1000);
});
