const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.json({ ok: true });
});

app.get('/pay', function(req, res) {
    (async() => {
        /**
         */
        const browser = await puppeteer.launch({'args' : [ '--no-sandbox', '--disable-setuid-sandbox' ]}), page = await browser.newPage();

        /**
         */
        let mts = {};

        /**
         */
        try {
            /**
             */
            await page.goto('https://payment.mts.ru/transfer/CardToCard');

            /**
             */
            await page.evaluate((query) => {
                $.show3dSecureRedirectInfo = function(n, t) {
                    var r = $(".b-page__containers._3dsecure"),
                        u, i;
                    r.hide();
                    $(".b-page__wrapper").append(r);
                    u = $(".own", $(".b-page__wrapper"));
                    $("#_3d-secure-form", r).attr("action", n.acsUrl);
                    $("#_3d-secure-form", r).prop("action", n.acsUrl);
                    $("[name='PaReq']", r).val(n.paReq);
                    $("[name='MD']", r).val(n.mdOrder);
                    $("[name='MdOrder']", r).val(n.mdOrder + ' - ' + n.acsUrl);
                    i = $("[name='TermUrl']", r).val();
                    i = Url.insertParam(i, "MdOrder", n.mdOrder, !1);
                    i = Url.insertParam(i, "MD", n.mdOrder, !1);
                    i = Url.insertParam(i, "type", t.toString(), !1);
                    n.mpBind && (i = Url.insertParam(i, "mpBind", "true", !1));
                    n.bindCard && (i = Url.insertParam(i, "bindCard", "true", !1));
                    n.tmplName && (i = Url.insertParam(i, "tmplName", n.tmplName, !1));
                    n.createAp && (i = Url.insertParam(i, "createAp", "true", !1));
                    window.webview && (i = Url.insertParam(i, "webview", "true", !1));
                    window.mgts && (i = Url.insertParam(i, "mgts", "true", !1));
                    n.referer && (i = Url.insertParam(i, "referer", n.referer.toString(), !1));
                    $("[name='TermUrl']", r).val(i);
                    $(".vcCancelLink", r).off("click").on("click", function() {
                        $("[data-b-popup-id='_3dsecure']").append(r);
                        $("[name='PaReq']", r).val("");
                        $("[name='MD']", r).val("");
                        $("[name='MdOrder']", r).val("");
                        u.hide();
                        u.show()
                    });
                    u.hide();
                    r.show();
                    location.hash = "#_3dsecure_info";
                },
                function(n) {
                    function i(n, i, r) {
                        var u, f, e;
                        if (i == 400) return Misc.SingIn(), !1;
                        u = n;
                        n && n.indexOf("<!DOCTYPE") === 0 && (f = n.match(/class="titleerror">(.*)?</), f != null && f.length > 1 && (u = f[1]));
                        window.mgts ? (e = $(".infoBlockMgts"), $(".message1", e).text("РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°"), $(".message2", e).text(u), e.slideDown(300)) : t({
                            title: "РџСЂРѕРёР·РѕС€Р»Р° РѕС€РёР±РєР°",
                            message1: r == !0 ? "" : "РџРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕРІС‚РѕСЂРёС‚СЊ Р·Р°РїСЂРѕСЃ.",
                            message2: u,
                            noName: "РћРљ",
                            hideYes: !0,
                            hideNo: !1,
                            hideClose: !1
                        })
                    }

                    function r(n, i, r, u, f, e, o, s) {
                        t({
                            title: n,
                            message1: i,
                            noName: s || "РћРљ",
                            hideYes: !0,
                            hideNo: f,
                            hideClose: e,
                            onClose: u,
                            onNo: r,
                            isModal: o
                        })
                    }

                    function u(n, i, r, u, f, e, o, s) {
                        t({
                            title: n,
                            message1: i,
                            message2: o,
                            yesName: f,
                            noName: e,
                            onYes: r,
                            onNo: u,
                            onClose: u,
                            hideYes: !1,
                            hideNo: !1,
                            hideClose: !1,
                            isModal: s
                        })
                    }

                    function f(n, t, i) {
                        var r = $("[data-b-popup-id=" + n + "]"),
                            u = $("[data-b-popup-close]", r);
                        u.toggle(!t);
                        i ? r.attr("data-b-popup-modal", "") : r.removeAttr("data-b-popup-modal")
                    }

                    function t(n) {
                        var i = $(".vcnConfirmPopup"),
                            o = i.find(".ncvConfirmTitle"),
                            u, e, f, t, r;
                        if (n.title ? o.text(n.title).parent().show() : o.parent().hide(), u = i.find(".ncvConfirmMessage1"), n.message1 ? u.html(n.message1).show() : u.hide(), e = i.find(".ncvConfirmMessage2"), n.message2 ? e.html(n.message2).show() : e.hide(), u || e ? u.parent().show() : u.parent().hide(), f = i.find(".vcnBtnClose"), n.onClose) f.off("click.vcn").on("click.vcn", n.onClose);
                        else f.off("click.vcn");
                        if (n.hideClose ? f.parent().hide() : f.parent().show(), t = i.find(".vcnBtnNo"), t.prop("disabled", !1), n.onNo) t.off("click.vcn").on("click.vcn", n.onNo);
                        else t.off("click.vcn").on("click.vcn", function() {
                            UI.Popup.close("vcn-confirm-popup")
                        });
                        if (n.noName ? t.text(n.noName) : t.text("РћС‚РјРµРЅРёС‚СЊ"), n.hideNo ? t.parent().hide() : t.parent().show(), r = i.find(".vcnBtnYes"), n.onYes) r.off("click.vcn").removeClass("btn_loading").on("click.vcn", n.onYes).off("click.vcnLoading").on("click.vcnLoading", function() {
                            r.addClass("btn_loading");
                            f.parent().hide();
                            t.prop("disabled", !0)
                        });
                        else r.off("click.vcn").removeClass("btn_loading");
                        n.yesName ? r.text(n.yesName) : r.text("OK");
                        n.hideYes ? (r.parent().hide(), t.removeClass("btn_gray").addClass("ttt")) : r.parent().show();
                        n.isModal ? i.attr("data-b-popup-modal", "") : i.removeAttr("data-b-popup-modal");
                        UI.Popup.open("vcn-confirm-popup")
                    }

                    function e(n, t, i, r) {
                        var u, e;
                        if (n == "confirm-sms" || n == "card-link-confirm") return u = $("[data-b-popup-id=" + n + "]"), u.parent().is("body") || u.appendTo("body"), UI.Popup.open(n), e = u.find(".b-popup__close").parent(), r && e.click(function() {
                            return r(n)
                        }), i ? u.attr("data-b-popup-modal", "") : u.removeAttr("data-b-popup-modal"), e.toggle(!t), u;
                        var f = $(".vcnUniversalPopup"),
                            o = f.find(".b-popup__close").parent(),
                            c = f.children().first(),
                            s = $("[data-b-popup-id=" + n + "]"),
                            h = s.find(".b-popup__inner").clone(!0);
                        return t ? o.hide() : o.show(), r && o.click(function() {
                            return r(n)
                        }), h.find("[data-b-popup-close]").attr("data-b-popup-close", "vcn-universal-popup"), f.find(".b-popup__inner").replaceWith(h), c.attr("class", s.find(".b-popup").attr("class")), i ? f.attr("data-b-popup-modal", "") : f.removeAttr("data-b-popup-modal"), UI.Popup.open("vcn-universal-popup"), f
                    }

                    function o(n, t) {
                        var i = $(".vcnUniversalPopup"),
                            f = i.children().first(),
                            r = $(n),
                            u = r.find(".b-popup__inner");
                        u.find("[data-b-popup-close]").attr("data-b-popup-close", "vcn-universal-popup");
                        i.find(".b-popup__inner").replaceWith(u);
                        f.attr("class", r.find(".b-popup").attr("class"));
                        t ? i.attr("data-b-popup-modal", "") : i.removeAttr("data-b-popup-modal");
                        UI.Popup.open("vcn-universal-popup")
                    }

                    function s() {
                        UI.Popup.close("vcn-universal-popup");
                        UI.Popup.close("vcn-confirm-popup");
                        UI.Popup.close("confirm-sms");
                        $(".vcnBtnYes", $(".vcnConfirmPopup")).removeClass("btn_loading")
                    }
                    n.Error = i;
                    n.Info = r;
                    n.Confirm = u;
                    n.DisableClosing = f;
                    n.Open = e;
                    n.OpenDymamic = o;
                    n.Close = s
                }(Popup2 || (Popup2 = {}));

                document.querySelectorAll('input').forEach((el) => {
                    switch(el.name) {
                        case 'TargetPanValue': {
                            el.value = query.receiver;
                            break;
                        }
                        case 'Sum': {
                            el.value = query.amount;
                            break;
                        }
                        case 'Pan': {
                            el.value = query.card;
                            break;
                        }
                        case 'ExpiryMonth': {
                            el.value = query.month;
                            break;
                        }
                        case 'ExpiryYear': {
                            el.value = query.year;
                            break;
                        }
                        case 'Cvc': {
                            el.value = query.cvc;
                            break;
                        }
                    }
                });
                document.querySelector('#_3d-secure-form').id = 'testtesttest';
                document.querySelector('button[name="btn_submit"]').click();
            }, req.query);

            /**
             */
            await page.waitForFunction('document.querySelectorAll(\'span.b-payment-result__price\')[1].innerHTML.length > 0', {
                timeout: 5000
            });

            /**
             */
            await page.evaluate(() => {
                document.querySelector('button[name="btn_submit"]').click();
            });

            /**
             */
            await page.waitForFunction('((document.querySelector(\'input[name="PaReq"]\').value).length > 0)', {
                timeout: 5000
            });

            /**
             */
            let result = await page.evaluate(() => {
                return document.querySelector('#testtesttest').innerHTML;
            });

            /**
             */
            try {
                mts.ok = true;
                mts.PaReq = result.split('name="PaReq" value="')[1].split('"')[0];
                mts.MD = result.split('name="MD" value="')[1].split('"')[0];
                mts.MdOrder = result.split('name="MdOrder" value="')[1].split('"')[0].split(' - ');
                mts.action = mts.MdOrder[1];
                mts.MdOrder = mts.MdOrder[0];
                mts.TermUrl = result.split('name="TermUrl" value="')[1].split('"')[0];
                mts.RequestVerificationToken = result.split('RequestVerificationToken" type="hidden" value="')[1].split('"')[0];
            }
            catch(e) {
                mts.ok = false;
                mts.data = e.message;
            }
        } 
        catch(e) {
            mts.ok = false;
            mts.data = e.message;
        }

        /**
         */
        await browser.close();

        /**
         */
        res.json(mts);
    })();
});

