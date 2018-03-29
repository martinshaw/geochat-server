#!/bin/bash

# (D)atabase backup, then Git (A)dd, Git (C)ommit, Git (P)ush script.  Created by Martin Shaw.

sudo mysqldump -uroot -ptoor geochat > databasebackup.sql;
git add --all;
git commit -m "$1";
git push -u origin master;

echo " ";
echo " ";
echo "DONE!";
echo " ";
