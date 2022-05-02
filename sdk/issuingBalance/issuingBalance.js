const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class IssuingBalance extends Resource {
    /**
     *
     * IssuingBalance object
     *
     * @description The IssuingBalance object displays the current issuing balance of the workspace,
     * which is the result of the sum of all transactions within this
     * workspace. The balance is never generated by the user, but it
     * can be retrieved to see the available information.
     *
     * Attributes (return-only):
     * @param id [string]: unique id returned when IssuingBalance is created. ex: '5656565656565656'
     * @param amount [integer]: current balance amount of the workspace in cents. ex: 200 (= R$ 2.00)
     * @param currency [string]: currency of the current workspace. Expect others to be added eventually. ex: 'BRL', 'USD'
     * @param updated [string]: datetime for the IssuingBalance. ex: '2020-03-10 10:30:00.000'u
     *
     */
    constructor(id, amount, currency, updated) {
        super(id);
        this.amount = amount;
        this.currency = currency;
        this.updated = check.datetime(updated);
    }
}

exports.IssuingBalance = IssuingBalance;
let resource = {'class': exports.IssuingBalance, 'name': 'IssuingBalance'};


exports.get = async function ({user} = {}) {
    /**
     *
     * Retrieve the IssuingBalance object
     *
     * @description Receive the Balance object linked to your workspace in the Stark Infra API
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkinfra.user was set before function call
     * 
     * Return:
     * @returns IssuingBalance object with updated attributes
     *
     */
    let IssuingBalance = await rest.getList(resource, 100, user).next();
    return IssuingBalance['value'];
};
