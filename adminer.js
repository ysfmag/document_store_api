server = 'postgres:5432';
username = 'postgres';
password = 'postgres';
database = 'my_database';
document.querySelectorAll(
  '#content > form > table > tbody > tr:nth-child(2) > td > input',
)[0].value = server;
document.querySelectorAll('#username')[0].value = username;
document.querySelectorAll(
  '#content > form > table > tbody > tr:nth-child(4) > td > input[type=password]',
)[0].value = password;
document.querySelectorAll(
  '#content > form > table > tbody > tr:nth-child(5) > td > input',
)[0].value = database;
document.querySelectorAll(
  '#content > form > table > tbody > tr:nth-child(1) > td > select',
)[0].value = 'pgsql';
document
  .querySelectorAll('#content > form > p > input[type=submit]')[0]
  .click();
