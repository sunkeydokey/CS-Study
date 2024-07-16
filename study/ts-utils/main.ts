const test = (a: number) => a;

const res = test(2);

type Test<T extends number> = T extends 2 ? 3 : 4;
type CC = Test<1>;

type Head<T extends any[]> = T extends [infer A, ...any[]] ? A : undefined;

// type Head1 = Head<[1, 2, 3, 4]>; // 1
// type Head2 = Head<[1]>; // 1
// type Head3 = Head<[]>; // undefined

type Equal<A, B> = A extends B ? (B extends A ? 1 : 0) : 0;
type Equal1 = Equal<1, 1 | 2>;

const Pass = 1;
const Fail = 0;
declare function check<A, B>(params: Equal<A, B>): void;

check<1, 1>(Pass);
check<1, 2>(Fail);

check<Head<[1, 2, 3, 4]>, 1>(Pass);
check<Head<[1]>, 1>(Pass);
check<Head<[]>, 1>(Fail);
check<Head<[]>, undefined>(Pass);

type Length<T extends any[]> = T["length"];
check<Length<[1, 2, 3]>, 3>(Pass);

type HasTail<T extends any[]> = Length<T> extends 0 ? false : true;
check<HasTail<[1, 2, 3]>, true>(Pass);
check<HasTail<[1]>, true>(Pass);
check<HasTail<[]>, true>(Fail);

type Tail<T extends any[]> = T extends [any, ...infer A] ? A : [];
check<Tail<[1, 2, 3, 4, 5]>, [2, 3, 4, 5]>(Pass);
check<Tail<[4, 5]>, [5]>(Pass);
check<Tail<[4]>, []>(Pass);
check<Tail<[]>, []>(Pass);

type Last<T extends any[]> = T extends [...any[], infer A] ? A : undefined;
check<Last<[1, 2, 3, 4]>, 4>(Pass);
check<Last<[1, 2, 3]>, 3>(Pass);
check<Last<[]>, undefined>(Pass);

type Pretend<T extends any[], E> = [E, ...T];
check<Pretend<[], 1>, [1]>(Pass);
check<Pretend<[3, 4, 5], 2>, [2, 3, 4, 5]>(Pass);

type Drop<N, T extends any[], P extends any[] = []> = {
  0: T;
  1: Drop<N, Tail<T>, Pretend<P, any>>;
}[Length<P> extends N ? 0 : 1];

check<Drop<3, [1, 2, 3, 4, 5, 6]>, [4, 5, 6]>(Pass);
check<Drop<0, [1, 2, 3, 4, 5, 6]>, [1, 2, 3, 4, 5, 6]>(Pass);
check<Drop<6, [1, 2, 3, 4, 5, 6]>, []>(Pass);
check<Drop<7, [1, 2, 3, 4, 5, 6]>, []>(Pass);

type Reverse<T extends any[], P extends any[] = []> = {
  0: P;
  1: Reverse<Tail<T>, Pretend<P, Head<T>>>;
}[Length<T> extends 0 ? 0 : 1];
check<Reverse<[1, 2, 3, 4, 5, 6]>, [6, 5, 4, 3, 2, 1]>(Pass);

type Concat<A extends any[], B extends any[]> = [...A, ...B];
check<Concat<[1, 2, 3], [4, 5, 6]>, [1, 2, 3, 4, 5, 6]>(Pass);

type Append<A extends any[], B> = Concat<A, [B]>;
check<Append<[1, 2, 3], 4>, [1, 2, 3, 4]>(Pass);
