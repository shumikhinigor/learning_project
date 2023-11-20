import React from 'react';
import * as yup from 'yup';
import { Input, Stack, Button, Textarea } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

import { ProfileFormData, User } from 'types/users';
import { useUpdateUserMutation } from 'store/api';

const ProfileFormSchema = yup.object({
    name: yup.string().required('Обязательно поле'),
    about: yup.string(),
});

const DEFAULT_VALUES = { name: '', about: '' };

interface ProfileFormProps {
    user: User;
}
export const ProfileForm = ({ user }: ProfileFormProps) => {
    const { handleSubmit, control, formState, reset } = useForm<ProfileFormData>({
        defaultValues: DEFAULT_VALUES,
        resolver: yupResolver(ProfileFormSchema),
        values: { name: user.name, about: user.about },
    });
    const { errors, isDirty } = formState;

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    const onSubmit: SubmitHandler<ProfileFormData> = async (data: ProfileFormData) => {
        try {
            await updateProfile(data).unwrap();
            reset({ name: data.name, about: data.about });
            toast.success('Профиль обновлен');
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
                    {errors.name && <Input.Error>{errors.name.message}</Input.Error>}
                </Input.Wrapper>
                <Controller
                    name={'about'}
                    control={control}
                    render={({ field: { value, onChange, name } }) => (
                        <Textarea
                            name={name}
                            minRows={4}
                            value={value}
                            autosize={true}
                            label={'О себе'}
                            onChange={onChange}
                            placeholder={'Напишите что-нибудь о себе'}
                        />
                    )}
                />
            </Stack>

            <Button mt={24} type={'submit'} w={'100%'} loading={isLoading} disabled={!isDirty}>
                Сохранить
            </Button>
        </form>
    );
};
