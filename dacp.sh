#!/bin/bash

sudo mysqldump -uroot -ptoor geochat > databasebackup.sql;
git add --all;
git commit -m "$1";
git push -u origin master;

echo "DONE!";
