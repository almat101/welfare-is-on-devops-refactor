all:
	docker compose up --build

down:
	docker compose down

clean:
	docker compose down -v