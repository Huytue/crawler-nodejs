const cheerio = require('cheerio'); // khai báo module cheerio

const request = require('request-promise'); // khai báo module request-promise
const fs = require('fs');
var data = []
for (let index = 1; index < 100; index++) {
	request('https://123job.vn/tuyen-dung?page=' + index, async (error, response, html) => {
		if (!error && response.statusCode == 200) {
			const $ = cheerio.load(html);

			$('.job__list-item').each((index, el) => {
				const job = $(el).find('.job__list-item-title a').text();
				const company = $(el).find('.job__list-item-company span').text();
				const address = $(el).find('.job__list-item-info').find('.address').text();
				const salary = $(el).find('.job__list-item-info').find('.salary').text();
				data.push({
					job, company, address, salary
				}); // đẩy dữ liệu vào biến data
			});
		}
		else {
			console.log(error);
		}
		await fs.writeFileSync('data.json', JSON.stringify(data)); // lưu dữ liệu vào file data.json
	});

}
