import React from 'react';
import { Container, Button, Overlay, Title, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

import { PATHS } from 'routes';

import { Layout } from 'components/ui';

import classes from './styles.module.css';

import BackgroundAVIF from 'assets/background.avif';

export const Home = () => {
    return (
        <Layout>
            <div className={classes.hero} style={{ backgroundImage: `url(${BackgroundAVIF})` }}>
                <Overlay
                    gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                    opacity={1}
                    zIndex={0}
                />
                <Container className={classes.container} size="md">
                    <Title className={classes.title}>CodeCats - блог о программировании и мире кошек</Title>
                    <Text className={classes.description} size="xl" mt="xl">
                        Добро пожаловать на блог «CodeCats» - место, где кошки становятся звездами и источником
                        вдохновения для программистов. Здесь мы погружаемся в удивительный мир кошачьих, постигаем их
                        тайны и разделяем веселье и истории наших пушистых друзей.
                    </Text>

                    <Link to={PATHS.POSTS}>
                        <Button
                            size={'xl'}
                            radius={'xl'}
                            variant={'gradient'}
                            className={classes.control}
                            gradient={{ from: 'red', to: 'pink', deg: 90 }}
                        >
                            Читать
                        </Button>
                    </Link>
                </Container>
            </div>
        </Layout>
    );
};
