#!/bin/zsh

# check to see if test file name was not passed as argument
if [ -z $1 ]; then
  echo -en '\n'
  echo -e "\033[0;31mMake sure to format the command properly:\033[0m"
  echo -en '\n'
  echo -e "\033[01;36mCorrect Syntax:\033[0m 'npm run test <hh name>' "; 
  echo -en '\n'
# check to ensure that the test file being requested exists
elif [ ! -f "./__tests__/$1" ] && [ ! -f "./__tests__/$1.js" ]; then
  echo -en '\n'
  echo -e "\033[0;31mTest file does not exist for:\033[0m \033[01;36m$1\033[0m"
  echo -e "\033[0;31mPlease check your spelling.\033[0m"
  echo -en '\n'
# run the test file
else 
  echo Running tests for $1
  echo -en '\n'
  # if .js was passed in file name, then don't add .js to filename
  if [[ $1 == *".js"* ]]; then
    ./node_modules/.bin/jest __tests__/$1
  # if .js extension was not passed in add it and run test
  else
    ./node_modules/.bin/jest __tests__/$1.js
  fi
fi