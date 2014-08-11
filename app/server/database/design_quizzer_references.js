/**
 * Created by ckelkboom on 6-8-14.
 */

module.exports = {
    "_id": "_design/references",
    "language": "javascript",
    "views": {
        "queryReferencesByEntity": {
            "map": "function(doc) {\n  emit(doc.entity, doc);\n}"
        },
        "queryReferencesByEntityAndName": {
            "map": "function(doc) {\n  if (doc.entity && doc.key) {\n    emit([doc.entity, doc.key], doc);\n  }\n}"
        }
    }
};
