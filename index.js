import puppeteer, { Page } from 'puppeteer';

async function main(start, end) {
	let i = start
	if (start < 1) {
		i = 1
	}
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('http://localhost:3000/en/instructions/82');
	// const { screenWidth, screenHeight } = await page.evaluate(() => {
	//   return {
	//     screenWidth: window.screen.width,
	//     screenHeight: window.screen.height
	//   };
	// });

	// // Set the viewport to the full screen dimensions
	// await page.setViewport({
	//   width: screenWidth,
	//   height: screenHeight
	// });
	const element = await page.waitForSelector('body')
	// await page.waitForSelector('button.rounded-0.white--text.font-weight-bold.text-none.text-size-7.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--x-large')
	const popupElement = await page.locator('button.rounded-0.white--text.font-weight-bold.text-none.text-size-7.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--light.v-size--x-large')
	await popupElement.click()
	await popupElement.click()
	await popupElement.click()


	const boundingBox = await element.boundingBox();
	const xPercentage = 10; // 10% from the left
	const yPercentage = 2; // 10% from the top
	const widthPercentage = 90; // 50% width of the element
	const heightPercentage = 90; // 50% height of the element

	const clip = {
		x: boundingBox.x + (boundingBox.width * (xPercentage / 100)),
		y: boundingBox.y + (boundingBox.height * (yPercentage / 100)),
		width: boundingBox.width * (widthPercentage / 100),
		height: boundingBox.height * (heightPercentage / 100)
	};

	const showElement = await page.locator('div>button.pa-6.v-btn.v-btn--fab.v-btn--plain.v-btn--round.theme--light.v-size--small')

	const clickElement = await page.locator('span>button.v-btn.v-btn--fab.v-btn--has-bg.v-btn--round.theme--light.elevation-0.v-size--small.white')
	const result = await page.waitForFunction(captureScreen(showElement, clickElement, i, end, page, clip)== true,{timeout:0})
	await browser.close();

};
main(1, 5)
const captureScreen = async (showElement, clickElement, i, end, page, clip) => {
	if (i <= end) {
		setTimeout(async () => {

			await showElement.click().then(await page.screenshot({
				path: `screenshot_${i}.jpg`,
				clip
			}).then(
				await clickElement.click()
				
			))
			return captureScreen(showElement, clickElement, i + 1, end, page, clip)
			
		}, 3000)
		

	}
	else{
		// await browser.close()
		console.log("else");
		
		return  true;
	}
}
