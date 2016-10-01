# Dermatron

### Installation of Node.js & npm & Meteor

```Shell
sudo apt-get install nodejs nodejs-legacy npm
curl https://install.meteor.com/ | sh
```

## Electrified & Materialized Iron Meteor with Alien Recipe

Alien is a bash script for creating Meteor Apps with MVC-like directory structure & a scaffolding tool.

<p align="center">
  <img src="http://i.imgur.com/Uy5YAUT.png" alt="Alien" height="300px"/>
</p>

```Shell
./alien project PROJECT_NAME
cp alien PROJECT_NAME/
cd PROJECT_NAME/
./alien scaffold person name:string registered:date isAdmin:boolean
./alien links
meteor
```

Later on if you want to update one of your scaffolds just regenerate again:

```Shell
./alien scaffold person name:string surname:string registered:date isAdmin:boolean
```

Thanks to MongoDB's schema-less architecture you don't need to migrate anything. Templates and helpers will be regenerated automatically.

Supported HTML controls are string, text, number, date, boolean, password, url, tel, email, file, color and select.

```Shell
./alien project PROJECT_NAME packages [PACKAGE_NAME] [PACKAGE_NAME] ...
```

Alien additionally downloads and installs all `[PACKAGE_NAME]`s given as arguments.

To change the default packages look for the line bellow:

```Shell
PACKAGES=("iron:router" "mizzao:bootstrap-3")
```

### Then Electrify it

```Shell
sudo npm install -g electrify
cd PROJECT_NAME/
electrify
electrify package
```
