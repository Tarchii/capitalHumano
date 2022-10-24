export const theme = {
  primary: '#1b2a4e',
  success: '#42ba96',
  white: '#ffffff',
  radius: '8px',
  shadow: '2px 2px 2px 0px rgba(0, 0, 0, 0.2)',
  mask: 'rgba(27, 42, 78, 0.8)',
  warning: '#ff5722',
};

export const formatNumberToCurrency = (
  value: number,
  currencyType?: string
) => {
  return new Intl.NumberFormat(!currencyType ? 'es-AR' : currencyType).format(
    value
  );
};
