export type Signal = (timeDelta: number) => number;

export type SignalGenerator = () => Signal;
