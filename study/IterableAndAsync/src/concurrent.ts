function delay<T>(time: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), time));
}

interface File {
  name: string;
  body: string;
  size: number;
}

function getFile(name: string): Promise<File> {
  return delay(1000, { name, body: ",,,", size: 100 });
}

export async function race() {
  // const result = await Promise.race([
  //   getFile("file1.png"),
  //   delay(3000, "timeout"),
  // ]);

  // if (result === "timeout") {
  //   console.log("네트워크 환경을 확인해주세요.");
  // } else {
  //   console.log(result);
  // }
  const file = getFile("file.png");
  const result = await Promise.race([file, delay(500, "timeout")]);

  if (result === "timeout") {
    console.log("로딩 ui");
    console.log(await file);
  } else {
    console.log("promise", result);
  }
}

async function concurrent<T>(limit: number, promises: (() => Promise<T>)[]) {
  // await Promise.all([promises[0](), promises[1](), promises[2]()]);
  // await Promise.all([promises[3](), promises[4](), promises[5]()]);

  const result: T[][] = [];
  for (let i = 0; i < promises.length / limit; i++) {
    const tmp: Promise<T>[] = [];
    for (let j = 0; j < limit; j++) {
      const func = promises[i * limit + j];
      if (func) {
        tmp.push(func());
      }
    }
    result.push(await Promise.all(tmp));
  }
  return result.flat();
}

function* take<T>(length: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (length-- > 0) {
    const { value, done } = iterator.next();
    if (done) break;
    yield value;
  }
}

function* chunk<T>(size: number, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const arr = [
      ...take(size, {
        [Symbol.iterator]() {
          return iterator;
        },
      }),
    ];
    if (arr.length) yield arr;
    if (arr.length < size) break;
  }
}

async function concurrent2<T>(limit: number, promises: (() => Promise<T>)[]) {
  const result: T[][] = [];
  for (let i = 0; i < promises.length / limit; i++) {
    const tmp: Promise<T>[] = [];
    for (let j = 0; j < limit; j++) {
      const func = promises[i * limit + j];
      if (func) {
        tmp.push(func());
      }
    }
    result.push(await Promise.all(tmp));
  }
  return result.flat();
}

export async function all() {
  console.time();
  const iterator = chunk(3, [1, 2, 3, 4, 5, 6, 7]);
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  console.log(iterator.next());
  // const files = await concurrent(3, [
  //   () => getFile("file1.png"),
  //   () => getFile("file2.png"),
  //   () => getFile("file3.png"),
  //   () => getFile("file4.png"),
  //   () => getFile("file5.png"),
  //   () => getFile("file6.png"),
  // ]);
  console.timeEnd();
  // console.log(files);
}
