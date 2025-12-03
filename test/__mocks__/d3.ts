const selection = {
  selectAll: () => selection,
  remove: () => selection,
  attr: () => selection,
  append: () => selection,
  datum: () => selection,
  call: () => selection,
};

function select() {
  return selection;
}

function createScale() {
  const fn = (value: any) => value;
  (fn as any).domain = () => fn;
  (fn as any).range = () => fn;
  (fn as any).nice = () => fn;
  return fn;
}

function createLine() {
  const fn = () => "";
  (fn as any).x = () => fn;
  (fn as any).y = () => fn;
  (fn as any).curve = () => fn;
  return fn;
}

function createArea() {
  const fn = () => "";
  (fn as any).x = () => fn;
  (fn as any).y0 = () => fn;
  (fn as any).y1 = () => fn;
  (fn as any).curve = () => fn;
  return fn;
}

function createAxis() {
  const fn = () => {};
  (fn as any).ticks = () => fn;
  (fn as any).tickSize = () => fn;
  (fn as any).tickFormat = () => fn;
  return fn;
}

const scaleTime = createScale;
const scaleLinear = createScale;
const line = createLine;
const area = createArea;
const axisBottom = createAxis;
const axisLeft = createAxis;

const extent = () => [new Date(), new Date()];
const min = () => 0;
const max = () => 0;

const curveMonotoneX = {};

export {
  select,
  scaleTime,
  scaleLinear,
  line,
  area,
  axisBottom,
  axisLeft,
  extent,
  min,
  max,
  curveMonotoneX,
};
