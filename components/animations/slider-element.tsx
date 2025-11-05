"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, {
  useId,
  Key,
  SyntheticEvent,
  useContext,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Context,
  useState,
} from "react";

type TriggerEvent = Partial<SyntheticEvent> & {
  currentTarget: EventTarget & HTMLElement;
};

interface TriggerState<K extends Key = Key> {
  offsetLeft?: number;
  offsetTop?: number;
  width?: number;
  height?: number;
  label?: K;
  element?: HTMLElement;
  event?: TriggerEvent;
}

interface Data<K extends Key = Key> {
  exists?: boolean;
  loaded?: boolean;
  hover?: boolean;
  selected?: TriggerState<K>;
  current?: TriggerState<K>;
  query?: TriggerState<K>;
  config?: SliderElementConfig<K>;
}

export function getTriggerState<K extends Key>(
  e: TriggerEvent,
  label?: K
): TriggerState<K> {
  const trigger = e.currentTarget;
  const { offsetLeft, offsetTop, ariaLabel } = trigger;
  const { height, width } = trigger.getBoundingClientRect();
  return {
    offsetLeft,
    offsetTop,
    height,
    width,
    label: label ?? (ariaLabel as K) ?? "-1",
    element: trigger,
    event: e,
  };
}

export interface SliderElementConfig<K extends Key = Key> {
  key?: K;
  keys?: K[];
  schema?: K;
  type?: K;
  types?: K[];
  fallback?:
    | number
    | "query"
    | "hide"
    | "selected"
    | "last"
    | `${number}px`
    | [`${number}px`, `${number}px`]
    | TriggerState<K>
    | [number, number];
  query?: K | true;
  selected?: K | true;
  value?: K;
  label?: K;
  leaveOn?: "trigger" | "container";
  disabled?: boolean;
  disableEnter?: boolean;
  disableHover?: boolean;
  disableSelect?: boolean;
  state?: TriggerState<K>;
  zIndex?: number;
  duration?: number | `${number}${"s" | "ms" | ""}`;
  debug?: boolean | React.ReactNode;
  debugZIndex?: number;
  triggerZIndex?: number;
  contentZIndex?: number;
  display?: boolean;
  raw?: boolean;
  on?: boolean | K;
  startVisible?: boolean;
  loaded?: boolean;
  onSelect?: (value: K) => void;
  onContainerEnter?: (data: Data<K>, e: TriggerEvent) => void;
  onContainerLeave?: (data: Data<K>, e: TriggerEvent) => void;
  onSliderLeave?: (data: Data<K>, e?: TriggerEvent) => void;
  onSliderEnter?: (data: Data<K>, e?: TriggerEvent) => void;
  onSliderSelect?: (data: Data<K>, e?: TriggerEvent) => void;
  onTriggerEnter?: (data: Data<K>, e?: TriggerEvent) => false | void;
  onTriggerSelect?: (data: Data<K>, e?: TriggerEvent) => false | void;
  onTriggerLeave?: (data: Data<K>, e?: TriggerEvent) => void;
  onTargetEnter?: (data: Data<K>, e?: TriggerEvent) => false | void;
  onTargetLeave?: (data: Data<K>, e?: TriggerEvent) => void;
}

export interface SliderContext<K extends Key = Key> {
  data: Data<K>;
  setData: React.Dispatch<React.SetStateAction<Data<K>>>;
  config: SliderElementConfig<K>;
  leave: (e?: TriggerEvent) => void;
  setCurrent: (state: TriggerState<K>) => void;
  setSelected: (state: TriggerState<K>) => void;
  setQuery: (state: TriggerState<K>) => void;
  id: string;
}

export const SliderContext = React.createContext<SliderContext>(
  {} as SliderContext
);

export function useSliderElement() {
  const context = useContext(SliderContext);
  return {
    ...context.config,
    ...context,
    ...context.data,
    ...context.data.current,
  };
}

interface Props<K extends Key> extends SliderElementConfig<K> {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
  props?: React.HTMLProps<HTMLDivElement>;
  keys?: K[];
}

