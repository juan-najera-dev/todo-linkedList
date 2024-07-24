export class QueueNode {
  value;
  next;

  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString = () => {
    return `id: ${this.value.id} value: ${this.value.value} next: ${
      this.next == null ? null : "object"
    }`;
  };
}
