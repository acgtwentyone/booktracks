import * as yup from 'yup';

const BookSchema = yup.object({
  title: yup.string().required('Title is required.'),
  author: yup.string().required('Author is required.'),
  year: yup.string().notRequired(),
  // .test('len', 'Invalid YEAR', val => val && val.toString().length === 4)
  // .max(new Date().getFullYear()),
  isbn: yup.string().notRequired(), // min(4, 'Minimo 4 caracteres para ISBN.'),
  last_readed_page: yup.number().positive().notRequired(),
  note: yup.string().notRequired(),
});

const NoteSchema = yup.object({
  note: yup.string().notRequired(),
});

const SigninSchema = yup
  .object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required.'),
  })
  .required();

const SignupSchema = yup
  .object({
    username: yup
      .string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required.'),
  })
  .required();

export {BookSchema, NoteSchema, SigninSchema, SignupSchema};
