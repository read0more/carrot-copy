import React, { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

interface LoginForm {
  name: string;
  email: string;
  password: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });

  const onValid = (data: LoginForm) => {
    console.log(data);
    reset();
  };

  const onInvalid = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          {...register('name', {
            required: 'name is required',
            minLength: {
              value: 4,
              message: 'name is too short',
            },
          })}
          type="text"
          placeholder="Name"
          required
        />
        {errors.name?.message}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          {...register('email', {
            required: 'email is required',
            validate: {
              notGmail: (value) =>
                value.includes('@gmail.com') || 'only gmail is allowed',
            },
          })}
          type="email"
          id="email"
          placeholder="email"
          required
        />
        {errors.email?.message}
      </div>

      <div>
        <label htmlFor="email">Password</label>
        <input
          {...register('password', { required: 'password is required' })}
          type="password"
          id="password"
          placeholder="password"
          required
        />
        {errors.password?.message}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
