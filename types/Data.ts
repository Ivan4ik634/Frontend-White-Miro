export interface BillingDataT {
  color: string;
  plan: string;
  isPremium: boolean;
  price: number;
  description: string;
  advantages: {
    present: 'not' | 'yes';
    text: string;
  }[];
}
