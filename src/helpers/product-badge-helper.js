// Helper functions for badge-based filtering
export const hasBadge = (product, badgeCode) => {
  return product.badges && product.badges.some(badge => badge.code === badgeCode);
};

export const hasNewBadge = (product) => hasBadge(product, 'new');
export const hasBestsellerBadge = (product) => hasBadge(product, 'bestseller');
export const hasSaleBadge = (product) => hasBadge(product, 'sale');

export const getDiscountPercentage = (product) => {
  const saleBadge = product.badges?.find(b => b.code === 'sale');
  return saleBadge?.value || 0;
};
