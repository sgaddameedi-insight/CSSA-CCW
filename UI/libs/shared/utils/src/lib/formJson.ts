/* eslint-disable @typescript-eslint/no-explicit-any */
import get from 'lodash.get';
import set from 'lodash.set';
import { Item } from '../types';

const numberType = ['number', 'range'];
const dateType = ['month', 'date'];

function itemsOf(form: HTMLFormElement): Item[] {
  const items = [];
  const { elements } = form;
  const { length } = elements;

  for (let i = 0; i < length; ++i) {
    // eslint-disable-next-line prefer-const
    let { name, value, type, checked, files } = elements.item(
      i
    ) as HTMLInputElement;

    if (type === 'checkbox') {
      value = !!checked as any;
    }

    if (type === 'radio' && !checked) {
      continue;
    }

    if (type === 'file') {
      value = URL.createObjectURL(files[0]);
    }

    if (numberType.includes(type)) {
      value = parseFloat(value) as any;
    }

    if (dateType.includes(type)) {
      value = new Date(value) as any;
    }

    items.push({ name, value, type, checked });
  }

  return items;
}

function reduced<T extends object>(sum: T, { name, value }: Item) {
  const target = get(sum, name);

  if (!target) {
    set(sum, name, value);
  } else if (target instanceof Array) {
    target.push(value);
  } else {
    set(sum, name, [target, value]);
  }

  return sum;
}

export default function formJson<T extends object>(form: HTMLFormElement): T {
  return itemsOf(form)
    .filter(i => i.name)
    .reduce<T>(reduced, {} as T);
}
