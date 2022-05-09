const rest = require('../../utils/rest.js');
const check = require('../../utils/check.js');
const Resource = require('../../utils/resource.js').Resource


class Log extends Resource {
    /**
     *
     * InfractionReport Log object
     *
     * @description Every time an InfractionReport entity is modified, a corresponding InfractionReport.Log
     * is generated for the entity. This log is never generated by the user.
     *
     * Attributes:
     * @param id [string]: unique id returned when the log is created. ex: '5656565656565656'
     * @param created [string]: creation datetime for the log. ex: '2020-03-10 10:30:00.000'
     * @param type [string]: type of the InfractionReport event which triggered the log creation. ex: 'created', 'registered', 'updated', 'failed', 'canceling' and 'canceled'.
     * @param errors [list of strings]: list of errors linked to this InfractionReport event.
     * @param report [InfractionReport]: InfractionReport entity to which the log refers to.
     *
     */
    constructor({ created, type, errors, report, id }) {
        super(id);
        this.created = check.datetime(created);
        this.type = type;
        this.errors = errors;
        this.report = report;
    }
}

exports.Log = Log;
let resource = {'class': exports.Log, 'name': 'InfractionReportLog'};


exports.get = async function (id, {user} = {}) {
    /**
     *
     * Retrieve a specific InfractionReport Log
     *
     * @description Receive a single InfractionReport Log object previously created by the Stark Infra API by passing its id
     *
     * Parameters (required):
     * @param id [string]: object unique id. ex: '5656565656565656'
     *
     * Parameters (optional):
     * @param user [Organization/Project object, default null]: Organization or Project object. Not necessary if starkinfra.user was set before function call
     *
     * Return:
     * @returns InfractionReport Log object with updated attributes
     *
     */
    return rest.getId(resource, id, user);
};

exports.query = async function ({limit, after, before, types, reportIds, user} = {}) {
    /**
     *
     * Retrieve InfractionReport Logs
     *
     * @description Receive a generator of InfractionReport Log objects previously created in the Stark Infra API
     *
     * Parameters (optional):
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter retrieved objects by types. ex: 'success' or 'failed'
     * @param reportIds [list of strings, default null]: list of InfractionReport ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Organization/Project object, default null]: Project object. Not necessary if starkinfra.user was set before function call
     *
     * Return:
     * @returns list of InfractionReport Log objects with updated attributes
     *
     */
    let query = {
        limit: limit,
        after: after,
        before: before,
        types: types,
        reportIds: reportIds,
    };
    return rest.getList(resource, query, user);
};

exports.page = async function ({ cursor, limit, after, before, types, reportIds, user } = {}) {
    /**
     *
     * Retrieve paged InfractionReport Logs
     *
     * @description Receive a list of up to 100 InfractionReport.Log objects previously created in the Stark Infra API and the cursor to the next page.
     * Use this function instead of query if you want to manually page your reports.
     *
     * Parameters (optional):
     * @param cursor [string, default null]: cursor returned on the previous page function call
     * @param limit [integer, default null]: maximum number of objects to be retrieved. Unlimited if null. ex: 35
     * @param after [string, default null] date filter for objects created only after specified date. ex: '2020-03-10'
     * @param before [string, default null] date filter for objects created only before specified date. ex: '2020-03-10'
     * @param types [list of strings, default null]: filter retrieved objects by types. ex: 'success' or 'failed'
     * @param reportIds [list of strings, default null]: list of InfractionReport ids to filter retrieved objects. ex: ['5656565656565656', '4545454545454545']
     * @param user [Organization/Project object, default null]: Project object. Not necessary if starkinfra.user was set before function call
     *
     * Return:
     * @returns list of InfractionReport Log objects with updated attributes and cursor to retrieve the next page of InfractionReport objects
     *
     */
    let query = {
        cursor: cursor,
        limit: limit,
        after: after,
        before: before,
        types: types,
        reportIds: reportIds,
    };
    return rest.getPage(resource, query, user);
};
