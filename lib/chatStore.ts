let listeners: ((open: boolean) => void)[] = [];

export const chatStore = {
  open: false,
  toggle() {
    this.open = !this.open;
    listeners.forEach((fn) => fn(this.open));
  },
  subscribe(fn: (open: boolean) => void) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }
};
