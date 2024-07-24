import { QueueNode } from "./QueueNode.js";

export class Queue {
  head;
  tail;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  encole = (value) => {
    let puntero = this.head;
    if (puntero == null) {
      this.head = new QueueNode(value);
      this.tail = this.head;
    } else {
      /*
      for(; puntero.next != null; puntero = puntero.next);
      puntero.next = new QueueNode(value)
      this.tail = puntero.next
      */

      this.tail.next = new QueueNode(value);
      this.tail = this.tail.next;
    }
  };

  desencole = () => {
    if (this.head == null) {
      return null;
    }
    if (this.head.next == null) {
      let tmp = this.head;
      this.head = null;
      this.tail = null;
      return tmp;
    } else {
      let puntero = this.head;
      if (puntero.next.next == null) {
        let tmp = puntero.next;
        this.head.next = null;
        this.tail.next = null;
        return tmp;
      } else {
        let item;
        for (
          puntero = this.head;
          puntero.next.next != null;
          puntero = puntero.next
        ) {
          item = puntero;
        }
        let tmp = item.next.next;
        item.next.next = null;
        return tmp;
      }
    }
  };

  toString = () => {
    if (this.head != null) {
      let puntero = this.head;
      let salida = "\n";
      while (puntero != null) {
        salida += " " + puntero.toString() + "\n";
        puntero = puntero.next;
      }
      return salida;
    }
  };

  length = () => {
    let cuenta = 0;
    for (let i = this.head; i != null; i = i.next) {
      cuenta++;
    }
    return cuenta;
  };

  static fromArray = (array) => {
    let cola = new Queue();
    for (let item of array) cola.encole(item);
    return cola;
  };
}
