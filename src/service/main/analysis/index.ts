import hyRequest from '@/service';

export function getShopAmount() {
  return hyRequest.get({
    url: '/goods/amount/list',
  });
}

export function getCategoryCount() {
  return hyRequest.get({
    url: '/goods/category/count',
  });
}
export function getCategorySale() {
  return hyRequest.get({
    url: '/goods/category/sale',
  });
}

export function getCategoryFavor() {
  return hyRequest.get({
    url: '/goods/category/favor',
  });
}

export function getAddressSale() {
  return hyRequest.get({
    url: '/goods/address/sale',
  });
}
