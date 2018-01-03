// @flow

type ClassName =
  | string
  | { [className: string]: ?boolean }
  | Array<ClassName>
  | false
  | void
  | null;

interface ClassSet {
  push(part: string): mixed;
}

/**
 * Concatenate an array of heterogeneous parts to a class name string
 *
 * @param  parts - array of heterogeneous parts
 * @returns the formatted class name string
 */
export function join(parts: Array<ClassName>): string {
  if (parts.length === 0) {
    return '';
  }

  const classes: Array<string> = [];
  const partsLength = parts.length;
  for (let parti = 0; parti < partsLength; parti += 1) {
    walk(parts[parti], classes);
  }
  return classes.join(' ');
}

/**
 * Concatenate all arguments to a class name string
 *
 * @param  args - heterogeneous elements
 * @returns the formatted class name string
 */
export default function classNames(...args: Array<ClassName>): string {
  return join(args);
}

function walk(value: ClassName, returnValue: ClassSet): void {
  switch (typeof value) {
    case 'string':
      if (value.length > 0) {
        returnValue.push(value);
      }
      break;
    case 'number':
      returnValue.push(String(value));
      break;
    case 'object':
      if (value === null) {
        // do nothing
      } else if (Array.isArray(value)) {
        const valueLength = value.length;
        for (let i = 0; i < valueLength; i += 1) {
          walk(value[i], returnValue);
        }
      } else {
        const keys = Object.keys(value);
        const keyc = keys.length;
        for (let i = 0; i < keyc; i += 1) {
          const key = keys[i];
          if (value[key]) {
            returnValue.push(key);
          }
        }
      }
      break;
    // no default
  }
}
