import { Donation } from "../../types/user";
import { donationForm } from "../popup/donation-popup-validation";

export function saveDonation() {
  const newDonation: Donation = {
    animal: donationForm.specialPet,
    amount: donationForm.chooseBtnSum,
    recurring: donationForm.setMonthly,
    date: new Date().toISOString().split('T')[0],
    card: donationForm.card
  };

  const existing = JSON.parse(localStorage.getItem('donations') || '[]');

  existing.push(newDonation);

  localStorage.setItem('donations', JSON.stringify(existing));
}