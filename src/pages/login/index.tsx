import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Tabs, Center } from '@mantine/core';

import { Layout } from 'components/ui';
import { SignInForm, SignUpForm } from 'components/forms';

import classes from './styles.module.css';

type ActiveTab = 'sing-in' | 'sing-up';

export const Login = () => {
    const location = useLocation();

    const [activeTab, setActiveTab] = useState<ActiveTab>('sing-in');
    const handleChangeActiveTab = (value: ActiveTab) => setActiveTab(value);

    useEffect(() => {
        if (!location.state?.auth) return;
        setActiveTab('sing-in');
    }, [location.state]);

    return (
        <Layout>
            <Container py={24} h={'100%'} className={classes.login}>
                <Center miw={'400px'}>
                    <Tabs value={activeTab} className={classes.tabs} onChange={handleChangeActiveTab}>
                        <Tabs.List className={classes.list}>
                            <Center>
                                <Tabs.Tab className={classes.item} value={'sing-in'}>
                                    Вход
                                </Tabs.Tab>
                                <Tabs.Tab className={classes.item} value={'sing-up'}>
                                    Регистрация
                                </Tabs.Tab>
                            </Center>
                        </Tabs.List>
                        <Tabs.Panel value={'sing-in'} mt={24}>
                            <SignInForm />
                        </Tabs.Panel>
                        <Tabs.Panel value={'sing-up'} mt={24}>
                            <SignUpForm />
                        </Tabs.Panel>
                    </Tabs>
                </Center>
            </Container>
        </Layout>
    );
};
