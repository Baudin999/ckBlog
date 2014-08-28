/**
 * Created by ckelkboom on 6-8-14.
 */


module.exports = {
    "_id": "_design/quizzer_users",
    "language": "javascript",
    "views": {
        "queryUserByUsername": {
            "map": "function(doc) {\n  emit(doc.username, doc);\n}"
        }
    }
};