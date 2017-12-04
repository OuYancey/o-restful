import * as path from "path";
import {
    MongoDBConfig,
    MongoDBConfigPath,
} from "./index";

interface IMongoDBConfig {
    systemLog?: object;
    storage?: object;
    net?: object;

    [key: string]: any;
}

interface IMongoDBField {
    default?: any;
    win32?: any;
    darwin?: any;

    [key: string]: any;
}

function parseConfig(obj: IMongoDBConfig | IMongoDBField, plantform: NodeJS.Platform): IMongoDBConfig {
    if (obj.hasOwnProperty("default")) {
        return obj.hasOwnProperty(plantform) ? obj[plantform] : obj.default;
    } else {
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            if (Object.prototype.toString.call(obj[key]) === "[object Object]") {
                obj[key] = parseConfig(obj[key], plantform);
            }
        });
        return obj;
    }
}

function generateMongoDBConfig(config: IMongoDBConfig, plantform: NodeJS.Platform, filePath: string) {
    const conf = parseConfig(config, plantform);
    console.log(conf);
}

function main() {
    const platform = process.platform;
    const filePath = path.join(__dirname, MongoDBConfigPath);

    console.log(`Current platform: ${platform}`);
    console.log("Begin...");

    generateMongoDBConfig(MongoDBConfig, platform, filePath);

    console.log("End...");
    console.log(`Generate success in path: ${filePath}`);
}

main();
