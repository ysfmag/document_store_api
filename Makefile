up:
	docker-compose up

down:
	docker-compose down

bash_api:
	docker-compose exec api bash

up-db: 
	docker-compose up postgres adminer 
