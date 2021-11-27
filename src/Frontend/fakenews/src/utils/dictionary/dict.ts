export interface Dict<T> {
	[key: string]: T;
}

const emptyDictResult: Dict<never> = {};

export const Dict = {
	empty: <T>(): Dict<T> => emptyDictResult,

	values: <T>(dict: Dict<T>): T[] => Object.values(dict),

	definedValues: <T, K extends string>(dict: Partial<Record<K, T>>): T[] =>
		Object.values(dict) as T[],

	keys: <T>(dict: Dict<T>): string[] => Object.keys(dict),

	typedKeys: <T>(dict: T): Array<keyof T> =>
		Object.keys(dict) as Array<keyof T>,

	typedEntries: <T>(dict: T): Array<[keyof T, T[keyof T]]> =>
		Object.entries(dict) as Array<[keyof T, T[keyof T]]>,

	entries: <T>(dict: Dict<T>): Array<[string, T]> => Object.entries(dict),

	fromEntries: <T>(entries: Array<[string, T]>): Dict<T> =>
		Object.fromEntries(entries),

	fromArray: <T>(
		array: readonly T[],
		keySelector: (value: T) => string
	): Dict<T> =>
		Object.fromEntries(
			array.map((value) => [keySelector(value), value] as const)
		),

	map: <T, R>(dict: Dict<T>, fn: (value: T, key: string) => R): Dict<R> =>
		Object.fromEntries(
			Dict.entries(dict).map(([key, value]) => [key, fn(value, key)] as const)
		),

	filter<T>(
		dict: Dict<T>,
		predicate: (value: T, key: string) => boolean
	): Dict<T> {
		return Object.fromEntries(
			Dict.entries(dict).filter(([key, value]) => predicate(value, key))
		);
	},

	mergeInto<T>(
		dict: Dict<T>,
		values: Iterable<T>,
		keySelector: (value: T) => string
	): Dict<T> {
		/* eslint-disable */
		for (const value of values) {
			dict[keySelector(value)] = value;
		}
		/* eslint-enable */
		return dict;
	},

	exclude<T>(values: Dict<T>, key: string): Dict<T> {
		const result = { ...values };
		delete result[key];
		return result;
	},

	excludeAll<D extends Dict<any>, K>(
		values: D,
		keys: Iterable<K>,
		keySelector: (key: K) => string
	) {
		/* eslint-disable */
		for (const key of keys) {
			delete values[keySelector(key)];
		}
		/* eslint-enable */
	},

	isEmpty<T>(dict: Dict<T>): boolean {
		/* eslint-disable */
		for (const _ in dict) {
			return false;
		}
		/* eslint-enable */
		return true;
	},

	containsKey<T>(dict: Dict<T>, key: string): boolean {
		return Dict.keys(dict).includes(key);
	},
};
