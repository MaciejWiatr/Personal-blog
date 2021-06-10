import create from "zustand";

const useMouseStore = create((set) => ({
	isHovered: false,
	hoverImg: null,
	setHovered: (value: boolean) =>
		set(() => ({
			isHovered: value,
		})),
	setHoverImg: (img: string) => set({ hoverImg: img }),
	resetState: () => set({ isHovered: false, hoverImg: null }),
}));

export default useMouseStore;
