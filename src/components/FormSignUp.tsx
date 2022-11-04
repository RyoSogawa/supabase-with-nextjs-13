'use client';
import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { supabase } from '../lib/supabase';

type FormValues = {
  email: string;
  password: string;
};

export type FormSignUpProps = {};

const FormSignUp: React.FC<FormSignUpProps> = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUp = useCallback<SubmitHandler<FormValues>>(async (formData) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) console.error(error);
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div>
        <label>
          email:
          <input
            type="email"
            {...register('email', {
              required: true,
            })}
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="password"
            {...register('password', {
              required: true,
            })}
          />
        </label>
      </div>

      <button>Sign Up</button>
    </form>
  );
};

export default FormSignUp;
