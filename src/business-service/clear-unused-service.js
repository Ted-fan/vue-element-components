/* eslint-disable indent */
export function deleteUnusedParams(obj) {
    delete obj.objectId;
    delete obj.pid;
    delete obj.isDeleted;
    delete obj.structId;
    delete obj.sort;
    delete obj.createTime;
    delete obj.createUserName;
    delete obj.modificationUserName;
    delete obj.modificationUserId;
    delete obj.modificationTime;
}