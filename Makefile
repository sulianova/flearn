install:
	npm install

lint:
	npx stylelint --fix ./app/scss/**/*.scss
	npx pug-lint ./app/**/*.pug
	npx prettier --write ./app

deploy:
	npx surge ./build/

build:
	npx gulp build