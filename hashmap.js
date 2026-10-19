class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    this.checkIndex(index);

    if (this.buckets[index] === undefined) {
      this.buckets[index] = [];
    }

    for (const item of this.buckets[index]) {
      if (item[0] === key) {
        item[1] = value;

        return;
      }
    }

    this.buckets[index].push([key, value]);

    if (this.length() > this.loadFactor * this.capacity) {
      this.grow();
    }
  }

  get(key) {
    const index = this.hash(key);

    this.checkIndex(index);

    if (this.buckets[index] === undefined) {
      return undefined;
    }

    for (const item of this.buckets[index]) {
      if (item[0] === key) {
        return item[1];
      }
    }

    return undefined;
  }

  has(key) {
    const index = this.hash(key);

    this.checkIndex(index);

    if (this.buckets[index] === undefined) {
      return false;
    }

    for (const item of this.buckets[index]) {
      if (item[0] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    this.checkIndex(index);

    if (this.buckets[index] === undefined) {
      return false;
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      if (this.buckets[index][i][0] === key) {
        this.buckets[index].splice(i, 1);

        return true;
      }
    }

    return false;
  }

  length() {
    let counter = 0;

    for (const item of this.buckets) {
      if (item !== undefined) {
        counter += item.length;
      }
    }

    return counter;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  keys() {
    let keys = [];

    for (const item of this.buckets) {
      if (item !== undefined) {
        for (const entry of item) {
          keys.push(entry[0]);
        }
      }
    }

    return keys;
  }

  values() {
    let values = [];

    for (const item of this.buckets) {
      if (item !== undefined) {
        for (const entry of item) {
          values.push(entry[1]);
        }
      }
    }

    return values;
  }

  entries() {
    let entries = [];

    for (const item of this.buckets) {
      if (item !== undefined) {
        for (const entry of item) {
          entries.push([...entry]);
        }
      }
    }

    return entries;
  }

  grow() {
    const entries = this.entries();

    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    for (const item of entries) {
      const index = this.hash(item[0]);

      this.checkIndex(index);

      if (this.buckets[index] === undefined) {
        this.buckets[index] = [];
      }

      this.buckets[index].push([item[0], item[1]]);
    }
  }

  checkIndex(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
  }
}

export { HashMap };
