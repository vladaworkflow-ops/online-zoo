import { modalDonateBtn } from './donation-popup';
import { authState } from '../api/auth';

const modalDonateBtn = document.querySelectorAll('.modal-donate-btn');
export const donationFirstStep = document.querySelector(
  '.donation-first-step',
) as HTMLDivElement;
const donationSecondStep = document.querySelector(
  '.donation-second-step',
) as HTMLDivElement;
export const donationThirdStep = document.querySelector(
  '.donation-third-step',
) as HTMLDivElement;
export const inputSum = document.querySelector(
  '.other-sum-input',
) as HTMLInputElement;
export const otherAmount = document.querySelector(
  '.other-amount-btn',
) as HTMLButtonElement;
const inputBtnSum = document.querySelector(
  '.donation-btn-input',
) as HTMLInputElement;
export const petSelect = document.getElementById(
  'pet-select',
) as HTMLSelectElement;
export const petSelectBtn = document.querySelector(
  '.special-pet-btn',
) as HTMLButtonElement;
const checkboxMonthly = document.querySelector(
  '#monthly-recurring',
) as HTMLInputElement;
const btnNext = document.querySelector('.popup-btn-next') as HTMLButtonElement;
const backBtn = document.querySelectorAll(
  '.back-btn',
) as NodeListOf<HTMLButtonElement>;
const btnNextSecond = document.querySelector(
  '.second-btn-next',
) as HTMLButtonElement;
const donationName = document.querySelector(
  '#donation-name',
) as HTMLInputElement;
const donationEmail = document.querySelector(
  '#donation-email',
) as HTMLInputElement;
const saveCard = document.querySelector('#save-card') as HTMLInputElement;

btnNext.disabled = true;
btnNextSecond.disabled = true;

interface DonationForm {
  chooseBtnSum: string;
  specialPet: string;
  setMonthly: boolean;
  donationName: string;
  donationEmail: string;
  card: string | null;
  saveCard: boolean;
  cvv: string | null;
  month: string | null;
  year: string | null;
}

export const donationForm: DonationForm = {
  chooseBtnSum: '',
  specialPet: '',
  setMonthly: false,
  donationName: '',
  donationEmail: '',
  card: '',
  cvv: '',
  saveCard: false,
  month: '',
  year: '',
};

export function clearActiveButtons() {
  modalDonateBtn.forEach((btn) => {
    btn.classList.remove('active');
  });
}

modalDonateBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    clearActiveButtons();

    otherAmount.classList.remove('active');
    inputSum.value = '';

    btn.classList.add('active');
    donationForm.chooseBtnSum = btn.textContent;

    updateBtnNextState();
  });
});

otherAmount.addEventListener('click', () => {
  otherAmount.classList.add('active');
  clearActiveButtons();
  inputSum.focus();
  updateBtnNextState();
});

function validateInputSum() {
  let value = inputSum.value;

  value = value.replace(/\D/g, '');

  value = value.replace(/^0+/, '');

  inputSum.value = value;
  if (value !== '') {
    donationForm.chooseBtnSum = value;
    updateBtnNextState();
  }
}

inputSum.addEventListener('focus', () => {
  clearActiveButtons();
  otherAmount.classList.add('active');
});

inputSum.addEventListener('input', () => {
  validateInputSum();
  otherAmount.classList.add('active');
  clearActiveButtons();
});

inputBtnSum.addEventListener('input', () => {
  let value = inputBtnSum.value;

  value = value.replace(/\D/g, '');

  value = value.replace(/^0+/, '');

  inputBtnSum.value = value;
  inputSum.value = value;
  if (value !== '') {
    donationForm.chooseBtnSum = value;
    updateBtnNextState();
  }
});

petSelect.addEventListener('change', () => {
  let petSelectValue: string = petSelect.value;

  if (petSelectValue !== '') {
    petSelectBtn.classList.add('active');
    donationForm.specialPet = petSelectValue;
    updateBtnNextState();
  } else {
    petSelectBtn.classList.remove('active');
  }
});

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  const btn = target.closest('.cam-button');
  if (!btn) return;

  const card = btn.closest('.care-slide-animal-card');
  const pet = card?.getAttribute('data-pet');

  if (pet) {
    petSelect.value = pet;
    donationForm.specialPet = pet;
    petSelect.dispatchEvent(new Event('change'));
  }
});

checkboxMonthly.addEventListener('change', () => {
  donationForm.setMonthly = checkboxMonthly.checked;
});

saveCard.addEventListener('change', () => {
  donationForm.saveCard = saveCard.checked;
});

export function updateBtnNextState() {
  btnNext.disabled = !(
    donationForm.chooseBtnSum !== '' && donationForm.specialPet !== ''
  );
}
updateBtnNextState();

function updateBtnNextSecondState() {
  btnNextSecond.disabled = !(
    donationForm.donationName && donationForm.donationEmail
  );
}
updateBtnNextSecondState();

btnNext.addEventListener('click', () => {
  donationSecondStep.style.display = 'block';
  donationFirstStep.style.display = 'none';
  fillData();
});

backBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (donationThirdStep.style.display === 'block') {
      donationThirdStep.style.display = 'none';
      donationSecondStep.style.display = 'block';
      return;
    }

    if (donationSecondStep.style.display === 'block') {
      donationSecondStep.style.display = 'none';
      donationFirstStep.style.display = 'block';
      return;
    }
  });
});

btnNextSecond.addEventListener('click', () => {
  donationSecondStep.style.display = 'none';
  donationThirdStep.style.display = 'block';
});

function fillData() {
  if (authState.isLogged) {
    donationName.value = authState.user?.name || 'not';
    donationEmail.value = authState.user?.email || 'not';
    donationForm.donationName = donationName.value;
    donationForm.donationEmail = donationEmail.value;
    btnNextSecond.disabled = false;
  }
}

if (!authState.isLogged) {
  donationName.addEventListener('input', () => {
    let value = donationName.value;

    if (value !== '') {
      donationForm.donationName = value;
      updateBtnNextSecondState();
    }
  });

  donationEmail.addEventListener('input', () => {
    let value = donationEmail.value;
    if (value !== '') {
      donationForm.donationEmail = value;
      updateBtnNextSecondState();
    }
  });
}
