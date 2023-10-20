

var buying = (function() {

    let qrCode = null;
    const BASE_COST = 2000;

    const buyItem = {
        theme: undefined,
        /**
         * @description 专人培训
         * @param {Object} object 选项对象
         *  - func {String} 方式
         *  - desc {String} 描述
         *  - price {Number} 单价
         *  - count {Number} 数量
         *  - cost {Number} 费用
         */
        day: undefined,
        env: undefined,
        deploy: undefined,
        git: undefined,
        gitCapacity: undefined,
        gitMember: undefined,
        logon: undefined
    };

    let accountList = [];

    let cost = BASE_COST;

    function calTotalPrice() {
        let newCost = BASE_COST;
        for (let key in buyItem) {
            const item = buyItem[key];
            if (item != null && typeof item === 'object') {
                newCost += item.cost;
            }
        }
        if (newCost === cost) {
            return;
        }
        cost = newCost;
        $('#cost').text(cost);
    }

    function __calCost(count, price) {
        return count * price;
    }

    function buyingTheme(value) {
        const theme = $('#color-toggle-icon').attr('data');
        if (theme === value) {
            $('#color-toggle-icon').click();
        }
        buyItem.theme = theme;
    }

    function buyingDay(value, e) {
        const DAY_ITEM = {
            one: {
                func: 'one',
                desc: '上门服务，按天算，不满一天按一天算',
                price: 1198,
                count: 1,
                cost: 0
            },
            two: {
                func: 'two',
                desc: '远程服务，按天算，不满一天按一天算',
                price: 998,
                count: 1,
                cost: 0
            }
        };
        let item = DAY_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calCost(item.count, item.price)
            }
            $(e.target).siblings('.buying-row-form-selector-num').children('font').text(`${item.count} 天`);
        }
        buyItem.day = item;
    }

    function addDay(e) {
        let { count, price } = buyItem.day;
        count++;
        if (count > 7) {
            return;
        }
        buyItem.day.count = count;
        buyItem.day.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 天`);
        calTotalPrice();
    }

    function reduceDay(e) {
        let { count, price } = buyItem.day;
        count--;
        if (count < 1) {
            return;
        }
        buyItem.day.count = count;
        buyItem.day.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 天`);
        calTotalPrice();
    }

    function buyingEnv(value, e) {
        const ENV_ITEM = {
            one: {
                func: 'one',
                desc: '电脑安装软件环境，按台算',
                price: 499,
                count: 1,
                cost: 0
            }
        };
        let item = ENV_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calCost(item.count, item.price)
            }
            $(e.target).siblings('.buying-row-form-selector-num').children('font').text(`${item.count} 台`);
        }
        buyItem.env = item;
    }

    function addEnv(e) {
        let { count, price } = buyItem.env;
        count++;
        if (count > 9) {
            return;
        }
        buyItem.env.count = count;
        buyItem.env.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 台`);
        calTotalPrice();
    }

    function reduceEnv(e) {
        let { count, price } = buyItem.env;
        count--;
        if (count < 1) {
            return;
        }
        buyItem.env.count = count;
        buyItem.env.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 台`);
        calTotalPrice();
    }

    function buyingDeploy(value) {
        const DEPLOY_ITEM = {
            one: {
                func: 'one',
                desc: '部署发布生成网址、二维码，任意设备都能访问',
                price: 998,
                count: 1,
                cost: 0
            }
        };
        let item = DEPLOY_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calCost(item.count, item.price)
            }
        }
        buyItem.deploy = item;
    }

    function buyingGit(value) {
        const GIT_ITEM = {
            one: {
                func: 'one',
                desc: '资源管理，开启git管理',
                price: 998,
                count: 1,
                cost: 0
            }
        };
        let item = GIT_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calCost(item.count, item.price)
            }
        }
        buyItem.git = item;
    }

    function buyingCapacity(value, e) {
        const GIT_CAP_ITEM = {
            one: {
                func: 'one',
                desc: 'git仓库容量，按年算，3GB² / 20GB²',
                price: 2198,
                count: 1,
                cost: 0
            },
            two: {
                func: 'two',
                desc: 'git仓库容量，按年算，2GB² / 20GB²',
                price: 1998,
                count: 1,
                cost: 0
            },
            three: {
                func: 'three',
                desc: 'git仓库容量，按年算，1GB² / 20GB²',
                price: 1698,
                count: 1,
                cost: 0
            }
        };
        let item = GIT_CAP_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calCost(item.count, item.price)
            }
            $(e.target).siblings('.buying-row-form-selector-num').children('font').text(`${item.count} 年`);
        }
        buyItem.gitCapacity = item;
    }

    function addCapacity(e) {
        let { count, price } = buyItem.gitCapacity;
        count++;
        if (count > 9) {
            return;
        }
        buyItem.gitCapacity.count = count;
        buyItem.gitCapacity.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 年`);
        calTotalPrice();
    }

    function reduceCapacity(e) {
        let { count, price } = buyItem.gitCapacity;
        count--;
        if (count < 1) {
            return;
        }
        buyItem.gitCapacity.count = count;
        buyItem.gitCapacity.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 年`);
        calTotalPrice();
    }

    function __calMemberCost(count, price) {
        return Math.ceil((count / 5) - 1) * price;
    }

    function buyingMember(value, e) {
        const GIT_MEMBER_ITEM = {
            one: {
                func: 'one',
                desc: 'git仓库成员，按人头一年算，5人起购，6人和10人的费用是一样的',
                price: 2998,
                count: 10,
                cost: 0
            }
        };
        let item = GIT_MEMBER_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calMemberCost(item.count, item.price)
            }
            $(e.target).siblings('.buying-row-form-selector-num').children('font').text(`${item.count} 人`);
        }
        buyItem.gitMember = item;
    }

    function addMember(e) {
        let { count, price } = buyItem.gitMember;
        count++;
        if (count > 99) {
            return;
        }
        buyItem.gitMember.count = count;
        buyItem.gitMember.cost = __calMemberCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 人`);
        calTotalPrice();
    }

    function reduceMember(e) {
        let { count, price } = buyItem.gitMember;
        count--;
        if (count < 6) {
            return;
        }
        buyItem.gitMember.count = count;
        buyItem.gitMember.cost = __calMemberCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 人`);
        calTotalPrice();
    }

    function buyingLogon(value, e) {
        const LOGON_ITEM = {
            one: {
                func: 'one',
                desc: '登录，拦截页面，需要特定账号才能访问',
                price: 298,
                count: 1,
                cost: 0
            }
        };
        let item = LOGON_ITEM[value];
        if (item !== undefined) {
            item = {
                ...item,
                cost: __calCost(item.count, item.price)
            }
            $(e.target).siblings('.buying-row-form-selector-num').children('font').text(`${item.count} 个`);
            accountList = [__newAccount()];
        } else {
            accountList = [];
        }
        buyItem.logon = item;
        __updateAccount();
    }

    function addLogon(e) {
        let { count, price } = buyItem.logon;
        count++;
        if (count > 5) {
            return;
        }
        buyItem.logon.count = count;
        buyItem.logon.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 个`);
        calTotalPrice();

        accountList.push(__newAccount());
        __updateAccount();
    }

    function reduceLogon(e) {
        let { count, price } = buyItem.logon;
        count--;
        if (count < 1) {
            return;
        }
        buyItem.logon.count = count;
        buyItem.logon.cost = __calCost(count, price);
        $(e.currentTarget).siblings('font').text(`${count} 个`);
        calTotalPrice();

        accountList.pop();
        __updateAccount();
    }

    function reduceBoundLogon(index) {
        let { count, price } = buyItem.logon;
        count--;
        if (count < 1) {
            return;
        }
        buyItem.logon.count = count;
        buyItem.logon.cost = __calCost(count, price);
        $('#buyingLogon1').siblings('.buying-row-form-selector-num').children('font').text(`${count} 个`);
        calTotalPrice();

        accountList.splice(index, 1);
        __updateAccount();
    }

    function __newAccount() {
        return { username: '', password: '' };
    }

    function __updateAccount() {
        $('#accountItem').empty();

        if (accountList.length === 0) {
            $('#account').hide();
        } else {
            $('#accountItem').append(
                `
                <legend>
                    <h3 id="nine">
                        特定账号
                    </h3>
                </legend>
                `
            );
            $('#accountItem').append(
                accountList.map((acc, index) => {
                    return `
                        <div class="buying-row-step-input-item">
                            <svg onclick="buying.reduceBoundLogon(${index})"><use xlink:href="#reduce-btn-fill" /></svg>
                            <input type="text" placeholder="账号" autocomplete="new-password" name="buyingUsr${index}" value="${acc.username}">
                            <input type="password" placeholder="密码" autocomplete="new-password" name="buyingPsw${index}" value="${acc.password}">
                        </div>
                    `;
                }).join('')
            );
            $('#account').show();
        }
    }

    function onchangeAccount(e) {
        const { name, value } = e.target;
        const usrRex = /^buyingUsr/;
        const pswRex = /^buyingPsw/;
        if (usrRex.test(name)) {
            const index = Number.parseInt(name.replace(usrRex, ''));
            accountList[index].username = value;
        }

        if (pswRex.test(name)) {
            const index = Number.parseInt(name.replace(pswRex, ''));
            accountList[index].password = value;
        }
    }

    function __nextItemWorking(id, isValid) {
        const itemId = $(`#${id}`).data('next');
        if (itemId == null) {
            return;
        }
        if (isValid) {
            $(`#${itemId}`).show();
        } else {
            $(`#${itemId} input[type=radio]:checked`).prop('checked', false);
            $(`#${itemId}`).hide();
            buying[itemId]('zero');
            calTotalPrice();
        }
    }

    function __isValidField(value) {
        return value !== 'zero';
    }

    function onchange(e) {
        const { name, value } = e.target;
        if (!name) {
            return;
        }
        buying[name](value, e);
        calTotalPrice();
        __nextItemWorking(name, __isValidField(value));
    }

    function toBuy() {
        createQrCode();
        $('#buyingResult').show();
    }

    function createQrCode() {
        const result = CryptoJS.AES.encrypt(
            JSON.stringify({ buyItem, cost, accountList }),
            'Lan'
        ).toString();
        console.log('加密', result)
        console.log('解密', CryptoJS.AES.decrypt(result, 'Lan').toString(CryptoJS.enc.Utf8));
        if (!qrCode) {
            qrCode = new QRCode('qrcode', result);
        } else {
            qrCode.clear();
            qrCode.makeCode(result);
        }
    }

    function closeResult() {
        $('#buyingResult').hide();
    }

    return {
        onchange,
        buyingTheme,
        buyingDay,
        addDay,
        reduceDay,
        buyingEnv,
        addEnv,
        reduceEnv,
        buyingDeploy,
        buyingGit,
        buyingCapacity,
        addCapacity,
        reduceCapacity,
        buyingMember,
        addMember,
        reduceMember,
        buyingLogon,
        addLogon,
        reduceLogon,
        reduceBoundLogon,
        onchangeAccount,
        closeResult,
        toBuy
    };
})()
