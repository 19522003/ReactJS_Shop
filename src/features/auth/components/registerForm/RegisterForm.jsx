import InputField from 'components/inputField/InputField';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from 'components/passwordField/PasswordField';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    position: 'relative',
  },
  avatar: {
    margin: '0 auto',
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(2, 0, 3, 0),
    textAlign: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  progress: {
    position: 'absolute',
    top: theme.spacing(1),
    left: 0,
    right: 0,
  },
}));

function RegisterForm(props) {
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('This field is required')
      .test('should has at least two words', 'Please enter at least two words ', (values) => {
        return values.split(' ').length >= 2;
      }),
    email: yup.string().required('This field is required').email('Enter a valid email address'),
    password: yup.string().required('This field is required').min(6, 'Please enter at least 6 characters'),
    retypePassword: yup
      .string()
      .required('This field is required')
      .oneOf([yup.ref('password')], 'Password does not match'),
  });

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const classes = useStyles();

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) await onSubmit(values);
  };

  const { isSubmitting } = form.formState;

  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOutlined></LockOutlined>
      </Avatar>
      <Typography className={classes.title} component="h3" variant="h5">
        Create An Account
      </Typography>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="fullName" label="Full Name" form={form} />
        <InputField name="email" label="Email" form={form} />
        <PasswordField name="password" label="Password" form={form} />
        <PasswordField name="retypePassword" label="Retype Password" form={form} />

        <Button
          disabled={isSubmitting}
          type="submit"
          className={classes.submit}
          variant="contained"
          color="primary"
          fullWidth
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default RegisterForm;
