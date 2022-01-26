import * as yup from 'yup';

const NewBookSchema = yup
  .object({
    title: yup.string().required(),
    author: yup.string().required(),
    year: yup
      .number()
      .positive('Nao aceita numeros negativos')
      .integer('Deve ter um valor inteiro'),
    isbn: yup.string().required(),
  })
  .required();

const SigninSchema = yup
  .object({
    email: yup.string().email('Invalid email'),
    password: yup.string().min(6, 'Password must be at least 6 characters'),
  })
  .required();

export {NewBookSchema, SigninSchema};
