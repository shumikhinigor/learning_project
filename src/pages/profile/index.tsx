import React, { useState } from 'react';
import { Container, Center, Avatar, Loader, Stack, Text, Anchor, Button, Input, Group, Title } from '@mantine/core';
import { toast } from 'react-toastify';

import { useGetUserQuery, useUpdateUserAvatarMutation } from 'store/api';

import { withProtect } from 'hocs/withProtect';

import { User } from 'types/users';

import { Layout } from 'components/ui';
import { ProfileForm } from 'components/forms';

export const Profile = withProtect(() => {
    const [avatar, setAvatar] = useState<User['avatar']>('');
    const [isSetAvatar, setIsSetAvatar] = useState<boolean>(false);

    const { data: user, isLoading } = useGetUserQuery();

    const [updateAvatar, { isLoading: idUpdateAvatarLoading }] = useUpdateUserAvatarMutation();

    const handleChangeAvatar = async () => {
        try {
            await updateAvatar({ avatar }).unwrap();
            setIsSetAvatar(false);
            toast.success('Аватар обновлен');
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return (
        <Layout>
            {isLoading ? (
                <Center mt={24}>
                    <Loader type={'bars'} />
                </Center>
            ) : (
                <Container py={24}>
                    <Title mb={24}>Профиль</Title>
                    <Stack mb={32} align={'flex-start'}>
                        {!isSetAvatar ? (
                            <React.Fragment>
                                <Avatar size={'xl'} src={user.avatar} alt={user.name} />
                                <Button onClick={() => setIsSetAvatar((prevState) => !prevState)}>
                                    Изменить аватар
                                </Button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Input.Wrapper label={'Ссылка на аватар'}>
                                    <Input
                                        miw={'400'}
                                        value={avatar}
                                        name={'avatar'}
                                        placeholder={'Вставьте ссылку'}
                                        onChange={(evt) => setAvatar(evt.target.value)}
                                    />
                                </Input.Wrapper>
                                <Group>
                                    <Button
                                        disabled={!avatar}
                                        onClick={handleChangeAvatar}
                                        loading={idUpdateAvatarLoading}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button variant={'default'} onClick={() => setIsSetAvatar(false)}>
                                        Отменить
                                    </Button>
                                </Group>
                            </React.Fragment>
                        )}
                    </Stack>

                    <Stack>
                        <Stack gap={0}>
                            <Text size={'sm'} fw={500}>
                                Email
                            </Text>
                            <Anchor size={'sm'} href={`mailto:${user.email}`} underline={'never'}>
                                {user.email}
                            </Anchor>
                        </Stack>
                        <Stack gap={0}>
                            <Text size={'sm'} fw={500}>
                                Группа
                            </Text>
                            <Text size={'sm'}>{user.group}</Text>
                        </Stack>
                        <ProfileForm user={user} />
                    </Stack>
                </Container>
            )}
        </Layout>
    );
});