export function SliderElement<K extends Key>({
  children,
  asChild,
  className,
  props,
  ...config
}: Props<K>) {
  const [data, setData] = React.useState<Data<K>>({
    config,
    selected: { label: String(config.selected || "") as K },
  });
  const id = useId();
  const Comp = asChild ? Slot : "div";

  config.query ??= config.value;

  const leave = useCallback(
    function leave(e?: TriggerEvent) {
      if (
        config.leaveOn !== "container" &&
        e?.currentTarget !== data.current?.element
      )
        return;
      setData((p) => {
        config.onSliderLeave?.(p, e);
        const { fallback } = config;
        let chosen: TriggerState<K> = {};
        if (typeof fallback === "string") {
          if (fallback === "selected") {
            chosen = p.selected || p.query || {};
          }
          if (fallback === "query") {
            chosen = p.query || p.selected || {};
          }
          if (fallback?.endsWith("px")) {
            chosen = {
              offsetLeft: Number(fallback.split("").filter(Number).join()),
            };
          }
        } else if (typeof fallback === "object") {
          if (Array.isArray(fallback)) {
            const offset = fallback.map((s) =>
              typeof s === "string"
                ? Number(s.split("").filter(Number).join())
                : s
            );
            chosen = { offsetLeft: offset[0], offsetTop: offset[1] };
          } else {
            chosen = fallback;
          }
        } else {
          chosen = { offsetLeft: fallback };
        }
        return {
          ...p,
          current: { ...p.current, ...chosen },
          hover: false,
        };
      });
    },
    [setData, config, data]
  );

  const setCurrent = useCallback(
    function setCurrent(state: TriggerState<K>, e?: TriggerEvent) {
      if (!data.exists) setData((p) => ({ ...p, exists: true }));
      if (config.disableHover) return;
      config.onSliderEnter?.(data, e);
      setData((p) => {
        const newData = { ...p, hover: true, last: p.current, current: state };
        config.onSliderEnter?.(newData, e);
        return newData;
      });
    },
    [setData, config, data]
  );

  const setSelected = useCallback(
    function setSelected(state: TriggerState<K>, e?: TriggerEvent) {
      if (state.element === data.selected?.element) return;
      if (config.disableSelect) return;
      config.onSelect?.(state.label as K);
      setData((p) => {
        const newData = { ...p, selected: state };
        config.onSliderSelect?.(newData, e);
        return newData;
      });
    },
    [setData, config, data]
  );

  const setQuery = useCallback(
    function setQuery(state: TriggerState<K>) {
      setData((p) => ({
        ...p,
        current: p.hover ? p.current : state,
        query: state,
      }));
    },
    [setData]
  );

  useEffect(() => {
    if (data.exists) {
      const timeout = setTimeout(() => {
        setData((p) => ({ ...p, loaded: true }));
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [data.exists, setData]);

  const elementContext = useMemo(
    () => ({
      id,
      data,
      setData,
      config,
      leave,
      setCurrent,
      setSelected,
      setQuery,
    }),
    [id, data, setData, config, leave, setCurrent, setSelected, setQuery]
  );

  return (
    <SliderContext.Provider value={elementContext as unknown as SliderContext}>
      <Comp
        id={`se-${id}`}
        className={cn("relative", className)}
        style={{ position: "relative" }}
        onMouseEnter={(e) => {
          config.onContainerEnter?.(data, e);
          if (!data.exists) setData((p) => ({ ...p, exists: true }));
        }}
        onMouseLeave={(e) => {
          config.onContainerLeave?.(data, e);
          if (data.hover && config.leaveOn === "container") leave(e);
        }}
        {...props}
      >
        {children}
      </Comp>
    </SliderContext.Provider>
  );
}

export function SliderElementTrigger<K extends Key>({
  children,
  asChild,
  className,
  props,
  ...newConfig
}: Props<K>) {
  const {
    config: oldConfig,
    data,
    setCurrent,
    setSelected,
    setQuery,
    leave,
  } = useContext(SliderContext as unknown as Context<SliderContext<K>>);
  const config = { ...oldConfig, ...newConfig };
  const Comp = asChild ? Slot : "div";
  const ref = useRef<HTMLDivElement>(null);
  config.label ??= config.value || (config.query as K) || config.key;

  function handleEnter(e: TriggerEvent) {
    if (config.disabled || config.disableEnter) return;
    const state = getTriggerState(e, config.label);
    if (config.onTriggerEnter?.(data, e) === false) return;
    setCurrent(state);
  }

  function handleSelect(e: TriggerEvent) {
    if (config.disabled || config.disableSelect) return;
    const state = getTriggerState(e, config.label);
    if (config.onTriggerSelect?.(data, e) === false) return;
    setSelected(state);
  }

  function handleLeave(e: TriggerEvent) {
    if (config.disabled) return;
    config.onTriggerLeave?.(data, e);
    if (config.leaveOn === "trigger" || config.leaveOn === undefined) leave(e);
  }

  useEffect(() => {
    if (
      ref.current &&
      (config.label === config.query ||
        config.query === true ||
        config.selected)
    ) {
      setQuery(getTriggerState({ currentTarget: ref.current }, config.label));
    }
  }, [config.label, config.selected, config.query, ref, setQuery]);

  useEffect(() => {
    if (!ref.current) return;
    if (newConfig.selected === true || data.selected?.label === config.label) {
      setSelected(
        getTriggerState({ currentTarget: ref.current }, config.label)
      );
    }
  }, [ref, newConfig.selected, config.label, data.selected, setSelected]);
  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        zIndex: config.triggerZIndex ?? config.zIndex ?? 1,
        position: "relative",
      }}
      onKeyDown={(e) => e.key.match(/Enter/gi) && handleSelect(e)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      onClick={handleSelect}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function SliderElementContent<K extends Key>({
  children,
  className,
  props,
  ...newConfig
}: Props<K>) {
  const { config: oldConfig, data } = useContext(
    SliderContext as unknown as Context<SliderContext<K>>
  );
  const config = { ...oldConfig, ...newConfig };
  const { style } = props ?? {};

  let transitionDuration: undefined | string;
  if (config.duration) {
    if (typeof config.duration === "number" || Number(config.duration) > 0) {
      transitionDuration = `${config.duration}${
        Number(config.duration) > 5 ? "ms" : "s"
      }`;
    } else {
      transitionDuration = config.duration;
    }
  }

  const loaded =
    data.exists || config.loaded || data.loaded || config.startVisible;

  const [ready, setReady] = useState(config.startVisible);

  const { width, height, offsetLeft, offsetTop } =
    config.state ??
    (newConfig.selected
      ? data.selected
      : newConfig.query
      ? data.query
      : data.current) ??
    {};

  useEffect(() => {
    if (loaded === true) {
      const timer = setTimeout(() => {
        setReady(true);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded || !data.current) return null;

  config.on ??= config.label;
  config.display ??= config.on ? config.on === data.current.label : true;

  return (
    <div
      className={cn(
        !config.raw &&
          !config.duration &&
          (data.hover ? "duration-400" : "duration-700"),
        !config.raw &&
          config.fallback === "hide" &&
          (data.hover ? "scale-100 opacity-100" : "scale-[0.4] opacity-0"),
        !ready && "scale-[0.4]!",
        "flex items-center justify-center",
        children ? className : "",
        props?.className
      )}
      tabIndex={-1}
      onMouseEnter={(e) => config.onTargetEnter?.(data, e)}
      onMouseLeave={(e) => config.onTargetLeave?.(data, e)}
      {...props}
      style={{
        position: "absolute",
        width: `${width || 0}px`,
        height: `${height || 0}px`,
        left: `${offsetLeft || 0}px`,
        top: `${offsetTop || 0}px`,
        transitionDuration,
        zIndex:
          config.contentZIndex ??
          newConfig.zIndex ??
          (config.triggerZIndex ?? config.zIndex ?? 1) - 1,
        opacity: config.display || config.raw ? undefined : 0,
        scale: config.display || config.raw ? undefined : 0.3,
        ...style,
      }}
    >
      {children ?? (
        <div
          className={cn(
            "bg-background border border-border rounded-sm size-full",
            className
          )}
        />
      )}
      {config.debug && (
        <pre
          className="absolute flex justify-center items-start opacity-50 size-full text-[12px] text-center translate-y-full"
          style={{ zIndex: config.debugZIndex }}
        >
          {config.debug === true
            ? `x-[${Math.round(offsetLeft || 0)}px] y-[${Math.round(
                offsetTop || 0
              )}px]\nw-[${Math.round(width || 0)}px] h-[${Math.round(
                height || 0
              )}px]\n ${data.current?.label} ${
                data.selected || data.query
                  ? `[${
                      (config.fallback === "query"
                        ? data.query?.label
                        : data.selected?.label) || "---"
                    }]`
                  : ""
              }`
            : config.debug}
        </pre>
      )}
    </div>
  );
}

//! OLD
export const Slider = SliderElement;
export const SliderProvider = SliderElement;
export function SliderList<K extends Key>({ children, ...props }: Props<K>) {
  return (
    <Slider {...props} asChild>
      <ul>{children}</ul>
    </Slider>
  );
}
export const SliderDiv = SliderElement;
export const SliderContainer = SliderDiv;
export const SliderItem = SliderElementTrigger;
export const SliderPlace = SliderItem;
export function SliderListItem<K extends Key>({
  children,
  ...props
}: Props<K>) {
  return (
    <SliderItem {...props} asChild>
      <li>{children}</li>
    </SliderItem>
  );
}
export const SliderLITrigger = SliderListItem;
export const SliderDivItem = SliderItem;
export const SliderDivTrigger = SliderDivItem;
export const SliderContent = SliderElementContent;
export function SliderElementArea<K extends Key>({
  children,
  keys,
  className,
  ...props
}: Props<K>) {
  return (
    <Slider
      className={cn("flex flex-row justify-around items-center", className)}
      {...props}
      asChild
    >
      <ul>
        {Array.isArray(children)
          ? children.map((child, index) => (
              <SliderElementTrigger
                key={keys?.[index] ?? String(index)}
                asChild
              >
                <li>{child}</li>
              </SliderElementTrigger>
            ))
          : children}
        <SliderElementContent />
      </ul>
    </Slider>
  );
}
export const SliderArea = SliderElementArea;
export default SliderElementArea;
