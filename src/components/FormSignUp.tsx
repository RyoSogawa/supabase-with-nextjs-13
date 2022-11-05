'use client';

import React, { useCallback } from 'react';

import { useForm } from 'react-hook-form';

import { supabase } from '../lib/supabase';

import type { SubmitHandler } from 'react-hook-form';

type FormValues = {
  email: string;
  username: string;
  password: string;
};

const FormSignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const signUp = useCallback<SubmitHandler<FormValues>>(async (formData) => {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
        },
      },
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
          username:
          <input
            type="text"
            {...register('username', {
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

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default FormSignUp;
