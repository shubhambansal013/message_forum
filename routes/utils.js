/**
 * Created by shubham on 13/04/17.
 */
exports.checkEmpty = checkEmpty

function checkEmpty(required, incoming) {
    var field;
    for (var i=0; i < required.length; i++) {
        field = required[i];
        if (incoming[field] == undefined || incoming[field] === '') {
            return true;
        }
    }
    return false;
}