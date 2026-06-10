import type { Product, StockStatus } from '../types/product';

export const LOW_STOCK_THRESHOLD = 20;
export const CRITICAL_STOCK_THRESHOLD = 10;
export const TARGET_STOCK_LEVEL = 30;

export function getStockStatus(stock: number): StockStatus {
  if (stock < CRITICAL_STOCK_THRESHOLD) return 'critical';
  if (stock < LOW_STOCK_THRESHOLD) return 'low';
  return 'healthy';
}

export function getReorderQuantity(stock: number) {
  return Math.max(TARGET_STOCK_LEVEL - stock, 0);
}

export function getStockLabel(status: StockStatus) {
  switch (status) {
    case 'critical':
      return 'Critical';
    case 'low':
      return 'Low';
    default:
      return 'Healthy';
  }
}

export function sortByStockUrgency(products: Product[]) {
  return [...products].sort((a, b) => a.stock - b.stock);
}
