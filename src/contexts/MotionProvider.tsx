/* eslint-disable */
import { LazyMotion } from 'framer-motion';
import { FC } from 'react';

const asyncFeatures = () => import('./features').then((res) => res.default);

const MotionProvider: FC = ({ children }) => (
    <LazyMotion features={asyncFeatures}>{children}</LazyMotion>
);
export default MotionProvider;
