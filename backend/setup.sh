mongo calendar --eval "db.dropDatabase()"
mongoimport -d calendar -c users --file data/export_calendar_users.json