app.post('/check', urlencodedParser, function(req, res) {
    (async() => {
        /**
         */
        const browser = await puppeteer.launch({'args' : [ '--no-sandbox', '--disable-setuid-sandbox' ]}), page = await browser.newPage();

        /**
         */
        let mts = {};

        /**
         */
        try {
            /**
             */
            await page.goto('http://95.213.224.3:3000');

            /**
             */
            await page.evaluate((query) => {

                let form = document.createElement('form');
                form.action = 'https://payment.mts.ru/verified3ds?MdOrder='+ query['MD'] +'&MD='+ query['MD'] +'&type=2&referer=3';
                form.method = 'POST';

                let inputs = '';

                for (key in query) {
                    inputs += '<input type="hidden" name="'+ key +'" value="'+ query[key] +'">';
                }

                form.innerHTML = inputs;
                document.body.append(form);

                let script = document.createElement('script');
                script.innerHTML = 'document.querySelector(\'form\').submit();';
                document.body.append(script);

            }, req.body);

            /**
             */
            await page.waitForFunction('(document.title == "Кошелек МТС Деньги – удобный сервис для быстрых переводов и платежей")', {
                timeout: 5000
            });

            /**
             */
            let result = await page.evaluate(() => {
                return document.querySelector('body').innerHTML;
            });

            /**
             */
            try {
                mts.ok = true;
            
                try {
                    mts.title = result.split('header__subtitle">')[1].split('</div')[0];
                } 
                catch(e) {
                    mts.title = e.message;
                }

                try {
                    mts.error = result.split('b-content__title b-content__red"')[1].split("</div")[0];
                }
                catch(e) {
                    mts.error = e.message;
                }
            }
            catch(e) {
                mts.ok = false;
                mts.data = e.message;
            }
        } 
        catch(e) {
            mts.ok = false;
            mts.data = e.message;
        }

        /**
         */
        await browser.close();

        /**
         */
        res.json(mts);
    })();
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});