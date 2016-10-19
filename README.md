# Dermatron

### Installation of Node.js & npm & Meteor

```Shell
sudo apt-get install nodejs nodejs-legacy npm
curl https://install.meteor.com/ | sh
```

## Electrified & Materialized Iron Meteor with Alien Recipe

Alien is a bash script for creating Meteor Apps with well organized directory structure & a scaffolding tool.

<p align="center">
  <img src="http://i.imgur.com/4cJoIxh.png" alt="Alien" height="300px"/>
</p>

```Shell
./alien project PROJECT_NAME
cd PROJECT_NAME/
./alien scaffold person createdAt:datetime name:string birthDate:date isAdmin:boolean
./alien links
meteor
```

By scaffolding Alien generates templates, helpers, events and server-side methods automatically. In server-side methods, for `insert_document` function, Alien adds `createdAt` field and timestamps it by default. It's good practice to generate your scaffolds always with `createdAt:datetime` as the first field.

Later on if you want to update one of your scaffolds just regenerate again:

```Shell
./alien scaffold person createdAt:datetime name:string surname:string birthDate:date isAdmin:boolean
```

Thanks to MongoDB's schema-less architecture you don't need to migrate anything. Templates,helpers and events will be regenerated automatically.

Supported HTML controls are `string`, `text`, `number`, `date`, `boolean`, `password`, `url`, `tel`, `email`, `file`, `color` and `select`. `datetime` is also supported but only for server-side usage purposes.

```Shell
./alien project PROJECT_NAME packages [PACKAGE_NAME] [PACKAGE_NAME] ...
```

Alien additionally downloads and installs all `[PACKAGE_NAME]`s given as arguments.

To change the default packages look for the `PACKAGES` constant and change it. But this action will cause several breaking changes so you will need to retouch the codes.

### Then Electrify it

```Shell
sudo npm install -g electrify
cd PROJECT_NAME/
electrify
electrify package
```
