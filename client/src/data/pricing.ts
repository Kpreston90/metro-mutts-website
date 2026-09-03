export const pricing = {
  daycare: {
    fullDay: 32,
    halfDay: 20,
    sibling: 24,
    packages: [
      { days: 10, price: 250 },
      { days: 20, price: 440 },
    ],
  },
  boarding: {
    nightly: 50,
  },
} as const;

export const formatCurrency = (amount: number) => `$${amount}`;
