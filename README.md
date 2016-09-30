# Dermatron

### Installation of Node.js & npm & Meteor

```Shell
sudo apt-get install nodejs nodejs-legacy npm
curl https://install.meteor.com/ | sh
```

## Electrified Iron Meteor with Alien Recipe

Alien is a bash script for creating Meteor Apps with MVC-like directory structure & a scaffolding tool.

```Shell
./alien project PROJECT_NAME
cp alien PROJECT_NAME/
cd PROJECT_NAME/
./alien scaffold person name:string registered:date isAdmin:boolean
./alien links
meteor
```

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
