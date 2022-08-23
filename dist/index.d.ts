interface EventObserverInterface {
    emit(type: string, data?: Object): void;
    on(type: string, subscriber: Function): void;
    off(type: string, subscriber: Function): void;
}
declare class EventObserver implements EventObserverInterface {
    #private;
    constructor();
    getSubscribers(type: string): Array<Function>;
    emit(type: string, data?: Object): void;
    on(type: string, subscriber: Function): void;
    off(type?: string, subscriber?: Function): void;
}
interface AnimationMinMax {
    min: number;
    max: number;
}
interface ContentOptionsBase {
    el: HTMLElement;
    duration: number;
    delay: number;
}
interface PartsOptionsBase {
    elsList: Array<HTMLElement>;
    duration: AnimationTimeRange;
    delay: AnimationTimeRange;
}
type AnimationTimeRange = AnimationMinMax;
interface ContentOptionsCss extends ContentOptionsBase {
    class: string;
}
interface PartsOptionsCss extends PartsOptionsBase {
    class: string;
}
interface ContentOptionsJs extends ContentOptionsBase {
    draw(el: HTMLElement, f: number): void;
    timing(n: number): number;
}
interface PartsOptionsJs extends PartsOptionsBase {
    draw(el: HTMLElement, f: number): void;
    timing(n: number): number;
}
interface ContentOptions extends Partial<ContentOptionsJs>, Partial<ContentOptionsCss> {
}
interface PartsOptions extends Partial<PartsOptionsJs>, Partial<PartsOptionsCss> {
}
type AnimationType = "css" | "js";
interface AnimationOptions {
    content: ContentOptions;
    parts?: PartsOptions;
    reverseOrder?: boolean;
    type?: AnimationType;
}
type PartsAnimationOptions = PartsOptions;
type ContentAnimationOptions = ContentOptions;
type ContentOptions$0 = {
    selector?: string;
    animationIn?: Omit<ContentAnimationOptions, "el">;
    animationOut?: Omit<ContentAnimationOptions, "el">;
};
interface PartsOptions$0 {
    selector?: string;
    animationIn?: Omit<PartsAnimationOptions, "el">;
    animationOut?: Omit<PartsAnimationOptions, "el">;
}
type DynamicRouteOptions = {
    linkSelector?: string;
    animationType?: AnimationType;
    content?: ContentOptions$0;
    parts?: PartsOptions$0;
};
interface DynamicRoutePublicProps {
    linkSelector: string;
    animationType: AnimationType;
    content: Required<ContentOptions$0>;
    parts: Required<PartsOptions$0>;
}
interface DynamicRoute extends DynamicRoutePublicProps {
    /**
     * attach all required listeners
     */
    run(): void;
    /**
     * detach all required listeners
     */
    destroy(): void;
}
declare class DynamicRoute extends EventObserver {
    #private;
    constructor(options?: DynamicRouteOptions);
    getAnimationProps(type: "in" | "out"): Required<AnimationOptions>;
}
export { DynamicRoute as default };
