install:
	npm install

lint:
	npx stylelint --fix ./app/scss/**/*.scss
	pug-lint ./app/**/*.pug

deploy:
	npx surge ./build/

build:
	npx gulp build