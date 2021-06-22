import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const clientImport = (path: string): ComponentType =>
    dynamic(() => import(path), { ssr: false });

export default clientImport;
