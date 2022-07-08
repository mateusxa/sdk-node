const rest = require('../utils/rest.js');
const check = require('../utils/check.js');
const Resource = require('../utils/resource.js').Resource


class StaticBrcode extends Resource {
    /**
     * 
     * StaticBrcode object
     * 
     * @description A StaticBrcode stores account information in the form of a PixKey and can be used to create 
     * Pix transactions easily.
     * When you initialize a StaticBrcode, the entity will not be automatically
     * created in the Stark Infra API. The 'create' function sends the objects
     * 
     * Parameters (required):
     * @param name [string]: receiver's name. ex: 'Tony Stark'
     * @param keyId [string]: receiver's PixKey id. ex: '+5541999999999'
     * @param city [string, default São Paulo]: receiver's city name. ex: 'Rio de Janeiro'
     * 
     * Parameters (optional):
     * @param amount [integer, default 0]: positive integer that represents the amount in cents of the resulting Pix transaction. ex: 1234 (= R$ 12.34)
     * @param reconciliationId [string, default null]: id to be used for conciliation of the resulting Pix transaction. ex: '123'
     * 
     * Attributes (return-only):
     * @param id [string]: id returned on creation, this is the BR code. ex: '00020126360014br.gov.bcb.pix0114+552840092118152040000530398654040.095802BR5915Jamie Lannister6009Sao Paulo620705038566304FC6C'
     * @param uuid [string]: unique uuid returned when a StaticBrcode is created. ex: '97756273400d42ce9086404fe10ea0d6'
     * @param url [string]: url link to the BR code image. ex: 'https://brcode-h.development.starkinfra.com/static-qrcode/97756273400d42ce9086404fe10ea0d6.png'
     * @param updated [string]: latest update datetime for the StaticBrcode. ex: '2020-03-10 10:30:00.000'
     * @param created [string]: creation datetime for the StaticBrcode. ex: '2020-03-10 10:30:00.000'
     * 
     */
    constructor({id, name, keyId, city, amount, reconciliationId=null, uuid=null, url=null, updated=null, created=null}) {
        super(id);
        this.name = name;
        this.keyId = keyId;
        this.city = city;
        this.amount = amount;
        this.reconciliationId = reconciliationId;
        this.uuid = uuid;
        this.url = url;
        this.updated = check.datetime(updated);
        this.created = check.datetime(created);
    }
}

exports.StaticBrcode = StaticBrcode;
let resource = {'class': exports.StaticBrcode, 'name': 'StaticBrcode'};

exports.create = async function (brcodes, {user} = {}) {
    /**
     *
     * Create StaticBrcodes
     *
     * @description Send a list of StaticBrcode objects for creation at the Stark Infra API
     *
     * Parameters (required):
     * @param brcodes [list of StaticBrcode objects]: list of StaticBrcode objects to be created in the API.
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkinfra.user was set before function call
     *
     * Return:
     * @returns list of StaticBrcode objects with updated attributes
     *
     */
    return rest.post(resource, brcodes, user);
};

exports.get = async function (uuid, {user} = {}) {
    /**
     *
     * Retrieve a specific StaticBrcode
     *
     * @description Receive a single StaticBrcode object previously created in the Stark Infra API by passing its id
     *
     * Parameters (required):
     * @param uuid [string]: object's unique uuid. ex: '97756273400d42ce9086404fe10ea0d6'
     *
     * Parameters (optional):
     * @param user [Organization/Project object]: Organization or Project object. Not necessary if starkinfra.user was set before function call
     *
     * Return:
     * @returns StaticBrcode object with updated attributes
     *
     */
    return rest.getId(resource, uuid, user);
};

exports.query = async function ({ limit, after, before, uuids, user } = {}) {
    /**
     *
     * Retrieve StaticBrcodes
     *
     * @description Receive a generator of StaticBrcode objects previously created in the Stark Infra API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param uuids [list of strings, default null]: list of uuids to filter retrieved objects. ex: ['97756273400d42ce9086404fe10ea0d6', 'e3da0b6d56fa4045b9b295b2be82436e']
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkinfra.user was used before function call     
     *
     * Return:
     * @returns generator of StaticBrcode objects with updated attributes
     *
     */
    let query = {
        after: after,
        before: before,
        uuids: uuids,
        limit: limit,
        user: user,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, uuids, user } = {}) {
    /**
     *
     * Retrieve paged StaticBrcodes
     *
     * @description Receive a list of up to 100 StaticBrcode objects previously created in the Stark Infra API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your requests.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param uuids [list of strings, default null]: list of uuids to filter retrieved objects. ex: ['97756273400d42ce9086404fe10ea0d6', 'e3da0b6d56fa4045b9b295b2be82436e']
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkinfra.user was used before function call
     *
     * Return:
     * @returns list of StaticBrcode objects with updated attributes and cursor to retrieve the next page of StaticBrcode objects
     *
     */
    let query = {
        cursor: cursor,
        after: after,
        before: before,
        uuids: uuids,
        limit: limit,
        user: user,
    };
    return rest.getPage(resource, query, user);
};