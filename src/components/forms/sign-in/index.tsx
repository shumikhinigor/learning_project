import React, { useEffect } from 'react';
import { Button, Input, PasswordInput, Stack } from '@mantine/core';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import { SignInFormData } from 'types/auth';
import { useSignInMutation } from 'store/api/auth';
import { useAppDispatch } from 'store/hooks';
import { setAccessToken } from 'store/slices/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from 'routes';

const SignInFormSchema = yup.object({
    password: yup.string().required('Обязательное поле'),
    email: yup.string().email('Невалидный email').required('Обязательное поле'),
});

export const SignInForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { formState, handleSubmit, control, reset } = useForm<SignInFormData>({
        resolver: yupResolver(SignInFormSchema),
        defaultValues: { email: '', password: '' },
    });

    const [signIn, { isLoading }] = useSignInMutation();

    const onSubmit: SubmitHandler<SignInFormData> = async (data: SignInFormData) => {
        const from = location.state?.from;

        try {
            const response = await signIn(data).unwrap();
            toast.success('Вы успешно авторизовались!');
            dispatch(setAccessToken(response.token));
            navigate(from ?? PATHS.HOME);
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    useEffect(() => {
        if (!location.state?.auth) return;

        const values = {
            email: location.state.email,
            password: location.state.password,
        };
        const keepStateOptions = { keepDirtyValues: true };
        reset(values, keepStateOptions);
    }, [location.state]);

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

            <Button mt={24} type={'submit'} w={'100%'} loading={isLoading}>
                Войти
            </Button>
        </form>
    );
};
