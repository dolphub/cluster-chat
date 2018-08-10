DOCKER_BIN ?= `which docker`
DOCKER_COMPOSE ?= `which docker-compose`
PACKAGE_VERSION ?= `node -p -e "require('./package.json').version"`
TAG ?= "clusterchat-server:"$(PACKAGE_VERSION)

.PHONY: build
build:
	$(DOCKER_BIN) build . -t dolphub/$(TAG)

.PHONY: push
push:
	$(DOCKER_BIN) push dolphub/$(TAG)

.PHONY: release
release: build push

.PHONY: run
run:
	$(DOCKER_COMPOSE) up