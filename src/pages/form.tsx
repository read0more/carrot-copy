import React, { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import RadioGroup from '../components/radioGroup';

interface LoginForm {
  department: string;
  reasonToJoin: string;
  salary: string;
  introduction: string;
  dreams: string;
  email: string;
}

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<LoginForm>({
    mode: 'onChange',
  });
  const [result, setResult] = useState('');

  const onValid = (data: LoginForm) => {
    setResult(JSON.stringify(data));
    reset();
  };

  const onInvalid = (error: FieldErrors) => {
    console.log(error);
  };

  return (
    <section className="m-auto w-screen max-w-md rounded-3xl border-2 border-r-8 border-b-8 border-black bg-pink-100">
      <h1 className="my-5 text-center text-3xl font-bold">
        Job Application Form
      </h1>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex flex-col gap-4 p-8"
      >
        <div>
          <h2 className="py-2 font-bold">
            What department do you want to work for?
            <span className="text-red-500">{errors.department?.message}</span>
          </h2>
          <RadioGroup
            values={['sales', 'marketing', 'accounting', 'customer service']}
            commonInputProps={{
              ...register('department', {
                required: '*required',
              }),
            }}
          />
        </div>

        <div className="mt-2">
          <h2 className="py-2 font-bold">
            Why do you want to join this company?
            <span className="text-red-500">{errors.reasonToJoin?.message}</span>
          </h2>
          <RadioGroup
            values={[
              'I want money!',
              'I love this company',
              'I want to learn',
              "I don't know why",
            ]}
            commonInputProps={{
              ...register('reasonToJoin', {
                required: '*required',
              }),
            }}
          />
        </div>

        <div>
          <label>
            <h2 className="py-2 font-bold">Salary</h2>
            <select
              {...register('salary')}
              className={`block w-full rounded-lg border-2 border-black p-2 font-bold ${
                errors.salary
                  ? 'border-2 border-solid outline-none focus:border-red-500'
                  : ''
              }`}
              defaultValue={'$50K'}
            >
              <option value="$50K">$50K</option>
              <option value="$100K">$100K</option>
              <option value="$150K">$150K</option>
              <option value="$200K">$200K</option>
            </select>
          </label>
          <span className="text-red-500">{errors.salary?.message}</span>
        </div>

        <div>
          <label>
            <h2 className="py-2 font-bold">Introduce yourself</h2>
            <input
              {...register('introduction', {
                required: 'Please write down your introduction.',
              })}
              type="introduction"
              className={`block w-full rounded-lg border-2 border-black p-2 font-bold ${
                errors.introduction
                  ? 'border-2 border-solid outline-none focus:border-red-500'
                  : ''
              }`}
            />
          </label>
          <span className="text-red-500">{errors.introduction?.message}</span>
        </div>

        <div>
          <label>
            <h2 className="py-2 font-bold">Tell us what your dreams are</h2>
            <textarea
              {...register('dreams', {
                required: 'Please tell us what you dreams are.',
                minLength: {
                  value: 10,
                  message: 'Please write more than 10 characters.',
                },
              })}
              rows={5}
              className={`block w-full resize-none rounded-lg border-2 border-black p-2 font-bold ${
                errors.dreams
                  ? 'border-2 border-solid outline-none focus:border-red-500'
                  : ''
              }`}
            />
          </label>
          <span className="text-red-500">{errors.dreams?.message}</span>
        </div>

        <div>
          <label>
            <h2 className="py-2 font-bold">Email</h2>
            <input
              {...register('email', {
                required: 'Please write down your email.',
                validate: {
                  notNaver: (value) =>
                    value.includes('@naver.com') || 'only naver is allowed',
                },
              })}
              type="email"
              className={`block w-full rounded-lg border-2 border-black p-2 font-bold ${
                errors.email
                  ? 'border-2 border-solid outline-none focus:border-red-500'
                  : ''
              }`}
            />
          </label>
          <span className="text-red-500">{errors.email?.message}</span>
        </div>

        <button
          type="submit"
          className="m-auto mt-10 w-full rounded-lg border-2 border-b-4 border-r-4 border-black bg-yellow-300 p-3 font-bold"
        >
          Give me this job
        </button>
      </form>
      {isSubmitSuccessful && (
        <p className="break-words p-3 font-bold">{result}</p>
      )}
    </section>
  );
}
