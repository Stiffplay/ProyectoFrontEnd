export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
  return regex.test(password);
};

export const obtenerUsuarioDesdeEmail = (email) => {
  if (!email) return '';
  return email.split('@')[0];
};
