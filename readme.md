# Panda

## Install

### Install apps
  - install node.js
  - install yarn
  - install python3.5
  - install postgresql9.6
  - install gitbash
  - install xampp for images server

### Setting
    - add python3.5 path to environments

### Setting the images server.
start xampp apache server.
copy the images to xampp__directory/htdocs/ and change `imageBasePath` in  panda/src/static/config/images
ex: export const imageBasePath = "http://178.120.10.5/gome_images"

### Import database file
Open pgadmin
create new database
click mouse right button on created database and select restore.
and select the backup_file.dump and ok.

### Install requirements (we can ignore this part for offline)
Open the gitbash.
```sh
    $ cd panda
    $ yarn
    $ pip install -r py-requirements/dev.txt
```

## Run

### Frontend
```sh
$ cd panda
$ yarn dev # development mode
$ yarn build # production mode
```

### Backend

Activate the virtualenv.

Open the `panda_venv_35/Scripts/activate.sh` and `panda_venv_35/Scripts/activate` files with your favorite editor.

And find the `D:\Project\panda_venv_35` and replace with your venv path.

Open new gitbash or comand prompt

```sh
$ source ../pand_venv_35/Scripts/activate # for gitbash
```
OR
```sh
$ cd ../pand_venv_35/Scripts # for command prompt
$ activate # for command prompt
$ cd ../../panda
```

```sh
$ python manage.py runserver 8000
```

If you have the issue when run last commnad line, please follow the below.

```sh
$ chcp 65001
```

And again.

```sh
$ python manage.py runserver 8000
```

