const getMousePosOrDefault = (pos: number, isSm: boolean): number => {
    if (isSm) return -500;
    if (pos) return pos - 20;
    return -100;
};

export { getMousePosOrDefault };
