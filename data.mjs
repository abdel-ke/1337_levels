import { loadProducts } from './main.mjs'
import { Api } from './auth.mjs'

export const dateStirng = [
	"",
	"2018-10-02T22:00:00.000Z,2018-10-04T01:32:41.658Z",
	"2019-03-24T23:00:00.000Z,2019-03-28T00:00:00.000Z",
	"2019-10-16T00:00:00.000Z,2019-10-17T00:00:00.000Z",
	"2021-11-01T00:00:00.000Z,2021-12-01T00:00:00.000Z",
	"2019-10-09T07:37:00.000Z,2019-10-12T00:00:00.000Z",
	"2021-11-01T08:00:00.000Z,2021-11-10T00:00:00.000Z",
	"2022-10-01T00:00:00.000Z,2022-10-29T00:00:00.000Z",
];

// `/v2/cursus/9/cursus_users?&filter[campus_id]=16&range[begin_at]=2022-06-06T08:37:00.000Z,2022-07-02T08:37:00.000Z&page=${page}&per_page=100`
export const getData2 = async (page, pos, compus) => {
	return new Promise((resolve) => {
		Api()
			.get(
				// `/v2/cursus/9/cursus_users?filtre[created_at]=2022-05-30T09:45:15.138Z&filter[campus_id]=16&range[begin_at]=2022-06-06T08:37:00.000Z,2022-07-02T08:37:00.000Z&page=3&per_page=100`
				`/v2/cursus/9/cursus_users?&filter[campus_id]=${compus}&range[begin_at]=${dateStirng[pos]}&page=${page}&per_page=100`
			)
			.then((res) => resolve(res.data))
			.catch((err) => console.log(err));
	});
};

export const getData = async (page, pos, compus) => {
	return new Promise((resolve) => {
		Api()
			.get(
				`/v2/cursus/21/cursus_users?&filter[campus_id]=${compus}&range[begin_at]=${dateStirng[pos]}&page=${page}&per_page=100`
			)
			.then((res) => resolve(res.data))
			.catch((err) => console.log(err));
	});
};

export const loop2 = async (lenght, pos, compus) => {
	let data = [];
	for (let i = 1; i <= lenght; i++) {
		const result = await getData2(i, pos, compus);
		if (!result || !result.length) break;
		data = data.concat(result);
	}
	return data;
};

export const loop = async (lenght, pos, compus) => {
	let data = [];
	for (let i = 1; i <= lenght; i++) {
		const result = await getData(i, pos, compus);
		if (!result || !result.length) break;
		data = data.concat(result);
	}
	return data;
};

export const doIt = async (pos) => {
	let data = [];
	let users = [];
	switch (pos) {
		case 1:
			data = await loop(2, 1, 16);
			break;
		case 2:
			data = data.concat(await getData(1, 2, 16));
			break;
		case 3:
			data = data.concat(await getData(1, 3, 16));
			break;
		case 4:
			data = await loop(4, 4, 16);
			break;
		case 5:
			data = await loop(3, 5, 21);
			break;
		case 6:
			data = await loop(4, 6, 21);
			break;
		case 7:
			data = await loop(5, 7, 16);
			break;
		case 8:
			data = await loop(3, 7, 21);
			break;
		default:
			console.log(`Error.`);
	}
	users = data.sort((firstEl, secondEl) => secondEl.level - firstEl.level);
	loadProducts(users);
};
