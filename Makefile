# run docker compose file, then run prisma migrations, then start services
start: dcompose
	migrate
	build
	pnpm start:dev

# run docker compose file, then start services
dev: dcompose
	pnpm dev

# build all workspaces
build:
	pnpm build

# run prisma migrations
migrate:
	pnpm prisma:migrate:dev

# run the docker compose file
dcompose:
	docker-compose up -d

stop:
	docker-compose down --remove-orphans 

# delete. everything.
nuke:
	docker-compose down --volumes --remove-orphans 
