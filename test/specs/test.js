import WordlePage from '../pageobjects/wordlePage.js'

//letters that are going to be use to run the test
const letter={1:'d',2:'r',3:'i',4:'n',5:'k',6:'e'}

describe('Wordle', () => {
    it('should loss after 6 attemps', async () => {
        //define start url fixed to avoid winning by mistake
        await browser.url("http://localhost:3000/?test=money")
        //create a for loop to go through the rows
        for(let i =1; i<=6;i++ ){
            //create a for loop to go through the divs
            for(let j=1;j<=5;j++){
                //wait until the div is enable
                await (await WordlePage.divInputBox(i,j)).waitForEnabled({ timeout: 3000 })
                //click div in orde to send keys since the div value can not be set
                await (await WordlePage.divInputBox(i,j)).click();
                //use keys to send each letter in the selected div
                await browser.keys(letter[i]);
            }
            //send enter also as key, enter="\uE007"
            await browser.keys("\uE007")
            //Added a 0.2 sec pause to make it visible to human eye
            await browser.pause(200)
        }
        //at the end validated that the loose message is displayed
        await (await WordlePage.modalH1).waitForDisplayed({ timeout: 3000 })
        await expect(await (await WordlePage.modalH1).getText() === "Sorry, you loose!")
    })

    it('should win at first attemp', async () => {
        //define start url fixed to assure the win
        await browser.url("http://localhost:3000/?test=drink")
        //set a for loop to go through the divs since the rows are fixed to 1
        for(let i =1; i<=5;i++ ){
            //wait until the div is enable
            await (await WordlePage.divInputBox(1,i)).waitForEnabled({ timeout: 3000 })
             //click div in orde to send keys since the div value can not be set
            await (await WordlePage.divInputBox(1,i)).click();
            //use keys to send each letter in the selected div
            await browser.keys(letter[i]);
              //send enter also as key, enter="\uE007"
            await browser.keys("\uE007")

            //Added a 0.5 sec pause to make it visible to human eye
            await browser.pause(500)
        }
         //at the end validated that the win message is displayed
        await (await WordlePage.modalH1).waitForDisplayed({ timeout: 3000 })
        await expect(await (await WordlePage.modalH1).getText() === "You Win!")
    })
})