/**
 * MongoDB config in different Env.
 * This config will generate to `mongod.conf` to the root path
 *
 * Attention: The relative path is according to the root of this file
 */
export const MongoDBConfig = {
    systemLog: {
        destination: "file",
        logAppend: true,
        path: {
            default: "/var/log/mongodb/",
            win32: "../log/mongodb/",
        },
    },
    storage: {
        dbPath: {
            default: "/data/db",
            win32: "../../data/db",
        },
    },
    net: {
        port: 20170,
        bindIp: "127.0.0.1",
    },
    processManagement: {
        fork: true,
    },
};

export const MongoDBConfigPath = "../../mongod.conf";
