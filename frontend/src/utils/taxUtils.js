export const convertTaxApplicability = (value) => {
    switch (value) {
      case 'APPLICABLE':
        return true;
      case 'NOT_APPLICABLE':
      case 'EXEMPT':
        return false;
      default:
        return null;
    }
  };
  
  export const convertBooleanToTaxApplicability = (value) => {
    if (value === true) return 'APPLICABLE';
    if (value === false) return 'NOT_APPLICABLE';
    return '';
  };