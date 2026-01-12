// Type declarations for GSAP premium plugins (now free as of April 2025)

declare module "gsap/SplitText" {
    type SplitTextTarget = Element | string | Element[] | string[] | NodeList;

    export class SplitText {
        constructor(target: SplitTextTarget, vars?: SplitTextVars);
        chars: Element[];
        words: Element[];
        lines: Element[];
        elements: Element[];
        isSplit: boolean;
        split(vars?: SplitTextVars): void;
        revert(): void;
        static create(target: SplitTextTarget, vars?: SplitTextVars): SplitText;
    }

    interface SplitTextVars {
        type?: string;
        charsClass?: string;
        wordsClass?: string;
        linesClass?: string;
        position?: string;
        specialChars?: string[] | ((char: string, index: number, allChars: string[]) => number);
        reduceWhiteSpace?: boolean;
        aria?: boolean;
        [key: string]: unknown;
    }
}

declare module "gsap/ScrollSmoother" {
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    export class ScrollSmoother {
        static create(vars?: ScrollSmootherVars): ScrollSmoother;
        static get(): ScrollSmoother | undefined;
        static refresh(force?: boolean): void;
        static register(gsap: unknown): void;
        content: HTMLElement;
        wrapper: HTMLElement;
        smooth: number;
        effects: boolean | string;
        scrollTop(value?: number): number;
        scrollTo(target: Element | string | number | null, smooth?: boolean, position?: string): void;
        paused(value?: boolean): boolean;
        kill(): void;
        getVelocity(): number;
        progress: number;
        normalizer: ScrollTrigger | null;
    }

    interface ScrollSmootherVars {
        wrapper?: Element | string;
        content?: Element | string;
        smooth?: number;
        speed?: number;
        effects?: boolean | string;
        smoothTouch?: number | boolean;
        normalizeScroll?: boolean | object;
        ignoreMobileResize?: boolean;
        autoResize?: boolean;
        onUpdate?: (self: ScrollSmoother) => void;
        onStop?: (self: ScrollSmoother) => void;
        onFocusIn?: (self: ScrollSmoother, element: Element, trigger: ScrollTrigger) => boolean | void;
        [key: string]: unknown;
    }
}
