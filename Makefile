DC := docker compose

up:
	$(DC) up
build:
	$(DC) build --no-cache --force-rm
init:
	cp app/prefecture-chart/.env.example app/prefecture-chart/.env
	$(DC) build
	@make install
	@make up
remake:
	@make destroy
	@make init
stop:
	$(DC) stop
down:
	$(DC) down --remove-orphans
restart:
	@make down
	@make up
destroy:
	$(DC) down --rmi all --volumes --remove-orphans
destroy-volumes:
	$(DC) down --volumes --remove-orphans
ps:
	$(DC) ps
install:
	$(DC) run --rm node sh -c "cd prefecture-chart && npm install"
lint-prettier:
	$(DC) run --rm node sh -c "cd prefecture-chart && npm run lint:prettier"
fix-prettier:
	$(DC) run --rm node sh -c "cd prefecture-chart && npm run fix:prettier" 
lint-eslint:
	$(DC) run --rm node sh -c "cd prefecture-chart && npm run lint:eslint"
fix-eslint:
	$(DC) run --rm node sh -c "cd prefecture-chart && npm run fix:eslint" 