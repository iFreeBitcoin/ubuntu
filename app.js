const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/pay', function(req, res) {
    (async() => {
        /**
         */
        const browser = await puppeteer.launch({'args' : [ '--no-sandbox', '--disable-setuid-sandbox' ]}), page = await browser.newPage();

        /**
         */
        let data = {};

        /**
         */
        try {
            /**
                const browser = await puppeteer.launch({ headless: false }), page = await browser.newPage();
             */
            await page.goto('https://3ds.payment.ru/P2P_A3_2/card_form.html');

            /**
             */
            await page.type('input[id="sender_card_frame1"]', '5469');
            await page.type('input[id="sender_card_frame2"]', '6200');
            await page.type('input[id="sender_card_frame3"]', '2715');
            await page.type('input[id="sender_card_frame4"]', '5058');
            await page.select('select[name="EXP"]', '03');
            await page.select('select[name="EXP_YEAR"]', '23');
            await page.type('input[id="CVC2"]', '602');
            await page.type('input[id="receiver_card_frame1"]', '5469');
            await page.type('input[id="receiver_card_frame2"]', '6200');
            await page.type('input[id="receiver_card_frame3"]', '2373');
            await page.type('input[id="receiver_card_frame4"]', '4179');
            await page.type('input[id="AMOUNT"]', '10');

            /**
             */
            await page.evaluate(
                () => {
                    document.querySelector('.b-contblock__body_recipient_accept').innerHTML = '<p class="checkbox checkbox-item checked"><input type="checkbox" id="accept" onclick="hide_error();" checked="checked"><label for="accept" style="background-position: left -42px;"><a target="_blank" href="http://www.psbank.ru/~/media/253AFB1334464F7A85DDA1D6879DBC82.ashx" class="b-page_link">С условиями оферты</a> ознакомлен и согласен</label></p><div id="agreement_error" style="display: none;">Вы не приняли условия Соглашения об <br> использовании сервиса</div>';
                }
            );

            /**
             */
            await page.click('a[id="confirm_button"]')
            await page.setJavaScriptEnabled(false);
            await page.waitForSelector('form');

            /**
             */
            data = await page.evaluate(
                () => {
                    return {
                        ok: true,
                        action: document.querySelector('form').action,
                        PaReq: document.querySelector('input[name="PaReq"]').value,
                        MD: document.querySelector('input[name="MD"]').value,
                        TermUrl: document.querySelector('input[name="TermUrl"]').value,
                    }
                }
            );
        }
        catch(e) {
            data.ok = false;
            data.exception = e.message;
        }

        /**
         */
        await browser.close();

        /**
         */
        res.json(data);
    })();
});

app.get('/check', function(req, res) {
    (async() => {
        /**
         */
        const browser = await puppeteer.launch({'args' : [ '--no-sandbox', '--disable-setuid-sandbox' ]}), page = await browser.newPage();

        /**
         */
        let data = {};

        /**
         */
        try {
            /**
             */
            await page.goto('http://95.213.224.3:3000');

            /**
             */
            await page.evaluate((query) => {
                /**
                 */
                let inputs = '';

                /**
                 */
                document.querySelector('form').action = 'https://3ds.payment.ru/cgi-bin/cgi_link';

                /**
                 */
                for (key in query) {
                    inputs += '<input type="hidden" name="'+ key +'" value="'+ query[key] +'">';
                }

                /**
                 */
                document.querySelector('form').innerHTML = inputs;
                document.querySelector('form').submit();
            }, req.query);

            /**
             */
            await page.waitForSelector('div');

            /**
             */
            data.ok = true;
            data.body = await page.evaluate(() => {
                return document.body.innerHTML;
            });
        } 
        catch(e) {
            data.ok = false;
            data.exception = e.message;
        }

        /**
         */
        await browser.close();

        /**
         */
        res.json(data);
    })();
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});