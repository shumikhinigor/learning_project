import React from 'react';
import * as yup from 'yup';
import { Input, Stack } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { ProfileFormData, User } from 'types/users';

const ProfileFormSchema = yup.object({
    name: yup.string().required(),
    about: yup.string(),
});

const DEFAULT_VALUES = { name: '', about: '' };

interface ProfileFormProps {
    user: User;
}
export const ProfileForm = ({ user }: ProfileFormProps) => {
    const { handleSubmit, control, formState, reset } = useForm<ProfileFormData>({
        values: user,
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(ProfileFormSchema),
    });

    const onSubmit: SubmitHandler<ProfileFormData> = async (data: ProfileFormData) => {
        try {
            console.log('data: ', data);
            // await updateProfile(data).unwrap();
            toast.success('Профиль обновлен');
            reset(DEFAULT_VALUES);
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <Input.Wrapper label={'Имя'}>
                    <Controller
                        name={'name'}
                        control={control}
                        render={({ field: { value, onChange, name } }) => (
                            <Input name={name} value={value} onChange={onChange} placeholder={'Имя'} />
                        )}
                    />
                    {formState.errors.name && <Input.Error>{formState.errors.name.message}</Input.Error>}
                </Input.Wrapper>
            </Stack>
        </form>
    );
};
