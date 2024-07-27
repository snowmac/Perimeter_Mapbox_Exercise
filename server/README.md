# Install instructions 

Assuming Ubuntu, run sudo apt to install a bunch of packages:
```bash 
sudo apt install nodejs
sudo apt install git
sudo apt install npm
sudo apt install postgresql
sudo apt install curl
```

The above will install postgres, git and nodejs w/ npm. Using curl, we will now do some config to get pgadmin so we can visually confirm a valid postgres install. 

```bash
curl -fsS https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo gpg --dearmor -o /usr/share/keyrings/packages-pgadmin-org.gpg
sudo sh -c 'echo "deb [signed-by=/usr/share/keyrings/packages-pgadmin-org.gpg] https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list && apt update'
sudo apt install pgadmin4
sudo /usr/pgadmin4/bin/setup-web.sh
```

This will config pgadmin and run it on `http://localhost/pgadmin4`.

Now lets use psql and create an admin user with a password of 'password'. 

```sql
CREATE USER admin SUPERUSER PASSWORD 'password';
```

Now using pgadmin we can connect ot the postgresql instance running locally using the admin user w/ password. Great security here!

# Project configuration 

In server root run a `npm install`. That will install the prisma and other things we need. 

We have a .env file locally in the server folder. This takes a connection string and looks like this: 

```sh
DATABASE_URL="postgresql://admin:password@localhost:5432/mapbox?schema=public"
```

With the .env in the root, we will run the migrate command then confirm in pgadmin that our DB exists with tables: 

```bash
npx prisma migrate dev --name init
```

This will create a database called mapbox then run all the migrations inside the 'public' schema which will create a few tables. 