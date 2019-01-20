import { Decimal } from 'decimal.js';

export const wallet1 = {
  EUR: new Decimal(100),
  GBP: new Decimal(200),
  USD: new Decimal(300),
};

export const wallet2 = {
  EUR: new Decimal(0),
  GBP: new Decimal(0.001),
  USD: new Decimal(123),
};


export const rates1 = {
  EUR: new Decimal(1),
  USD: new Decimal(0.85),
};

export const rates2 = {
  EUR: new Decimal(1),
  GBP: new Decimal(1.234),
  USD: new Decimal(0.85),
};


