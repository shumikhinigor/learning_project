import React, { useEffect } from 'react';
import { Button, Input, PasswordInput, Stack } from '@mantine/core';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { SignUpFormData } from 'types/auth';
import { useSignUpMutation } from 'store/api/auth';
import { useNavigate } from 'react-router-dom';
import { PATHS } from 'routes';

const SignUpFormSchema = yup.object({
    email: yup.string().email('Невалидный email').required('Обязательное поле'),
    group: yup
        .string()
        .lowercase()
        .matches(/ra-.+/gi, { message: 'Группа должна начинаться с ra-' })
        .required('Обязательное поле')
        .strict(),
    password: yup
        .string()
        .min(6, 'Не может быть меньше 6 символов')
        .max(24, 'Не может быть больше 24 символов')
        .required('Обязательное поле'),
});

const DEFAULT_VALUES = { email: '', group: '', password: '' };

export const SignUpForm = () => {
    const navigate = useNavigate();

    const { handleSubmit, control, formState, reset } = useForm<SignUpFormData>({
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(SignUpFormSchema),
    });

    const [signUp, { isFetching }] = useSignUpMutation();

    const onSubmit: SubmitHandler<SignUpFormData> = async (data: SignUpFormData) => {
        try {
            await signUp(data).unwrap();
            toast.success('Вы успешно зарегистрировались. Войдите в систему!');
            reset(DEFAULT_VALUES);
            navigate(PATHS.LOGIN, { state: { auth: true, ...data } });
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Input.Wrapper label={'Email'}>
                    <Controller
                        name={'email'}
                        control={control}
                        render={({ field: { value, onChange, name } }) => (
                            <Input name={name} value={value} onChange={onChange} placeholder={'Email'} />
                        )}
                    />
                    {formState.errors.email && <Input.Error>{formState.errors.email.message}</Input.Error>}
                </Input.Wrapper>
                <Input.Wrapper label={'Группа'}>
                    <Controller
                        name={'group'}
                        control={control}
                        render={({ field: { value, onChange, name } }) => (
                            <Input name={name} value={value} onChange={onChange} placeholder={'Группа'} />
                        )}
                    />
                    {formState.errors.group && <Input.Error>{formState.errors.group.message}</Input.Error>}
                </Input.Wrapper>
                <Input.Wrapper label={'Пароль'}>
                    <Controller
                        name={'password'}
                        control={control}
                        render={({ field: { value, onChange, name } }) => (
                            <PasswordInput name={name} value={value} onChange={onChange} placeholder={'Пароль'} />
                        )}
                    />
                    {formState.errors.password && <Input.Error>{formState.errors.password.message}</Input.Error>}
                </Input.Wrapper>
            </Stack>

            <Button mt={24} type={'submit'} w={'100%'} loading={isFetching}>
                Зарегистрироваться
            </Button>
        </form>
    );
};
