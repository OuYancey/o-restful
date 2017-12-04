# Database

Use: [MongoDB](https://www.mongodb.com/)

## Installation

- [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

## Configuration

> docs: [MongoDB Configuration Options](https://docs.mongodb.com/manual/reference/configuration-options/#configuration-file-options)

create a config file (eg: `mongod.conf`), with the follow content:

```yaml
systemLog:
   destination: file
   path: "/var/log/mongodb/mongod.log"
   logAppend: true

storage:
   journal:
      enabled: true

processManagement:
   fork: true

net:
   bindIp: 127.0.0.1
   port: 27017
```

## Auto Configuration Generator

Try to use generator to different OS(such as: macOS, windows, linux).

## Start MongoDB Server

run comman:

```cmd
mongod --config mongod.conf
```