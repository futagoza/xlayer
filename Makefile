default: app

clean:
	rm -rf build/release
	rm -rf build/.nw-cache

app:
	node scripts/build-app.js

bump:
	node scripts/bump-version.js

changelog:
	node scripts/generate-changelog.js

.PHONY:  default clean app bump changelog
.SILENT: default clean app bump changelog
