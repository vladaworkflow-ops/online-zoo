import { Donation, DonationsByUser } from "../../types/user";
import { donationForm } from "../popup/donation-popup-validation";

export function saveDonation(userEmail?: string) {
  const hiddenCard: string = '**** **** **** ' + donationForm?.card?.slice(-4)

  const newDonation: Donation = {
    animal: donationForm.specialPet,
    amount: donationForm.chooseBtnSum,
    recurring: donationForm.setMonthly,
    date: new Date().toISOString().split('T')[0],
    card: hiddenCard,
    saveCard: donationForm.saveCard
  };

  const raw = localStorage.getItem('donations');
  const existing: DonationsByUser = raw ? JSON.parse(raw) : {};

  const key = userEmail || 'guest';

  if (!existing[key]) {
    existing[key] = [];
  }

  existing[key].push(newDonation);

  localStorage.setItem('donations', JSON.stringify(existing));
}