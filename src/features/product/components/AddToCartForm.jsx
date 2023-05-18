import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/quantityField/QuantityField';

function AddToCartForm(props) {
  const schema = yup.object().shape({
    quantity: yup.number().required().min(1, 'Please enter at least 1').typeError('Please enter a number'),
  });
  const form = useForm({ defaultValues: { quantity: 1 }, resolver: yupResolver(schema) });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) await onSubmit(values);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity" form={form} />

      <Button type="submit" variant="contained" color="primary" width="250px" size="large">
        ADD TO CART
      </Button>
    </form>
  );
}

export default AddToCartForm;
