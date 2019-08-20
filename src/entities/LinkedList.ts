export interface LinkedListItem {
  previous?: LinkedListItem;
  next?: LinkedListItem;
}

export interface LinkedListItemHead extends LinkedListItem {
  previous: LinkedListItem;
}

export interface LinkedListItemTail extends LinkedListItem {
  next: LinkedListItem;
}

export interface LinkedListItemPreHead extends LinkedListItem {
  next: LinkedListItemHead;
}

export interface LinkedListItemPreTail extends LinkedListItem {
  previous: LinkedListItemTail;
}

export interface LinkedList<T> {
  head: T & LinkedListItemHead;
  tail: (T & LinkedListItemTail) | LinkedListItemTail;
  size: number;
}

export function appendItemToList<T>(
  list: LinkedList<T>,
  item: T
): LinkedList<T> {
  const previous = list.head;
  const head: LinkedListItemHead = { previous };

  const newPrevious = (previous as any) as LinkedListItemPreHead;

  // injecting circular dependency
  // tslint:disable
  newPrevious.next = head;
  Object.assign(head, item);
  // tslint:enable

  return {
    head: head as LinkedListItemHead & T,
    size: list.size + 1,
    tail: list.tail
  };
}

export function prependItemToList<T>(
  list: LinkedList<T>,
  item: T
): LinkedList<T> {
  const next = list.tail;
  const tail: LinkedListItemTail = { next };

  const newNext = (next as any) as LinkedListItemPreTail;

  // injecting circular dependency
  // tslint:disable
  newNext.previous = tail;
  Object.assign(tail, item);
  // tslint:enable

  return {
    head: list.head,
    size: list.size + 1,
    tail
  };
}

export function initList<T>(firstValue: T): LinkedList<T> {
  const tailEmpty = {};

  const head = {
    ...firstValue,
    previous: tailEmpty
  };

  const tail = tailEmpty as LinkedListItemTail;

  // injecting circular dependency
  // tslint:disable-next-line
  tail.next = head;

  return {
    head,
    size: 1,
    tail
  };
}

export function listToArray<T>(list: LinkedList<T>): T[] {
  return new Array(list.size)
    .fill(null)
    .reduce((acc: Array<T & LinkedListItem>, _, i) => {
      const prevItem = acc[i - 1] || list.tail;
      const next = prevItem.next as T & LinkedListItem;

      return [...acc, next];
    }, []);
}
