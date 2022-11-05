'use client';

import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { supabase } from '../lib/supabase';

import type { SubmitHandler } from 'react-hook-form';

type FormValues = {
  email: string;
  password: string;
};

const FormSignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signUp = useCallback<SubmitHandler<FormValues>>(async (formData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
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

      <button type="submit">Sign In</button>
    </form>
  );
};

export default FormSignIn;
