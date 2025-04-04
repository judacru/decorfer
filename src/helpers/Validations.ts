const Validations = {
  isValidEmail: (email: string): boolean => {
    const match = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    return !!match;
  },

  isEmail: (email: string): string | undefined => {
    return Validations.isValidEmail(email) ? undefined : 'Invalid e-mail';
  }
};

export default Validations;
