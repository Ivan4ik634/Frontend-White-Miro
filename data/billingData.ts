import { BillingDataT } from '@/types/Data';

export const billingData: BillingDataT[] = [
  {
    color: 'oklch(79.2% 0.209 151.711)',
    isPremium: false,
    plan: 'Free plan',
    price: 0,
    description: 'For regular people who want to try apps',
    advantages: [
      {
        present: 'yes',
        text: 'Not ads',
      },
      {
        present: 'yes',
        text: '3 free boards',
      },
      {
        present: 'yes',
        text: 'Unlimited tasks',
      },
      {
        present: 'not',
        text: 'Templates',
      },
      {
        present: 'not',
        text: 'You work without a team',
      },
    ],
  },
  {
    color: 'oklch(82.8% 0.189 84.429)',
    isPremium: true,
    plan: 'Premium plan',
    price: 5,
    description: 'For people who want to work in a team and do many projects',
    advantages: [
      {
        present: 'yes',
        text: 'Not ads',
      },
      {
        present: 'yes',
        text: 'Unlimited boards',
      },
      {
        present: 'yes',
        text: 'Unlimited tasks',
      },
      {
        present: 'yes',
        text: 'Templates',
      },
      {
        present: 'yes',
        text: 'You work without a team',
      },
    ],
  },
];
