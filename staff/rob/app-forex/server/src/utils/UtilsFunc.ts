export const asc_sort = (a: any, b: any) => {
  a = parseFloat(a.v);
  b = parseFloat(b.v);
  if (a > b) return 1;
  if (b > a) return -1;

  return 0;
};

export const desc_sort = (a: any, b: any) => {
  a = parseFloat(a.v);
  b = parseFloat(b.v);
  if (a > b) return -1;
  if (b > a) return 1;

  return 0;
};

 