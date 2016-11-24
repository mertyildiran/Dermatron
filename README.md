# Dermatron

<p align="center">
  <img src="http://i.imgur.com/UHnu4dY.png" alt="Screenshot 1" height="200px"/>
  <img src="http://i.imgur.com/ga8YnxZ.png" alt="Screenshot 2" height="200px"/>
</p>
<p align="center">
  <img src="http://i.imgur.com/l0qcGh0.png" alt="Screenshot 3" height="200px"/>
  <img src="http://i.imgur.com/QJ5OWYb.png" alt="Screenshot 4" height="200px"/>
</p>

## Features

* Manage visit & patient records
* Search drugs on your local drug search engine
* Schedule visits and see on big calendar
* 140 different lesion types
* 43 different symptom types
* 28 different pathophysiology types
* 59 different anatomical locations
* 727 different diagnosis options
* All of these features available in English(United States), English(Great Britain) and Turkish languages
* Easy-to-use interactive anatomical map on base human mesh (male and female available)
* Image capturing from USB Dermatoscope
* Web based diagnosis suggestions
* Artificial intelligence based diagnosis suggestions (AI trained for 12 days)

*Using this software with a* **USB Dermatoscope is highly recommended** *for clinical success.*

<p align="center">
  <img src="http://i.imgur.com/D7gKTHO.png" alt="USB Dermatoscope" height="200px"/>
</p>

### Installation of Node.js & npm & Meteor

```Shell
sudo apt-get install nodejs nodejs-legacy npm
curl https://install.meteor.com/ | sh
```

### Install and run Dermatron

```Shell
git clone https://github.com/mertyildiran/Dermatron.git
cd Dermatron/
meteor npm install
meteor
```

### Pack Dermatron for Linux

```Shell
rm -rf .electrify/ && electrify && cd .electrify/ && wget https://raw.githubusercontent.com/mertyildiran/Dermatron/master/.electrify/loading.html && rm index.js && wget https://raw.githubusercontent.com/mertyildiran/Dermatron/master/.electrify/index.js && rm package.json && wget https://raw.githubusercontent.com/mertyildiran/Dermatron/master/.electrify/package.json && cd .. && electrify && electrify package
```

Then visit [http://localhost:3000/](http://localhost:3000/)

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
