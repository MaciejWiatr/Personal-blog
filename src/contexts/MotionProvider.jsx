/* eslint-disable */
import { LazyMotion } from 'framer-motion';

const asyncFeatures = () => import('./features').then((res) => res.default);

const MotionProvider = ({ children }) => (
    <LazyMotion features={asyncFeatures}>{children}</LazyMotion>
);
export default MotionProvider;
