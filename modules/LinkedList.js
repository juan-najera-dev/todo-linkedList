import { LinkedListNode } from "./LinkedListNode.js";

export class LinkedList {
  head;

  constructor(value, next = null) {
    this.head = new LinkedListNode(value, next);
  }

  push = (value) => {
    let nodo = new LinkedListNode(value);
    let temporal = this.head;
    this.head = nodo;
    this.head.next = temporal;
  };

  tail = (value) => {
    let nodo = new LinkedListNode(value);
    let i;
    for (i = this.head; i.next != null; i = i.next) {
      console.log("valor:", i.value);
    }
    i.next = nodo;
  };

  toString = () => {
    let puntero = this.head;
    let salida = "\n";
    do {
      salida += " " + puntero.toString() + "\n";
      puntero = puntero.next;
    } while (puntero != null);
    return salida;
  };

  length = () => {
    let cuenta = 0;
    for (let i = this.head; i != null; i = i.next) {
      cuenta++;
    }
    return cuenta;
  };

  find = (value) => {
    let puntero;
    for (puntero = this.head; puntero != null; puntero = puntero.next) {
      if (puntero.value == value) {
        break;
      }
    }
    return puntero;
  };

  search = (value) => {
    let puntero = this.head;
    for (; puntero != null; puntero = puntero.next) {
      // console.log(puntero.toString())
      if (puntero.value.compareTo(value) == 0) {
        return 0;
      }
    }
    return -1;
  };

  delete = (id) => {
    let puntero = this.head;
    if (puntero.value.id == id) {
      this.head = puntero.next;
      return 1;
    }
    for (; puntero != null; puntero = puntero.next) {
      if (puntero.value.id == this.val) {
        puntero.next = puntero.next.next;
        return 1;
      }
    }
    return -1;
  };

  static fromArreglo = (arreglo) => {
    let lista = new LinkedList(arreglo[0]);
    for (let i = 0; i < arreglo.length; i++) {
      lista.push(arreglo[i]);
    }
    return lista;
  };
}
