import create from "zustand";

interface IMouseStore {
	isHovered: boolean;
	hoverImg: null | string;
	setHovered: (value: boolean) => void;
	setHoverImg: (img: string) => void;
	resetState: () => void;
}

const useMouseStore = create<IMouseStore>((set) => ({
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
